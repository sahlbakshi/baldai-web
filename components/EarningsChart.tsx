"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip } from "recharts"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { Separator } from "./ui/separator"
import { convertToLocalTime, formatEarnings, processData } from "@/lib/helpers"
import dayjs from "dayjs"

const chartConfig = {
  earnings: {
    label: "Earnings",
  },
} satisfies ChartConfig

export function EarningsChart({
  data,
  currency,
  interval,
  period,
}: {
  data: any
  currency: any
  interval: any
  period: any
}) {
  const [activeChart] = React.useState<keyof typeof chartConfig>("earnings")

  const today = dayjs().format("YYYY-MM-DD")
  const totalEarningsToday = data
    .filter((item) => convertToLocalTime(item.created_at).format("YYYY-MM-DD") === today)
    .reduce((acc, item) => acc + item.sale_amount, 0)

  const processedData = processData(data, interval.label, period)

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="w-full">
          <div className="text-muted-foreground px-4 py-3">Earnings Today</div>
          <Separator />
          <div className="text-4xl px-4 py-5">
            {currency.symbol}
            {formatEarnings(totalEarningsToday)}
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full lg:w-[800px]">
          <BarChart
            accessibilityLayer
            data={processedData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={24}
              tickFormatter={(value) => {
                switch (interval.label) {
                  case "Daily":
                    return dayjs(value).format("MMM D")

                  case "Weekly":
                    return dayjs(value).format("MMM D")

                  case "Monthly":
                    return dayjs(value).format("MMM 'YY")

                  default:
                    return value
                }
              }}
            />
            <Tooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="earnings"
                  formatter={(value) => `${currency.symbol}${formatEarnings(value.toString())}`}
                  labelFormatter={(value) => {
                    switch (interval.label) {
                      case "Daily":
                        return dayjs(value).format("MMM D")

                      case "Weekly":
                        return `${dayjs(value).startOf("week").format("MMM D")} - ${dayjs(
                          value
                        ).format("MMM D")}`

                      case "Monthly":
                        return dayjs(value).format("MMM 'YY")

                      default:
                        return value
                    }
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`hsl(var(--chart-1))`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
