import { useEffect, useMemo, useState } from "react";
import { useRemoveTransaction } from "../../hooks/useRemovetransaction";
import { useTransaction } from "../../hooks/useTransaction";

const TransactionsRow = () => {
  const categoryStyles: Record<string, string> = {
    Income: "bg-emerald-50 text-emerald-700",
    Freelance: "bg-sky-50 text-sky-700",
    Bills: "bg-amber-50 text-amber-700",
    Shopping: "bg-violet-50 text-violet-700",
    Groceries: "bg-rose-50 text-rose-700",
  };
  const { data, page, setPage } = useTransaction();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const transactions = data?.data ?? [];
  const { mutate: handleremove } = useRemoveTransaction();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredTransactions = useMemo(() => {
    const q = debouncedSearchTerm.trim().toLowerCase();
    if (!q) return transactions;
    return transactions.filter((t) => {
      return (
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.type.toLowerCase().includes(q) ||
        t.occurred_on.toLowerCase().includes(q) ||
        String(t.amount).includes(q)
      );
    });
  }, [transactions, debouncedSearchTerm]);

  return (
    <div className="overflow-hidden rounded-xl border border-stone-200 bg-white">
      <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
        <h2 className="text-sm font-semibold text-stone-800">
          Recent Activity
        </h2>
        <div className="flex flex-col gap-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search transactions..."
            className="w-48 rounded-lg border border-stone-200 px-3 py-2 text-sm text-stone-700 focus:border-teal-500 focus:outline-none"
          />
        </div>
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
          {filteredTransactions.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-5 py-10 text-center text-stone-400">
                No transactions yet.
              </td>
            </tr>
          ) : (
            filteredTransactions.map((t) => (
              <tr
                key={t.id}
                className="border-b border-stone-50 last:border-0 hover:bg-stone-50"
              >
                <td className="px-5 py-4 text-stone-600">{t.occurred_on}</td>
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
                <td className="px-5 py-4 text-stone-700">{t.description}</td>
                <td
                  className={`px-5 py-4 text-right font-medium ${
                    t.type === "income" ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {t.type === "income" ? "+" : "-"}${t.amount.toFixed(2)}
                </td>
                <td className="px-5 py-4 text-right">
                  {/* TODO: wire to useMutation delete, call with t.id */}
                  <button
                    aria-label="Delete transaction"
                    className="text-stone-300 hover:text-rose-500"
                    onClick={() => {
                      handleremove(t.id);
                    }}
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
          Showing {filteredTransactions.length} of {data?.count} transactions
        </span>
        <div className="flex gap-2">
          <button
            className="rounded-md border border-stone-200 px-3 py-1 hover:bg-stone-50"
            onClick={() => {
              setPage(page - 1);
            }}
          >
            Previous
          </button>
          <button
            className="rounded-md border border-stone-200 px-3 py-1 hover:bg-stone-50"
            onClick={() => {
              setPage(page + 1);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionsRow;
