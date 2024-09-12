import Cargo from "./Cargo";

export default interface UsuarioLogin {
    id: number;
    nome: string;
    usuario: string;
    cargo: Cargo;
    foto: string;
    senha: string;
    token: string;
}