
import { useAuth } from "../context/AuthContext"
import { supabase } from "../Api/supabase"
import { useQuery } from "@tanstack/react-query"



export function useTransactionAll(){
    const {user} = useAuth()
    const query =  useQuery(
        {
            queryKey : ['transactions','all', user?.id],
            queryFn: async ()=>{
               const {error,data} =  await supabase
                .from('transactions')
                .select('*')
                .eq('user_id', user?.id)

                if (error) throw error 

                return data
            },
            enabled: !!user?.id
        }
    )
    return query
}