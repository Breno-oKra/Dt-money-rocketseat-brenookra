import 'styled-components';
import { defaultTheme } from '../styles/themes/default';

type ThemeType = typeof defaultTheme

//com isso criamos a tipagem para nos ajudar a importar as cores do theme em outras paginas
// exmplo ${props => props.theme['green-500']}, o editor conseguira completar e achar as outras cores 
declare module 'styled-components' {
    export interface DefaultTheme extends ThemeType{}
}