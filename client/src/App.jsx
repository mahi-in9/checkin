import Signup from './pages/Signup'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import DashboardLayout from './components/layouts/DashboardLayout'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home'
import Attendance from './pages/Attendance'

function App() {

  return (
    <>
      <Routes>
        <Route element={<DashboardLayout />}>

          <Route path="/" element={<Home />} />

          <Route path='/dashboard' element={
            <Dashboard />
          } />
          <Route path='/admin-dashboard' element={
            <Attendance />
          } />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Route>
      </Routes>

    </>
  )
}

export default App
