/**
 *
 * NotebookPage
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
// import { useTranslation } from 'react-i18next';
// import { messages } from './messages';
import { PageWrapper } from 'app/components/layouts/PageWrapper';
import { Link } from 'react-router-dom';

interface Props {}

export function NotebookPage(props: Props) {
  const [dashboardsList, setdashboardsList] = React.useState([] as any);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { t, i18n } = useTranslation();

  const NotebookCard = ({ title, dashboardId }) => (
    <NotebookCardWrapper to={`/dashboards/${dashboardId}`}>
      <NotebookCardTitle>{title}</NotebookCardTitle>
      <div
        style={{ fontSize: 10 }}
        className="flex flex-row justify-between border-t"
      >
        <span>Modified: Jan 22, 2023, 10:53PM IST</span>
        <span></span>
      </div>
    </NotebookCardWrapper>
  );

  React.useEffect(() => {
    setdashboardsList([
      { title: 'Notebook 1' },
      { title: 'Notebook Example' },
      { title: 'Notebook 999' },
    ]);
  }, []);

  return (
    <PageWrapper
      title="Dashboard Grid Page"
      description="A Boilerplate application homepage"
    >
      <div className="p-4">
        <PageTitle className="border-b">
          Notebooks ({dashboardsList.length})
        </PageTitle>
        <div className="flex flex-wrap">
          {dashboardsList.map((dashboard, i) => (
            <NotebookCard title={dashboard.title} dashboardId={i} />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

const PageTitle = styled.h2`
  margin-bottom: 0.25rem;
  padding: 0.25rem 0.5rem;
  font-size: 16px;
  font-weight: 600;
`;

const NotebookCardTitle = styled.h2`
  margin-bottom: 0.25em;
  font-size: 14px;
`;

const NotebookCardWrapper = styled(Link)`
  border: 1px solid #e3e3e3;
  border-radius: 3px;
  padding: 0.5em 1em;
  margin: 0.51em;
  width: 250px;
  cursor: pointer;

  :hover {
    background-color: #f9f9f9;
  }
`;
