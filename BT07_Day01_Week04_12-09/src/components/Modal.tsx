import React from 'react';

export default function Modal({ open, onClose, children }: { open: boolean; onClose: ()=>void; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div style={{ position:'fixed', inset:0, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,0.35)' }}>
      <div style={{ width: 400, background:'white', padding:16, borderRadius:8 }}>
        {children}
        <div style={{ textAlign:'right', marginTop:12 }}>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}