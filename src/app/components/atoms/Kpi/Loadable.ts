/**
 *
 * Asynchronously loads the component for Kpi
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Kpi = lazyLoad(
  () => import('./index'),
  module => module.Kpi,
);
