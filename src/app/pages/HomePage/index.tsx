import { PageWrapper } from 'app/components/layouts/PageWrapper';
import { Insight } from 'app/components/molecules/Insight';
import * as React from 'react';

export function HomePage() {
  const data = {
    columns: [
      {
        datatype: 'string',
        id: 20,
        name: 'Is_Exclusive',
        table_id: 2,
        title: 'Is Exclusive',
      },
    ],
    rows: [
      {
        index: 0,
        'Unnamed: 0': 0,
        'Is Exclusive': 1,
        'Base Value': 0,
        Pred_NX: 28.875,
        Pred_EX: 94,
        Pred_SX: 27.25,
      },
      {
        index: 1,
        'Unnamed: 0': 1,
        'Is Exclusive': 1,
        'Base Value': 121,
        Pred_NX: 25,
        Pred_EX: 101.875,
        Pred_SX: 61.875,
      },
      {
        index: 2,
        'Unnamed: 0': 2,
        'Is Exclusive': null,
        'Base Value': null,
        Pred_NX: 31.125,
        Pred_EX: 55,
        Pred_SX: 44.375,
      },
    ],
  };

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
      {/* <Insight
        title="Sample Line Insight With Raw Data"
        insightType="line"
        data={lineData}
      ></Insight> */}
    </PageWrapper>
  );
}
