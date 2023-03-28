import * as React from 'react';
import { render } from '@testing-library/react';

import { DashboardGridPage } from '..';

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

describe('<DashboardGridPage  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<DashboardGridPage />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
