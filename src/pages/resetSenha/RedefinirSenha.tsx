import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toastAlert } from "@/utils/toastAlert";
import { useNavigate } from "react-router-dom";
import { recovery } from "@/services/Services";
import { useEmail } from "@/contexts/EmailContext";
import UsuarioLogin from "@/models/UsuarioLogin";

export default function RedefinirSenha() {
    const { usuarioLogin, email, setUsuarioLogin } = useEmail(); // Recupera e define o usuário do contexto
    const [novaSenha, setNovaSenha] = useState<string>("");
    const [confirmarSenha, setConfirmarSenha] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleNovaSenhaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNovaSenha(e.target.value);
    };

    const handleConfirmarSenhaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmarSenha(e.target.value);
    };

    const redefinirSenha = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (novaSenha !== confirmarSenha) {
            toastAlert("As senhas não coincidem.", "erro");
            return;
        }

        if (novaSenha.length < 8) {
            toastAlert("A nova senha deve ter pelo menos 8 caracteres.", "erro");
            return;
        }

        setIsLoading(true);

        try {
            if (usuarioLogin) {

                const updatedUsuarioLogin: UsuarioLogin = {
                    ...usuarioLogin,
                    usuario: email,
                    senha: novaSenha
                };

                setUsuarioLogin(updatedUsuarioLogin);

                await recovery('/auth/change-password', usuarioLogin, setUsuarioLogin);
                toastAlert("Senha alterada com sucesso!", "sucesso");
                
                // Redireciona para a página de login
                navigate("/login");
            } else {
                toastAlert("Usuário não encontrado.", "erro");
            }
        } catch (error) {
            toastAlert(`Erro ao alterar a senha: ${error}`, "erro");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center w-full min-h-screen">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg text-center">
                <h1 className="text-2xl font-bold mb-4">Redefinir Senha</h1>
                <form onSubmit={redefinirSenha} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="novaSenha">Nova Senha</Label>
                        <Input
                            id="novaSenha"
                            name="novaSenha"
                            type="password"
                            placeholder="Digite sua nova senha"
                            value={novaSenha}
                            onChange=
                            {(e: ChangeEvent<HTMLInputElement>) =>
                                handleNovaSenhaChange(e)
                            }
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
                        <Input
                            id="confirmarSenha"
                            name="confirmarSenha"
                            type="password"
                            placeholder="Confirme sua nova senha"
                            value={confirmarSenha}
                            onChange=
                            {(e: ChangeEvent<HTMLInputElement>) =>
                                handleConfirmarSenhaChange(e)
                            }
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        {isLoading ? "Alterando..." : "Redefinir Senha"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
