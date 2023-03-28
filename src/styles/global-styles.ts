import { createGlobalStyle } from 'styled-components';
import './main.css';

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }
  
  body {
    font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 12px;
    font-style: normal;
    color: #58585a;
  }

  #root {
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: 'Inter', Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  }
`;
