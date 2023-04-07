/**
 *
 * PieChart
 *
 */
import * as React from 'react';
import styled, { useTheme } from 'styled-components/macro';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import _ from 'lodash';
import generateUUID from 'utils/uuid';

interface Props {
  data: any;
  height: number;
  width: number;
}

const options = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie',
    width: 900,
    height: 500,
  },
  title: {
    text: '',
  },
  yAxis: {
    title: {
      text: '',
    },
  },
  series: [
    {
      data: [1, 2, 1, 4, 3, 6],
    },
    {
      data: [2, 7, 0, 4, 6, 2],
    },
  ],
  accessibility: {
    point: {
      valueSuffix: '%',
    },
  },

  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
      },
    },
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
  },
  credits: {
    enabled: false,
  },
};

export function PieChart(props: Props) {
  const theme = useTheme() as any;
  const visualizationId = generateUUID();
  const [configOption, setConfigOption] = React.useState(options);

  React.useEffect(() => {
    console.log('props.height: ', props.height);
    options.chart.height = props.height || 500;
    options.chart.width = props.width || 900;
    const columns = props.data.columns;
    options.series = [] as any;
    columns.forEach((col: any) => {
      options.series.push({
        name: col.title,
        data: props.data.rows.map(d => ({ name: col.title, y: d[col.title] })),
      } as any);
    });
    setConfigOption(options);
  }, [props.data]);

  return (
    <PieChartWrapper id={`viz-${visualizationId}`}>
      <HighchartsReact highcharts={Highcharts} options={configOption} />
    </PieChartWrapper>
  );
}

const PieChartWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
