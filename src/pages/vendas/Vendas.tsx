import Sidebar from "@/components/sidebar/Sidebar";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { AuthContext } from "@/contexts/AuthContext";
import { Venda } from "@/models/Venda";
import { buscar } from "@/services/Services";
import { toastAlert } from "@/utils/toastAlert";
import { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { FilePenIcon, TrashIcon } from "lucide-react";
import DeleteVenda from "@/components/venda/deleteVenda/DeleteVenda";
import { useNavigate } from "react-router-dom";

function Vendas() {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const { usuario } = useContext(AuthContext);
  const token = usuario?.token;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedVendaId, setSelectedVendaId] = useState<number | null>(null);
  let navigate = useNavigate();
  const { authenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!authenticated) {
      navigate("/login");
    }
  }, [authenticated, navigate]);

  async function buscarVendas() {
    try {
      await buscar(`/vendas`, setVendas, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error) {
      toastAlert("Erro ao buscar as vendas", "erro");
    }
  }

  async function atualizarVendas() {
    try {
      await buscar(`/vendas`, setVendas, {
        headers: {
          Authorization: token,
        },
      });
      toastAlert("Vendas atualizadas com sucesso", "sucesso");
    } catch (error) {
      toastAlert("Erro ao buscar as vendas", "erro");
    }
  }

  useEffect(() => {
    buscarVendas();
  }, []);

  const openDeleteModal = (vendaId: number) => {
    setSelectedVendaId(vendaId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedVendaId(null);
  };

  function onDeleteSuccess(): void {
    buscarVendas();
  }


  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 pt-6 pl-6">
        <div className="mb-10">
          <h1 className="text-5xl font-semibold text-white">Vendas</h1>
          <p className="mt-2 ml-1 text-md text-gray-400">
            Gerencie as suas vendas
          </p>
        </div>
        <div className="my-8 space-x-8">
            <Button
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={atualizarVendas}
            >
                Atualizar
            </Button>
            <Button onClick={() => navigate("/cadastrar")} className="bg-sky-600 hover:bg-sky-600/90">
                Nova Venda
            </Button>
        </div>
        <div className="w-[95%]">
          <Card className="dark">
            <CardHeader className="px-7">
              <CardDescription>
                Histórico de vendas da sua loja.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>CPF</TableHead>
                    <TableHead>WhatsApp</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Bandeira do Cartão</TableHead>
                    <TableHead>Banco</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Vendedor</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Observações</TableHead>
                    <TableHead>CNPJ</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vendas.map((venda) => (
                    <TableRow key={venda.id}>
                      <TableCell>
                        {format(new Date(venda.dataVenda), "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell>{venda.nomeCliente}</TableCell>
                      <TableCell>{venda.cpf}</TableCell>
                      <TableCell>{venda.whatsapp}</TableCell>
                      <TableCell>{venda.telefone}</TableCell>
                      <TableCell>{venda.bandeiraCartao}</TableCell>
                      <TableCell>{venda.nomeBancoCartao}</TableCell>
                      <TableCell>${venda.valorVenda.toFixed(2)}</TableCell>
                      <TableCell>{venda.statusVenda}</TableCell>
                      <TableCell>{venda.vendedor}</TableCell>
                      <TableCell>{venda.tipoCliente}</TableCell>
                      <TableCell className="line-clamp-1">{venda.observacoes}</TableCell>
                      <TableCell>{venda.cnpj || "-"}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="bg-gray-500 hover:bg-gray-300 text-white"
                          >
                            <FilePenIcon className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="bg-red-500 hover:bg-red-300 text-white"
                            onClick={() => openDeleteModal(venda.id)}
                          >
                            <TrashIcon className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
      {selectedVendaId !== null && (
        <DeleteVenda
            vendaId={selectedVendaId} 
            isOpen={isDeleteModalOpen} 
            onClose={closeDeleteModal} 
            onDeleteSuccess={onDeleteSuccess}
        />
        )}
    </div>
  );
}

export default Vendas;
