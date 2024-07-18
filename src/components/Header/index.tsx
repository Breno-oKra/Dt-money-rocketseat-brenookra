import * as Dialog from '@radix-ui/react-dialog';
import { HeaderContainer, HeaderContent, NewTransactionButton } from "./style";
import logoImage from "../../assets/logo.svg"
import { NewTransationModal } from '../NewTrabsactionModal';
export function Header() {
    return (
        <HeaderContainer>
            <HeaderContent>
                <img src={logoImage} alt="" />
                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <NewTransactionButton>Nova Transação</NewTransactionButton>
                    </Dialog.Trigger>
                    <NewTransationModal />
                </Dialog.Root >
            </HeaderContent>
        </HeaderContainer>
    )
}