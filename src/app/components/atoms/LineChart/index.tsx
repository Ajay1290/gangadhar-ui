/**
 *
 * LineChart
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
// import { useTranslation } from 'react-i18next';
// import { messages } from './messages';
import DataFrame from 'utils/DataFrame';
import * as d3 from 'd3';
import generateUUID from 'utils/uuid';

interface Props {
  data: any;
  height: number;
  width: number;
}

export function LineChart(props: Props) {
  const visualizationId = generateUUID();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { t, i18n } = useTranslation();
  const SVGHeight = props.height;
  const SVGWidth = props.width;
  const Height = SVGHeight;
  const Width = SVGWidth;
  const paddingArea = 20;

  const { data, height = Height, width = Width } = props;
  const df = new DataFrame({ data });

  const xDomain = [df.minXs(), df.maxXs()];
  const yDomain = [df.minYs(), df.maxYs()];

  const xRange = [paddingArea, width - paddingArea];
  const yRange = [height - paddingArea, paddingArea];

  const x = d3.scaleLinear().domain(xDomain).range(xRange);
  const y = d3.scaleLinear().domain(yDomain).range(yRange);

  // This allows to find the closest X index of the mouse:
  var bisect = d3.bisector((d: any) => d.x).left;

  React.useEffect(() => {
    var svg = d3
      .select(`#viz-${visualizationId} > svg`)
      .attr('width', Width)
      .attr('height', Height);

    // Create the circle that travels along the curve of chart
    var focus = svg
      .append('g')
      .append('circle')
      .style('fill', 'none')
      .attr('stroke', 'black')
      .attr('r', 4)
      .style('opacity', 0);

    // What happens when the mouse move -> show the annotations at the right positions.
    function mouseover() {
      tooltip.style('visibility', 'visible');
      focus.style('opacity', 1);
    }

    const tooltip = d3
      .select(`#viz-${visualizationId}`)
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute');

    const mousemove = e => {
      // recover coordinate we need
      var x0 = x.invert(d3.pointer(e)[0]);
      var i = bisect(data, x0, 1);
      const selectedData = data[i];
      focus.attr('cx', x(selectedData.x)).attr('cy', y(selectedData.y));
      tooltip
        .html(
          `
        <div>x: <span class='font-medium'>${selectedData.x}</span></div>
        <div>y: <span class='font-medium'>${selectedData.y}</span></div>
        `,
        )
        .style('left', `${x(selectedData.x) + paddingArea}px`)
        .style('top', `${y(selectedData.y) - paddingArea}px`);
    };

    function mouseout() {
      tooltip.style('visibility', 'hidden');
      focus.style('opacity', 0);
    }

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

    // Create a rect on top of the svg area: this rectangle recovers mouse position
    svg
      .append('rect')
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .attr('width', width)
      .attr('height', height)
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseout', mouseout);

    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#58585A')
      .attr('stroke-width', 1.5)
      .attr(
        'd',
        d3
          .line()
          .x((d: any) => x(d.x))
          .y((d: any) => y(d.y)),
      );
  }, []);
  return (
    <LineChartWrapper id={`viz-${visualizationId}`}>
      <svg />
    </LineChartWrapper>
  );
}

const LineChartWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
