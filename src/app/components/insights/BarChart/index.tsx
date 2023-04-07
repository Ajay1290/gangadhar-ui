/**
 *
 * BarChart
 *
 */
import * as React from 'react';
import styled, { useTheme } from 'styled-components/macro';
import * as d3 from 'd3';
import generateUUID from 'utils/uuid';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import _ from 'lodash';

interface Props {
  data: any;
  height: number;
  width: number;
  groupBy?: any;
}

const options = {
  chart: {
    type: 'column',
    width: 900,
    height: 450,
  },
  title: {
    text: '',
  },
  yAxis: {
    title: {
      text: '',
    },
  },
  xAxis: {
    min: 0,
    max: 10,
    categories: [],
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
  plotOptions: {
    series: {
      allowPointSelect: true,
    },
  },
  credits: {
    enabled: false,
  },
};

export function BarChart(props: Props) {
  const theme = useTheme() as any;
  const visualizationId = generateUUID();
  const [configOption, setConfigOption] = React.useState(options);

  React.useEffect(() => {
    options.chart.height = props.height || 450;
    options.chart.width = props.width || 900;
    if (props.data.columns) {
      const columns = props.data.columns;
      props.groupBy.forEach(d => {
        options.xAxis.categories = _.uniq(props.data.rows.map(r => r[d.title]));
      });

      options.series = [];

      columns?.forEach((col: any) => {
        options.series.push({
          name: col.title,
          dataSorting: {
            enabled: true,
          },
          dataLabels: {
            enabled: true,
            format: '{y:,.1f}',
          },
          data: props.data.rows.map(d => d[col.title]),
        } as any);
      });
      setConfigOption(_.cloneDeep(options));
    }
  }, [props.data]);
  // const ref = React.useRef({} as any);
  // const SVGHeight = props.height;
  // const SVGWidth = props.width;

  // const Height = SVGHeight;
  // const Width = SVGWidth;
  // const paddingArea = 20;
  // const { data, height = Height, width = Width } = props;
  // // const df = new DataFrame({ data });

  // const xDomain = data.columns.map(d => d.title);
  // const yDomain = [0, 100];

  // const xRange = [paddingArea, width - paddingArea];
  // const yRange = [height - paddingArea, paddingArea];

  // const x = d3.scaleBand().domain(xDomain).range(xRange).padding(0.2);
  // const y = d3.scaleLinear().domain(yDomain).nice().range(yRange);

  // const makeSeries = () => {
  //   const keys = data.columns.map(d => d.title);
  //   const series = [] as any;
  //   keys.forEach((k, i) => {
  //     const ser = [] as any;
  //     data.rows.forEach((s, j) => {
  //       const d = {
  //         label: k,
  //         x: k,
  //         y: s[k],
  //       } as any;
  //       ser.push(d);
  //     });
  //     series.push(ser);
  //   });
  //   return series;
  // };

  // function aggregate(data, keyFields, accumulator) {
  //   var createNewObj = (ref, fields) => {
  //     return fields.reduce((result, key) => {
  //       return Object.assign(result, { [key]: ref[key] });
  //     }, {});
  //   };
  //   return Object.values(
  //     data.reduce((result, object, index, ref) => {
  //       let key = keyFields.map(key => object[key]).join('');
  //       let val = result[key] || createNewObj(object, keyFields);
  //       val[accumulator] = (val[accumulator] || 0) + object[accumulator];
  //       return Object.assign(result, { [key]: val });
  //     }, {}),
  //   );
  // }

  // React.useEffect(() => {
  //   console.log(
  //     '-----------',
  //     aggregate(data.rows, ['is Exclusive'], 'Base Value'),
  //   );

  //   var svg = d3
  //     .create('svg')
  //     .attr('width', Width)
  //     .attr('height', Height)
  //     .attr('viewBox', [0, 0, width, height])
  //     .attr('style', 'max-width: 100%; height: auto; height: intrinsic;');

  //   var color = d3.scaleOrdinal(d3.schemeCategory10);

  //   // X axis
  //   svg
  //     .append('g')
  //     .attr('transform', `translate(0, ${Height - paddingArea})`)
  //     .call(d3.axisBottom(x))
  //     .selectAll('text')
  //     .attr('transform', 'translate(0, 0)rotate(0)')
  //     .style('text-anchor', 'center');

  //   // Add Y axis
  //   svg
  //     .append('g')
  //     .attr('transform', `translate(${paddingArea}, 0)`)
  //     .call(d3.axisLeft(y));

  //   // var barWidth = width / data.length / 3;

  //   // var bar = svg
  //   //   .selectAll('.bar1')
  //   //   .data(data, (d: any) => d.score1)
  //   //   .enter()
  //   //   .append('g')
  //   //   .attr('transform', (d, i) => `translate(${i * 3 * barWidth + 5}, 0)`)
  //   //   .attr('class', 'bar1');

  //   // bar
  //   //   .append('rect')
  //   //   .attr('y', function (d: any) {
  //   //     return y(d.score1);
  //   //   })
  //   //   .attr('width', barWidth - 5)
  //   //   .attr('height', (d: any) => height - y(d.score1))
  //   //   .style('fill', color('score1'));

  //   // Bars
  //   svg
  //     .selectAll('mybar')
  //     .data(data.rows)
  //     .join('g')
  //     .selectAll('rect')
  //     .data(function (d: any) {
  //       return data.columns.map(function (key) {
  //         return { key: key.title, value: d[key.title] };
  //       });
  //     })
  //     .join('rect')
  //     .attr('x', (d: any) => {
  //       return x(d.key) as any;
  //     })
  //     .attr('y', (d: any, i) => {
  //       return y(d.value);
  //     })
  //     .attr('width', x.bandwidth())
  //     .attr('height', (d: any) => y(0) - y(d.value))
  //     .attr('fill', theme.primary);
  //   ref.current.append(svg.node());
  //   return () => {
  //     svg.remove();
  //   };
  // }, []);

  // React.useEffect(() => {
  // const chart = BarChartC(props.data, {
  //   x: d => d.letter,
  //   y: d => d.frequency,
  //   xDomain: d3.groupSort(
  //     props.data.rows,
  //     ([d]: any) => -d.frequency,
  //     (d: any) => d.letter,
  //   ), // sort by descending frequency
  //   yFormat: '%',
  //   yLabel: '↑ Frequency',
  //   width: props.width,
  //   height: props.height,
  //   color: 'steelblue',
  // } as any) as any;
  // console.log('chart: ', chart);
  // sort:
  //   sort === 'Alphabetical'
  //     ? null
  //     : { x: 'y', reverse: sort.startsWith('Desc') },
  // const barChart = Plot.plot({
  //   marks: [
  //     Plot.ruleY([1 / 26], { stroke: 'orange', strokeWidth: 3 }),
  //     Plot.barY(props.data.rows, {
  //       x: props.data.columns.map(c => c.title),
  //       y: d => d[props.data.columns[0].title],
  //     }),
  //     Plot.ruleY([0]),
  //   ],
  //   y: {
  //     grid: true,
  //   },
  //   marginLeft: 50,
  //   marginTop: 50,
  //   marginBottom: 50,
  // });
  // ref.current.append(barChart);
  // return () => barChart.remove();
  // (
  //   document.querySelector(`#viz-${visualizationId}`) as HTMLElement
  // ).innerHTML = barChart;
  // }, []);

  return (
    <BarChartWrapper id={`viz-${visualizationId}`}>
      <HighchartsReact highcharts={Highcharts} options={configOption} />
    </BarChartWrapper>
  );
}

const BarChartWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
