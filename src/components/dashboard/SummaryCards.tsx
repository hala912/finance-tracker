import { ArrowDownLeft, ArrowUpRight, Wallet } from "lucide-react";

function SummaryCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 flex-1 min-w-[180px]">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium tracking-wide text-stone-400 uppercase">
          {label}
        </span>
        <Icon className="w-4 h-4 text-stone-500" />
      </div>
      <div className="text-2xl font-semibold text-stone-900">
        {currency(value)}
      </div>
    </div>
  );
}

function currency(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export function SummaryCards({
  totalIncome,
  totalExpense,
  balance,
}: {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <SummaryCard
        label="Total Income"
        value={totalIncome}
        icon={ArrowDownLeft}
      />
      <SummaryCard
        label="Total Expenses"
        value={totalExpense}
        icon={ArrowUpRight}
      />
      <SummaryCard label="Net Balance" value={balance} icon={Wallet} />
    </div>
  );
}
