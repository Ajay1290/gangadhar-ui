/**
 *
 * DataGrid
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { Loader } from '../Loader/Loadable';

interface Props {
  data: {
    columns: string[];
    rows: any;
  };
}

export function DataGrid(props: Props) {
  const [data, setData] = React.useState({
    columns: [] as string[],
    rows: [] as any,
  });

  const [isLoading, setIsLoading] = React.useState(true);
  const [currPage, setCurrPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);

  React.useEffect(() => {
    processRowsToDisplay(currPage);
  }, [props.data, pageSize]);

  const processRowsToDisplay = page => {
    setIsLoading(true);
    setData({
      columns: props.data.columns,
      rows: props.data.rows.slice((page - 1) * pageSize, page * pageSize),
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const onPrevPageBtnClicked = page => {
    if (page >= 1) {
      setIsLoading(true);
      setCurrPage(page - 1);
      processRowsToDisplay(page - 1);
    }
  };

  /**
   * Will move the table page to next page
   * @param page Current Page Number
   */
  const onNextPageBtnClicked = page => {
    if (page <= Math.ceil(props.data.rows.length / pageSize)) {
      setIsLoading(true);
      setCurrPage(page + 1);
      processRowsToDisplay(page + 1);
    }
  };

  const activeIfPageSize = page =>
    pageSize === page
      ? { background: '#58585a', color: '#FFF', borderRadius: '50%' }
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
                  style={{ width: 55, textAlign: 'right' }}
                  key={`header-cell-i`}
                >
                  #
                </TableHeadCell>
                {data.columns.map((col, i) => (
                  <TableHeadCell key={`header-cell-${i}`}>{col}</TableHeadCell>
                ))}
              </tr>
            </thead>
            <tbody className="overflow-auto">
              {data.rows.map((row, i) => (
                <TableRow key={`row-${i}`}>
                  <TableCell
                    style={{ width: 55, textAlign: 'right' }}
                    key={`cell-i-(${i + 1})`}
                  >
                    {i + 1 + pageSize * (currPage - 1)}
                  </TableCell>
                  {data.columns.map((col, j) => (
                    <TableCell key={`cell-(${i},${j})`}>{row[col]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </tbody>
          </table>
        </TableWrapper>
      )}
      <div className="flex flex-row justify-between items-center p-2 border-t">
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
          {currPage} of {Math.ceil(props.data.rows.length / pageSize)}
        </div>
        <div>
          <TableFooterBTN
            disabled={currPage <= 1}
            onClick={() => onPrevPageBtnClicked(currPage)}
          >
            Previous
          </TableFooterBTN>
          <TableFooterBTN
            disabled={currPage >= Math.ceil(props.data.rows.length / pageSize)}
            onClick={() => onNextPageBtnClicked(currPage)}
          >
            Next
          </TableFooterBTN>
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
    background-color: #fff;
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
  background-color: #58585a;
  color: #fff;
  text-align: left;
`;

const TableFooterBTN = styled.button`
  border: 1px solid #e3e3e3;
  padding: 0.5em 1em;
  border-radius: 2px;
  margin: 0 5px;
`;
