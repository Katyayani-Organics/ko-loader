import { L as LoaderOptions } from './core-BkQ8Z9yB.cjs';
export { a as LoaderSize, b as LoaderTone } from './core-BkQ8Z9yB.cjs';

/** The loader as an HTML string (for server templates or plain `innerHTML`). Needs the CSS on the page. */
declare function loaderHTML({ message, ...opts }?: LoaderOptions): string;
/** Adds the loader CSS to the page once. */
declare function injectStyles(doc?: Document): void;
declare const Base: {
    new (): HTMLElement;
    prototype: HTMLElement;
};
/**
 * `<ko-loader message="Loading orders…" size="sm" fullscreen overlay tone="dark"></ko-loader>`
 */
declare class KoLoaderElement extends Base {
    static observedAttributes: string[];
    connectedCallback(): void;
    attributeChangedCallback(): void;
    private render;
}
declare function defineElement(name?: string): void;
/**
 * Covers the page with the loader until you call the returned function.
 * `const hide = showBrandLoader("Saving…"); await save(); hide();`
 */
declare function showBrandLoader(message?: string, opts?: Omit<LoaderOptions, "message" | "overlay">): () => void;

export { KoLoaderElement, LoaderOptions, defineElement, injectStyles, loaderHTML, showBrandLoader };
