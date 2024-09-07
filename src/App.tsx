import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import { AuthProvider } from './contexts/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Cadastro from './pages/cadastro/Cadastro'

export default function App() {

  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <div className='bg-black'>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}
