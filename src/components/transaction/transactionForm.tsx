import { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";



const TransactionForm = ({ page, searchTerm }: { page: number; searchTerm?: string }) => {
  
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("");
  const [type ,setType] = useState<'income' | 'expense'>('expense');
  const [submitError, setSubmitError] = useState(false);
  
  const today = new Date().toISOString().split('T')[0]
 
  const { mutate , isError : isAddError } = useAddTransaction(page, searchTerm);

  const isValidAmount = !isNaN(Number(amount)) && Number(amount) > 0;
  const isValidCategory = category.trim() !== "";
  const isValidDescription = description.trim() !== "";

  const handleSubmit = () => {
    if (!isValidAmount || !isValidCategory || !isValidDescription) {
     
      setSubmitError(true);
      return;
    }
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
          {
            submitError && !isValidAmount && (
              <span className="text-xs text-rose-600">Please enter a valid amount.</span>
            )
          }
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
          {
            submitError && !isValidCategory && (
              <span className="text-xs text-rose-600">Please enter a category.</span>
            )
          }
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
          {
            submitError && !isValidDescription && (
              <span className="text-xs text-rose-600">Please enter a description.</span>
            )
          }
        </div>
      </div>

      
      <button
        type="button"
        className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
        onClick={handleSubmit}
      >
        + Add Transaction
      </button>
      
      {
        isAddError && (
          <div className="bg-rose-100 text-rose-700 px-5 py-3 text-sm">
            Failed to add transaction. Please try again.
          </div>
        )
      }
    </div>
  );
};

export default TransactionForm;
