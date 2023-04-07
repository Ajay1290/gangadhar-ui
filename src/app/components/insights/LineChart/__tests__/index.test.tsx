import * as React from 'react';
import { render } from '@testing-library/react';

import { LineChart } from '..';

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

describe('<LineChart  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(
      <LineChart data={[]} height={100} width={100} />,
    );
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
