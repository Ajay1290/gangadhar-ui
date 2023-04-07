/**
 *
 * Asynchronously loads the component for MapChart
 *
 */

import { lazyLoad } from 'utils/loadable';

export const MapChart = lazyLoad(
  () => import('./index'),
  module => module.MapChart,
);
