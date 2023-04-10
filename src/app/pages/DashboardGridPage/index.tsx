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
import { FiEdit3 } from 'react-icons/fi';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';

interface Props {}

export function DashboardGridPage(props: Props) {
  const [dashboardsList, setDashboardsList] = React.useState([] as any);
  const [showSaveModel, setShowSaveModel] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedDashboard, setSelectedDashboard] = React.useState({} as any);

  React.useEffect(() => {
    getAllDashboards();
  }, [showSaveModel]);

  const getAllDashboards = () => {
    axios
      .get('http://localhost:5000/dashboard/all')
      .then(res => {
        setDashboardsList(res.data);
        setIsLoading(false);
      })
      .catch(e => {
        setIsLoading(false);
      });
  };

  const onEditClicked = ({ title, dashboardId }) => {
    setSelectedDashboard({ title, dashboardId });
    setShowSaveModel(true);
  };

  const onDeleteClicked = dashboardId => {
    axios
      .delete(`http://localhost:5000/dashboard/delete/${dashboardId}`)
      .then(res => {
        console.log('res: ', res);
        getAllDashboards();
      })
      .catch(err => {
        console.log('err: ', err);
        getAllDashboards();
      });
  };

  const SaveDashboardModel = ({ name = '', dashboardId }) => {
    const [dashboardName, setDashboardName] = React.useState(name);

    const onCancleClicked = () => {
      setShowSaveModel(false);
      setSelectedDashboard({});
    };

    /**
     * Will Edit Dashboard via calling an API
     */
    const onEditClicked = () => {
      var formData = new FormData();
      formData.append('dashboardName', dashboardName);
      axios
        .put(`http://localhost:5000/dashboard/edit/${dashboardId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          getAllDashboards();
        })
        .catch(err => {
          console.log('err: ', err);
        });
      setShowSaveModel(false);
      setSelectedDashboard({});
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
      setSelectedDashboard({});
    };

    return (
      <Model
        width="40vw"
        height="30vh"
        show={showSaveModel}
        title={
          selectedDashboard.title ? 'Edit Dashboard' : 'Create New Dashboard'
        }
        onClose={() => {
          setShowSaveModel(false);
          setSelectedDashboard({});
        }}
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
                  title="Cancel"
                  onClick={onCancleClicked}
                />
                {selectedDashboard.title ? (
                  <Button
                    className="mx-1"
                    title="Edit"
                    onClick={onEditClicked}
                  />
                ) : (
                  <Button
                    className="mx-1"
                    title="Save"
                    onClick={onSaveClicked}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Model>
    );
  };

  const DashboardCard = ({ title, dashboardId, updated_on }) => (
    <DashboardCardWrapper>
      <DashboardCardTitle to={`/dashboards/${dashboardId}`}>
        {title}
      </DashboardCardTitle>
      <div
        style={{ fontSize: 10 }}
        className="flex flex-row justify-between border-t py-1"
      >
        <span>
          <span className="font-medium mr-1">Modified:</span>
          <span>{new Date(updated_on).toLocaleString()}</span>
        </span>
        <span className="flex flex-row">
          <span className="pl-1">
            <FiEdit3
              onClick={() => onEditClicked({ title, dashboardId })}
              cursor={'pointer'}
              fontSize={14}
            />
          </span>
          <span className="pl-1">
            <AiOutlineDelete
              onClick={() => onDeleteClicked(dashboardId)}
              cursor={'pointer'}
              fontSize={14}
            />
          </span>
        </span>
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
            startIcon={<AiOutlinePlus color={'#FFF'} />}
            title="New"
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
      <SaveDashboardModel
        name={selectedDashboard.title}
        dashboardId={selectedDashboard.dashboardId}
      />
    </PageWrapper>
  );
}

const PageTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;

  :hover {
    background-color: #f9f9f9;
  }
`;

const DashboardCardTitle = styled(Link)`
  margin-bottom: 0.25em;
  font-size: 14px;
  cursor: pointer;
`;

const DashboardCardWrapper = styled.div`
  border: 1px solid #e3e3e3;
  border-radius: 3px;
  padding: 0.5em 1em;
  margin: 0.51em;
  width: 250px;

  :hover {
    background-color: #f9f9f9;
  }
`;
