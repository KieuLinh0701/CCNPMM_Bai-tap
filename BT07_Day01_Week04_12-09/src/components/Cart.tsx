import React from 'react';
import { CartItem } from '../hooks/useCart';
import CartItemRow from './CartItem';
import Button from './Button';
import Card from './Card';

type Props = {
  items: CartItem[];
  onRemove: (id:string)=>void;
  onUpdate: (id:string, qty:number)=>void;
  onClear?: ()=>void;
};

export default function CartUI({ items, onRemove, onUpdate, onClear }: Props) {
  const total = items.reduce((s,i)=>s + i.price * i.quantity, 0);
  return (
    <Card>
      <h3>Giỏ hàng</h3>
      {items.length === 0 ? <div>Không có sản phẩm</div> : items.map(i => (
        <CartItemRow key={i.id} item={i} onRemove={onRemove} onUpdate={onUpdate} />
      ))}
      <div style={{ marginTop: 12, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>Tổng: {total.toLocaleString()}</div>
        <div>
          <Button onClick={onClear} variant="ghost">Xóa tất cả</Button>
          <Button style={{ marginLeft:8 }}>Thanh toán</Button>
        </div>
      </div>
    </Card>
  );
}