/**
 *
 * NotebookGridPage
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';

import { PageWrapper } from 'app/components/layouts/PageWrapper';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Loader } from 'app/components/atoms/Loader';

interface Props {}

export function NotebookGridPage(props: Props) {
  const [notebookList, setNotebookList] = React.useState([] as any);
  const [isLoading, setIsLoading] = React.useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { t, i18n } = useTranslation();

  const NotebookCard = ({ notebook }) => (
    <NotebookCardWrapper to={`/notebooks/${notebook.id}`}>
      <NotebookCardTitle>
        {notebook.path.split('/')[notebook.path.split('/').length - 1]}
      </NotebookCardTitle>
      <div
        style={{ fontSize: 10 }}
        className="flex flex-row justify-between border-t"
      >
        <span style={{ fontSize: 8 }}>
          <span>Modified: </span>
          Jan 22, 2023, 10:53PM IST
        </span>
        <span></span>
      </div>
    </NotebookCardWrapper>
  );

  React.useEffect(() => {
    fetchNotebooks();
  }, []);

  const fetchNotebooks = () => {
    setIsLoading(true);
    axios
      .get('http://localhost:8080/api/notebook')
      .then((res: any) => {
        console.log('d; ', res);
        setNotebookList(res.data.body);
        setIsLoading(false);
      })
      .catch(e => {
        console.log('E: ', e);
        setIsLoading(false);
      });
  };

  return (
    <PageWrapper
      title="Dashboard Grid Page"
      description="A Boilerplate application homepage"
    >
      <div className="p-4">
        <PageTitle className="border-b">
          Notebooks ({notebookList.length})
        </PageTitle>
        <div className="w-full h-full flex flex-col items-center justify-center">
          {isLoading ? (
            <Loader />
          ) : (
            <div className="flex flex-wrap">
              {notebookList.map((notebook, i) => (
                <NotebookCard key={`notebook-${i}`} notebook={notebook} />
              ))}
            </div>
          )}
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
  height: 100%;
`;

const NotebookCardWrapper = styled(Link)`
  border: 1px solid #e3e3e3;
  border-radius: 3px;
  padding: 0.5em 1em;
  margin: 0.51em;
  width: 240px;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  :hover {
    background-color: #f9f9f9;
  }
`;
