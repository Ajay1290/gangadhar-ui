import * as React from 'react';
import { render } from '@testing-library/react';

import { BarChart } from '..';

describe('<BarChart  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(
      <BarChart data={[]} height={100} width={100} />,
    );
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
