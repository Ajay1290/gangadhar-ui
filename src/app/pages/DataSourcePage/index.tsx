/**
 *
 * DataSourcePage
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
// import { useTranslation } from 'react-i18next';
// import { messages } from './messages';
import { PageWrapper } from 'app/components/layouts/PageWrapper';
import { DataGrid } from 'app/components/atoms/DataGrid/Loadable';

interface Props {}

export function DataSourcePage(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { t, i18n } = useTranslation();
  const dataSourceData = {
    columns: ['Name', 'File Type', 'Last Modified'],
    rows: [
      {
        Name: 'File 1',
        'File Type': 'CSV',
        'Last Modified': '20-02-2023',
      },
    ],
  };

  return (
    <PageWrapper
      title="Data Source Page"
      description="A Boilerplate application homepage"
    >
      <div className="p-4">
        <div className="px-2 py-2 border-b flex flex-row justify-between items-end">
          <PageHeading>Local Data Files</PageHeading>
          <NewButton>+ New</NewButton>
        </div>
        <div className="p-4">
          <DataGrid data={dataSourceData} />
        </div>
      </div>
    </PageWrapper>
  );
}

const PageHeading = styled.h2`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  color: #58585a;
`;

const NewButton = styled.button`
  background-color: #58585a;
  padding: 0.5rem 1rem;
  border-radius: 3px;
  margin: 0 5px;
  color: #fff;
  border: 1px solid #58585a;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 15px;

  :hover {
    background-color: #58585aee;
    border: 1px solid #58585aaa;
  }
`;
