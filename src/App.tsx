import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import { AuthProvider } from './contexts/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Cadastro from './pages/cadastro/Cadastro'
import ResetSenha from './pages/resetSenha/ResetSenha'
import InputOTP from './pages/resetSenha/InputOTP'
import { EmailProvider } from './contexts/EmailContext'
import RedefinirSenha from './pages/resetSenha/RedefinirSenha'
import Vendas from './pages/vendas/Vendas'
import FormVenda from './pages/formVenda/FormVenda'

export default function App() {

  return (
    <>
      <AuthProvider>
        <EmailProvider>
          <ToastContainer />
          <BrowserRouter>
            <div className='bg-black'>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/forgot-password" element={<ResetSenha />} />
                <Route path="/input-otp" element={<InputOTP />} />
                <Route path="/new-password" element={<RedefinirSenha />} />
                <Route path="/home" element={<Home />} />
                <Route path="/vendas" element={<Vendas />} />
                <Route path="/cadastrar" element={<FormVenda />} />
              </Routes>
            </div>
          </BrowserRouter>
        </EmailProvider>
      </AuthProvider>
    </>
  )
}
