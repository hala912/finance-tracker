import { useAuth } from "../../context/AuthContext";
import { Usetransition } from "../../hooks/useTransaction";
import { useState } from "react";

type Transaction = {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  type: "income" | "expense";
};

// Placeholder rows so the layout is visible before useTransactions is wired in.
// TODO: replace this with `const { data: transactions } = useTransactions()`
const placeholderTransactions: Transaction[] = [
  {
    id: "1",
    date: "Jul 24, 2026",
    category: "Income",
    description: "Monthly Bank Salary",
    amount: 4300,
    type: "income",
  },
  
];

const categoryStyles: Record<string, string> = {
  Income: "bg-emerald-50 text-emerald-700",
  Freelance: "bg-sky-50 text-sky-700",
  Bills: "bg-amber-50 text-amber-700",
  Shopping: "bg-violet-50 text-violet-700",
  Groceries: "bg-rose-50 text-rose-700",
};

export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const { data } = Usetransition();
  const { user } = useAuth();
  console.log(data, user);

  const transactions = placeholderTransactions;

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Top bar */}
      <header className="flex items-center justify-between border-b border-stone-200 bg-white px-8 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-sm font-semibold text-white">
            S
          </div>
          <span className="text-lg font-semibold text-stone-800">
            SaaSBrian
          </span>
        </div>
        <nav className="flex items-center gap-8 text-sm font-medium text-stone-500">
          <span className="cursor-pointer hover:text-stone-800">Dashboard</span>
          <span className="cursor-pointer text-teal-700">Transactions</span>
          <span className="cursor-pointer hover:text-stone-800">Budget</span>
        </nav>
        {/* TODO: wire this to auth signOut() from AuthContext */}
        <button className="text-sm font-medium text-stone-500 hover:text-stone-800">
          Log out
        </button>
      </header>

      <main className="mx-auto max-w-6xl px-8 py-8">
        {/* Page title */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-stone-900">
            Transactions
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            Manage and track your financial flow with precision.
          </p>
        </div>

        {/* Filter row */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 rounded-xl border border-stone-200 bg-white p-4">
          <div className="flex flex-wrap gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-stone-400">
                Amount
              </label>
              <input
                type="text"
                placeholder="0.00"
                className="w-28 rounded-lg border border-stone-200 px-3 py-2 text-sm text-stone-700 focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-stone-400">Type</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="rounded-lg border border-stone-200 px-3 py-2 text-sm text-stone-700 focus:border-teal-500 focus:outline-none"
              >
                <option value="all">All types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-stone-400">
                Category
              </label>
              <input
                type="text"
                placeholder="Any category"
                className="w-40 rounded-lg border border-stone-200 px-3 py-2 text-sm text-stone-700 focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-stone-400">
                Search
              </label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search description..."
                className="w-48 rounded-lg border border-stone-200 px-3 py-2 text-sm text-stone-700 focus:border-teal-500 focus:outline-none"
              />
            </div>
          </div>

          {/* TODO: wire to useMutation insert, opens a form/modal */}
          <button className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700">
            + Add Transaction
          </button>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-stone-200 bg-white">
          <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
            <h2 className="text-sm font-semibold text-stone-800">
              Recent Activity
            </h2>
          </div>

          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-stone-100 text-xs uppercase tracking-wide text-stone-400">
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Description</th>
                <th className="px-5 py-3 text-right font-medium">Amount</th>
                <th className="px-5 py-3 text-right font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-10 text-center text-stone-400"
                  >
                    No transactions yet.
                  </td>
                </tr>
              ) : (
                transactions.map((t) => (
                  <tr
                    key={t.id}
                    className="border-b border-stone-50 last:border-0 hover:bg-stone-50"
                  >
                    <td className="px-5 py-4 text-stone-600">{t.date}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          categoryStyles[t.category] ??
                          "bg-stone-100 text-stone-600"
                        }`}
                      >
                        {t.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-stone-700">
                      {t.description}
                    </td>
                    <td
                      className={`px-5 py-4 text-right font-medium ${
                        t.type === "income"
                          ? "text-emerald-600"
                          : "text-rose-600"
                      }`}
                    >
                      {t.type === "income" ? "+" : "-"}${t.amount.toFixed(2)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      {/* TODO: wire to useMutation delete, call with t.id */}
                      <button
                        aria-label="Delete transaction"
                        className="text-stone-300 hover:text-rose-500"
                      >
                        🗑
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="flex items-center justify-between border-t border-stone-100 px-5 py-3 text-xs text-stone-400">
            <span>
              Showing {transactions.length} of {transactions.length}{" "}
              transactions
            </span>
            <div className="flex gap-2">
              <button className="rounded-md border border-stone-200 px-3 py-1 hover:bg-stone-50">
                Previous
              </button>
              <button className="rounded-md border border-stone-200 px-3 py-1 hover:bg-stone-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
