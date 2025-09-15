import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' };

export default function Button({ children, variant='primary', ...rest }: Props) {
  const base = {
    padding: '8px 12px',
    borderRadius: 6,
    border: 'none',
    cursor: 'pointer'
  };
  const styles = variant === 'primary' ? { ...base, background: '#0b74ff', color: 'white' } : { ...base, background: 'transparent' };
  return <button style={styles} {...rest}>{children}</button>;
}