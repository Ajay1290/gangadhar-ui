/**
 *
 * BarChart
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import * as d3 from 'd3';
import DataFrame from 'utils/DataFrame';
import generateUUID from 'utils/uuid';

interface Props {
  data: any;
  height: number;
  width: number;
}

export function BarChart(props: Props) {
  const visualizationId = generateUUID();
  const SVGHeight = props.height;
  const SVGWidth = props.width;

  const Height = SVGHeight;
  const Width = SVGWidth;
  const paddingArea = 20;
  const { data, height = Height, width = Width } = props;
  const df = new DataFrame({ data });

  const xDomain = data.map(d => d.x);
  const yDomain = [0, df.maxYs()];

  const xRange = [paddingArea, width - paddingArea];
  const yRange = [height - paddingArea, paddingArea];

  const x = d3.scaleBand().domain(xDomain).range(xRange).padding(0.2);
  const y = d3.scaleLinear().domain(yDomain).nice().range(yRange);

  React.useEffect(() => {
    var svg = d3
      .select(`#viz-${visualizationId} > svg`)
      .attr('width', Width)
      .attr('height', Height);

    // X axis
    svg
      .append('g')
      .attr('transform', `translate(0, ${Height - paddingArea})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(0, 0)rotate(0)')
      .style('text-anchor', 'center');

    // Add Y axis
    svg
      .append('g')
      .attr('transform', `translate(${paddingArea}, 0)`)
      .call(d3.axisLeft(y));

    // Bars
    svg
      .selectAll('mybar')
      .data(data)
      .join('rect')
      .attr('x', (d: any) => x(d.x) as any)
      .attr('y', (d: any) => y(d.y))
      .attr('width', x.bandwidth())
      .attr('height', (d: any) => y(0) - y(d.y))
      .attr('fill', '#58585A');
  }, []);

  return (
    <BarChartWrapper id={`viz-${visualizationId}`}>
      <svg />
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
