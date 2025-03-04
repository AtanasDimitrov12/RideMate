import { useState } from 'react'
import Example from './components/Example'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Example/>
    </>
  )
}

export default App
