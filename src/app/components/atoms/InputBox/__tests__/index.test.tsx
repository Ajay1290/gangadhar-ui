import * as React from 'react';
import { render } from '@testing-library/react';

import { InputBox } from '..';

describe('<InputBox  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<InputBox />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
