import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AuthContext } from "@/contexts/AuthContext";
import { buscar } from "@/services/Services";
import { toastAlert } from "@/utils/toastAlert";
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

  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-[95%]">
      <BarChart accessibilityLayer data={chartData}>
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
