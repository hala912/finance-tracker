import type { Transaction } from "../../types/Transaction";

function currency(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export function RecentExpenses({ recentExpenses }: { recentExpenses: Transaction[] }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5">
      <h2 className="text-sm font-semibold text-stone-800 mb-4">
        Recent Expenses
      </h2>
      <ul className="space-y-4">
        {recentExpenses.map((tx) => (
          <li key={tx.id} className="flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-sm font-medium text-stone-900 truncate">
                {tx.description}
              </p>
              <p className="text-xs text-stone-400">
                {tx.category} • {tx.occurred_on}
              </p>
            </div>
            <span className="text-sm font-medium text-amber-700 whitespace-nowrap">
              -{currency(tx.amount)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
