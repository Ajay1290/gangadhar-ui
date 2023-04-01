/**
 *
 * InputBox
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';

export type InputProps = {
  fullwidth?: boolean;
  startIcon?: string;
  endIcon?: string;
  disabled?: boolean;
  variant?: string;
  color?: string;
  innerRef?: any;
  value?: any;
} & Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  'styles'
>;

export function InputBox(props: InputProps) {
  return (
    <InputBoxWrapper
      style={{ visibility: props.hidden ? 'hidden' : 'visible' }}
    >
      {props.startIcon && props.startIcon}
      <Input
        type="text"
        ref={props.innerRef}
        placeholder={props.placeholder}
        {...(props as any)}
      />
      {props.endIcon && props.endIcon}
    </InputBoxWrapper>
  );
}

const InputBoxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #58585a88;
  padding: 5px;
  border-radius: 2px;
  width: 100%;
`;

const Input = styled.input`
  outline: none;
  padding: 0 4px;
  font-size: 12px;
  width: 100%;
`;
