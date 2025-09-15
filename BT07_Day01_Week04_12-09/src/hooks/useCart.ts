import { useState } from 'react';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  meta?: Record<string, any>;
};

export function useCart(initial: CartItem[] = []) {
  const [items, setItems] = useState<CartItem[]>(initial);

  function addItem(item: Omit<CartItem,'quantity'> & { quantity?: number }) {
    setItems(prev => {
      const found = prev.find(i => i.id === item.id);
      if (found) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + (item.quantity ?? 1) } : i);
      }
      return [...prev, { ...item, quantity: item.quantity ?? 1 }];
    });
  }

  function removeItem(id: string) {
    setItems(prev => prev.filter(i => i.id !== id));
  }

  function updateQuantity(id: string, quantity: number) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i));
  }

  function clear() {
    setItems([]);
  }

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return { items, addItem, removeItem, updateQuantity, clear, total };
}