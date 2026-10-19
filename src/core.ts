import CSS from "./css.generated";

export { CSS };

export type LoaderSize = "sm" | "md";
export type LoaderTone = "auto" | "light" | "dark";

export interface LoaderOptions {
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

export const DEFAULT_MESSAGE = "Loading…";
export const STYLE_ID = "ko-loader-css";

const BRAND = "Katyayani";
const SUB = "Organics";
const STEP_MS = 70;

export interface Letter {
  ch: string;
  delay: number;
  part: "b" | "s";
}

/** The 17 letters of the wordmark, each with its wave delay. */
export const LETTERS: { brand: Letter[]; sub: Letter[] } = (() => {
  let i = 0;
  const make = (word: string, part: Letter["part"]) =>
    word.split("").map((ch) => ({ ch, delay: i++ * STEP_MS, part }));
  return { brand: make(BRAND, "b"), sub: make(SUB, "s") };
})();

export function ariaLabel(message: string) {
  return `Katyayani Organics — ${message || DEFAULT_MESSAGE}`;
}

export function rootClass({ fullScreen, overlay, size = "md", tone = "auto" }: LoaderOptions) {
  return [
    "ko-loader",
    size === "sm" && "ko-loader--sm",
    fullScreen && "ko-loader--full",
    overlay && "ko-loader--overlay",
    tone !== "auto" && `ko-loader--${tone}`,
  ]
    .filter(Boolean)
    .join(" ");
}
