
export type Transaction = {
  id: string;
  user_id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  occurred_on: string;
  created_at: string;
};

export type NewTransaction = Omit<Transaction, 'id' | 'user_id' | 'created_at'>;