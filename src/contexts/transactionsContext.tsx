
import { ReactNode, useEffect, useState, useCallback } from "react";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";
interface TransactionTYpe {
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createdAt: string;
}
interface CreateTransactionsInput {
    description: string;
    price: number;
    category: string;
    type: "income" | 'outcome';
}
interface TransactionsContextTYPE {
    transactions: TransactionTYpe[]
    fetchTransactions: (query?: string) => Promise<void>
    createTransactions: (data: CreateTransactionsInput) => Promise<void>
}
export const TransactionsContext = createContext({} as TransactionsContextTYPE)
interface TransactionProviderProps {
    children: ReactNode
}
export function TransactionsProvider({ children }: TransactionProviderProps) {
    const [transactions, setTransaction] = useState<TransactionTYpe[]>([])


    /* useCallback impede que uma função seja criada quando seu conteudo interno não muda */
    /* funciona com em useEfect, so atualiza quando as variaveis de dependencia é atualizada*/
    const createTransactions = useCallback(async function (data: CreateTransactionsInput) {
        const { description, category, price, type } = data
        /*  await new Promise(resolve => setTimeout(resolve, 2000)) */
        const response = await api.post('transactions', {
            description,
            category,
            price,
            type,
            createdAt: new Date()
        })
        setTransaction(state => [response.data, ...state])
    }, [])
    const fetchTransactions = useCallback(async function (query?: string) {
        const response = await api.get("transactions", {
            params: {
                _sort: 'createdAt',
                _order: "desc",
                q: query
            }
        })
        setTransaction(response.data)
    }, [])
    useEffect(() => {
        fetchTransactions()
    }, [])
    return (
        <TransactionsContext.Provider value={{ transactions, fetchTransactions, createTransactions }}>
            {children}
        </TransactionsContext.Provider>
    )
}