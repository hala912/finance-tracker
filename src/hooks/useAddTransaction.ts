import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NewTransaction, Transaction } from "../types/Transaction";
import { supabase } from "../Api/supabase";
import { useAuth } from "../context/AuthContext";

export function useAddTransaction(page: number, searchTerm?: string) {
  const { user } = useAuth();
  const queryclient = useQueryClient();
  const querykey = ["transactions", user?.id, page , searchTerm];

  return useMutation({
    mutationFn: async (newtransaction: NewTransaction) => {
      const { data, error  } = await supabase
        .from("transactions")
        .insert({ ...newtransaction, user_id: user!.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: querykey });
    },
    onMutate: async (newtransaction: NewTransaction) => {
      const queryKey = querykey;
      const optimisticTransaction: Transaction = {
        ...newtransaction,
        id: crypto.randomUUID(), // temporary, replaced after invalidate refetches
        user_id: user!.id,
        created_at: new Date().toISOString(),
      };
      await queryclient.cancelQueries({ queryKey });

      const perviousTransactions = queryclient.getQueryData(queryKey);
      queryclient.setQueryData(
        queryKey,
        (
          oldData: { data: Transaction[]; count: number } = {
            data: [],
            count: 0,
          },
        ) => ({
          ...oldData,
          data: [...oldData.data, optimisticTransaction],
          count: oldData.count + 1,
        }),
      );
      return { perviousTransactions };
    },
    onError: (err, newTransaction, context) => {
      // Check if we have our previous snapshot stored in context
      if (context?.perviousTransactions) {
        // Reset the cache back to exactly how it looked before onMutate ran
        queryclient.setQueryData(
          querykey,
          context.perviousTransactions,
        );
      }
    },
  });
}
