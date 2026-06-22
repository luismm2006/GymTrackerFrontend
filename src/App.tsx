import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login/login'
import Register from './pages/Register/register'

function App() {

  return (
    <>
     <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
     </BrowserRouter>
    </>
  )
}

export default App
