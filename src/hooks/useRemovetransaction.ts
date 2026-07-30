import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../Api/supabase";
import { useAuth } from "../context/AuthContext";

export function useRemoveTransaction(){

    const {user } = useAuth()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (id : string)=>{
            const { error } = await supabase
            .from('transactions')
            .delete()
            .eq('id' ,id )

            if (error) throw error

        },
        onSuccess :()=>{
            queryClient.invalidateQueries({ queryKey: ['transactions', user?.id] });
        }
        
    })

}