import * as React from 'react';
import { render } from '@testing-library/react';

import { Insight } from '..';

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

describe('<Insight  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(
      <Insight data={[]} insightType={''} title="" />,
    );
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
