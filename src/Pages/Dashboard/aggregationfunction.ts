import type { Transaction } from "../../types/Transaction";

export function aggregateTransactions(transactions: Transaction[]): {
  totalIncome: number
  totalExpense: number
  balance: number
  byCategory: { category: string; total: number }[]
}{
    const totalIncome = transactions
        .filter((transaction) => transaction.type === "income")
        .reduce((sum, transaction) => sum + transaction.amount, 0);

    const totalExpense = transactions
        .filter((transaction) => transaction.type === "expense")
        .reduce((sum, transaction) => sum + transaction.amount, 0);

    const balance = totalIncome - totalExpense;

    const byCategory = Object.values(
  transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = acc[t.category] ?? { category: t.category, total: 0 };
      acc[t.category].total += t.amount;
      return acc;
    }, {} as Record<string, { category: string; total: number }>)
);

    return {
        totalIncome,
        totalExpense,
        balance,
        byCategory
    };  
}