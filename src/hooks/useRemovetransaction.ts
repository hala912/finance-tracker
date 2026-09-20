import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../Api/supabase";
import { useAuth } from "../context/AuthContext";
import type { Transaction } from "../types/Transaction";

export function useRemoveTransaction(page:number){

    const {user } = useAuth()
    const queryClient = useQueryClient()
    const querykey = ['transactions', user?.id,page]
    return useMutation({
        mutationFn: async (id : string)=>{
            const { error } = await supabase
            .from('transactions')
            .delete()
            .eq('id' ,id )

            if (error) throw error

        },
        onMutate: async (id :string)=>{
          
            await queryClient.cancelQueries({queryKey: querykey})
            const pervioustransaction = queryClient.getQueryData(querykey)
             queryClient.setQueryData(querykey, (oldData: { data: Transaction[]; count: number } = { data: [], count: 0 }) => ({
                ...oldData,
                data:oldData.data.filter((t) => t.id !== id),
                count: oldData.count - 1,
              }))

            return {pervioustransaction}
        },
        onError:(error , id , context )=>{
            if (context?.pervioustransaction){
                queryClient.setQueryData(querykey,context.pervioustransaction)
            }
        },
        onSuccess :()=>{
            queryClient.invalidateQueries({ queryKey: querykey });
        }
        
    })

}