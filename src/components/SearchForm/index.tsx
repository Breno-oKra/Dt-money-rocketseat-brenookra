import { memo } from "react";
import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./style";
import { useForm } from "react-hook-form";
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionsContext } from "../../contexts/transactionsContext";
import { useContextSelector } from "use-context-selector";



/* 
    por que um componente renderiza?
     -  hooks changed
     -  props changed 
     -  parent rerendered  
*/

const searchFormSchema = z.object({
    query:z.string()
})
type SearchFormInput = z.infer<typeof searchFormSchema>
function SearchFormComponent(){
    /* const {fetchTransactions} = useContext(TransactionsContext) */
    const fetchTransactions = useContextSelector(TransactionsContext,(context) =>{
        return context.fetchTransactions
    })

    const {register,handleSubmit,formState:{isSubmitting}} = useForm<SearchFormInput>({
        resolver:zodResolver(searchFormSchema)
    })
    async function handleSearchTransactions(data:SearchFormInput){    
        await fetchTransactions(data.query)
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
/**
 * o memo compara tudo, se os hooks mudaram,props em relação a versão anterior a nova que veio
 * se mudou algo,ele vai permitir a nova renderização
 * o memo foi usado nesse caso somente para exemplo
 * ele deve ser usado somente em componentes complexos e com muitos calculos, para que esses componentes não seja renderizados desnecessariamente
 * usar o memo em casos simples como este pode ocasionar ate uma perca na perfomace
 */
export const SearchForm = memo(SearchFormComponent)