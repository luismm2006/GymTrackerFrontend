import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login/login'
import Register from './pages/Register/register'
import Home from './pages/Home/Home'
import RoutinesCreate from './pages/Routines/components/routinesCreate'
import Routines from './pages/Routines/routines'
import RoutineDetails from './pages/Routines/components/routinesDetails';
import ExercisesList from './pages/Exercises/exercisesList'

function App() {

  return (
    <>
     <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/routines" element={<Routines />} />
          <Route path="/routines/create" element={<RoutinesCreate />} />
          <Route path="/routines/:id" element={<RoutineDetails />} />
          <Route path='/exercises/:id' element={<ExercisesList />}></Route>
        </Routes>
      </AuthProvider>
     </BrowserRouter>
    </>
  )
}

export default App
