// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from "vitest";
import { loaderHTML, showBrandLoader } from "../src/element";

beforeEach(() => {
  document.body.innerHTML = "";
});

describe("<ko-loader> web component", () => {
  it("renders from attributes and adds the CSS to the page once", () => {
    document.body.innerHTML = `<ko-loader message="Loading orders…" size="sm"></ko-loader><ko-loader fullscreen></ko-loader>`;
    const [a, b] = document.querySelectorAll("ko-loader");
    expect(a.querySelector(".ko-loader")!.className).toBe("ko-loader ko-loader--sm");
    expect(a.querySelector(".ko-loader__msg")!.textContent).toBe("Loading orders…");
    expect(a.querySelectorAll(".ko-loader__l").length).toBe(17);
    expect(b.querySelector(".ko-loader")!.className).toBe("ko-loader ko-loader--full");
    expect(document.querySelectorAll("#ko-loader-css").length).toBe(1);
  });

  it("re-renders when an attribute changes", () => {
    document.body.innerHTML = `<ko-loader></ko-loader>`;
    const el = document.querySelector("ko-loader")!;
    el.setAttribute("message", "Almost there…");
    el.setAttribute("tone", "dark");
    expect(el.querySelector(".ko-loader__msg")!.textContent).toBe("Almost there…");
    expect(el.querySelector(".ko-loader")!.classList.contains("ko-loader--dark")).toBe(true);
  });

  it("escapes the message", () => {
    const html = loaderHTML({ message: `<img src=x onerror=alert(1)>` });
    expect(html).not.toContain("<img");
    expect(html).toContain("&lt;img");
  });

  it("showBrandLoader covers the page until hidden", () => {
    const hide = showBrandLoader("Saving…");
    const el = document.querySelector("ko-loader")!;
    expect(el.querySelector(".ko-loader--overlay")).not.toBeNull();
    expect(el.textContent).toContain("Saving…");
    hide();
    expect(document.querySelector("ko-loader")).toBeNull();
  });
});
