/**
 *
 * Asynchronously loads the component for Insight
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Insight = lazyLoad(
  () => import('./index'),
  module => module.Insight,
);
