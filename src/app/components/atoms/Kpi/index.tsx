/**
 *
 * Kpi
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import * as d3 from 'd3';

interface Props {
  data?: any;
}

export function Kpi(props: Props) {
  const [columns, setColumns] = React.useState([] as any);
  const [rows, setRows] = React.useState([] as any);

  React.useEffect(() => {
    setColumns(props.data.columns.map(c => c.title));
    setRows(props.data.rows);
  }, [props.data]);

  const count = (data, c) => {
    return d3.count(data, (d: any) => d[c]).toFixed(0);
  };

  return (
    <KPIWrapper>
      {columns.map((c, i) => (
        <KPIBody key={`kpi-${i}`}>
          <KPIValue>{count(rows, c)}</KPIValue>
          <KPITitle>{c}</KPITitle>
        </KPIBody>
      ))}
    </KPIWrapper>
  );
}

const KPIWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  flex-wrap: wrap;
  width: 100%;
`;

const KPIBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: end;
  padding: 2em;
`;

const KPIValue = styled.h2`
  font-size: 26px;
  font-weight: 600;
`;

const KPITitle = styled.h1`
  font-size: 14px;
`;
