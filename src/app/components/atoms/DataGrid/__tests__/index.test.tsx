import * as React from 'react';
import { render } from '@testing-library/react';

import { DataGrid } from '..';

describe('<DataGrid  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<DataGrid data={[] as any} />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
