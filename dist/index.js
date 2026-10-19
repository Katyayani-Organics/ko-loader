import {
  DEFAULT_MESSAGE,
  LETTERS,
  ariaLabel,
  css_generated_default,
  rootClass
} from "./chunk-AEZDTUKU.js";

// src/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var word = (letters) => letters.map((l) => /* @__PURE__ */ jsx("span", { className: `ko-loader__l ko-loader__${l.part}`, style: { animationDelay: `${l.delay}ms` }, children: l.ch }, l.delay));
function BrandLoader({ message = DEFAULT_MESSAGE, className, style, ...opts }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "status",
      "aria-live": "polite",
      "aria-label": ariaLabel(message),
      className: className ? `${rootClass(opts)} ${className}` : rootClass(opts),
      style,
      children: [
        /* @__PURE__ */ jsx("style", { children: css_generated_default }),
        /* @__PURE__ */ jsxs("div", { className: "ko-loader__inner", children: [
          /* @__PURE__ */ jsxs("p", { "aria-hidden": true, className: "ko-loader__word", children: [
            word(LETTERS.brand),
            /* @__PURE__ */ jsx("span", { className: "ko-loader__gap" }),
            word(LETTERS.sub)
          ] }),
          /* @__PURE__ */ jsx("div", { "aria-hidden": true, className: "ko-loader__track", children: /* @__PURE__ */ jsx("span", { className: "ko-loader__fill" }) }),
          message && /* @__PURE__ */ jsx("p", { className: "ko-loader__msg", children: message })
        ] })
      ]
    }
  );
}
var src_default = BrandLoader;
export {
  BrandLoader,
  src_default as default
};
