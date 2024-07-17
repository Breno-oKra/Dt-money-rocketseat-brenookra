import { HeaderContainer, HeaderContent, NewTransactionButton } from "./style";
import logoImage from "../../assets/logo.svg"
export function Header(){
    return(
        <HeaderContainer>
            <HeaderContent>
                <img src={logoImage} alt="" />
                <NewTransactionButton>Nova Transação</NewTransactionButton>
            </HeaderContent>
        </HeaderContainer>
    )
}