/**
 *
 * SchemaListingPage
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import { PageWrapper } from 'app/components/layouts/PageWrapper';
import axios from 'axios';
import { DataGrid } from 'app/components/atoms/DataGrid/Loadable';
import { useNavigate } from 'react-router-dom';

interface Props {}

export function SchemaListingPage(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [tables, setTables] = React.useState([] as any);

  React.useEffect(() => {
    axios
      .get('http://localhost:5000/tables/all')
      .then(res => {
        setTables(res.data);
      })
      .catch(err => {});
  }, []);

  return (
    <PageWrapper title="Schema Page" description="">
      <div className="p-4">
        <h1 className="text-xl border-b p-1">Tables</h1>
        <div className="my-4">
          <DataGrid
            editorConfig={{
              editable: true,
              onViewClicked: e => {
                navigate(`/tables/${e.id}`);
              },
            }}
            data={{
              columns: ['title', 'file_path', 'data_size', 'rows_count'],
              rows: tables,
            }}
            columnLabels={['title', 'Data Source', 'Data Size', 'Rows']}
          />

          <div></div>
        </div>
      </div>
    </PageWrapper>
  );
}
