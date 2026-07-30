import TransactionForm from "../../components/transaction/transactionForm";
import TransactionsRow from "../../components/transaction/transactionRow";



export default function TransactionsPage() {


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
        <TransactionForm/>

        {/* Table */}
        <TransactionsRow/>
        
      </main>
    </div>
  );
}
