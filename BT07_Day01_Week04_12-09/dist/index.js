"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Button: () => Button,
  Card: () => Card,
  Cart: () => CartUI,
  Input: () => Input,
  Modal: () => Modal,
  useCart: () => useCart
});
module.exports = __toCommonJS(index_exports);

// src/hooks/useCart.ts
var import_react = require("react");
function useCart(initial = []) {
  const [items, setItems] = (0, import_react.useState)(initial);
  function addItem(item) {
    setItems((prev) => {
      const found = prev.find((i) => i.id === item.id);
      if (found) {
        return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + (item.quantity ?? 1) } : i);
      }
      return [...prev, { ...item, quantity: item.quantity ?? 1 }];
    });
  }
  function removeItem(id) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }
  function updateQuantity(id, quantity) {
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, quantity } : i));
  }
  function clear() {
    setItems([]);
  }
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  return { items, addItem, removeItem, updateQuantity, clear, total };
}

// src/components/Button.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function Button({ children, variant = "primary", ...rest }) {
  const base = {
    padding: "8px 12px",
    borderRadius: 6,
    border: "none",
    cursor: "pointer"
  };
  const styles = variant === "primary" ? { ...base, background: "#0b74ff", color: "white" } : { ...base, background: "transparent" };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: styles, ...rest, children });
}

// src/components/Input.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function Input(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { style: { padding: 8, borderRadius: 6, border: "1px solid #ddd" }, ...props });
}

// src/components/Modal.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
function Modal({ open, onClose, children }) {
  if (!open) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { style: { position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.35)" }, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { style: { width: 400, background: "white", padding: 16, borderRadius: 8 }, children: [
    children,
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { style: { textAlign: "right", marginTop: 12 }, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { onClick: onClose, children: "Close" }) })
  ] }) });
}

// src/components/Card.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
function Card({ children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { style: { padding: 12, borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", background: "white" }, children });
}

// src/components/CartItem.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
function CartItemRow({ item, onRemove, onUpdate }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "flex", gap: 12, alignItems: "center", padding: 8, borderBottom: "1px solid #eee" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { flex: 1 }, children: item.name }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { children: item.price.toLocaleString() }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Input, { value: String(item.quantity), onChange: (e) => onUpdate(item.id, Number(e.target.value || 0)) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Button, { onClick: () => onRemove(item.id), variant: "ghost", children: "Remove" }) })
  ] });
}

// src/components/Cart.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
function CartUI({ items, onRemove, onUpdate, onClear }) {
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(Card, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h3", { children: "Gi\u1ECF h\xE0ng" }),
    items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { children: "Kh\xF4ng c\xF3 s\u1EA3n ph\u1EA9m" }) : items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(CartItemRow, { item: i, onRemove, onUpdate }, i.id)),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { style: { marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { children: [
        "T\u1ED5ng: ",
        total.toLocaleString()
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Button, { onClick: onClear, variant: "ghost", children: "X\xF3a t\u1EA5t c\u1EA3" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Button, { style: { marginLeft: 8 }, children: "Thanh to\xE1n" })
      ] })
    ] })
  ] });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Button,
  Card,
  Cart,
  Input,
  Modal,
  useCart
});
//# sourceMappingURL=index.js.map