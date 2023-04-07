/**
 *
 * DataGrid
 *
 */
import * as React from 'react';
import DataTable from 'react-data-table-component';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai';
import styled, { useTheme } from 'styled-components/macro';
import { Button } from '../Button';
import { Loader } from '../Loader/Loadable';

interface Props {
  flat?: boolean;
  compact?: boolean;
  data: any;
  editorConfig?: {
    editable: boolean;
    onEditClicked?: Function;
    onViewClicked?: Function;
    onDeleteClicked?: Function;
  };
}

export function DataGrid(props: Props) {
  const theme = useTheme() as any;

  const [data, setData] = React.useState({
    columns: [] as any[],
    rows: [] as any,
  });

  const compactStyle = props.compact
    ? { fontSize: 10, padding: '0.12em 0.5em' }
    : {};

  const [isLoading, setIsLoading] = React.useState(true);
  const [currPage, setCurrPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);

  const [rowCount, setRowCount] = React.useState(0);

  React.useEffect(() => {
    processRowsToDisplay(currPage);
  }, [props.data, pageSize]);

  const processRowsToDisplay = page => {
    setIsLoading(true);
    try {
      if (props.flat) {
        const d = {};
        props.data.columns.forEach(col => {
          d[col.title] = props.data.rows[col.title].slice(
            (page - 1) * pageSize,
            page * pageSize,
          );
        });
        setData({
          columns: props.data.columns,
          rows: d,
        });
        setRowCount(props.data.rows[props.data.columns[0].title].length);
      } else {
        setData({
          columns: props.data.columns,
          rows: props.data.rows.slice((page - 1) * pageSize, page * pageSize),
        });
        setRowCount(props.data.rows.length);
      }
    } catch (error) {}
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  };

  /**
   * Will move the table page to previous page
   * @param page Previous Page
   */
  const onPrevPageBtnClicked = page => {
    if (page >= 1) {
      setCurrPage(page - 1);
      processRowsToDisplay(page - 1);
    }
  };

  /**
   * Will move the table page to next page
   * @param page Current Page Number
   */
  const onNextPageBtnClicked = page => {
    if (page <= Math.ceil(rowCount / pageSize)) {
      setCurrPage(page + 1);
      processRowsToDisplay(page + 1);
    }
  };

  /**
   * Will current
   * @param page Page
   * @returns boolean
   */
  const activeIfPageSize = page =>
    pageSize === page
      ? {
          background: theme.primary,
          color: theme.secondary,
          borderRadius: '50%',
        }
      : {};

  return (
    <div className="w-full flex flex-col h-full">
      {isLoading ? (
        <div className="flex h-full flex-col w-full items-center justify-center">
          <Loader />
        </div>
      ) : (
        <TableWrapper>
          <table className="w-full">
            <thead className="sticky top-0 ">
              <tr>
                <TableHeadCell
                  style={{ width: 55, textAlign: 'right', ...compactStyle }}
                  key={`header-cell-i`}
                >
                  #
                </TableHeadCell>
                {data.columns.map((col, i) => (
                  <TableHeadCell
                    key={`header-cell-${i}`}
                    style={{
                      ...compactStyle,
                      textAlign: col.datatype
                        ? col.datatype === 'string'
                          ? 'left'
                          : 'right'
                        : 'left',
                    }}
                  >
                    {col.title ? col.title : col}
                  </TableHeadCell>
                ))}
                {props.editorConfig?.editable && (
                  <TableHeadCell
                    style={{ width: 55, textAlign: 'right', ...compactStyle }}
                    key={`header-cell-o`}
                  >
                    ::::
                  </TableHeadCell>
                )}
              </tr>
            </thead>
            <tbody className="overflow-auto">
              {props.flat ? (
                Object.keys(data.rows)[0] ? (
                  new Array(data.rows[Object.keys(data.rows)[0]].length)
                    .fill(0)
                    .map((r, i) => (
                      <TableRow key={`row-${i}`}>
                        <TableCell
                          style={{
                            width: 55,
                            textAlign: 'right',
                            ...compactStyle,
                          }}
                          key={`cell-i-(${i + 1})`}
                        >
                          {i + 1 + pageSize * (currPage - 1)}
                        </TableCell>
                        {data.columns.map((col, j) => (
                          <TableCell
                            key={`cell-(${i},${j})`}
                            style={{
                              textAlign:
                                col.datatype === 'string' ? 'left' : 'right',
                              ...compactStyle,
                            }}
                          >
                            {data.rows[col.title][i]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                ) : (
                  <tr>
                    <td colSpan={data.columns.length + 1}>
                      <div className="h-full w-full flex flex-row items-center justify-center p-5">
                        No Rows to Display
                      </div>
                    </td>
                  </tr>
                )
              ) : data.rows.length > 0 ? (
                data.rows.map((row, i) => (
                  <TableRow key={`row-${i}`}>
                    <TableCell
                      style={{ width: 55, textAlign: 'right', ...compactStyle }}
                      key={`cell-i-(${i + 1})`}
                    >
                      {i + 1 + pageSize * (currPage - 1)}
                    </TableCell>
                    {data.columns.map((col, j) => (
                      <TableCell
                        key={`cell-(${i},${j})`}
                        style={{
                          ...compactStyle,
                          textAlign: Number.isNaN(
                            Number(row[col.title ? col.title : col]),
                          )
                            ? 'left'
                            : 'right',
                        }}
                      >
                        {row[col.title ? col.title : col]}
                      </TableCell>
                    ))}
                    {props.editorConfig?.editable && (
                      <TableCell
                        style={{
                          width: 55,
                          textAlign: 'right',
                          ...compactStyle,
                        }}
                        key={`cell-o-(${i + 1})`}
                      >
                        <div className="flex flex-row justify-end items-end">
                          <span>
                            <AiOutlineEye cursor={'pointer'} fontSize={14} />
                          </span>
                          <span className="px-1">
                            <AiOutlineEdit cursor={'pointer'} fontSize={14} />
                          </span>
                          <span>
                            <AiOutlineDelete cursor={'pointer'} fontSize={14} />
                          </span>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <tr>
                  <td colSpan={data.columns.length + 1}>
                    <div className="h-full w-full flex flex-row items-center justify-center p-5">
                      No Rows to Display
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </TableWrapper>
      )}
      <div className="flex flex-row justify-between items-center p-4 border-t">
        <div>
          <PageSizeBtn
            style={activeIfPageSize(5)}
            onClick={() => setPageSize(5)}
          >
            5
          </PageSizeBtn>
          <PageSizeBtn
            style={activeIfPageSize(10)}
            onClick={() => setPageSize(10)}
          >
            10
          </PageSizeBtn>
          <PageSizeBtn
            style={activeIfPageSize(20)}
            onClick={() => setPageSize(20)}
          >
            20
          </PageSizeBtn>
          <PageSizeBtn
            style={activeIfPageSize(50)}
            onClick={() => setPageSize(50)}
          >
            50
          </PageSizeBtn>
        </div>
        <div>
          {Math.ceil(rowCount / pageSize) > 0 && (
            <>
              {currPage} of {Math.ceil(rowCount / pageSize)} Pages
            </>
          )}
        </div>
        <div>
          <TableFooterBTN
            sm
            title="Previous"
            variant="outline"
            className="mx-2"
            disabled={currPage <= 1}
            onClick={() => onPrevPageBtnClicked(currPage)}
          ></TableFooterBTN>
          <TableFooterBTN
            sm
            title="Next"
            disabled={currPage >= Math.ceil(rowCount / pageSize)}
            onClick={() => onNextPageBtnClicked(currPage)}
          ></TableFooterBTN>
        </div>
      </div>
    </div>
  );
}

const TableRow = styled.tr`
  :nth-child(odd) {
    background-color: #58585a11;
  }
  :nth-child(even) {
    background-color: ${props => props.theme.secondary};
  }

  :hover {
    background-color: #58585a33;
  }
`;

const PageSizeBtn = styled.button`
  height: 1.5rem;
  width: 1.5rem;
  font-size: 10px;
`;

const TableWrapper = styled.div`
  height: 100%;
  overflow: auto;
`;

const TableCell = styled.td`
  padding: 0.25em 1em;
  border-bottom: 1px solid #e5e5e5;
  border-right: 1px solid #e5e5e5;
`;

const TableHeadCell = styled.th`
  padding: 0.25em 1em;
  border-bottom: 1px solid #fff;
  border-right: 1px solid #fff;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.secondary};
  text-align: left;
`;

const TableFooterBTN = styled(Button)`
  padding: 0.5em 1em;
  border-radius: 2px;
`;
