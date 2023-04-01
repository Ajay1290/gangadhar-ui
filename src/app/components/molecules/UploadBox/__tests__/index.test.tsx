import * as React from 'react';
import { render } from '@testing-library/react';

import { UploadBox } from '..';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: str => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

describe('<UploadBox  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<UploadBox onChange={() => {}} />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
