/**
 *
 * DashboardGridPage
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
// import { useTranslation } from 'react-i18next';
// import { messages } from './messages';
import { PageWrapper } from 'app/components/layouts/PageWrapper';
import { Link } from 'react-router-dom';

interface Props {}

export function DashboardGridPage(props: Props) {
  const [dashboardsList, setdashboardsList] = React.useState([] as any);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { t, i18n } = useTranslation();

  const DashboardCard = ({ title, dashboardId }) => (
    <DashboardCardWrapper to={`/dashboards/${dashboardId}`}>
      <DashboardCardTitle>{title}</DashboardCardTitle>
      <div
        style={{ fontSize: 10 }}
        className="flex flex-row justify-between border-t"
      >
        <span>Modified: Jan 22, 2023, 10:53PM IST</span>
        <span></span>
      </div>
    </DashboardCardWrapper>
  );

  React.useEffect(() => {
    setdashboardsList([
      { title: 'Dashboard 1' },
      { title: 'Bar Chart Dashboard' },
      { title: 'Data Grid Dashboard' },
    ]);
  }, []);

  return (
    <PageWrapper
      title="Dashboard Grid Page"
      description="A Boilerplate application homepage"
    >
      <div className="p-4">
        <PageTitle className="border-b">
          Dashboards ({dashboardsList.length})
        </PageTitle>
        <div className="flex flex-wrap">
          {dashboardsList.map((dashboard, i) => (
            <DashboardCard title={dashboard.title} dashboardId={i} />
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

const DashboardCardTitle = styled.h2`
  margin-bottom: 0.25em;
  font-size: 14px;
`;

const DashboardCardWrapper = styled(Link)`
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
