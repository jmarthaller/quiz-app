import styled, { createGlobalStyle } from 'styled-components';
import BGImage from './images/ski-background.jpg';

export const GlobalStyle = createGlobalStyle`
html {
    height: 100%;
}

body {
    background-image: url(${BGImage});
    background-size: cover;
    margin: 0;
    padding: 0 20px;
    display: flex;
    justify-content: center;
}
`