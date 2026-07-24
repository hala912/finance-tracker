
import { Login } from '../Pages/LoginPage/LoginPage'
import { Routes ,Route } from 'react-router-dom'
import { Signup } from '../Pages/SignupPage/SignupPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
    </Routes>
  )
}