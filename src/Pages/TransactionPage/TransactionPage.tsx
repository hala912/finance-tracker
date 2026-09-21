import { useEffect, useState } from "react";
import { TransactionsSkeleton } from "../../components/common/loading";
import { Navbar } from "../../components/navbar/navbar";
import TransactionForm from "../../components/transaction/transactionForm";
import TransactionsRow from "../../components/transaction/transactionRow";
import { useTransaction } from "../../hooks/useTransaction";

export default function TransactionsPage() {

   const [searchTerm, setSearchTerm] = useState("");
   const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

   useEffect(() => {
     const handler = setTimeout(() => {
       setDebouncedSearchTerm(searchTerm);
     }, 300);
     return () => clearTimeout(handler);
    }, [searchTerm]);
    
      const { data, page, setPage , isPending, isError, error } = useTransaction(debouncedSearchTerm);

   // Debounce the search term to avoid excessive API calls while typing.
  if (isPending) return <TransactionsSkeleton/>
  if (isError) return <p>Something went wrong: {error.message}</p>;

 return (
  <div className="min-h-screen bg-[#FBF3EF]">
    <Navbar />

    <main className="mx-auto max-w-6xl px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-stone-900">Transactions</h1>
        <p className="mt-1 text-sm text-stone-500">Manage and track your financial flow with precision.</p>
      </div>

      <TransactionForm page={page} searchTerm={debouncedSearchTerm} />
      <TransactionsRow data={data} page={page} setPage={setPage} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </main>
  </div>
)
}
