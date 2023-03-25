import { DataGrid } from 'app/components/DataGrid';
import { PageWrapper } from 'app/components/PageWrapper';
import * as React from 'react';

export function HomePage() {
  return (
    <PageWrapper title="Home Page" description="A Boilerplate application homepage" >
      <span>My HomePage</span>
      <DataGrid></DataGrid>
    </PageWrapper>
  );
}
