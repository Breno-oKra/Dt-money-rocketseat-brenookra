import { useContext } from "react"
import { TransactionsContext } from "../contexts/transactionsContext"

export function useSummary(){
    const {transactions} = useContext(TransactionsContext)
    // primeiro a função, depois a estrutura de dados inicial
    // const summary = transactions.reduce(() => {},{income:0,outcome:0,total:0})

    //acc - acumulate que é os dados iniciais {income:0,outcome:0,total:0}
    const summary = transactions.reduce(
        (acc,transactions) => {
            if(transactions.type == 'income'){
                acc.income += transactions.price
                acc.total += transactions.price
            }else{
                acc.outcome += transactions.price
                acc.total -= transactions.price
            }
            return acc

        },
        {income:0,outcome:0,total:0}
    )
    return summary
}