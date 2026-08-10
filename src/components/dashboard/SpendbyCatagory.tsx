import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import type { CategoryTotal } from "../../types/Transaction";

const CATEGORY_COLORS: Record<string, string> = {
  Income: "#10b981",
  Freelance: "#0ea5e9",
  Bills: "#d97706",
  Shopping: "#8b5cf6",
  Groceries: "#e11d48",
}
const FALLBACK_COLOR = "#a8a29e"

function currency(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export function SpendByCategory({ byCategory }: { byCategory: CategoryTotal[] }) {

    console.log(byCategory)
     const totalSpend = byCategory.reduce((sum, c) => sum + c.total, 0)

    return(
         <div className="rounded-2xl border border-stone-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-stone-800 mb-4">Spend by Category</h2>
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <div className="relative w-[160px] h-[160px] shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={byCategory} dataKey="total" nameKey="category" innerRadius={48} outerRadius={72} paddingAngle={2} stroke="none">
                  {byCategory.map((entry) => (
                    <Cell key={entry.category} fill={CATEGORY_COLORS[entry.category] ?? FALLBACK_COLOR} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-lg font-semibold text-stone-900">${totalSpend.toLocaleString()}</span>
            </div>
          </div>
          <ul className="flex-1 w-full space-y-3">
            {byCategory.map((entry) => (
              <li key={entry.category} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-stone-700">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[entry.category] ?? FALLBACK_COLOR }} />
                  {entry.category}
                </span>
                <span className="text-stone-500">
                  {currency(entry.total)} ({totalSpend ? Math.round((entry.total / totalSpend) * 100) : 0}%)
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
}