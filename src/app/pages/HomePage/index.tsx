import { PageWrapper } from 'app/components/layouts/PageWrapper';
import { Insight } from 'app/components/molecules/Insight';
import * as React from 'react';

export function HomePage() {
  const data = [
    { x: 'Jan', y: 10 },
    { x: 'Feb', y: 21 },
    { x: 'Mar', y: 23 },
    { x: 'Apr', y: 53 },
    { x: 'May', y: 14 },
    { x: 'June', y: 24 },
    { x: 'July', y: 26 },
    { x: 'Aug', y: 16 },
    { x: 'Sep', y: 45 },
    { x: 'Oct', y: 19 },
    { x: 'Nov', y: 29 },
    { x: 'Dec', y: 14 },
  ];

  const lineData = [
    { x: 0, y: 10 },
    { x: 1, y: 21 },
    { x: 2, y: 23 },
    { x: 3, y: 53 },
    { x: 4, y: 14 },
    { x: 5, y: 24 },
    { x: 6, y: 26 },
    { x: 7, y: 45 },
    { x: 8, y: 4 },
    { x: 9, y: 42 },
    { x: 10, y: 14 },
    { x: 11, y: 23 },
    { x: 12, y: 23 },
    { x: 13, y: 23 },
    { x: 14, y: 54 },
    { x: 15, y: 44 },
    { x: 16, y: 20 },
    { x: 17, y: 45 },
    { x: 18, y: 45 },
    { x: 19, y: 42 },
    { x: 20, y: 14 },
  ];

  return (
    <PageWrapper
      title="Home Page"
      description="A Boilerplate application homepage"
    >
      <Insight
        title="Sample Bar Insight With Raw Data"
        insightType="bar"
        data={data}
      ></Insight>
      <Insight
        title="Sample Line Insight With Raw Data"
        insightType="line"
        data={lineData}
      ></Insight>
    </PageWrapper>
  );
}
