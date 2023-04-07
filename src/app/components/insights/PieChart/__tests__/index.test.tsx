import * as React from 'react';
import { render } from '@testing-library/react';

import { PieChart } from '..';

describe('<PieChart  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(
      <PieChart data={{}} height={200} width={300} />,
    );
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
