import Sidebar from "@/components/sidebar/Sidebar";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function FormVenda() {
  let navigate = useNavigate();
  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token === null) {
      navigate("/login");
    }
  }, [usuario, navigate]);

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 pt-6 pl-6">
        <h1>ALO GALERA DE COWBOY</h1>
      </main>
    </div>
  )
}

export default FormVenda;
