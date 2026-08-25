import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login/login'
import Register from './pages/Register/register'
import Home from './pages/Home/Home'
import ExercisesList from './pages/Exercises/exercisesList'
import Template from './pages/Template/template';
import TemplateCreate from './pages/Template/components/templateCreate'
import TemplateDetails from './pages/Template/components/templateDetails/templateDetails'

function App() {

  return (
    <>
     <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/template" element={<Template />} />
          <Route path="/template/create" element={<TemplateCreate />} />
          <Route path="/template/:id" element={<TemplateDetails />} />
          <Route path='/exercises/:id' element={<ExercisesList />}></Route>
        </Routes>
      </AuthProvider>
     </BrowserRouter>
    </>
  )
}

export default App
