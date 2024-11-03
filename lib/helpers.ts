import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"

dayjs.extend(utc)
dayjs.extend(isSameOrAfter)

// Helper function to convert UTC time to user's local time
export function convertToLocalTime(utcDate) {
  return dayjs.utc(utcDate).local()
}

// Helper function to aggregate data
function aggregateDataByInterval(data, interval) {
  const aggregationMap = {
    Daily: (date) => convertToLocalTime(date).format("YYYY-MM-DD"),
    Weekly: (date) => convertToLocalTime(date).endOf("week").format("YYYY-MM-DD"),
    Monthly: (date) => convertToLocalTime(date).format("YYYY-MM"),
    Yearly: (date) => convertToLocalTime(date).format("YYYY"),
  }

  return data.reduce((acc, { created_at, sale_amount }) => {
    const dateKey = aggregationMap[interval](created_at)
    if (!acc[dateKey]) {
      acc[dateKey] = { date: dateKey, earnings: 0 }
    }
    acc[dateKey].earnings += sale_amount
    return acc
  }, {})
}

// Helper function to filter data by period
function filterDataByPeriod(data, period) {
  const now = dayjs()

  switch (period) {
    case "7D":
      return data.filter((item) => dayjs(item.date).isAfter(now.subtract(7, "days")))

    case "14D":
      return data.filter((item) => dayjs(item.date).isAfter(now.subtract(14, "days")))

    case "4W":
      return data.filter((item) => dayjs(item.date).isAfter(now.subtract(4, "weeks")))

    case "12W":
      return data.filter((item) => dayjs(item.date).isAfter(now.subtract(12, "weeks")))

    case "3M":
      return data.filter((item) =>
        dayjs(item.date).isSameOrAfter(now.subtract(3, "months").startOf("month"))
      )

    case "12M":
      return data.filter((item) =>
        dayjs(item.date).isSameOrAfter(now.subtract(12, "months").startOf("month"))
      )

    case "ALL":
      return data

    default:
      return data
  }
}

// Helper function to generate expected date keys based on interval and period
function generateExpectedDateKeys(period) {
  const now = dayjs()
  const keys = []

  switch (period) {
    case "7D":
      for (let i = 0; i < 7; i++) {
        const date = now.subtract(i, "day").format("YYYY-MM-DD")
        keys.push(date)
      }
      break

    case "14D":
      for (let i = 0; i < 14; i++) {
        const date = now.subtract(i, "day").format("YYYY-MM-DD")
        keys.push(date)
      }
      break

    case "4W":
      for (let i = 0; i < 4; i++) {
        const weekEnd = now.subtract(i, "week").endOf("week").format("YYYY-MM-DD")
        keys.push(weekEnd)
      }
      break

    case "12W":
      for (let i = 0; i < 12; i++) {
        const weekEnd = now.subtract(i, "week").endOf("week").format("YYYY-MM-DD")
        keys.push(weekEnd)
      }
      break

    case "3M":
      for (let i = 0; i < 3; i++) {
        const month = now.subtract(i, "month").format("YYYY-MM")
        keys.push(month)
      }
      break

    case "12M":
      for (let i = 0; i < 12; i++) {
        const month = now.subtract(i, "month").format("YYYY-MM")
        keys.push(month)
      }
      break

    default:
      // For "ALL" or unrecognized periods, return an empty array
      break
  }

  return keys
}

// Helper function to fill missing dates with earnings = 0
function fillMissingDates(filteredData, expectedDateKeys) {
  const dataMap = {}
  filteredData.forEach((item) => {
    dataMap[item.date] = item.earnings
  })

  const completeData = expectedDateKeys.map((date) => ({
    date,
    earnings: dataMap[date] || 0,
  }))

  return completeData
}

// Putting things together
export function processData(data, interval, period) {
  const aggregatedData = aggregateDataByInterval(data, interval)
  const aggregatedArray = Object.values(aggregatedData)
  const filteredData = filterDataByPeriod(aggregatedArray, period)

  if (period === "ALL") return filteredData

  const expectedDateKeys = generateExpectedDateKeys(period)
  const completeData = fillMissingDates(filteredData, expectedDateKeys)

  completeData.sort((a, b) => (dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1))
  return completeData
}

export function formatEarnings(number: number | string) {
  const formattedNumber = parseFloat(number.toString()).toFixed(0)
  return formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
