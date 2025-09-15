// src/hooks/useCart.ts
import { useState } from "react";
function useCart(initial = []) {
  const [items, setItems] = useState(initial);
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
import { jsx } from "react/jsx-runtime";
function Button({ children, variant = "primary", ...rest }) {
  const base = {
    padding: "8px 12px",
    borderRadius: 6,
    border: "none",
    cursor: "pointer"
  };
  const styles = variant === "primary" ? { ...base, background: "#0b74ff", color: "white" } : { ...base, background: "transparent" };
  return /* @__PURE__ */ jsx("button", { style: styles, ...rest, children });
}

// src/components/Input.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function Input(props) {
  return /* @__PURE__ */ jsx2("input", { style: { padding: 8, borderRadius: 6, border: "1px solid #ddd" }, ...props });
}

// src/components/Modal.tsx
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
function Modal({ open, onClose, children }) {
  if (!open) return null;
  return /* @__PURE__ */ jsx3("div", { style: { position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.35)" }, children: /* @__PURE__ */ jsxs("div", { style: { width: 400, background: "white", padding: 16, borderRadius: 8 }, children: [
    children,
    /* @__PURE__ */ jsx3("div", { style: { textAlign: "right", marginTop: 12 }, children: /* @__PURE__ */ jsx3("button", { onClick: onClose, children: "Close" }) })
  ] }) });
}

// src/components/Card.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Card({ children }) {
  return /* @__PURE__ */ jsx4("div", { style: { padding: 12, borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", background: "white" }, children });
}

// src/components/CartItem.tsx
import { jsx as jsx5, jsxs as jsxs2 } from "react/jsx-runtime";
function CartItemRow({ item, onRemove, onUpdate }) {
  return /* @__PURE__ */ jsxs2("div", { style: { display: "flex", gap: 12, alignItems: "center", padding: 8, borderBottom: "1px solid #eee" }, children: [
    /* @__PURE__ */ jsx5("div", { style: { flex: 1 }, children: item.name }),
    /* @__PURE__ */ jsx5("div", { children: item.price.toLocaleString() }),
    /* @__PURE__ */ jsx5("div", { children: /* @__PURE__ */ jsx5(Input, { value: String(item.quantity), onChange: (e) => onUpdate(item.id, Number(e.target.value || 0)) }) }),
    /* @__PURE__ */ jsx5("div", { children: /* @__PURE__ */ jsx5(Button, { onClick: () => onRemove(item.id), variant: "ghost", children: "Remove" }) })
  ] });
}

// src/components/Cart.tsx
import { jsx as jsx6, jsxs as jsxs3 } from "react/jsx-runtime";
function CartUI({ items, onRemove, onUpdate, onClear }) {
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  return /* @__PURE__ */ jsxs3(Card, { children: [
    /* @__PURE__ */ jsx6("h3", { children: "Gi\u1ECF h\xE0ng" }),
    items.length === 0 ? /* @__PURE__ */ jsx6("div", { children: "Kh\xF4ng c\xF3 s\u1EA3n ph\u1EA9m" }) : items.map((i) => /* @__PURE__ */ jsx6(CartItemRow, { item: i, onRemove, onUpdate }, i.id)),
    /* @__PURE__ */ jsxs3("div", { style: { marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
      /* @__PURE__ */ jsxs3("div", { children: [
        "T\u1ED5ng: ",
        total.toLocaleString()
      ] }),
      /* @__PURE__ */ jsxs3("div", { children: [
        /* @__PURE__ */ jsx6(Button, { onClick: onClear, variant: "ghost", children: "X\xF3a t\u1EA5t c\u1EA3" }),
        /* @__PURE__ */ jsx6(Button, { style: { marginLeft: 8 }, children: "Thanh to\xE1n" })
      ] })
    ] })
  ] });
}
export {
  Button,
  Card,
  CartUI as Cart,
  Input,
  Modal,
  useCart
};
//# sourceMappingURL=index.mjs.map