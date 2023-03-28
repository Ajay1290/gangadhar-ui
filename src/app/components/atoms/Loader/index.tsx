/**
 *
 * Loader
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';

interface Props {}

export function Loader(props: Props) {
  return (
    <div className="spinner-container">
      <LoadingSpinner></LoadingSpinner>
    </div>
  );
}

const LoadingSpinner = styled.div`
  width: 30px;
  height: 30px;
  border: 1px solid #f3f3f3; /* Light grey */
  /* border: 12px solid #58585a; Black */
  border-top: 2px solid #58585a; /* Black */
  border-radius: 50%;

  animation: spinner 0.7s linear infinite;
`;
