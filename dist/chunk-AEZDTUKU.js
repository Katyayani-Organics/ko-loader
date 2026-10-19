// src/css.generated.ts
var css_generated_default = 'ko-loader{display:block}.ko-loader{--_ko-c:var(--ko-loader-color,hsl(142 64% 24%));--_ko-m:var(--ko-loader-muted,hsl(220 10% 45%));--_ko-bg:var(--ko-loader-bg,hsl(150 10% 97%));box-sizing:border-box;display:flex;align-items:center;justify-content:center;padding:6rem 1rem}:where(.dark,[data-theme="dark"]) .ko-loader:not(.ko-loader--light),.ko-loader.ko-loader--dark{--_ko-c:var(--ko-loader-color-dark,hsl(142 64% 45%));--_ko-m:var(--ko-loader-muted-dark,hsl(220 10% 60%));--_ko-bg:var(--ko-loader-bg-dark,hsl(220 25% 6%))}.ko-loader--sm{padding:2.5rem 1rem}.ko-loader--full{min-height:100vh;min-height:100dvh;background:var(--_ko-bg)}.ko-loader--overlay{position:fixed;inset:0;z-index:var(--ko-loader-z,1000);background:var(--_ko-bg)}.ko-loader__inner{display:flex;flex-direction:column;align-items:center;text-align:center}.ko-loader__word{margin:0;font-family:Poppins,ui-sans-serif,system-ui,sans-serif;font-size:28px;line-height:1;letter-spacing:-0.025em;white-space:nowrap;user-select:none;color:var(--_ko-c)}@media (min-width:640px){.ko-loader__word{font-size:34px}}.ko-loader--sm .ko-loader__word{font-size:20px}.ko-loader__b{font-weight:700}.ko-loader__s{font-weight:400;color:color-mix(in srgb,var(--_ko-c) 75%,transparent)}.ko-loader__gap{display:inline-block;width:0.3em}.ko-loader__l{display:inline-block;animation:ko-loader-wave 1.8s cubic-bezier(.45,0,.55,1) infinite}.ko-loader__track{margin-top:20px;width:176px;height:3px;overflow:hidden;border-radius:9999px;background:color-mix(in srgb,var(--_ko-c) 15%,transparent)}.ko-loader--sm .ko-loader__track{margin-top:12px;width:112px}.ko-loader__fill{display:block;width:40%;height:100%;border-radius:9999px;background:var(--_ko-c);animation:ko-loader-slide 1.3s cubic-bezier(.65,0,.35,1) infinite}.ko-loader__msg{margin:12px 0 0;font-size:12px;line-height:16px;letter-spacing:0.025em;color:var(--_ko-m)}.ko-loader--sm .ko-loader__msg{margin-top:8px;font-size:11px}@keyframes ko-loader-wave{0%,55%,100%{transform:translateY(0);opacity:1}25%{transform:translateY(-5px);opacity:.5}}@keyframes ko-loader-slide{0%{transform:translateX(-110%)}100%{transform:translateX(260%)}}@media (prefers-reduced-motion:reduce){.ko-loader__l,.ko-loader__fill{animation:none}.ko-loader__fill{transform:none;width:100%;opacity:.35}}';

// src/core.ts
var DEFAULT_MESSAGE = "Loading\u2026";
var STYLE_ID = "ko-loader-css";
var BRAND = "Katyayani";
var SUB = "Organics";
var STEP_MS = 70;
var LETTERS = (() => {
  let i = 0;
  const make = (word, part) => word.split("").map((ch) => ({ ch, delay: i++ * STEP_MS, part }));
  return { brand: make(BRAND, "b"), sub: make(SUB, "s") };
})();
function ariaLabel(message) {
  return `Katyayani Organics \u2014 ${message || DEFAULT_MESSAGE}`;
}
function rootClass({ fullScreen, overlay, size = "md", tone = "auto" }) {
  return [
    "ko-loader",
    size === "sm" && "ko-loader--sm",
    fullScreen && "ko-loader--full",
    overlay && "ko-loader--overlay",
    tone !== "auto" && `ko-loader--${tone}`
  ].filter(Boolean).join(" ");
}

export {
  css_generated_default,
  DEFAULT_MESSAGE,
  STYLE_ID,
  LETTERS,
  ariaLabel,
  rootClass
};
