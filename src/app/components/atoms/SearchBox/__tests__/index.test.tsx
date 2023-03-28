import * as React from 'react';
import { render } from '@testing-library/react';

import { SearchBox } from '..';

describe('<SearchBox  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<SearchBox list={[]} searchKey="" />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
