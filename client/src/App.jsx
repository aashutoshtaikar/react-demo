import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserComponent from './Components/UserComponent/UserComponent'

function App() {
  const [count, setCount] = useState(0)

  



  return (
    <>
      <h1>This is a test</h1>
      <UserComponent userId={6} />
    </>
  )
}

export default App
