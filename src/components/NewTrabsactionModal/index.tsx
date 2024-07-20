import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { Close, Content, Overlay, TransactionType, TransactionTypeButton } from "./style"
import * as Dialog from '@radix-ui/react-dialog';
import * as z from 'zod'
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { TransactionsContext } from "../../contexts/transactionsContext";


const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome']),


})
type NewTransactionsFormInputs = z.infer<typeof newTransactionFormSchema>;
export const NewTransationModal = () => {
    const {createTransactions} = useContext(TransactionsContext)
    const { control, register, handleSubmit, formState: { isSubmitting }, reset } = useForm<NewTransactionsFormInputs>({
        resolver: zodResolver(newTransactionFormSchema),
        defaultValues: {
            type: "income"
        }
    })
    async function handleCreateNewTransactioins(data: NewTransactionsFormInputs) {
        const { description, category, price, type } = data
        /*  await new Promise(resolve => setTimeout(resolve, 2000)) */
        await createTransactions({
            description,
            price,
            category,
            type
        })
        reset()
    }
   
    return (

        <Dialog.Portal>
            <Overlay />
            <Content>
                <Dialog.Title>Nova Transação</Dialog.Title>
                <Close><X /></Close>
                <form onSubmit={handleSubmit(handleCreateNewTransactioins)}
                >
                    <input type="text" placeholder="Descrição" {...register("description")} required />
                    <input type="number" placeholder="Preço" {...register("price", { valueAsNumber: true })} required />
                    <input type="text" placeholder="Categoria" {...register("category")} required />
                    <Controller
                        control={control}
                        name="type"
                        render={({ field }) => {
                            return (
                                <TransactionType onValueChange={field.onChange} value={field.value}>
                                    <TransactionTypeButton variant="income" value="income">
                                        <ArrowCircleUp size={24} />
                                        Entrada
                                    </TransactionTypeButton>
                                    <TransactionTypeButton variant="outcome" value="outcome">
                                        <ArrowCircleDown size={24} />
                                        Saida
                                    </TransactionTypeButton>
                                </TransactionType>
                            )
                        }}
                    />

                    <button type="submit" disabled={isSubmitting}>Cadastrar</button>
                </form>


            </Content>
        </Dialog.Portal>

    )
}