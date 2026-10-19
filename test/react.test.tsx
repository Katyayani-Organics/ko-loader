import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { BrandLoader } from "../src/index";

const count = (html: string, needle: string) => html.split(needle).length - 1;

describe("BrandLoader (React)", () => {
  it("renders the wordmark, bar and default message with a status role", () => {
    const html = renderToStaticMarkup(<BrandLoader />);
    expect(html).toContain('role="status"');
    expect(html).toContain('aria-label="Katyayani Organics — Loading…"');
    expect(count(html, "ko-loader__l ")).toBe(17);
    expect(html).toContain("animation-delay:1120ms"); // 17th letter = 16 * 70ms
    expect(html).toContain("ko-loader__fill");
    expect(html).toContain('<p class="ko-loader__msg">Loading…</p>');
    expect(html).toContain("<style>");
  });

  it("is a drop-in for the Content OS props", () => {
    const html = renderToStaticMarkup(<BrandLoader fullScreen message="Signing you in…" className="py-16" />);
    expect(html).toContain('class="ko-loader ko-loader--full py-16"');
    expect(html).toContain("Signing you in…");
  });

  it("supports size, overlay and tone, and hides an empty message", () => {
    const html = renderToStaticMarkup(<BrandLoader size="sm" overlay tone="dark" message="" />);
    expect(html).toContain('class="ko-loader ko-loader--sm ko-loader--overlay ko-loader--dark"');
    expect(html).not.toContain('class="ko-loader__msg"');
    expect(html).toContain('aria-label="Katyayani Organics — Loading…"');
  });
});
