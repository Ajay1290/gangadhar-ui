/**
 *
 * DashboardPage
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
// import { useTranslation } from 'react-i18next';
// import { messages } from './messages';
import { PageWrapper } from 'app/components/layouts/PageWrapper';
import { Insight } from 'app/components/molecules/Insight';

interface Props {}

export function DashboardPage(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { t, i18n } = useTranslation();

  const rawData = {
    columns: ['Head 1', 'Head 2'],
    rows: [
      { 'Head 1': 1, 'Head 2': 1 },
      { 'Head 1': 2, 'Head 2': 1 },
      { 'Head 1': 3, 'Head 2': 1 },
      { 'Head 1': 4, 'Head 2': 1 },
      { 'Head 1': 5, 'Head 2': 1 },
      { 'Head 1': 6, 'Head 2': 1 },
      { 'Head 1': 7, 'Head 2': 1 },
      { 'Head 1': 8, 'Head 2': 1 },
      { 'Head 1': 9, 'Head 2': 1 },
      { 'Head 1': 10, 'Head 2': 1 },
      { 'Head 1': 11, 'Head 2': 1 },
      { 'Head 1': 12, 'Head 2': 1 },
      { 'Head 1': 13, 'Head 2': 1 },
      { 'Head 1': 14, 'Head 2': 1 },
      { 'Head 1': 15, 'Head 2': 1 },
      { 'Head 1': 16, 'Head 2': 1 },
      { 'Head 1': 17, 'Head 2': 1 },
      { 'Head 1': 18, 'Head 2': 1 },
      { 'Head 1': 19, 'Head 2': 1 },
      { 'Head 1': 20, 'Head 2': 1 },
      { 'Head 1': 21, 'Head 2': 1 },
      { 'Head 1': 22, 'Head 2': 1 },
      { 'Head 1': 23, 'Head 2': 1 },
      { 'Head 1': 24, 'Head 2': 1 },
      { 'Head 1': 25, 'Head 2': 1 },
    ],
  };

  return (
    <PageWrapper
      title="Dashboard Page"
      description="A Boilerplate application homepage"
    >
      <div className="p-4">
        <Insight
          title="Sample Text Insight With Raw Data"
          insightType="text"
          data={{
            text: `
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi ullam laboriosam distinctio tempora, et sint quibusdam adipisci dicta ut voluptates eveniet consequuntur, fugit eum architecto dolores error esse? Distinctio, exercitationem architecto suscipit quia provident asperiores atque placeat nesciunt deleniti. Sapiente quas aut impedit suscipit expedita autem ut, magni voluptates accusamus!
          `,
          }}
        />
        <Insight
          title="Sample Table Insight With Raw Data"
          insightType="table"
          data={rawData}
        />
      </div>
    </PageWrapper>
  );
}
