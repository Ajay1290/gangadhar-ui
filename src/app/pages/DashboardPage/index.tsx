/**
 *
 * DashboardPage
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
// import { useTranslation } from 'react-i18next';
// import { messages } from './messages';
import { PageWrapper } from 'app/components/layouts/PageWrapper';
import { Insight } from 'app/components/molecules/Insight';
import axios from 'axios';
import { Loader } from 'app/components/atoms/Loader';
import { useNavigate, useParams } from 'react-router-dom';

interface Props {}

export function DashboardPage(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { t, i18n } = useTranslation();

  const [isLoading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();

  const [dashboard, setDashboard] = React.useState({} as any);
  const { dashboardId } = useParams();

  React.useEffect(() => {
    console.log(dashboardId);
    if (dashboardId !== null) {
      axios
        .get(`http://localhost:5000/dashboard/${dashboardId}`)
        .then(res => {
          if (res.data) {
            console.log(res.data);
            setDashboard(res.data);
            setIsLoading(false);
          } else {
            throw new Error("Dashboard Doesn't Exists");
          }
        })
        .catch(e => {
          // TODO: Add Notification that dashboard do not exists
          navigate('/dashboards');
          setIsLoading(false);
        });
    } else {
      // TODO: Add Notification that dashboard do not exists
      navigate('/dashboards');
    }
  }, []);

  const getData = async insight => {
    console.log('measures: ', insight.measures);
    const res = await axios.get(
      `http://localhost:5000/tables/${
        insight.measures[0].table_id
      }/query?groupBy=${insight.group_by.map(d => d.title)}&aggType=${
        insight.agg_type
      }`,
    );
    const columns = insight.measures;
    console.log('SDA: ', res);
    return { columns, rows: res.data.data };
  };

  return (
    <PageWrapper
      title="Dashboard Page"
      description="A Boilerplate application homepage"
    >
      {isLoading ? (
        <span>
          <Loader />
        </span>
      ) : (
        <div className="p-1">
          <div className="px-2 py-2  flex flex-row justify-between items-end">
            <PageTitle>{dashboard.title}</PageTitle>
          </div>
          <div className="p-4">
            {dashboard.insights.map((insight, i) => (
              <Insight
                key={`inc-${i}`}
                title={insight.title}
                id={insight.id}
                insightType="table"
                dataApi={getData(insight)}
              />
            ))}
          </div>
        </div>
      )}
    </PageWrapper>
  );
}

const PageTitle = styled.h2`
  /* margin-bottom: 0.25rem; */
  /* padding: 0.25rem 0.5rem; */
  font-size: 16px;
  font-weight: 600;
`;
