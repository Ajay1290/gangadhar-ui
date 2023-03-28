import * as React from 'react';
import { render } from '@testing-library/react';

import { NotebookPage } from '..';

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

describe('<NotebookPage  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<NotebookPage />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
