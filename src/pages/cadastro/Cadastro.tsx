import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/contexts/AuthContext";
import Usuario from "@/models/Usuario";
import { InfinitySpin } from "react-loader-spinner";
import { toastAlert } from "@/utils/toastAlert";
import { cadastrarUsuario } from "@/services/Services";
import { Eye, EyeOff } from "lucide-react";

export default function Cadastro() {
  let navigate = useNavigate();

  const { isLoading } = useContext(AuthContext);
  const [confirmaSenha, setConfirmaSenha] = useState<string>("");

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "https://i.pinimg.com/originals/e5/df/45/e5df457e8de5d0aae37691c00e8a672e.jpg",
    cargo: {
      id: 2,
      nome: "VENDEDOR",
    },
  });

  const [usuarioResposta, setUsuarioResposta] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "https://i.pinimg.com/originals/e5/df/45/e5df457e8de5d0aae37691c00e8a672e.jpg",
    cargo: {
      id: 2,
      nome: "VENDEDOR",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (usuarioResposta.id !== 0) {
      back();
    }
  }, [usuarioResposta]);

  function back() {
    navigate("/login");
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  }

  function atualizarConfirmaSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmaSenha(e.target.value);
  }

  async function cadastrarNovoUsuario(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmaSenha === usuario.senha && usuario.senha.length >= 8) {
      try {
        await cadastrarUsuario(
          `/usuarios/cadastrar`,
          usuario,
          setUsuarioResposta
        );
        toastAlert("Usuário cadastrado com sucesso", "sucesso");
        navigate("/login");
      } catch (error) {
        toastAlert("Erro ao cadastrar o Usuário", "erro");
      }
    } else {
      toastAlert(
        "Dados inconsistentes. Verifique as informações de cadastro.",
        "erro"
      );
      setUsuario({ ...usuario, senha: "" });
      setConfirmaSenha("");
    }
  }

  return (
    <div className="grid w-full min-h-screen lg:grid-cols-2 text-white">
      {/* Imagem - visível apenas em telas grandes */}
      <div className="hidden lg:block">
        <img
          src="https://assets-blog.pagseguro.uol.com.br/wp-content/2022/08/processo-de-vendas-min-1980x1320.jpg"
          alt="Cadastro Illustration"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Formulário de cadastro */}
      <div className="flex items-center justify-center px-4 py-8 lg:py-12">
        <div className="w-full max-w-[350px] xl:max-w-[450px] space-y-6 xl:space-y-10">
          <div className="space-y-2 text-left">
            <img
              src="https://i.ibb.co/R2KQDDk/name-logo-dark-recortada.png"
              alt="name-logo-dark-recortada"
              className="rounded-sm w-36 xl:w-40"
            />
            <h1 className="text-3xl font-bold md:mb-5">Crie sua conta</h1>
            <p className="text-sm text-gray-300 lg:text-base xl:text-lg">
              Atenção as informações abaixo, elas são importantes para o seu
              cadastro.
            </p>
          </div>

          {/* Campos de entrada */}
          <form onSubmit={cadastrarNovoUsuario} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome completo</Label>
              <Input
                id="nome"
                name="nome"
                type="text"
                placeholder="Seu nome completo"
                required
                value={usuario.nome}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="usuario">E-mail</Label>
              <Input
                id="usuario"
                name="usuario"
                type="email"
                placeholder="exemplo@email.com"
                required
                value={usuario.usuario}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="senha">Senha</Label>
              </div>
              <div className="relative">
                <Input
                  id="senha"
                  name="senha"
                  type={showPassword ? "text" : "password"}
                  placeholder="Crie uma senha"
                  required
                  value={usuario.senha}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                  className="pr-10"
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

            <div className="space-y-2">
              <Label htmlFor="confirmaSenha">Confirmar senha</Label>
              <Input
                id="confirmaSenha"
                name="confirmaSenha"
                type={showPassword ? "text" : "password"}
                placeholder="Confirme sua senha"
                required
                value={confirmaSenha}
                onChange={atualizarConfirmaSenha}
                className="pr-10"
              />
            </div>

            <Button type="submit" className="w-full hover:bg-gray-600">
              {isLoading ? (
                <InfinitySpin width="40" color="#ffffff" />
              ) : (
                <span>Cadastrar</span>
              )}
            </Button>
          </form>

          {/* Link de login */}
          <div className="mt-4 text-center text-xs lg:text-sm">
            Já tem uma conta?{" "}
            <Link to="/login" className="underline">
              Entrar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
