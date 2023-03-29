/**
 *
 * Wizard
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
// import { useTranslation } from 'react-i18next';
// import { messages } from './messages';
import { PageWrapper } from 'app/components/layouts/PageWrapper';
import { DataGrid } from 'app/components/atoms/DataGrid/Loadable';
import { CgInfo } from 'react-icons/cg';
import { AiOutlineClose } from 'react-icons/ai';
import { BsTextWrap } from 'react-icons/bs';

import { SearchBox } from 'app/components/atoms/SearchBox';
import generateUUID from 'utils/uuid';
import { Accordian } from 'app/components/atoms/Accordian/Loadable';
import { FiDownload, FiEdit3 } from 'react-icons/fi';
import { SiReacttable } from 'react-icons/si';
import { TbDragDrop2 } from 'react-icons/tb';

interface Props {}

export function Wizard(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { t, i18n } = useTranslation();
  const column = i => ({
    key: generateUUID(),
    name: `Column-${i}`,
    dataType: 'String',
  });
  const table = i => ({
    name: `Table-${i}`,
    columns: [1, 2, 3, 4, 5].map(c => column(c)),
  });
  const tables = [1, 2, 3, 4, 5].map(c => table(c));

  const dragItem = React.useRef({} as any);
  const dragOverItem = React.useRef({} as any);

  const dragStart = (e: DragEvent, rawData, position) => {
    dragItem.current = position;
    console.log('rowData: ', rawData);
    e.dataTransfer?.setData('text/plain', JSON.stringify(rawData));
  };

  const dragEnter = (e, position) => {
    e.preventDefault();
    e.stopPropagation();
    dragOverItem.current = position;
  };

  const [list, setList] = React.useState([] as any);

  const onDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    let colData = {};
    const l = e.dataTransfer?.getData('text/plain');
    console.log('L: ', l);
    try {
      colData = JSON.parse(l || '');
    } catch (error) {
      console.log(':e ', error);
    }
    if (Object.keys(colData).length > 0) {
      const copyListItems = [...list];
      copyListItems.splice(dragItem.current, 1);
      copyListItems.splice(dragOverItem.current, 0, colData);
      dragItem.current = null;
      dragOverItem.current = null;
      setList(copyListItems);
    }
  };

  const onDragOver = e => {
    e.preventDefault();
  };

  const onCloseClicked = item => {
    console.log('item: ', item);
    setList(list.filter(l => l.key !== item.key));
  };

  const dataSourceData = {
    columns: list.map((l: any) => {
      return l.name;
    }),
    rows: [
      {
        'Column-1': 1,
        'Column-2': 2,
        'Column-3': 3,
        'Column-4': 4,
        'Column-5': 5,
      },
      {
        'Column-1': 1,
        'Column-2': 2,
        'Column-3': 3,
        'Column-4': 4,
        'Column-5': 5,
      },
    ],
  };

  const DownloadBtn = ({ iconSize = 14 }) => {
    let url = '#';
    let fileName = '';
    const str = JSON.stringify(dataSourceData.rows);
    const bytes = new TextEncoder().encode(str);
    const blob = new Blob([bytes], {
      type: 'application/json;charset=utf-8',
    });
    url = URL.createObjectURL(blob);
    fileName = `Analyzer-insight.json`;
    return (
      <a href={url} target={'_blank'} download={fileName} rel="noreferrer">
        <FiDownload size={iconSize} />
      </a>
    );
  };

  const onClearAll = () => {
    setList([]);
  };

  return (
    <PageWrapper
      title="Wizard Page"
      description="A Boilerplate application homepage"
    >
      <div className="flex flex-row h-full">
        <div style={{ flex: 2 }} className="w-full border p-2 flex flex-col">
          <div className="pb-2 flex flex-row items-center">
            <SearchBox list={tables} searchKey="name" />
            <BsTextWrap
              fontSize={20}
              className="mx-1"
              cursor={'pointer'}
              color="#F00"
            />
          </div>
          <div className="flex flex-col  h-full overflow-auto ">
            {tables.map((table, j) => (
              <Accordian key={`tbl-${j}`} className="p-1 " title={table.name}>
                <div className="" key={`tbl-col-${j}`}>
                  {table.columns.map((col, i) => (
                    <div
                      className="p-1 m-1 text-xs border rounded"
                      key={`col-${i}`}
                      draggable
                      onDragOver={e => onDragOver(e)}
                      onDragStart={(e: any) => dragStart(e, col, i)}
                      onDragEnd={onDrop}
                    >
                      <span className="flex flex-row justify-between items-center">
                        <span style={{ fontSize: 10 }}>{col.name}</span>
                        <span>
                          <CgInfo />
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </Accordian>
            ))}
          </div>
        </div>
        <div
          style={{ flex: 2 }}
          className="w-full border-r flex flex-col h-full border border-l-0 p-1"
        >
          <h6 className="border-b p-1 flex flex-row justify-between items-center">
            <span>Measures</span>
            <span
              className="cursor-pointer"
              onClick={onClearAll}
              style={{ fontSize: 10 }}
            >
              Clear All
            </span>
          </h6>
          <div
            className="w-full h-full flex flex-col"
            onDragOver={e => onDragOver(e)}
            onDrop={e => onDrop(e)}
          >
            {list.length > 0 ? (
              list.map((l, i) => (
                <div
                  key={`ld-${i}`}
                  style={{
                    background: '#58585a',
                    border: '1px solid #58585a',
                  }}
                  className="p-1 text-white border m-1 rounded"
                  onDragOver={e => dragEnter(e, i)}
                  onDragStart={(e: any) => dragStart(e, l, i)}
                  onDragEnd={onDrop}
                  draggable
                >
                  <span className="flex flex-row justify-between items-center">
                    <span
                      className="border-r w-full mr-1"
                      style={{ fontSize: 10 }}
                    >
                      {l.name}
                    </span>
                    <span className=" h-full">
                      <AiOutlineClose
                        onClick={() => onCloseClicked(l)}
                        fontSize={12}
                        cursor={'pointer'}
                      />
                    </span>
                  </span>
                </div>
              ))
            ) : (
              <div className="flex flex-col border-dashed border border-t-0 h-full items-center justify-center">
                <TbDragDrop2 fontSize={20} />
                <span className="text-center mt-2">
                  Drag and drop columns to measures
                </span>
              </div>
            )}
          </div>
        </div>
        <div
          style={{ flex: 12 }}
          className="w-full h-full flex flex-col border border-l-0 p-1"
        >
          <div className="flex flex-row justify-between p-2 mb-2 border-b">
            <span className="flex flex-row items-center">
              <span className="mr-2">Sample Analyzer Insight Title</span>
              <FiEdit3 fontSize={14} cursor={'pointer'} color="#F00" />
            </span>
            <span>
              <DownloadBtn iconSize={16} />
            </span>
          </div>
          <div className="p-1  flex flex-col h-full w-full">
            {list.length > 0 ? (
              <DataGrid data={dataSourceData} />
            ) : (
              <p className="flex flex-col items-center text-sm justify-center h-full w-full">
                <SiReacttable fontSize={40} className="mb-4" />
                Drag and drop columns to measures to start seeing data here in
                table format
              </p>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

const Div = styled.div``;
