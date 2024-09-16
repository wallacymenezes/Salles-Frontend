import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { buscar, deletar } from "../../../services/Services";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AuthContext } from "@/contexts/AuthContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toastAlert } from "../../../utils/toastAlert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface DeleteVendaProps {
    vendaId: number;
    isOpen: boolean;
    onClose: () => void;
    onDeleteSuccess: () => void; // Nova prop para notificar sobre exclusão bem-sucedida
}

function DeleteVenda({ vendaId, isOpen, onClose, onDeleteSuccess }: DeleteVendaProps) { 
    const [loading, setLoading] = useState(false);
    const [venda, setVenda] = useState<any>({});
    const navigate = useNavigate();
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    useEffect(() => {
        if (vendaId) {
            buscarPorId(vendaId);
        }
    }, [vendaId]);

    async function buscarPorId(id: number) {
        try {
            await buscar(`/vendas/${id}`, setVenda, {
                headers: {
                    'Authorization': token
                }
            });
        } catch (error: any) {
            if (error.toString().includes('403')) {
                toastAlert('O token expirou, favor logar novamente.', 'info');
                handleLogout();
                navigate('/login');
            } else {
                toastAlert('Erro ao buscar produto.', 'erro');
            }
        }
    }

    async function deletarProduct() {
        setLoading(true);
        try {
            await deletar(`/vendas/${vendaId}`, {
                headers: {
                    'Authorization': token
                }
            });
            toastAlert(`Venda: ${venda.nomeCliente} deletado com sucesso`, 'sucesso');
            onDeleteSuccess(); // Notifica a lista sobre a exclusão
            onClose();
        } catch (error) {
            toastAlert('Erro ao apagar o produto.', 'erro');
        }
        setLoading(false);
    }

    function closeModal() {
        onClose();
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent
                className="dark text-white xs:w-[90%] xs:p-4 sm:w-[90%] sm:p-6 md:w-[80%] md:p-8 lg:w-[60%] lg:p-10">
                <AlertDialogHeader>
                    <AlertDialogTitle>Deletar Venda</AlertDialogTitle>
                    <AlertDialogDescription>
                        Você tem certeza de que deseja apagar o venda a seguir?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <Alert variant="destructive">
                    <ExclamationTriangleIcon className="h-4 w-4" />
                    <AlertTitle className="text-red-600">Nome: {venda.nomeCliente}</AlertTitle>
                    <AlertDescription>
                        CPF: {venda.cpf}
                    </AlertDescription>
                </Alert>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={closeModal}>Não</AlertDialogCancel>
                    <AlertDialogAction onClick={deletarProduct} className="bg-red-700 text-white">
                        {loading ? 'Aguarde...' : 'Confirmar'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default DeleteVenda;
