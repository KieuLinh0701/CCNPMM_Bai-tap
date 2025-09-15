import { Button } from '@linhkieu_0701/cart-ui'
import { useState } from 'react'

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Test gói npm của tôi</h1>
      <Button onClick={() => alert('Bạn đã click!')}>
        Nhấn vào tôi
      </Button>
    </div>
  )
}

export default App