import { Header } from "../../components/Header";
import { SearchForm } from "../../components/SearchForm";
import { Summary } from "../../components/Summary";
import { PriceHightLight, TransactionsContainer, TransactionsTable } from "./style";

export function Transactions() {
    return (
        <div>
            <Header />
            <Summary />

            <TransactionsContainer>
                <SearchForm />
                <TransactionsTable>
                    <tbody>
                        <tr>
                            <td width="50%">Desenvolvimento de site</td>
                            <td>
                                <PriceHightLight variant="income">
                                    R$ 12.000,00
                                </PriceHightLight>
                            </td>
                            <td>venda</td>
                            <td>13/03/2024</td>
                        </tr>
                        <tr>
                            <td width="50%">Desenvolvimento de site</td>
                            <td>
                                <PriceHightLight variant="outcome">
                                    - R$ 590,00
                                </PriceHightLight>
                            </td>
                            <td>pizza</td>
                            <td>18/03/2024</td>
                        </tr>
                    </tbody>
                </TransactionsTable>
            </TransactionsContainer>
        </div>
    )
}