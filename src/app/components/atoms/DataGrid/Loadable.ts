/**
 *
 * Asynchronously loads the component for DataGrid
 *
 */

import { lazyLoad } from 'utils/loadable';

export const DataGrid = lazyLoad(
  () => import('./index'),
  module => module.DataGrid,
);
