/**
 *
 * Accordian
 *
 */
import * as React from 'react';
import { CgChevronDown, CgChevronUp } from 'react-icons/cg';
import styled from 'styled-components/macro';

interface Props {
  className?: string;
  title: string;
  children?: React.ReactNode;
}

export function Accordian(props: Props) {
  const [show, setShow] = React.useState(true);

  return (
    <AccordianWrapper className={props.className}>
      <div
        className="flex flex-row items-center cursor-pointer"
        onClick={() => setShow(!show)}
      >
        <span>
          {show ? (
            <CgChevronDown fontSize={16} />
          ) : (
            <CgChevronUp fontSize={16} />
          )}
        </span>
        <span className="text-xs px-1 font-semibold">{props.title}</span>
      </div>
      {show && <div>{props.children}</div>}
    </AccordianWrapper>
  );
}

const AccordianWrapper = styled.div``;
