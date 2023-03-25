/**
 *
 * DataGrid
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';

interface Props {}

export function DataGrid(props: Props) {
  const rawData = {
    columns: ['Head 1', 'Head 2'],
    rows: [
      { 'Head 1': 0, 'Head 2': 1 },
      { 'Head 1': 0, 'Head 2': 1 },
      { 'Head 1': 0, 'Head 2': 1 },
      { 'Head 1': 0, 'Head 2': 1 },
      { 'Head 1': 0, 'Head 2': 1 },
      { 'Head 1': 0, 'Head 2': 1 },
      { 'Head 1': 0, 'Head 2': 1 },
      { 'Head 1': 0, 'Head 2': 1 },
      { 'Head 1': 0, 'Head 2': 1 },
      { 'Head 1': 0, 'Head 2': 1 },
      { 'Head 1': 0, 'Head 2': 1 },
      { 'Head 1': 0, 'Head 2': 1 },
      { 'Head 1': 0, 'Head 2': 1 },
      { 'Head 1': 0, 'Head 2': 1 },
      { 'Head 1': 0, 'Head 2': 1 },
      { 'Head 1': 0, 'Head 2': 1 },
      { 'Head 1': 0, 'Head 2': 1 },
      { 'Head 1': 0, 'Head 2': 1 },
      { 'Head 1': 0, 'Head 2': 1 },
      { 'Head 1': 0, 'Head 2': 1 },
      { 'Head 1': 0, 'Head 2': 1 },
      { 'Head 1': 0, 'Head 2': 1 },
      { 'Head 1': 0, 'Head 2': 1 },
      { 'Head 1': 0, 'Head 2': 1 },
      { 'Head 1': 0, 'Head 2': 1 },
    ],
  };

  const [data, setData] = React.useState({
    columns: [] as string[],
    rows: [] as any,
  });

  const [isLoading, setIsLoading] = React.useState(true);
  const [currPage, setCurrPage] = React.useState(1);
  const [pageOffset, setPageOffset] = React.useState(10);

  React.useEffect(() => {
    console.log('Called');
    setTimeout(() => {
      setData({
        columns: rawData.columns,
        rows: rawData.rows.slice(currPage - 1, currPage * pageOffset),
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  const onPrevPageBtnClicked = page => {
    if (page >= 1) {
      setCurrPage(page - 1);
    }
  };

  /**
   * Will move the table page to next page
   * @param page Current Page Number
   */
  const onNextPageBtnClicked = page => {
    if (page <= rawData.rows.length / pageOffset) {
      setCurrPage(page + 1);
    }
  };

  return (
    <>
      {isLoading ? (
        <div>Loading.....</div>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                {data.columns.map((col, i) => (
                  <TableHeadCell key={`header-cell-${i}`}>{col}</TableHeadCell>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.rows.map((row, i) => (
                <tr key={`row-${i}`}>
                  {data.columns.map((col, j) => (
                    <td key={`cell-(${i},${j})`}>{row[col]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

const TableHeadCell = styled.th`
  padding: 0.5em 1em;
`;
