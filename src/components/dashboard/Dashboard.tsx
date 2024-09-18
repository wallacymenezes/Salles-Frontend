import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AuthContext } from "@/contexts/AuthContext";
import { buscar } from "@/services/Services";
import { toastAlert } from "@/utils/toastAlert";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Bar, BarChart, XAxis } from "recharts";

const chartConfig = {
  pf: {
    label: "PF",
    color: "#13acac",
  },
  pj: {
    label: "PJ",
    color: "#FF0000",
  },
} satisfies ChartConfig;

interface VendaPorDia {
  day: string;
  PF: number;
  PJ: number;
}

interface Venda {
  id: number;
  dataVenda: string;
  nomeCliente: string;
  cpf: string;
  whatsapp: string;
  telefone: string;
  bandeiraCartao: string;
  nomeBancoCartao: string;
  valorVenda: number;
  statusVenda: string;
  observacoes: string;
  vendedor: string;
  tipoCliente: string; // "PF" ou "PJ"
  cnpj?: string;
}

function Dashboard() {
    const [chartData, setChartData] = useState([]);
    const { usuario } = useContext(AuthContext);
    const token = usuario?.token;
    
    async function buscarVendas() {
        try {
            await buscar(`/vendas`, setChartData, {
                headers: {
                  Authorization: token,
                },
              });
        } catch (error) {
            toastAlert("Erro ao buscar as vendas", "erro");
        }
    }

    useEffect(() => {
        buscarVendas();
    }, []);

    function agruparVendasPorDia(vendas: Venda[]): VendaPorDia[] {
      // Reduzir as vendas para um objeto que agrupa por dia e conta PF e PJ
      const vendasAgrupadas = vendas.reduce((acc, venda) => {
        // Formatando a data para "dd/MM/yyyy"
        const diaFormatado = format(new Date(venda.dataVenda), "dd/MM/yyyy");
        
        // Verifica se já existe um registro para essa data
        if (!acc[diaFormatado]) {
          acc[diaFormatado] = { day: diaFormatado, PF: 0, PJ: 0 };
        }
    
        // Incrementa o contador de PF ou PJ com base no tipo de cliente
        if (venda.tipoCliente === "PF") {
          acc[diaFormatado].PF += 1;
        } else if (venda.tipoCliente === "PJ") {
          acc[diaFormatado].PJ += 1;
        }
    
        return acc;
      }, {} as Record<string, VendaPorDia>);
    
      // Converte o objeto agrupado em um array
      return Object.values(vendasAgrupadas);
    }

  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-[95%]">
      <BarChart accessibilityLayer data={agruparVendasPorDia(chartData)}>
        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 2)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="PF" fill="var(--color-pf)" radius={4} />
        <Bar dataKey="PJ" fill="var(--color-pj)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}

export default Dashboard;
