/**
 *
 * Asynchronously loads the component for UploadBox
 *
 */

import { lazyLoad } from 'utils/loadable';

export const UploadBox = lazyLoad(
  () => import('./index'),
  module => module.UploadBox,
);
