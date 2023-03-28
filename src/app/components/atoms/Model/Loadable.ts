/**
 *
 * Asynchronously loads the component for Model
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Model = lazyLoad(
  () => import('./index'),
  module => module.Model,
);
