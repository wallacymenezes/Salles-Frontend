import UsuarioLogin from "@/models/UsuarioLogin";
import { createContext, useContext, useState, ReactNode } from "react";

interface EmailContextType {
    usuarioLogin: UsuarioLogin | null;
    setUsuarioLogin: (usuario: UsuarioLogin | null) => void;
    email: string;
    setEmail: (email: string) => void;
}

const EmailContext = createContext<EmailContextType | undefined>(undefined);

export const EmailProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin | null>(null);
    const [email, setEmail] = useState<string>("");

    return (
        <EmailContext.Provider value={{ usuarioLogin, setUsuarioLogin, email, setEmail }}>
            {children}
        </EmailContext.Provider>
    );
};

export const useEmail = () => {
    const context = useContext(EmailContext);
    if (context === undefined) {
        throw new Error("useEmail must be used within an EmailProvider");
    }
    return context;
};
