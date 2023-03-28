import * as React from 'react';
import { render } from '@testing-library/react';

import { Loader } from '..';

describe('<Loader  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Loader />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
