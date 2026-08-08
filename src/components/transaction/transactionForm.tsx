import { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";

const TransactionForm = ({ page }: { page: number }) => {
  
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("");
  const [type ,setType] = useState<'income' | 'expense'>('expense');

  
  const today = new Date().toISOString().split('T')[0]
 
  const { mutate } = useAddTransaction(page);

  const handleSubmit = () => {
    mutate({
      amount: Number(amount),
      type,
      category: String(category),
      description: String(description),
      occurred_on: today,
    });
  };
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4 rounded-xl border border-stone-200 bg-white p-4">
      <div className="flex flex-wrap gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-stone-400">Amount</label>
          <input
            type="text"
            placeholder="0.00"
            value={amount}
            onChange={(e)=>setAmount(e.target.value)}
            className="w-28 rounded-lg border border-stone-200 px-3 py-2 text-sm text-stone-700 focus:border-teal-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-stone-400">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as 'income' | 'expense')}
            className="rounded-lg border border-stone-200 px-3 py-2 text-sm text-stone-700 focus:border-teal-500 focus:outline-none"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-stone-400">Category</label>
          <input
            type="text"
            placeholder="Any category"
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
            className="w-40 rounded-lg border border-stone-200 px-3 py-2 text-sm text-stone-700 focus:border-teal-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-stone-400">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="description"
            className="w-48 rounded-lg border border-stone-200 px-3 py-2 text-sm text-stone-700 focus:border-teal-500 focus:outline-none"
          />
        </div>
      </div>

      {/* TODO: wire to useMutation insert, opens a form/modal */}
      <button
        type="button"
        className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
        onClick={handleSubmit}
      >
        + Add Transaction
      </button>
    </div>
  );
};

export default TransactionForm;
