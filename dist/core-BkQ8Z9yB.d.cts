type LoaderSize = "sm" | "md";
type LoaderTone = "auto" | "light" | "dark";
interface LoaderOptions {
    /** Text under the wordmark. Pass "" to hide it. */
    message?: string;
    /** Fill the viewport height (route / auth fallbacks). */
    fullScreen?: boolean;
    /** Cover the whole page (fixed, on top) — e.g. while saving. */
    overlay?: boolean;
    /** "sm" for cards and panels, "md" (default) for pages and sections. */
    size?: LoaderSize;
    /** "auto" follows a `.dark` / `[data-theme="dark"]` ancestor. */
    tone?: LoaderTone;
}

export type { LoaderOptions as L, LoaderSize as a, LoaderTone as b };
