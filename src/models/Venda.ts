export enum TipoCliente {
    PF = "PF",
    PJ = "PJ",
  }
  
  export enum StatusVenda {
    PENDENTE = "PENDENTE", // PENDENTE DE PAGAMENTO
    PAGO = "PAGO",
    DESISTENCIA = "DESISTENCIA",
    AGUARDANDO_ALTERACAO = "AGUARDANDO ALTERACAO",
  }

export interface Venda {
    id: number;
    dataVenda: string;
    nomeCliente: string;
    cpf: string;
    whatsapp: string;
    telefone?: string;
    bandeiraCartao: string;
    nomeBancoCartao: string;
    valorVenda: number;
    statusVenda: StatusVenda;
    observacoes?: string;
    vendedor: string;
    tipoCliente: TipoCliente;
    cnpj?: string;
  }