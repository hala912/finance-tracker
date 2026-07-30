import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NewTransaction } from "../types/Transaction";
import { supabase } from "../Api/supabase";
import { useAuth } from "../context/AuthContext";

export function useAddTransaction(){
    const {user} = useAuth()
    const queryclient = useQueryClient()
     return useMutation({
        mutationFn: async (newtransaction:NewTransaction)=>{
            const {data , error } = await supabase
            .from('transactions')
            .insert({...newtransaction, user_id :user!.id})
            .select()
            .single();

            if(error)throw error
            return data
        },
        onSuccess :()=>{
            queryclient.invalidateQueries({queryKey: ['transactions',user?.id]})
        }

     })
}