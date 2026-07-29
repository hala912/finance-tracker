import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../context/AuthContext"
import { supabase } from "../Api/supabase"

export function Usetransition() {

    const { user } = useAuth() 
    return useQuery(
        {
            queryKey : ['transactions', user?.id],
            queryFn : async ()=>{
                const {data , error}= await supabase
                .from('transactions')
                .select('*')
                .eq('user_id', user!.id)
                
                if(error) throw error
                return data
            },
            enabled: !!user
        }
    ) 
}