import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp";
import { toastAlert } from "@/utils/toastAlert";
import { useNavigate } from "react-router-dom";
import { recovery } from "@/services/Services";
import { useEmail } from "@/contexts/EmailContext";

export default function InputOTPVerification() {
    const { email, setUsuarioLogin } = useEmail();
    const [otp, setOtp] = useState<string>("");
    const navigate = useNavigate();

    const handleOtpChange = (value: string) => {
        setOtp(value);
    };

    const verificarCodigo = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (otp.length === 6) {
            try {
                await recovery('/auth/validate-otp', { otp, email }, setUsuarioLogin);
                toastAlert('Código verificado com sucesso!', 'sucesso');
                navigate('/new-password');
            } catch (error) {
                toastAlert(`Erro ao verificar o código: ${error}`, 'erro');
            }
        } else {
            toastAlert('Por favor, insira um código de 6 dígitos.', 'erro');
        }
    };

    return (
        <div className="flex items-center justify-center w-full min-h-screen">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg text-center">
                <h1 className="text-2xl font-bold mb-4">Verificar Código</h1>
                <p className="mb-6 text-gray-600">
                    Insira o código de 6 dígitos enviado para seu e-mail.
                </p>
                <form onSubmit={verificarCodigo} className="space-y-4 flex flex-col items-center">
                    <InputOTP maxLength={6} onChange={handleOtpChange}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                    <Button type="submit" className="w-full">
                        Verificar Código
                    </Button>
                </form>
            </div>
        </div>
    );
}
