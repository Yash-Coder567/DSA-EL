"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface PerformanceChartProps {
  history: Array<{ access: number; hitRate: number }>
}

export function PerformanceChart({ history }: PerformanceChartProps) {
  if (!history || history.length === 0) {
    return (
      <Card className="p-12 text-center border-dashed">
        <p className="text-muted-foreground text-sm">Run a simulation to see performance metrics</p>
      </Card>
    )
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg">Hit Rate Over Time</CardTitle>
        <CardDescription>Cache hit rate progression during simulation</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            hitRate: {
              label: "Hit Rate (%)",
              color: "hsl(var(--primary))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="access"
                label={{ value: "Access Number", position: "insideBottom", offset: -5 }}
                className="text-xs"
              />
              <YAxis label={{ value: "Hit Rate (%)", angle: -90, position: "insideLeft" }} className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="hitRate"
                stroke="var(--color-hitRate)"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
                name="Hit Rate (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
