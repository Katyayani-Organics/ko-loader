import type { CSSProperties } from "react";
import { CSS, DEFAULT_MESSAGE, LETTERS, ariaLabel, rootClass, type Letter, type LoaderOptions } from "./core";

export type { LoaderOptions, LoaderSize, LoaderTone } from "./core";

export interface BrandLoaderProps extends LoaderOptions {
  className?: string;
  style?: CSSProperties;
}

const word = (letters: Letter[]) =>
  letters.map((l) => (
    <span key={l.delay} className={`ko-loader__l ko-loader__${l.part}`} style={{ animationDelay: `${l.delay}ms` }}>
      {l.ch}
    </span>
  ));

/**
 * Branded loading state: the "Katyayani Organics" wordmark with a gentle letter wave and a
 * thin sliding bar. One component for every full-page / section load. No hooks, so it also
 * works as a Next.js server component (e.g. in `loading.tsx`).
 */
export function BrandLoader({ message = DEFAULT_MESSAGE, className, style, ...opts }: BrandLoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={ariaLabel(message)}
      className={className ? `${rootClass(opts)} ${className}` : rootClass(opts)}
      style={style}
    >
      <style>{CSS}</style>
      <div className="ko-loader__inner">
        <p aria-hidden className="ko-loader__word">
          {word(LETTERS.brand)}
          <span className="ko-loader__gap" />
          {word(LETTERS.sub)}
        </p>
        <div aria-hidden className="ko-loader__track">
          <span className="ko-loader__fill" />
        </div>
        {message && <p className="ko-loader__msg">{message}</p>}
      </div>
    </div>
  );
}

export default BrandLoader;
