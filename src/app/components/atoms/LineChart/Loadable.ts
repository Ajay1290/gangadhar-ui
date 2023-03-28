/**
 *
 * Asynchronously loads the component for LineChart
 *
 */

import { lazyLoad } from 'utils/loadable';

export const LineChart = lazyLoad(
  () => import('./index'),
  module => module.LineChart,
);
