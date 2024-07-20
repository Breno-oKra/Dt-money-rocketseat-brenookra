import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface TransactionTYpe {
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createdAt: string;
}
interface TransactionsContextTYPE {
    transactions: TransactionTYpe[],
    fetchTransactions:(query?:string) => Promise<void>
}
export const TransactionsContext = createContext({} as TransactionsContextTYPE)
interface TransactionProviderProps {
    children: ReactNode
}
export function TransactionsProvider({ children }: TransactionProviderProps) {
    const [transactions, setTransaction] = useState<TransactionTYpe[]>([])
    async function fetchTransactions(query?:string) {
       const response = await api.get("transactions",{
        params:{
            q:query
        }
       })
        setTransaction(response.data)
    }
    useEffect(() => {
        fetchTransactions()
    }, [])
    return (
        <TransactionsContext.Provider value={{ transactions,fetchTransactions}}>
            {children}
        </TransactionsContext.Provider>
    )
}