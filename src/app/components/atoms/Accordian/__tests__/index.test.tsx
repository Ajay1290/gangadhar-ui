import * as React from 'react';
import { render } from '@testing-library/react';

import { Accordian } from '..';

describe('<Accordian  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Accordian title="" />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
