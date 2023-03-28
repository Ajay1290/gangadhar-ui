/**
 *
 * Footer
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
// import { useTranslation } from 'react-i18next';
// import { messages } from './messages';

interface Props {}

export function Footer(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { t, i18n } = useTranslation();

  return (
    <FooterWrapper className="border-t mt-4">
      {'You Reach the END!!!'}
      {/*  {t(...messages.someThing())}  */}
    </FooterWrapper>
  );
}

const FooterWrapper = styled.div`
  padding: 1em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
