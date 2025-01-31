
import { useContextSelector } from "use-context-selector";
import { Header } from "../../components/Header";
import { SearchForm } from "../../components/SearchForm";
import { Summary } from "../../components/Summary";
import { PriceHightLight, TransactionsContainer, TransactionsTable } from "./style";
import { TransactionsContext } from "../../contexts/transactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";


export function Transactions() {
    /* const {transactions} = useContext(TransactionsContext) */
    const transactions = useContextSelector(TransactionsContext, (context) => {
        return context.transactions
      })
    return (
        <div>
            <Header />
            <Summary />

            <TransactionsContainer>
                <SearchForm />
                <TransactionsTable>
                    <tbody>
                        {
                            transactions.map(transaction => {
                                return (
                                    <tr key={transaction.id}>
                                        <td width="40%">{transaction.description}</td>
                                        <td>
                                            <PriceHightLight variant={transaction.type}>
                                                {transaction.type == 'outcome' && "- "}
                                                {priceFormatter.format(transaction.price)}
                                            </PriceHightLight>
                                        </td>
                                        <td>{transaction.category}</td>
                                        <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
                                    </tr>
                                )
                            })
                        }


                    </tbody>
                </TransactionsTable>
            </TransactionsContainer>
        </div>
    )
}