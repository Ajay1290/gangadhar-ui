/**
 * index.tsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

// Use consistent styling
import 'sanitize.css/sanitize.css';

// Import root app
import { App } from 'app';

import { HelmetProvider } from 'react-helmet-async';

import { configureAppStore } from 'store/configureStore';

import reportWebVitals from 'reportWebVitals';

// Initialize languages
import './locales/i18n';
import { ThemeProvider } from 'styled-components';

const store = configureAppStore();
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

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

const theme = {
  ...lightTheme,
};

root.render(
  <Provider store={store}>
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <App theme={theme} />
      </ThemeProvider>
    </HelmetProvider>
  </Provider>,
);

// Hot reloadable translation json files
if (module.hot) {
  module.hot.accept(['./locales/i18n'], () => {
    // No need to render the App again because i18next works with the hooks
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
