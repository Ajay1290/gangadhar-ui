/**
 *
 * Button
 *
 */
import * as React from 'react';
import styled, { useTheme } from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
// import { messages } from './messages';

export type ButtonProps = {
  title: string;
  fullwidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disabled?: boolean;
  variant?: string;
  color?: string;
  sm?: boolean;
} & Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  'styles'
>;

export function Button({
  title,
  variant,
  fullwidth,
  startIcon,
  endIcon,
  disabled = false,
  color,
  sm,
  className,
  ...props
}: ButtonProps) {
  const theme = useTheme() as any;
  const variants = {
    default:
      'rounded disabled:bg-gray-30 disabled:text-gray-50 px-5 py-1 text-base text-white font-normal ',
    outline: 'border bg-transparent disabled:text-gray-30',
    text: 'font-semibold text-sm disabled:text-gray-30',
  };

  const getProperStyle = (): string => {
    const variantStyle = `${variants.default} ${variants[variant as string]}`;

    // const colorStyle = `text-[${color}] ${
    //   VariantButton.default === 'default' && `bg-[${backgroundColor}]`
    // }`;

    const fullStyle = `${fullwidth && 'w-full'}`;

    return fullStyle && variantStyle;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const smStyle = sm
    ? {
        padding: '0.2rem 0.5rem',
        fontSize: '10px',
      }
    : {
        padding: '0.5rem 1rem',
        fontSize: '13px',
      };

  return (
    <ButtonWrapper
      disabled={disabled}
      className={`${getProperStyle()} ${className}`}
      style={{
        color: variant === 'outline' ? theme.primary : theme.secondary,
        background: variant !== 'outline' ? theme.primary : 'transparent',
        border: `1px solid ${theme.primary}`,
        ...smStyle,
      }}
      {...(props as any)}
    >
      <div className="flex flex-row items-center">
        {startIcon && startIcon}
        <div className="px-1">{title}</div>
        {endIcon && endIcon}
      </div>
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled('button')`
  background-color: ${props => props.theme.primary};

  border-radius: 3px;
  color: ${props => props.theme.secondary};
  border: 1px solid ${props => props.theme.primary};

  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;

  line-height: 15px;

  :disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  :hover {
    background-color: ${props => props.theme.primary}ee;
    border: 1px solid ${props => props.theme.primary}aa;
    opacity: 0.9;
    :disabled {
      opacity: 0.4;
    }
  }

  :active {
    opacity: 1;
    background: #68585a;
  }
`;
