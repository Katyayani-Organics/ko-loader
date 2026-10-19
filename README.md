# @katyayani/loader

The Katyayani Organics loading screen: the "Katyayani Organics" wordmark with a gentle letter wave and
a thin sliding bar. Use it for **every** full-page, route, sign-in and section load, in every project,
so all our apps feel like one product.

- **React** (Vite or Next.js): `<BrandLoader />`. Same props as the Content OS one, so it's a drop-in.
- **Any page, any framework**: the `<ko-loader>` tag, or `showBrandLoader("Saving…")` from plain JS.
- **No Tailwind, no shadcn, no fonts required.** It brings its own CSS and the brand green, so it looks
  the same in a blue-themed app (Finance 360) as in a green one (Content OS).
- Light and dark mode, respects "reduce motion", screen-reader friendly (`role="status"`).
- No runtime dependencies. About 2 KB gzipped.

## Install

From the org repo (recommended; pin a version tag):

```bash
npm install github:Katyayani-Organics/ko-loader#v1.0.0
```

Or from the packed file, if someone shared `katyayani-loader-1.0.0.tgz` with you:

```bash
npm install ./katyayani-loader-1.0.0.tgz
```

## React

```tsx
import { BrandLoader } from "@katyayani/loader";

// Route / lazy-page fallback
<Suspense fallback={<BrandLoader fullScreen />}>…</Suspense>

// Auth gate
if (loading) return <BrandLoader fullScreen message="Signing you in…" />;

// A section or tab
if (isLoading) return <BrandLoader message="Loading orders…" />;

// Inside a card or panel
<BrandLoader size="sm" message="Loading calendar…" />

// Cover the whole page while something saves
{saving && <BrandLoader overlay message="Saving…" />}
```

### Next.js (App Router)

`BrandLoader` has no hooks, so it works as a server component. Put it in `loading.tsx`:

```tsx
// app/loading.tsx
import { BrandLoader } from "@katyayani/loader";
export default function Loading() {
  return <BrandLoader fullScreen />;
}
```

### Props

| Prop         | Type                          | Default      | What it does                                                    |
| ------------ | ----------------------------- | ------------ | --------------------------------------------------------------- |
| `message`    | `string`                      | `"Loading…"` | Text under the wordmark. `""` hides it.                         |
| `fullScreen` | `boolean`                     | `false`      | Fills the viewport height and paints the page background.       |
| `overlay`    | `boolean`                     | `false`      | Fixed on top of everything (for saves, uploads, redirects).     |
| `size`       | `"sm" \| "md"`                | `"md"`       | `sm` for cards and panels.                                      |
| `tone`       | `"auto" \| "light" \| "dark"` | `"auto"`     | `auto` goes dark inside a `.dark` or `[data-theme="dark"]` parent. |
| `className`  | `string`                      |              | Extra classes, e.g. `"py-16"` to change the padding.            |
| `style`      | `CSSProperties`               |              | Inline styles.                                                  |

## Without React

**In a bundled app** (Vue, plain TS, etc.):

```ts
import "@katyayani/loader/element"; // registers <ko-loader>
import { showBrandLoader } from "@katyayani/loader/element";

const hide = showBrandLoader("Saving…");
await save();
hide();
```

**In a plain HTML site**: copy `node_modules/@katyayani/loader/dist/ko-loader.global.js` into the
site's `public/` folder, then:

```html
<script src="/ko-loader.global.js"></script>

<ko-loader fullscreen message="Loading…"></ko-loader>
<ko-loader size="sm" message="Loading products…"></ko-loader>

<script>
  const hide = KoLoader.showBrandLoader("Placing your order…");
</script>
```

Attributes match the React props: `message`, `size`, `tone`, `fullscreen`, `overlay`. Change an
attribute and it updates in place. `loaderHTML(options)` returns the same markup as a string, for
server templates (include `dist/styles.css` on the page in that case).

## Theming

It uses the brand green out of the box. To change it for one app or one spot, set CSS variables on
any parent (or `:root`):

```css
:root {
  --ko-loader-color: hsl(142 64% 24%);   /* wordmark + bar */
  --ko-loader-muted: hsl(220 10% 45%);   /* message text */
  --ko-loader-bg: hsl(150 10% 97%);      /* fullScreen / overlay background */
  --ko-loader-color-dark: hsl(142 64% 45%);
  --ko-loader-muted-dark: hsl(220 10% 60%);
  --ko-loader-bg-dark: hsl(220 25% 6%);
  --ko-loader-z: 1000;                    /* overlay stacking */
}
```

**Font:** the wordmark is set in Poppins and falls back to the system font. Most of our apps already
load Poppins. If yours doesn't, add it to `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet" />
```

## Moving an app that has its own copy (e.g. Content OS)

1. `npm install github:Katyayani-Organics/ko-loader#v1.0.0`
2. Replace `import { BrandLoader } from "@/components/BrandLoader";` with
   `import { BrandLoader } from "@katyayani/loader";` everywhere.
3. Delete `src/components/BrandLoader.tsx`.

The props are the same. One small difference: inline (non-full-screen) loaders are now transparent,
so they sit on the card or panel colour instead of painting the page background.

## Tell your AI coding assistant

Add this to the project's `CLAUDE.md` / `AGENTS.md` so generated code uses it too:

```md
- Loading states: always use `BrandLoader` from `@katyayani/loader` (`fullScreen` for routes and
  auth, `size="sm"` inside cards, `overlay` while saving). No custom spinners.
```

## Changing the loader

The look lives in one file: `src/styles.css`. The markup is in `src/core.ts` (letters),
`src/index.tsx` (React) and `src/element.ts` (web component).

```bash
npm install
npm test          # 7 tests: React markup + the web component
npm run build     # writes dist/ (commit it; git installs use it as-is)
npm run demo      # http://localhost:4790/demo/ shows every variant, light and dark
```

Then bump `version` in `package.json`, commit, tag (`git tag v1.1.0`) and push the tag. Apps update by
changing the `#v1.x.x` in their install line.
