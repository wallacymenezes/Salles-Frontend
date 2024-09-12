import Cargo from "./Cargo";
import { Venda } from "./Venda";


export default interface Usuario {
    id: number;
    nome: string;
    usuario: string;
    cargo: Cargo;
    foto: string;
    senha: string;
    venda?: Venda | null;
}