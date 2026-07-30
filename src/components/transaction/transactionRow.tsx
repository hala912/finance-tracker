import { useRemoveTransaction } from "../../hooks/useRemovetransaction";
import { useTransaction } from "../../hooks/useTransaction";



const TransactionsRow = ()=>{


    const categoryStyles: Record<string, string> = {
      Income: "bg-emerald-50 text-emerald-700",
      Freelance: "bg-sky-50 text-sky-700",
      Bills: "bg-amber-50 text-amber-700",
      Shopping: "bg-violet-50 text-violet-700",
      Groceries: "bg-rose-50 text-rose-700",
    };
      const { data } = useTransaction();
    
      const transactions = data ?? [];

      const {mutate:handleremove} = useRemoveTransaction()
      
       
    return(
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
                    <td className="px-5 py-4 text-stone-600">
                      {t.occurred_on}
                    </td>
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
                        onClick={()=>{handleremove(t.id)}}
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
    )
}

export default TransactionsRow