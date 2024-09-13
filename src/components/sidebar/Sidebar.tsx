import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { House, LogOut, ShoppingCart, UserPen } from "lucide-react";
import { Button } from "../ui/button";

export default function Sidebar() {
  return (
    <div className="flex min-h-screen w-1/4">
      <aside className="fixed inset-y-0 left-0 flex h-full w-full flex-col border-r sm:w-60">
        <div className="flex items-center justify-between border-b px-4 py-4 sm:px-6">
          <img
            src="https://i.ibb.co/R2KQDDk/name-logo-dark-recortada.png"
            alt="name-logo-dark-recortada"
            className="w-32 m-3"
          />
        </div>
        <nav className="flex flex-1 flex-col gap-2 overflow-auto px-4 py-4 sm:px-6">
          <Link
            to="#"
            className="flex items-center gap-3 rounded-md bg-accent px-3 py-2 text-accent-foreground transition-colors hover:bg-accent/90"
          >
            <House />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
          <Link
            to="#"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors duration-300 hover:bg-accent hover:text-accent-foreground"
          >
            <ShoppingCart />
            <span className="text-sm font-medium">Vendas</span>
          </Link>
          <Link
            to="#"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors duration-300 hover:bg-accent hover:text-accent-foreground"
          >
            <UserPen />
            <span className="text-sm font-medium">Perfil</span>
          </Link>
        </nav>
        <div className="my-5 mx-6 flex gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold text-md text-white">
              Nome do Usuario
            </h4>
            <span className="text-muted-foreground text-gray-500">
              email@email.com
            </span>
          </div>
        </div>
        <div className="mb-4 mx-6 flex gap-3 text-white">
          <Button
            variant="outline"
            className="flex items-center justify-center gap-4 text-black border-black hover:bg-transparent hover:border-white hover:text-white transition-all duration-300 ease-in-out"
          >
            <LogOut className="transition-colors duration-300 ease-in-out" />
            <span className="transition-opacity duration-300 ease-in-out group-hover:opacity-0">
              Sair
            </span>
          </Button>
        </div>
      </aside>
      <div />
    </div>
  );
}
