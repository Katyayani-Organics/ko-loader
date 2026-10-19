import * as react from 'react';
import { CSSProperties } from 'react';
import { L as LoaderOptions } from './core-BkQ8Z9yB.cjs';
export { a as LoaderSize, b as LoaderTone } from './core-BkQ8Z9yB.cjs';

interface BrandLoaderProps extends LoaderOptions {
    className?: string;
    style?: CSSProperties;
}
/**
 * Branded loading state: the "Katyayani Organics" wordmark with a gentle letter wave and a
 * thin sliding bar. One component for every full-page / section load. No hooks, so it also
 * works as a Next.js server component (e.g. in `loading.tsx`).
 */
declare function BrandLoader({ message, className, style, ...opts }: BrandLoaderProps): react.JSX.Element;

export { BrandLoader, type BrandLoaderProps, LoaderOptions, BrandLoader as default };
