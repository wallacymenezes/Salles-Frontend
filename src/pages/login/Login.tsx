import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { AuthContext } from "@/contexts/AuthContext";
import UsuarioLogin from "@/models/UsuarioLogin";
import { InfinitySpin } from "react-loader-spinner";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  let navigate = useNavigate();

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
        {} as UsuarioLogin
    );

    const { usuario, handleLogin } = useContext(AuthContext);
    const { isLoading } = useContext(AuthContext);

    useEffect(() => {
        if (usuario.token !== "") {
            navigate("/home");
        }
    }, [usuario, navigate]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value,
        });
    }

    function login(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        handleLogin(usuarioLogin);
    }
    
  return (
    <div className="grid w-full min-h-screen lg:grid-cols-2 text-white">
      {/* Imagem - visível apenas em telas grandes */}
      <div className="hidden lg:block">
        <img
          src="https://assets-blog.pagseguro.uol.com.br/wp-content/2022/08/processo-de-vendas-min-1980x1320.jpg"
          alt="Login Illustration"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
          style={{ aspectRatio: "1920/1080", objectFit: "cover" }}
        />
      </div>

      {/* Formulário - Responsivo */}
      <div className="flex items-center justify-center px-4 py-8 lg:py-12">
        <div className="w-full max-w-[350px] xl:max-w-[450px] space-y-6 xl:space-y-10">
          <div className="space-y-2 text-left">
            <img src="https://i.ibb.co/R2KQDDk/name-logo-dark-recortada.png" alt="name-logo-dark-recortada" className="rounded-sm w-36 xl:w-40" />
            <h1 className="text-3xl font-bold md:mb-5">Que bom ver você aqui de novo</h1>
            <p className="text-sm text-gray-300 lg:text-base xl:text-lg">
              Entre com seu e-mail e senha para acessar sua conta.
            </p>
          </div>

          {/* Campos de entrada */}
          <form action="" onSubmit={login} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input 
                    id="email" 
                    type="email" 
                    value={usuarioLogin.usuario}
                    name="usuario" 
                    placeholder="exemplo@email.com" 
                    required 
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        atualizarEstado(e)
                    }/>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="password">Senha</Label>
                <Link to="#" className="ml-auto text-xs underline lg:text-sm">
                  Esqueceu sua senha?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="senha"
                  type={showPassword ? "text" : "password"}
                  placeholder="Senha"
                  name="senha"
                  required
                  value={usuarioLogin.senha}
                  className="pr-10"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    atualizarEstado(e)
                  }
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full hover:bg-gray-600">
                {isLoading ? (
                    <InfinitySpin
                      width="40"
                      color="#ffffff"
                    />
                ) : (
                    <span>Entrar</span>
                )}
            </Button>
          </form>

          {/* Link de cadastro */}
          <div className="mt-4 text-center text-xs lg:text-sm">
            Não tem uma conta?{" "}
            <Link to="/cadastro" className="underline">
              Cadastre-se
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
