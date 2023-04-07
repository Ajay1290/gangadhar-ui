import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { withThemeFromJSXProvider } from '@storybook/addon-styling';
import { GlobalStyles } from '../src/styles/global-styles';

const lightTheme = {
  primary: '#58585a',
  secondary: '#fff',
  disabled: '#58585acc',
};

const darkTheme = {
  primary: '#f1f1f1',
  secondary: '#58585a',
  disabled: '#f1f1f1cc',
};

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
    defaultTheme: 'light',
    Provider: ThemeProvider,
    GlobalStyles,
  }),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
