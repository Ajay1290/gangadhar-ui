/**
 *
 * PageWrapper
 *
 */
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { Navbar } from '../Navbar';

interface Props {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function PageWrapper(props: Props): React.ReactElement {
  React.useEffect(() => {}, []);

  return (
    <>
      <Helmet>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
      </Helmet>
      <Navbar />
      <Main className="flex flex-col h-full">{props.children}</Main>
    </>
  );
}

const Main = styled.main`
  max-width: 1386px;
  width: 100%;
  margin: 0 auto;
  padding: 1em;
  height: calc(100% - 45px);
`;
