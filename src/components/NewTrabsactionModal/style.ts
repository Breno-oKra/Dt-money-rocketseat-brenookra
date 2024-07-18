import styled from "styled-components";
import * as Dialog from '@radix-ui/react-dialog';
export const Overlay = styled(Dialog.Overlay)`
    position: fixed;
    width: 100vw;
    height: 100vh;
    inset: 0;
  /*   
    inset:0; é o mesmo que:
    top:0;
    right: 0;
    left: 0;
    bottom: 0; */

`
export const Content = styled(Dialog.Content)`
    
`