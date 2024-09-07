import { Venda } from "./Venda";


export default interface Usuario {
    id: number;
    nome: string;
    usuario: string;
    cargo: string;
    foto: string;
    senha: string;
    venda?: Venda | null;
}