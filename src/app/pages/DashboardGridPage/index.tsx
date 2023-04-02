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
import { Button } from 'app/components/atoms/Button';
import { Model } from 'app/components/atoms/Model';
import axios from 'axios';
import { InputBox } from 'app/components/atoms/InputBox';
import { Loader } from 'app/components/atoms/Loader/Loadable';

interface Props {}

export function DashboardGridPage(props: Props) {
  const [dashboardsList, setdashboardsList] = React.useState([] as any);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { t, i18n } = useTranslation();

  const [showSaveModel, setShowSaveModel] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    axios
      .get('http://localhost:5000/dashboard/all')
      .then(res => {
        setdashboardsList(res.data);
        setIsLoading(false);
      })
      .catch(e => {
        setIsLoading(false);
      });
  }, [showSaveModel]);

  const SaveDashboardModel = () => {
    const [dashboardName, setDashboardName] = React.useState('');

    const onCancleClicked = () => {
      setShowSaveModel(false);
    };

    const onSaveClicked = () => {
      var formData = new FormData();
      formData.append('dashboardName', dashboardName);
      axios.post('http://localhost:5000/dashboard/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setShowSaveModel(false);
    };

    return (
      <Model
        width="40vw"
        height="30vh"
        show={showSaveModel}
        title="Create New Dashboard"
      >
        <div className="flex w-full h-full items-center justify-center">
          <div className="p-2 h-full relative overflow-auto flex w-full flex-col">
            <div className="flex flex-col h-full w-full">
              <div className="flex flex-col flex-1">
                <div>
                  <InputBox
                    onChange={e => {
                      setDashboardName(e.target.value);
                    }}
                    valuePass={dashboardName}
                    placeholder="Dashboard Name"
                  />
                </div>
              </div>
              <div className="flex flex-row  items-center justify-end">
                <Button
                  className="mx-1"
                  variant="outline"
                  title="Cancle"
                  onClick={onCancleClicked}
                />
                <Button className="mx-1" title="Save" onClick={onSaveClicked} />
              </div>
            </div>
          </div>
        </div>
      </Model>
    );
  };

  const DashboardCard = ({ title, dashboardId, updated_on }) => (
    <DashboardCardWrapper to={`/dashboards/${dashboardId}`}>
      <DashboardCardTitle>{title}</DashboardCardTitle>
      <div
        style={{ fontSize: 10 }}
        className="flex flex-row justify-between border-t"
      >
        <span>Modified: {updated_on}</span>
        <span></span>
      </div>
    </DashboardCardWrapper>
  );

  return (
    <PageWrapper
      title="Dashboard Grid Page"
      description="A Boilerplate application homepage"
    >
      <div className="p-4">
        <div className="px-2 py-2 mb-4 border-b flex flex-row justify-between items-end">
          <PageTitle>Dashboards ({dashboardsList.length})</PageTitle>
          <Button
            title="+ New"
            sm
            onClick={() => setShowSaveModel(true)}
          ></Button>
        </div>
        <div className="flex flex-wrap">
          {isLoading ? (
            <span className="flex flex-col item-center">
              <Loader />
            </span>
          ) : (
            dashboardsList.map((dashboard, i) => (
              <DashboardCard
                key={`dash-${i}`}
                title={dashboard.title}
                dashboardId={dashboard.id}
                updated_on={dashboard.updated_on}
              />
            ))
          )}
        </div>
      </div>
      <SaveDashboardModel />
    </PageWrapper>
  );
}

const PageTitle = styled.h2`
  /* margin-bottom: 0.25rem; */
  /* padding: 0.25rem 0.5rem; */
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
