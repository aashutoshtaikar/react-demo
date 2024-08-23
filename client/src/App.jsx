import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UsersList from './Components/UsersList/UsersList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>This is a test</h1>
      <UsersList />
    </>
  )
}

export default App
