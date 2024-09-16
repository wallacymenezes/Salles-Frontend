import Dashboard from "@/components/dashboard/Dashboard";
import Sidebar from "@/components/sidebar/Sidebar";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  let navigate = useNavigate();
  const { authenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!authenticated) {
      navigate("/login");
    }
  }, [authenticated, navigate]);

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 pt-6 pl-6">
        <div className="mb-10">
          <h1 className="text-5xl font-semibold text-white">Dashboard</h1>
          <p className="mt-2 ml-1 text-md text-gray-400">
            Acompanhe as suas vendas
          </p>
        </div>
        <Dashboard />
      </main>
    </div>
  );
}
