import { CSS, DEFAULT_MESSAGE, LETTERS, STYLE_ID, ariaLabel, rootClass, type Letter, type LoaderOptions } from "./core";

export type { LoaderOptions, LoaderSize, LoaderTone } from "./core";

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const word = (letters: Letter[]) =>
  letters
    .map((l) => `<span class="ko-loader__l ko-loader__${l.part}" style="animation-delay:${l.delay}ms">${l.ch}</span>`)
    .join("");

/** The loader as an HTML string (for server templates or plain `innerHTML`). Needs the CSS on the page. */
export function loaderHTML({ message = DEFAULT_MESSAGE, ...opts }: LoaderOptions = {}) {
  return (
    `<div role="status" aria-live="polite" aria-label="${escape(ariaLabel(message))}" class="${rootClass(opts)}">` +
    `<div class="ko-loader__inner">` +
    `<p aria-hidden="true" class="ko-loader__word">${word(LETTERS.brand)}<span class="ko-loader__gap"></span>${word(LETTERS.sub)}</p>` +
    `<div aria-hidden="true" class="ko-loader__track"><span class="ko-loader__fill"></span></div>` +
    (message ? `<p class="ko-loader__msg">${escape(message)}</p>` : "") +
    `</div></div>`
  );
}

/** Adds the loader CSS to the page once. */
export function injectStyles(doc: Document = document) {
  if (doc.getElementById(STYLE_ID)) return;
  const style = doc.createElement("style");
  style.id = STYLE_ID;
  style.textContent = CSS;
  doc.head.appendChild(style);
}

// Importing this module during SSR (no DOM) must not throw.
const Base = typeof HTMLElement === "undefined" ? (class {} as typeof HTMLElement) : HTMLElement;

/**
 * `<ko-loader message="Loading orders…" size="sm" fullscreen overlay tone="dark"></ko-loader>`
 */
export class KoLoaderElement extends Base {
  static observedAttributes = ["message", "size", "tone", "fullscreen", "overlay"];

  connectedCallback() {
    injectStyles(this.ownerDocument);
    this.render();
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }

  private render() {
    const size = this.getAttribute("size");
    const tone = this.getAttribute("tone");
    this.innerHTML = loaderHTML({
      message: this.getAttribute("message") ?? DEFAULT_MESSAGE,
      size: size === "sm" ? "sm" : "md",
      tone: tone === "light" || tone === "dark" ? tone : "auto",
      fullScreen: this.hasAttribute("fullscreen"),
      overlay: this.hasAttribute("overlay"),
    });
  }
}

export function defineElement(name = "ko-loader") {
  if (typeof customElements !== "undefined" && !customElements.get(name)) {
    customElements.define(name, KoLoaderElement);
  }
}

/**
 * Covers the page with the loader until you call the returned function.
 * `const hide = showBrandLoader("Saving…"); await save(); hide();`
 */
export function showBrandLoader(message = DEFAULT_MESSAGE, opts: Omit<LoaderOptions, "message" | "overlay"> = {}) {
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
