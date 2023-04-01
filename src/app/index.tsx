/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './pages/HomePage/Loadable';
import { NotFoundPage } from './pages/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { DataSourcePage } from './pages/DataSourcePage';
import { DashboardGridPage } from './pages/DashboardGridPage';
import { DashboardPage } from './pages/DashboardPage';
import { NotebookPage } from './pages/NotebookPage';
import { Wizard } from './pages/Wizard/Loadable';
import { NotebookGridPage } from './pages/NotebookGridPage';

export function App({ theme }: { theme?: any }) {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter basename="/gangadhar-ui">
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wizards" element={<Wizard />} />
        <Route path="/insight/:insightId" element={<Wizard />} />
        <Route path="/dashboards" element={<DashboardGridPage />} />
        <Route path="/dashboards/:dashboardId" element={<DashboardPage />} />
        <Route path="/data-source" element={<DataSourcePage />} />
        <Route path="/notebooks" element={<NotebookGridPage />} />
        <Route path="/notebooks/:notebookId" element={<NotebookPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <GlobalStyle theme={theme} />
    </BrowserRouter>
  );
}
