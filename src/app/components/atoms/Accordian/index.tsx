/**
 *
 * Accordian
 *
 */
import * as React from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { CgChevronDown, CgChevronUp } from 'react-icons/cg';
import styled from 'styled-components/macro';

interface Props {
  className?: string;
  title: string;
  children?: React.ReactNode;
  selectable?: boolean;
  onSelect?: Function;
  selected?: boolean;
}

export function Accordian(props: Props) {
  const [show, setShow] = React.useState(false);
  const [selected, setSelected] = React.useState(false);

  React.useEffect(() => {
    setSelected(props.selected || false);
    if (props.selected) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [props.selected]);

  const onSelectionChanged = e => {
    setSelected(!selected);
    setShow(!selected);
    props.onSelect && props.onSelect(e.target.checked);
  };

  return (
    <AccordianWrapper className={props.className}>
      {props.selectable ? (
        <div className="flex flex-row items-center justify-between  border-b p-1">
          <span className="flex flex-row items-center text-xs px-1 font-semibold">
            <input
              type="checkbox"
              checked={selected}
              onChange={onSelectionChanged}
              name=""
              id=""
            />
            <span
              style={{ maxWidth: 140 }}
              className="pl-1 text-ellipsis overflow-hidden whitespace-nowrap"
              title={props.title}
            >
              {props.title}
            </span>
          </span>
          <span>
            {show ? (
              <AiOutlineMinus
                className="cursor-pointer"
                onClick={() => setShow(false)}
                fontSize={16}
              />
            ) : (
              <AiOutlinePlus
                className="cursor-pointer"
                onClick={() => setShow(true)}
                fontSize={16}
              />
            )}
          </span>
        </div>
      ) : (
        <div
          className="flex flex-row items-center cursor-pointer border-b p-1"
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
      )}
      {show && <div>{props.children}</div>}
    </AccordianWrapper>
  );
}

const AccordianWrapper = styled.div``;
