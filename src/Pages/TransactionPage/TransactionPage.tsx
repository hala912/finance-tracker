import { useAuth } from "../../context/AuthContext"
import { Usetransition } from "../../hooks/useTransaction"

const TransactionPage  = ()=>{

    const {data} = Usetransition()
    const {user } = useAuth()
    console.log(data , user )
   return (
    <div>
      
    </div>
)
}

export default TransactionPage