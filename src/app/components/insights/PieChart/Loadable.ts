/**
 *
 * Asynchronously loads the component for PieChart
 *
 */

import { lazyLoad } from 'utils/loadable';

export const PieChart = lazyLoad(
  () => import('./index'),
  module => module.PieChart,
);
