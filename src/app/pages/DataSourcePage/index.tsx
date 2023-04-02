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
import { Model } from 'app/components/atoms/Model/Loadable';
import { Loader } from 'app/components/atoms/Loader/Loadable';
import { Button } from 'app/components/atoms/Button';
import { InputBox } from 'app/components/atoms/InputBox';

import { UploadBox } from 'app/components/molecules/UploadBox/Loadable';
import axios from 'axios';

interface Props {}

export function DataSourcePage(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { t, i18n } = useTranslation();

  const [openUploadPopup, setOpenUploadPopup] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [tables, setTables] = React.useState([]);
  const [dataSourceData, setDataSourceData] = React.useState({
    columns: [] as any,
    rows: [] as any,
  });

  React.useEffect(() => {
    getTableData();
  }, []);

  const getTableData = () => {
    setIsLoading(true);
    axios
      .get('http://localhost:5000/tables/all')
      .then(res => {
        setTables(res.data);
        setDataSourceData({
          columns: [
            'title',
            'description',
            'data_size',
            'rows_count',
            'file_path',
          ],
          rows: res.data,
        });
        console.log('SD');
        setIsLoading(false);
      })
      .catch(e => {
        setIsLoading(false);
      });
  };

  const UploadCSVModel = () => {
    const [tblName, setTblName] = React.useState('');
    const [file, setFile] = React.useState(null as any);

    const onUploadChange = e => {
      setFile(e.target.files[0]);
    };

    const onCancleClicked = () => {
      setOpenUploadPopup(false);
      getTableData();
    };

    const onSaveClicked = () => {
      if (file) {
        setIsLoading(true);
        var formData = new FormData();
        formData.append('tblName', tblName);
        formData.append('csv', file);
        axios
          .post('http://localhost:5000/table/new', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(r => {
            getTableData();
          })
          .catch(e => {
            getTableData();
          });
      }
      setOpenUploadPopup(false);
    };

    return (
      <Model
        title={'Upload a CSV'}
        show={openUploadPopup}
        width={'500px'}
        height={'400px'}
        onClose={() => setOpenUploadPopup(!openUploadPopup)}
      >
        <div className="flex w-full h-full items-center justify-center">
          <div className="p-2 h-full relative overflow-auto flex w-full flex-col">
            {isLoading ? (
              <div className="flex w-full h-full items-center justify-center">
                <Loader />
              </div>
            ) : (
              <div className="flex flex-col h-full w-full">
                <div className="flex flex-col flex-1">
                  <div>
                    <InputBox
                      onChange={e => {
                        setTblName(e.target.value);
                      }}
                      valuePass={tblName}
                      placeholder="Table Name"
                    />
                  </div>
                  <div className="h-full my-4">
                    <UploadBox onChange={e => onUploadChange(e)} />
                  </div>
                </div>
                <div className="flex flex-row items-center justify-end">
                  <Button
                    className="mx-1"
                    variant="outline"
                    title="Cancle"
                    onClick={onCancleClicked}
                  />
                  <Button
                    className="mx-1"
                    title="Save"
                    onClick={onSaveClicked}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Model>
    );
  };

  return (
    <PageWrapper
      title="Data Source Page"
      description="A Boilerplate application homepage"
    >
      <div className="p-4 ">
        <div className="px-2 py-2 border-b flex flex-row justify-between items-end">
          <PageHeading>Local Data Files</PageHeading>
          <Button sm title="+ New" onClick={() => setOpenUploadPopup(true)} />
        </div>
        <div className="p-4 w-full h-full flex flex-col items-center justify-center">
          {isLoading ? <Loader /> : <DataGrid data={dataSourceData} />}
        </div>
      </div>
      <UploadCSVModel />
    </PageWrapper>
  );
}

const PageHeading = styled.h2`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  color: ${props => props.theme.primary};
`;
