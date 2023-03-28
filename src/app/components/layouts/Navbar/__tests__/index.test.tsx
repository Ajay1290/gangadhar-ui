import * as React from 'react';
import { render } from '@testing-library/react';

import { Navbar } from '..';

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

describe('<Navbar  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Navbar />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
