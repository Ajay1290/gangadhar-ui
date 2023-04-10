/**
 *
 * TablePage
 *
 */
import axios from 'axios';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from 'app/components/atoms/Loader/Loadable';
import { PageWrapper } from 'app/components/layouts/PageWrapper';
import { DataGrid } from 'app/components/atoms/DataGrid/Loadable';

interface Props {}

export function TablePage(props: Props) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [table, setTable] = React.useState({} as any);
  const { tableId } = useParams();

  React.useEffect(() => {
    axios.get(`http://localhost:5000/tables/${tableId}/meta`).then(r => {
      const res = r;
      console.log('Re: ', res.data);
      setTable(res.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 400);
    });
  }, []);

  return (
    <PageWrapper
      title="Table Page"
      description="A Boilerplate application homepage"
    >
      {isLoading ? (
        <div className="flex flex-row h-full w-full items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div>
          <div className="flex flex-row justify-between items-center border-b p-2 pb-1 px-4">
            <h1 className="text-lg font-semibold">{table.title}</h1>
            <div>
              <span className="px-2">Load</span>
              <span className="px-2">Explore</span>
            </div>
          </div>
          <div className="flex flex-row text-sm">
            <p className="p-2 mx-4 flex flex-col">
              <span className="p-1 pb-0 font-semibold">Last Load On:</span>
              <span className="p-1">
                {table.last_load_on ? table.last_load_on : '-'}
              </span>
            </p>{' '}
            <p className="p-2 mx-4 flex flex-col">
              <span className="p-1 pb-0 font-semibold">Last Load Status:</span>
              <span className="p-1">
                {table.last_load_status ? table.last_load_status : '-'}
              </span>
            </p>
            <p className="p-2 mx-4 flex flex-col">
              <span className="p-1 pb-0 font-semibold">Data Source:</span>
              <span className="p-1">
                {table.file_path ? table.file_path : '-'}
              </span>
            </p>
            <p className="p-2 mx-4 flex flex-col">
              <span className="p-1 pb-0 font-semibold">Data Size:</span>
              <span className="p-1">
                {table.data_size ? table.data_size : '-'}
              </span>
            </p>
            <p className="p-2 mx-4 flex flex-col">
              <span className="p-1 pb-0 font-semibold">Rows:</span>
              <span className="p-1">
                {table.rows_count ? table.rows_count : '-'}
              </span>
            </p>
          </div>
          <div className="my-8 px-2">
            <h1 className="border-b text-lg mb-4 ">Columns</h1>
            <DataGrid
              data={{
                columns: ['name', 'title', 'datatype'],
                rows: table.columns,
              }}
              columnLabels={['Internal Name', 'Label', 'Datatype']}
              editorConfig={{ editable: true }}
            />
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
