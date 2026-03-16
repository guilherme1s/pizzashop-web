import colors from "tailwindcss/colors";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Sector,
  type PieLabelRenderProps,
  type SectorProps,
} from "recharts";
import { BarChart, Loader2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getPopularProducts } from "@/api/get-popular-products";

const COLORS = [
  colors.sky[500],
  colors.amber[500],
  colors.violet[500],
  colors.emerald[500],
  colors.rose[500],
];

type PopularProduct = {
  product: string;
  amount: number;
};

export function PopularProductsChart() {
  const { data: popularProducts } = useQuery<PopularProduct[]>({
    queryKey: ["metrics", "popular-products"],
    queryFn: getPopularProducts,
  });

  const renderLabel = ({
    cx = 0,
    cy = 0,
    midAngle = 0,
    innerRadius = 0,
    outerRadius = 0,
    value,
    payload,
  }: PieLabelRenderProps) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.9 + 10;

    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const name = (payload as PopularProduct)?.product ?? "";

    return (
      <text
        x={x}
        y={y}
        className="fill-muted-foreground text-xs"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {name.length > 12 ? name.substring(0, 12) + "..." : name} ({value})
      </text>
    );
  };

  const renderShape = (props: SectorProps & { index?: number }) => {
    const { index = 0 } = props;

    return (
      <Sector
        {...props}
        fill={COLORS[index % COLORS.length]}
        className="stroke-background transition-opacity hover:opacity-80"
      />
    );
  };

  return (
    <Card className="col-span-3">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Produtos populares
          </CardTitle>
          <BarChart className="text-muted-foreground h-4 w-4" />
        </div>
      </CardHeader>

      <CardContent>
        {popularProducts ? (
          <ResponsiveContainer width="100%" height={240}>
            <PieChart style={{ fontSize: 12 }}>
              <Pie
                data={popularProducts}
                dataKey="amount"
                nameKey="product"
                cx="50%"
                cy="50%"
                outerRadius={86}
                innerRadius={64}
                strokeWidth={8}
                label={renderLabel}
                shape={renderShape}
                labelLine={false}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-60 w-full items-center justify-center">
            <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
