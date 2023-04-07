import * as React from 'react';
import { render } from '@testing-library/react';

import { SignUpPage } from '..';

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

describe('<SignUpPage  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<SignUpPage />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
