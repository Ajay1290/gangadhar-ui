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
    background: ${props => (props.theme as any).secondary};
    /* #58585a */
    color: ${props => (props.theme as any).primary};
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

  .tooltip {
    position: absolute;

    display: block;
    visibility: hidden;
    box-sizing: border-box;
    z-index: 2200;
    max-width: 250px;
    width: max-content;

    /* background-color: white; */

    border: 1px solid #58585a33;
    border-radius: 2px;

    padding: 5px 10px;

    font-family: 'Inter';
    font-size: 10px;
    line-height: 12px;
    color: ${props => (props.theme as any).secondary};

    background: rgba(88, 88, 90, 0.8);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);

    border: 1px solid rgba(88, 88, 90, 1);

    transition: 500ms;
    transition-delay: 100ms;
    transition-timing-function: linear;
  }

.tooltip::before {
  content: '';
  background-color: ${props => (props.theme as any).secondary};

  height: 2px;
  width: 100%;
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 5px;
}
`;
