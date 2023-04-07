import * as React from 'react';
import { render } from '@testing-library/react';

import { Kpi } from '..';

describe('<Kpi  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Kpi data={{}} aggType="sum" />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
