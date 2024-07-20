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
    const {register,handleSubmit} = useForm<SearchFormInput>({
        resolver:zodResolver(searchFormSchema)
    })
    function handleSearchTransactions(data:SearchFormInput){
        console.log(data)
    }
    return(
        <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
            <input 
            type="text" 
            placeholder="Busque uma tranza ação"
            {...register("query")} />
            <button type="submit">
                <MagnifyingGlass size={20}/>
                Buscar
                </button>
        </SearchFormContainer>
    )
}