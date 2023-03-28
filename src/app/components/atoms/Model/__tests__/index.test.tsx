import * as React from 'react';
import { render } from '@testing-library/react';

import { Model } from '..';

describe('<Model  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(
      <Model
        children={[] as any}
        downloadBtn={{} as any}
        insightTitle=""
        onClose={() => {}}
        show={true}
      />,
    );
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
