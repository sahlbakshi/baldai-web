"use client"

import { EarningsChart } from "@/components/EarningsChart"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { createClient } from "@supabase/supabase-js"
import { useEffect, useState } from "react"
import FullHeightContainer from "@/components/FullHeightContainer"
import { convertToLocalTime, formatEarnings } from "@/lib/helpers"
import { Convert } from "easy-currencies"
import dayjs from "dayjs"
import Loader from "@/components/Loader"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
)

const intervals = {
  daily: {
    label: "Daily",
    periods: [
      { value: "7D", label: "Last 7 days" },
      { value: "14D", label: "Last 14 days" },
    ],
  },
  weekly: {
    label: "Weekly",
    periods: [
      { value: "4W", label: "Last 4 weeks" },
      { value: "12W", label: "Last 12 weeks" },
    ],
  },
  monthly: {
    label: "Monthly",
    periods: [
      { value: "3M", label: "Last 3 months" },
      { value: "12M", label: "Last 12 months" },
    ],
  },
  yearly: {
    label: "Yearly",
    periods: [{ value: "ALL", label: "All time" }],
  },
}

const currencies = {
  usd: { code: "USD", symbol: "$" },
  cad: { code: "CAD", symbol: "$" },
  rub: { code: "RUB", symbol: "₽" },
  eur: { code: "EUR", symbol: "€" },
}

export default function ReferralPage({ params }: { params: { code: string } }) {
  const code = params.code

  const [selectedInterval, setSelectedInterval] = useState(intervals.daily)
  const [selectedPeriod, setSelectedPeriod] = useState(selectedInterval.periods[0].value)
  const [selectedCurrency, setSelectedCurrency] = useState(currencies.usd)

  const [loading, setLoading] = useState<boolean>(true)
  const [referralData, setReferralData] = useState(null)
  const [isValidReferral, setIsValidReferral] = useState(true)
  const [transactions, setTransactions] = useState(null)
  const [usageCount, setUsageCount] = useState(0)
  const [convertedTransactions, setConvertedTransactions] = useState([])
  const [error, setError] = useState(null)

  const date = new Date()
  const month = date.toLocaleString("default", { month: "short" })
  const cashoutDate = dayjs(new Date(date.getFullYear(), date.getMonth() + 1, 1)).format(
    "MMM D YYYY"
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if referral code valid
        const { data: result, error: err } = await supabase
          .from("referrals")
          .select()
          .eq("referral_code", code.toUpperCase())
        if (err) {
          setError(err)
          return
        }
        if (!result || result.length === 0) {
          setIsValidReferral(false)
          setReferralData(result)
          return
        } else {
          setIsValidReferral(true)
          setReferralData(result[0])
        }

        // Fetch transactions if referral code valid
        const { data: transactionResult, error: transactionErr } = await supabase
          .from("transactions")
          .select("created_at, sale_amount, currency_code")
          .eq("referral_code", code.toUpperCase())
        
        // Fetch usages count if referral code valid
        const { count: usageCount, error: usageCountErr } = await supabase
          .from('usages')
          .select('*', { count: 'exact', head: true })
          .eq('referral_code', code.toUpperCase())

        if (usageCountErr) {
          setError(usageCountErr)
          return
        }
        if (transactionErr) {
          setError(transactionErr)
          return
        }
        setTransactions(
          transactionResult.map((transaction) => ({
            ...transaction,
            sale_amount: transaction.sale_amount * 0.7 * 0.4,
          }))
        )
        setUsageCount(usageCount)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [code])

  useEffect(() => {
    const convertData = async () => {
      const convertTransactions = async (transactions) => {
        if (!transactions) return []
        return Promise.all(
          transactions.map(async (transaction) => {
            const convertedAmount = await Convert(transaction.sale_amount)
              .from(transaction.currency_code)
              .to(selectedCurrency.code)
            return {
              ...transaction,
              sale_amount: convertedAmount,
            }
          })
        )
      }
      const convertedTransactions = await convertTransactions(transactions)
      setConvertedTransactions(convertedTransactions)
    }
    convertData()
  }, [transactions, selectedCurrency])

  const currentMonth = dayjs().format("YYYY-MM")
  const currentMonthEarnings = convertedTransactions
    .filter((item) => convertToLocalTime(item.created_at).format("YYYY-MM") === currentMonth)
    .reduce((acc, item) => acc + item.sale_amount, 0)

  const lifetimeEarnings = convertedTransactions.reduce((acc, item) => acc + item.sale_amount, 0)

  if (error) {
    return (
      <FullHeightContainer>
        <Alert variant="destructive">
          <AlertDescription>An unexpected error occurred. Please try again later.</AlertDescription>
        </Alert>
      </FullHeightContainer>
    )
  }

  if (!isValidReferral) {
    return (
      <FullHeightContainer>
        <Alert variant="destructive">
          <AlertDescription>
            <span className="font-bold">{code}</span> is an invalid referral code. Please check and
            try again.
          </AlertDescription>
        </Alert>
      </FullHeightContainer>
    )
  }

  return (
    <FullHeightContainer>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl text-muted-foreground">Creator Referral Dashboard</h1>
              <h1 className="text-4xl">
                {referralData.first_name} {referralData.last_name} - {referralData.referral_code}
              </h1>
            </div>

            <div className="flex justify-between">
              <div className="flex flex-row gap-2">
                {/* <div className="flex items-center py-1 px-3.5 text-sm border border-blue-500 rounded-full text-blue-600 bg-blue-500/10">
                  {referralData.referral_code}
                </div> */}
                <div
                  className={`flex items-center py-1 px-3.5 text-sm border rounded-full ${
                    referralData.is_active
                      ? "border-green-500 text-green-600 bg-green-500/10"
                      : "border-red-500 text-red-600 bg-red-500/10"
                  }`}
                >
                  {referralData.is_active ? "Active" : "Not Active"}
                </div>
              </div>
              <Select
                onValueChange={(value) => {
                  setSelectedCurrency(currencies[value as keyof typeof currencies])
                }}
                defaultValue={currencies.usd.code.toLowerCase()}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(currencies).map(([key, currency]) => (
                    <SelectItem key={key} value={key}>
                      {currency.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <div className="text-muted-foreground px-4 py-3">Lifetime Earnings</div>
              <Separator />
              <div className="text-3xl px-4 py-5">
                {selectedCurrency.symbol}
                {formatEarnings(lifetimeEarnings)}
              </div>
            </Card>

            <Card>
              <div className="text-muted-foreground px-4 py-3">{month} Monthly Earnings</div>
              <Separator />
              <div className="text-3xl px-4 py-5">
                {selectedCurrency.symbol}
                {formatEarnings(currentMonthEarnings)}
              </div>
            </Card>

            <Card>
              <div className="text-muted-foreground px-4 py-3">Cashout Date</div>
              <Separator />
              <div className="text-3xl px-4 py-5">{cashoutDate}</div>
            </Card>

            <Card>
              <div className="text-muted-foreground px-4 py-3">Usage Count</div>
              <Separator />
              <div className="text-3xl px-4 py-5">{usageCount}</div>
            </Card>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-4 w-full justify-between sm:justify-end">
              <Select
                onValueChange={(value) => {
                  setSelectedInterval({
                    label: intervals[value as keyof typeof intervals].label,
                    periods: intervals[value as keyof typeof intervals].periods,
                  })
                  setSelectedPeriod(intervals[value as keyof typeof intervals].periods[0].value)
                }}
                defaultValue="daily"
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Select interval" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(intervals).map(([key, interval]) => (
                    <SelectItem key={key} value={key}>
                      {interval.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => setSelectedPeriod(value)} value={selectedPeriod}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  {selectedInterval.periods.map((period) => (
                    <SelectItem key={period.value} value={period.value}>
                      {period.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <EarningsChart
              data={convertedTransactions}
              currency={selectedCurrency}
              interval={selectedInterval}
              period={selectedPeriod}
            />
          </div>
        </div>
      )}
    </FullHeightContainer>
  )
}
