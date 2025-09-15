import React from 'react';

export default function Card({ children }: { children: React.ReactNode }) {
  return <div style={{ padding: 12, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', background: 'white' }}>{children}</div>;
}