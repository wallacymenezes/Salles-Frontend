import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toastAlert } from "@/utils/toastAlert";
import { recovery } from "@/services/Services";
import { useEmail } from "@/contexts/EmailContext";
import { InfinitySpin } from "react-loader-spinner";
import { AuthContext } from "@/contexts/AuthContext";

export default function RecuperarSenha() {

    const { setEmail } = useEmail();
    const [email, setEmailRequest] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { usuario } = useContext(AuthContext);
    
    useEffect(() => {
        if (usuario.token !== "") {
            navigate("/home");
        }
    }, [usuario, navigate]);
    
    const atualizarEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setEmailRequest(e.target.value);
    };

    const recuperarSenha = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        
        if (!email) {
            toastAlert('Preencha o campo de e-mail.', 'erro');
            setIsLoading(false);
            return;
        }

        try {
            await recovery('/auth/recover-token', { email }, setEmailRequest);
            setEmail(email);
            navigate('/input-otp');
            toastAlert('E-mail de recuperação enviado com sucesso.', 'sucesso');
        } catch (error) {
            toastAlert('Erro ao enviar e-mail de recuperação.', 'erro');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center w-full min-h-screen text-white">
            <div className="w-full md:max-w-md space-y-6 px-4 py-8">
                <div className="flex justify-center items-center">    
                    <img src="https://i.ibb.co/R2KQDDk/name-logo-dark-recortada.png" alt="name-logo-dark-recortada" className="rounded-sm w-36 xl:w-40" />
                </div>
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-2">Esqueceu sua senha?</h1>
                    <p className="text-sm text-gray-300">Digite seu e-mail para receber um código para redefinir sua senha.</p>
                </div>
                <form onSubmit={recuperarSenha} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="exemplo@email.com"
                            required
                            value={email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEmail(e)}
                        />
                    </div>
                    <Button type="submit" className="w-full hover:bg-gray-600">
                        {isLoading ? (
                            <InfinitySpin width="40" color="#ffffff" />
                        ) : (
                            <span>Enviar link de recuperação</span>
                        )}
                    </Button>
                </form>
                <div className="text-center text-xs mt-4">
                    <Link to="/login" className="underline">Voltar ao login</Link>
                </div>
            </div>
        </div>
    );
}
