import * as React from 'react';
import { render } from '@testing-library/react';

import { MapChart } from '..';

describe('<MapChart  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(
      <MapChart data={[]} height={200} width={300} />,
    );
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
