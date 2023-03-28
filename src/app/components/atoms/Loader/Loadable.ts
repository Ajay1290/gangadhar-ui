/**
 *
 * Asynchronously loads the component for Loader
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Loader = lazyLoad(
  () => import('./index'),
  module => module.Loader,
);
