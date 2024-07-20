import { createContext, ReactNode, useEffect, useState } from "react";

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
        const url = new URL("http://localhost:3000/transactions")
        if(query){  
            url.searchParams.append("q",query)
        }   
        const response = await fetch(url)
        const data = await response.json()
        setTransaction(data)
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