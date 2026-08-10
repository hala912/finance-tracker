import type { Transaction } from "../../types/Transaction";

export function MonthlyTrend(transaction: Transaction[]): {
  monthlyTrend: { month: string; total: number }[];
} {
  const totalspend = Object.values(
    transaction
      .filter((t) => t.type === "expense")
      .reduce(
        (acc, t) => {
          const month = new Date(t.occurred_on).toLocaleString("default", {
            month: "short",
            year: "numeric",
          });
          acc[month] = acc[month] ?? { month, total: 0 };
          acc[month].total += t.amount;
          return acc;
        },
        {} as Record<string, { month: string; total: number }>,
      ),

  );
  totalspend.sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());
  return { monthlyTrend: totalspend };
}
