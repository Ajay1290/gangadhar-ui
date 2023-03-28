/**
 *
 * Asynchronously loads the component for Wizard
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Wizard = lazyLoad(
  () => import('./index'),
  module => module.Wizard,
);
