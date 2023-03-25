/**
 *
 * PageWrapper
 *
 */
import * as React from 'react';
import { Helmet } from 'react-helmet-async';

interface Props {
  title: string;
  description: string;
  children: React.ReactNode
}

export function PageWrapper(props: Props) {
  return (
    <>
    <Helmet>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
    </Helmet>
    {props.children}
    </>
  );
}
