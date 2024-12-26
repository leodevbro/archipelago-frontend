import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <div onClick={() => setCount((prev) => prev + 1)}>{count}</div>

    <p>{reactLogo}</p>
    <p>reactLogo</p>

    <br />
    <br />

    <p>viteLogo</p>
    <p>{viteLogo}</p>

    </div>
  )
}

export default App
