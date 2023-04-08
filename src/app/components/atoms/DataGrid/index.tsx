/**
 *
 * DataGrid
 *
 */
import * as React from 'react';
import {
  AiOutlineArrowDown,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from 'react-icons/ai';
import { BsSortNumericDown, BsSortNumericUp } from 'react-icons/bs';
import styled, { useTheme } from 'styled-components/macro';
import { Button } from '../Button';
import { Loader } from '../Loader/Loadable';
import DataGridFooter from './DataGridFooter';

interface Props {
  flat?: boolean;
  compact?: boolean;
  data: any;
  columnLabels?: string[];
  editorConfig?: {
    editable: boolean;
    onEditClicked?: Function;
    onViewClicked?: Function;
    onDeleteClicked?: Function;
  };
}

export function DataGrid(props: Props) {
  const theme = useTheme() as any;
  const [columns, setColumns] = React.useState([] as any);
  const [rows, setRows] = React.useState([] as any);

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

  const onPageSizeBtnClicked = page => {
    setPageSize(page);
  };

  const prepareColumns = cols => {
    return cols.map(col => ({
      ...col,
      filter: {
        enabled: false,
      },
      sort: {
        enabled: true,
        sortKey: col.title,
        direction: 'asc',
      },
    }));
  };

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
        setColumns(prepareColumns(props.data.columns));
        setRows(d);
        setRowCount(props.data.rows[props.data.columns[0].title].length);
      } else {
        setColumns(prepareColumns(props.data.columns));
        setRows(pagifyData(props.data, page));
        setRowCount(props.data.rows.length);
      }
    } catch (error) {}
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  };

  const pagifyData = (data, page) => {
    return data.rows.slice((page - 1) * pageSize, page * pageSize);
  };

  /**
   * Will move the table page to previous page
   * @param page Previous Page
   */
  const onPrevPageBtnClicked = page => {
    setCurrPage(page - 1);
    processRowsToDisplay(page - 1);
  };

  /**
   * Will move the table page to next page
   * @param page Current Page Number
   */
  const onNextPageBtnClicked = page => {
    setCurrPage(page + 1);
    processRowsToDisplay(page + 1);
  };

  const HeaderCell = ({ column, index }) => {
    const onHeaderCellClicked = col => {
      const r = props.data.rows.sort((a, b) => {
        if (col.datatype === 'string') {
          const x = a[col.title].toLowerCase(),
            y = b[col.title].toLowerCase();

          if (column.sort.direction === 'asc') {
            return x < y ? -1 : x > y ? 1 : 0;
          } else {
            return x > y ? -1 : x < y ? 1 : 0;
          }
        } else {
          return column.sort.direction === 'asc'
            ? a[col.title] - b[col.title]
            : b[col.title] - a[col.title];
        }
      });
      // setData({
      //   columns: data.columns,
      //   rows: pagifyData({ rows: r }, currPage),
      // });
      console.log('sorting: ', column.sort.direction);
      column.sort.direction = column.sort.direction === 'asc' ? 'dsc' : 'asc';
      setRows(pagifyData({ rows: r }, currPage));
    };

    return (
      <TableHeadCell
        onClick={() => onHeaderCellClicked(column)}
        key={`header-cell-${index}`}
        style={{
          ...compactStyle,
        }}
      >
        <div
          style={{
            flexDirection: column.datatype
              ? column.datatype === 'string'
                ? 'row'
                : 'row-reverse'
              : 'row',
          }}
          className="flex  items-center justify-between"
        >
          <span
            className="w-full"
            style={{
              textAlign: column.datatype
                ? column.datatype === 'string'
                  ? 'left'
                  : 'right'
                : 'left',
            }}
          >
            {props.columnLabels
              ? props.columnLabels[index]
              : column.title
              ? column.title
              : column}
          </span>
          <span>
            {column.datatype === 'string' ? (
              column.sort.direction === 'asc' ? (
                <AiOutlineSortDescending
                  cursor={'pointer'}
                  color="#FFF"
                  fontSize={props.compact ? 12 : 14}
                />
              ) : (
                <AiOutlineSortAscending
                  cursor={'pointer'}
                  color="#FFF"
                  fontSize={props.compact ? 12 : 14}
                />
              )
            ) : column.sort.direction === 'asc' ? (
              <BsSortNumericDown
                cursor={'pointer'}
                color="#FFF"
                fontSize={props.compact ? 12 : 14}
              />
            ) : (
              <BsSortNumericUp
                cursor={'pointer'}
                color="#FFF"
                fontSize={props.compact ? 12 : 14}
              />
            )}
          </span>
        </div>
      </TableHeadCell>
    );
  };

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
                  key={`header-cell-ssi`}
                >
                  #
                </TableHeadCell>
                {columns.map((col, i) => (
                  <HeaderCell
                    key={`header-cell-as${i}`}
                    column={col}
                    index={i}
                  />
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
                Object.keys(rows)[0] ? (
                  new Array(rows[Object.keys(rows)[0]].length)
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
                        {columns.map((col, j) => (
                          <TableCell
                            key={`cell-(${i},${j})`}
                            style={{
                              textAlign:
                                col.datatype === 'string' ? 'left' : 'right',
                              ...compactStyle,
                            }}
                          >
                            {rows[col.title][i]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                ) : (
                  <tr>
                    <td colSpan={columns.length + 1}>
                      <div className="h-full w-full flex flex-row items-center justify-center p-5">
                        No Rows to Display
                      </div>
                    </td>
                  </tr>
                )
              ) : rows.length > 0 ? (
                rows.map((row, i) => (
                  <TableRow key={`row-${i}`}>
                    <TableCell
                      style={{ width: 55, textAlign: 'right', ...compactStyle }}
                      key={`cell-i-(${i + 1})`}
                    >
                      {i + 1 + pageSize * (currPage - 1)}
                    </TableCell>
                    {columns.map((col, j) => (
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
                  <td colSpan={columns.length + 1}>
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
      <DataGridFooter
        pageSize={pageSize}
        currPage={currPage}
        rowCount={rowCount}
        onPageSizeBtnClicked={onPageSizeBtnClicked}
        onNextPageBtnClicked={onNextPageBtnClicked}
        onPrevPageBtnClicked={onPrevPageBtnClicked}
      />
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
