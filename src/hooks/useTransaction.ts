import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../context/AuthContext"
import { supabase } from "../Api/supabase"
import { useState } from "react"

export function useTransaction() {

    const pageSize = 10 
    const [page,setPage] = useState(0)
     const from = page * pageSize
     const to = from + (pageSize-1)
    const { user } = useAuth()


    const query =  useQuery(
        {
            queryKey : ['transactions', user?.id, page],
            queryFn : async ()=>{
                const {data , error, count}= await supabase
                .from('transactions')
                .select('*', {count : 'exact'})
                .eq('user_id', user!.id)
                .range(from , to )
                
                
                if(error) throw error
                return {data,count:count??0}
            },
            enabled: !!user
        }
    ) 
     return { ...query, page, setPage }  
}

