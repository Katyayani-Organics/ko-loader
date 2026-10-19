import {
  DEFAULT_MESSAGE,
  LETTERS,
  STYLE_ID,
  ariaLabel,
  css_generated_default,
  rootClass
} from "./chunk-AEZDTUKU.js";

// src/element.ts
var escape = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
var word = (letters) => letters.map((l) => `<span class="ko-loader__l ko-loader__${l.part}" style="animation-delay:${l.delay}ms">${l.ch}</span>`).join("");
function loaderHTML({ message = DEFAULT_MESSAGE, ...opts } = {}) {
  return `<div role="status" aria-live="polite" aria-label="${escape(ariaLabel(message))}" class="${rootClass(opts)}"><div class="ko-loader__inner"><p aria-hidden="true" class="ko-loader__word">${word(LETTERS.brand)}<span class="ko-loader__gap"></span>${word(LETTERS.sub)}</p><div aria-hidden="true" class="ko-loader__track"><span class="ko-loader__fill"></span></div>` + (message ? `<p class="ko-loader__msg">${escape(message)}</p>` : "") + `</div></div>`;
}
function injectStyles(doc = document) {
  if (doc.getElementById(STYLE_ID)) return;
  const style = doc.createElement("style");
  style.id = STYLE_ID;
  style.textContent = css_generated_default;
  doc.head.appendChild(style);
}
var Base = typeof HTMLElement === "undefined" ? class {
} : HTMLElement;
var KoLoaderElement = class extends Base {
  connectedCallback() {
    injectStyles(this.ownerDocument);
    this.render();
  }
  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }
  render() {
    var _a;
    const size = this.getAttribute("size");
    const tone = this.getAttribute("tone");
    this.innerHTML = loaderHTML({
      message: (_a = this.getAttribute("message")) != null ? _a : DEFAULT_MESSAGE,
      size: size === "sm" ? "sm" : "md",
      tone: tone === "light" || tone === "dark" ? tone : "auto",
      fullScreen: this.hasAttribute("fullscreen"),
      overlay: this.hasAttribute("overlay")
    });
  }
};
KoLoaderElement.observedAttributes = ["message", "size", "tone", "fullscreen", "overlay"];
function defineElement(name = "ko-loader") {
  if (typeof customElements !== "undefined" && !customElements.get(name)) {
    customElements.define(name, KoLoaderElement);
  }
}
function showBrandLoader(message = DEFAULT_MESSAGE, opts = {}) {
  defineElement();
  const el = document.createElement("ko-loader");
  el.setAttribute("message", message);
  el.setAttribute("overlay", "");
  if (opts.size) el.setAttribute("size", opts.size);
  if (opts.tone) el.setAttribute("tone", opts.tone);
  document.body.appendChild(el);
  return () => el.remove();
}
defineElement();
export {
  KoLoaderElement,
  defineElement,
  injectStyles,
  loaderHTML,
  showBrandLoader
};
