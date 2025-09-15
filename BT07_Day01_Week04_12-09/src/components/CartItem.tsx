import React from 'react';
import { CartItem } from '../hooks/useCart';
import Button from './Button';
import Input from './Input';

export default function CartItemRow({ item, onRemove, onUpdate }: { item: CartItem; onRemove: (id:string)=>void; onUpdate: (id:string, qty:number)=>void }) {
  return (
    <div style={{ display:'flex', gap:12, alignItems:'center', padding:8, borderBottom:'1px solid #eee' }}>
      <div style={{ flex:1 }}>{item.name}</div>
      <div>{item.price.toLocaleString()}</div>
      <div>
        <Input value={String(item.quantity)} onChange={e => onUpdate(item.id, Number(e.target.value || 0))} />
      </div>
      <div>
        <Button onClick={() => onRemove(item.id)} variant="ghost">Remove</Button>
      </div>
    </div>
  );
}