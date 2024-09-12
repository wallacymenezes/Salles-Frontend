import { createContext, ReactNode, useEffect, useState } from "react";
import UsuarioLogin from "../models/UsuarioLogin";
import { login } from "../services/Services";
import { toastAlert } from "@/utils/toastAlert";

interface AuthContextProps {
  usuario: UsuarioLogin;
  authenticated: boolean;
  handleLogout(): void;
  handleLogin(usuario: UsuarioLogin): Promise<void>;
  isLoading: boolean;
  atualizarUsuario: (nome: string, usuario: string, foto: string, senha: string) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<UsuarioLogin>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    token: "",
    cargo: {
      id: 2,
      nome: "VENDEDOR"
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const authenticated = !!usuario.token;

  
  useEffect(() => {
    // Recupera o token do localStorage e configura o estado do usuário
    const token = localStorage.getItem('authToken');
    if (token) {
      setUsuario((prevUsuario) => ({
        ...prevUsuario,
        token: JSON.parse(token)
      }));
    }
  }, []);

  async function handleLogin(userLogin: UsuarioLogin) {
    setIsLoading(true);
    try {
      await login(`/usuarios/logar`, userLogin, setUsuario);
      localStorage.setItem('authToken', JSON.stringify(usuario.token));
      toastAlert("Usuário logado com sucesso", "sucesso");
    } catch (error) {
      console.error(error);
      toastAlert("Dados do usuário inconsistentes", "erro");
    } finally {
      setIsLoading(false);
    }
  }

  function handleLogout() {
    setUsuario({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: "",
        cargo: {
          id: 2,
          nome: "VENDEDOR"
        }
    });
    localStorage.removeItem('authToken');
  }

  function atualizarUsuario(nome: string, usuario: string, foto: string, senha: string) {
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      nome: nome,
      usuario: usuario,
      foto: foto,
      senha: senha
    }));
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        authenticated,
        handleLogin,
        handleLogout,
        isLoading,
        atualizarUsuario,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
