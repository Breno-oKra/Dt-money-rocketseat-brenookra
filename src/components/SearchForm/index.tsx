import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./style";
import { useForm } from "react-hook-form";
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";

const searchFormSchema = z.object({
    query:z.string()
})
type SearchFormInput = z.infer<typeof searchFormSchema>
export function SearchForm(){
    /* desestruturando função dentro de objeto */
    const {register,handleSubmit,formState:{isSubmitting}} = useForm<SearchFormInput>({
        resolver:zodResolver(searchFormSchema)
    })
    /* simulando uma requisição para dar um delay na chamada, por isso usamos async e promise */
    async function handleSearchTransactions(data:SearchFormInput){
        await new Promise(resolve => setTimeout(resolve,2000))
        console.log(data)
    }
    return(
        <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
            <input 
            type="text" 
            placeholder="Busque uma tranza ação"
            {...register("query")} />
            <button type="submit" disabled={isSubmitting}>
                <MagnifyingGlass size={20}/>
                Buscar
                </button>
        </SearchFormContainer>
    )
}