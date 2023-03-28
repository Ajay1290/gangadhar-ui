import * as React from 'react';
import { render } from '@testing-library/react';

import { DataSourcePage } from '..';

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

describe('<DataSourcePage  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<DataSourcePage />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
