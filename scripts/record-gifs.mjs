// Records the README previews in docs/*.gif from the built dist/ko-loader.global.js.
// Needs: npm run build first, Chrome or Edge installed, ffmpeg on PATH.
// Frames are stepped deterministically (animations paused, currentTime set), so every GIF is smooth.
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright-core";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const script = pathToFileURL(path.join(root, "dist/ko-loader.global.js")).href;
const FPS = 25;
const DURATION_MS = 5200; // 4 bar cycles, ~3 wave cycles
const START_MS = 3000; // skip the first wave so every frame is steady state

const LIGHT = "#ffffff";
const DARK = "#0b0f17";

const shots = [
  {
    file: "loader.gif",
    w: 560, h: 240, bg: LIGHT,
    body: `<ko-loader message="Loading…" style="padding-top:28px"></ko-loader>`,
  },
  {
    file: "loader-dark.gif",
    w: 560, h: 240, bg: DARK, dark: true,
    body: `<ko-loader message="Signing you in…"></ko-loader>`,
  },
  {
    file: "loader-sm.gif",
    w: 560, h: 240, bg: "#f4f6f5",
    body: `<div class="card"><div class="card-h">Content calendar</div><ko-loader size="sm" message="Loading calendar…"></ko-loader></div>`,
  },
  {
    file: "loader-fullscreen.gif",
    w: 720, h: 405, bg: LIGHT,
    body: `<ko-loader fullscreen message="Loading…"></ko-loader>`,
  },
  {
    file: "loader-overlay.gif",
    w: 720, h: 405, bg: LIGHT,
    body: `<div class="app"><aside></aside><main><div class="bar"></div><div class="row"></div><div class="row"></div><div class="row short"></div></main></div>
           <ko-loader overlay message="Saving…" style="--ko-loader-bg: rgb(246 248 247 / .8)"></ko-loader>`,
  },
];

const page = (s) => `<!doctype html><html class="${s.dark ? "dark" : ""}"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet">
<script src="${script}"></script>
<style>
  html, body { margin: 0; height: 100%; background: ${s.bg}; font-family: ui-sans-serif, system-ui, sans-serif; }
  .card { margin: 24px; background: #fff; border: 1px solid #e3e8e5; border-radius: 12px; overflow: hidden; }
  .card-h { padding: 12px 16px; font-size: 13px; font-weight: 600; color: #374151; border-bottom: 1px solid #e3e8e5; }
  .app { display: flex; height: 100%; }
  aside { width: 150px; background: #eef2ef; }
  main { flex: 1; padding: 24px; }
  .bar { height: 28px; width: 40%; border-radius: 6px; background: #e3e8e5; margin-bottom: 24px; }
  .row { height: 56px; border-radius: 8px; background: #f0f3f1; margin-bottom: 12px; }
  .short { width: 60%; }
</style></head><body>${s.body}</body></html>`;

let browser;
try { browser = await chromium.launch({ channel: "chrome", headless: true }); }
catch { browser = await chromium.launch({ channel: "msedge", headless: true }); }

const work = mkdtempSync(path.join(tmpdir(), "ko-loader-gifs-"));
mkdirSync(path.join(root, "docs"), { recursive: true });

try {
  for (const s of shots) {
    const dir = path.join(work, s.file);
    mkdirSync(dir);
    const html = path.join(dir, "page.html");
    writeFileSync(html, page(s));
    const tab = await browser.newPage({ viewport: { width: s.w, height: s.h }, deviceScaleFactor: 2 });
    await tab.goto(pathToFileURL(html).href, { waitUntil: "networkidle" });
    await tab.evaluate(() => document.fonts.ready);
    const frames = Math.round((DURATION_MS / 1000) * FPS);
    for (let i = 0; i < frames; i++) {
      const t = START_MS + (i * 1000) / FPS;
      await tab.evaluate((t) => document.getAnimations().forEach((a) => { a.pause(); a.currentTime = t; }), t);
      await tab.screenshot({ path: path.join(dir, `f${String(i).padStart(4, "0")}.png`) });
    }
    await tab.close();
    const out = path.join(root, "docs", s.file);
    execFileSync("ffmpeg", [
      "-y", "-loglevel", "error", "-framerate", String(FPS), "-i", path.join(dir, "f%04d.png"),
      "-vf", `scale=${s.w}:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=192:stats_mode=full[p];[b][p]paletteuse=dither=none:diff_mode=rectangle`,
      "-loop", "0", out,
    ]);
    console.log("wrote docs/" + s.file);
  }
} finally {
  await browser.close();
  rmSync(work, { recursive: true, force: true });
}
