import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';

type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    meta?: Record<string, any>;
};
declare function useCart(initial?: CartItem[]): {
    items: CartItem[];
    addItem: (item: Omit<CartItem, "quantity"> & {
        quantity?: number;
    }) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clear: () => void;
    total: number;
};

type Props$1 = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'ghost';
};
declare function Button({ children, variant, ...rest }: Props$1): react_jsx_runtime.JSX.Element;

declare function Input(props: React.InputHTMLAttributes<HTMLInputElement>): react_jsx_runtime.JSX.Element;

declare function Modal({ open, onClose, children }: {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}): react_jsx_runtime.JSX.Element | null;

declare function Card({ children }: {
    children: React.ReactNode;
}): react_jsx_runtime.JSX.Element;

type Props = {
    items: CartItem[];
    onRemove: (id: string) => void;
    onUpdate: (id: string, qty: number) => void;
    onClear?: () => void;
};
declare function CartUI({ items, onRemove, onUpdate, onClear }: Props): react_jsx_runtime.JSX.Element;

export { Button, Card, CartUI as Cart, type CartItem, Input, Modal, useCart };
