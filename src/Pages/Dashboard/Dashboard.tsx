
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { useTransactionAll } from "../../hooks/useTransactionAll"
import { aggregateTransactions } from "./aggregationfunction"
import { SummaryCards } from "../../components/dashboard/SummaryCards"
import { RecentExpenses } from "../../components/dashboard/RecentExpenses"
import { SpendByCategory } from "../../components/dashboard/SpendbyCatagory"
import { Navbar } from "../../components/navbar/navbar"
import { MonthlyTrend } from "./MonthlyTrendfunction"




function currency(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}


const Dashboard = () => {
  const { data, isLoading, error } = useTransactionAll()

  if (isLoading) return <div className="p-10 text-stone-500">Loading dashboard…</div>
  if (error) return <div className="p-10 text-amber-700">Couldn't load your data.</div>

  const { totalIncome, totalExpense, balance, byCategory } = aggregateTransactions(data ?? [])
  const monthlyTrend = MonthlyTrend(data ?? []).monthlyTrend

  const recentExpenses = (data ?? [])
    .filter((t) => t.type === "expense")
    .sort((a, b) => new Date(b.occurred_on).getTime() - new Date(a.occurred_on).getTime())
    .slice(0, 3)

return (
  <div className="min-h-screen bg-[#FBF3EF]">
    <Navbar />

    <main className="mx-auto max-w-6xl px-8 py-8">
      <h1 className="text-2xl font-semibold text-stone-900 mb-6">Financial Overview</h1>

      <SummaryCards totalIncome={totalIncome} totalExpense={totalExpense} balance={balance} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6 mt-6">
        <div className="lg:col-span-2 rounded-2xl border border-stone-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-stone-800 mb-4">Spending Trends</h2>
          {monthlyTrend.length === 0 ? (
            <p className="text-sm text-stone-400">Monthly trend coming soon.</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={monthlyTrend}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#78716c", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#78716c", fontSize: 12 }} tickFormatter={(v) => `$${Number(v) / 1000}k`} />
                <Tooltip formatter={(v) => currency(Number(v))} />
                <Line type="monotone" dataKey="total" stroke="#0f766e" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        <RecentExpenses recentExpenses={recentExpenses} />
      </div>

      <SpendByCategory byCategory={byCategory} />
    </main>
  </div>
)
}

export default Dashboard