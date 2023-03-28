/**
 *
 * Asynchronously loads the component for Accordian
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Accordian = lazyLoad(
  () => import('./index'),
  module => module.Accordian,
);
