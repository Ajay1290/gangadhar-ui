import React from 'react';
import styled, { useTheme } from 'styled-components/macro';
import { Button } from '../Button';

interface Props {
  pageSize;
  onPageSizeBtnClicked: Function;
  rowCount;
  currPage;
  onPrevPageBtnClicked: Function;
  onNextPageBtnClicked: Function;
}

function DataGridFooter(props: Props) {
  const theme = useTheme() as any;
  /**
   * Will current
   * @param page Page
   * @returns boolean
   */
  const activeIfPageSize = page =>
    props.pageSize === page
      ? {
          background: theme.primary,
          color: theme.secondary,
          borderRadius: '50%',
        }
      : {};

  /**
   * Will move the table page to previous page
   * @param page Previous Page
   */
  const onPrevPageBtnClicked = page => {
    if (page >= 1) {
      props.onPrevPageBtnClicked();
    }
  };

  /**
   * Will move the table page to next page
   * @param page Current Page Number
   */
  const onNextPageBtnClicked = page => {
    if (page <= Math.ceil(props.rowCount / props.pageSize)) {
      props.onNextPageBtnClicked();
    }
  };

  return (
    <div className="flex flex-row justify-between items-center p-4 border-t">
      <div>
        <PageSizeBtn
          style={activeIfPageSize(5)}
          onClick={() => props.onPageSizeBtnClicked(5)}
        >
          5
        </PageSizeBtn>
        <PageSizeBtn
          style={activeIfPageSize(10)}
          onClick={() => props.onPageSizeBtnClicked(10)}
        >
          10
        </PageSizeBtn>
        <PageSizeBtn
          style={activeIfPageSize(20)}
          onClick={() => props.onPageSizeBtnClicked(20)}
        >
          20
        </PageSizeBtn>
        <PageSizeBtn
          style={activeIfPageSize(50)}
          onClick={() => props.onPageSizeBtnClicked(50)}
        >
          50
        </PageSizeBtn>
      </div>
      <div>
        {Math.ceil(props.rowCount / props.pageSize) > 0 && (
          <>
            {props.currPage} of {Math.ceil(props.rowCount / props.pageSize)}{' '}
            Pages
          </>
        )}
      </div>
      <div>
        <TableFooterBTN
          sm
          title="Previous"
          variant="outline"
          className="mx-2"
          disabled={props.currPage <= 1}
          onClick={() => onPrevPageBtnClicked(props.currPage)}
        ></TableFooterBTN>
        <TableFooterBTN
          sm
          title="Next"
          disabled={
            props.currPage >= Math.ceil(props.rowCount / props.pageSize)
          }
          onClick={() => onNextPageBtnClicked(props.currPage)}
        ></TableFooterBTN>
      </div>
    </div>
  );
}

export default DataGridFooter;

const TableFooterBTN = styled(Button)`
  padding: 0.5em 1em;
  border-radius: 2px;
`;

const PageSizeBtn = styled.button`
  height: 1.5rem;
  width: 1.5rem;
  font-size: 10px;
`;
