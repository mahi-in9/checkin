import Signup from './pages/Signup'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>

    </>
  )
}

export default App
