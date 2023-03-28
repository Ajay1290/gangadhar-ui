import * as React from 'react';
import { render } from '@testing-library/react';

import { Wizard } from '..';

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

describe('<Wizard  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Wizard />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
