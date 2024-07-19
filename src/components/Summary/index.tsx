import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { SummaryCard, SummaryContainer } from "./style";
import { useContext } from "react";
import { TransactionsContext } from "../../contexts/transactionsContext";

export function Summary() {
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
    return (
        <SummaryContainer>
            <SummaryCard>
                <header>
                    <span>Entradas</span>
                    <ArrowCircleUp size={32} color="#00b37e"/>
                </header>
                <strong>R$ {summary.income}</strong>
            </SummaryCard>
            <SummaryCard>
                <header>
                    <span>Saídas</span>
                    <ArrowCircleDown size={32} color="#f75a68"/>
                </header>
                <strong>R$ {summary.outcome}</strong>
            </SummaryCard>
            <SummaryCard variant="green">
                <header>
                    <span>Total</span>
                    <CurrencyDollar size={32} color="#fff"/>
                </header>
                <strong>R$ {summary.total}</strong>
            </SummaryCard>
        </SummaryContainer>
    )
}