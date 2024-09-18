import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Importe o useLocation
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  ChevronDown,
  ChevronFirst,
  ChevronLast,
  House,
  LogOut,
  ShoppingCart,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthContext } from "@/contexts/AuthContext";

export default function Sidebar() {
  let navigate = useNavigate();
  const [isMinimized, setIsMinimized] = useState(false); // Estado para controlar minimização
  const { usuario, handleLogout } = useContext(AuthContext);
  const location = useLocation(); // Usado para pegar a rota atual

  // Função para determinar se o link está ativo
  const isActive = (path: string) => location.pathname === path;

  function deslogar() {
    handleLogout();
    navigate("/login");
  }

  return (
    <div
      className={`flex min-h-screen transition-all ${
        isMinimized ? "w-20" : "md:w-1/5 lg:w-1/4 xl:w-1/6 2xl:w-1/5"
      }`}
    >
      <aside
        className={`fixed inset-y-0 left-0 flex h-full flex-col border-r transition-all ${
          isMinimized ? "w-20" : "md:w-1/5 lg:w-1/4 xl:w-1/6 2xl:w-1/5"
        }`}
      >
        {/* Logo ou minimizada */}
        <div className="flex items-center justify-between border-b px-4 py-4 sm:px-6">
          {!isMinimized && (
            <img
              src="https://i.ibb.co/R2KQDDk/name-logo-dark-recortada.png"
              alt="name-logo-dark-recortada"
              className="w-32 my-3"
            />
          )}
          {/* Botão para alternar entre minimizado e expandido */}
          <button
            className="p-2 bg-gray-200 transition-all rounded-md"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? (
              <ChevronLast size={20} />
            ) : (
              <ChevronFirst size={20} />
            )}
          </button>
        </div>

        {/* Links de navegação */}
        <nav className="flex flex-1 flex-col gap-2 overflow-auto px-4 py-4 sm:px-6">
          <Link
            to="/home"
            className={`flex items-center gap-3 rounded-md transition-colors ${
              isActive("/home")
                ? `bg-accent text-accent-foreground hover:bg-accent/90`
                : `text-muted-foreground hover:bg-accent hover:text-accent-foreground`
            } ${isMinimized ? "p-1" : "px-3 py-2"}`}
          >
            <House className={`${isMinimized ? "w-6 h-6" : "w-5 h-5"}`} />
            {!isMinimized && (
              <span className="text-sm font-medium">Dashboard</span>
            )}
          </Link>

          <Link
            to="/vendas"
            className={`flex items-center gap-3 rounded-md transition-colors ${
              isActive("/vendas")
                ? `bg-accent text-accent-foreground hover:bg-accent/90`
                : `text-muted-foreground hover:bg-accent hover:text-accent-foreground`
            } ${isMinimized ? "p-1" : "px-3 py-2"}`}
          >
            <ShoppingCart
              className={`${isMinimized ? "w-6 h-6" : "w-5 h-5"}`}
            />
            {!isMinimized && (
              <span className="text-sm font-medium">Vendas</span>
            )}
          </Link>
        </nav>

        {/* Menu de usuário */}
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="my-10 mx-5 flex gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={usuario.foto} alt={usuario.nome} />
                  <AvatarFallback>NM</AvatarFallback>
                </Avatar>
                {!isMinimized && (
                  <div className="leading-5">
                    <h4 className="font-semibold text-md text-white">
                      {usuario.nome}
                    </h4>
                    <span className="text-muted-foreground text-gray-500 text-">
                      {usuario.usuario}
                    </span>
                  </div>
                )}
                {!isMinimized && (
                  <span className="text-white">
                    <ChevronDown />
                  </span>
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mb-4 dark">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Perfil</DropdownMenuItem>
                <DropdownMenuItem>Configurações</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Botão de logout */}
        <div
          className={`mb-4 mx-6 flex ${
            isMinimized ? "justify-center" : "gap-3"
          } text-white flex-col items-center`}
        >
          <Button
            variant="outline"
            className={`flex items-center justify-center text-black ${
              isMinimized ? "w-10 h-10 p-2" : "gap-4 border-black"
            } hover:bg-transparent hover:border-white hover:text-white transition-all duration-300 ease-in-out`}
            onClick={() => deslogar()}
          >
            <LogOut
              className={`${
                isMinimized ? "w-5 h-5" : ""
              } transition-colors duration-300 ease-in-out`}
              size={16}
            />
            {!isMinimized && (
              <span className="transition-opacity duration-300 ease-in-out group-hover:opacity-0">
                Sair
              </span>
            )}
          </Button>
        </div>
      </aside>
    </div>
  );
}
