/**
 *
 * Model
 *
 */
import * as React from 'react';
import { CgClose } from 'react-icons/cg';
import styled from 'styled-components/macro';

interface Props {
  children: React.ReactElement;
  show: boolean;
  onClose?: Function;
  downloadBtn?: Function;
  insightTitle?: string;
  title?: string;
  width?: string;
  height?: string;
}

export function Model(props: Props) {
  const [showModel, setShowModel] = React.useState(false);

  React.useEffect(() => {
    if (props.show) {
      document.body.style.overflow = 'hidden';
    }
    setShowModel(props.show);
  }, [props.show]);

  const onClose = () => {
    document.body.style.overflow = 'auto';
    setShowModel(false);
    props.onClose && props.onClose();
  };

  return (
    <ModelWrapper
      style={{
        display: showModel ? 'flex' : 'none',
      }}
    >
      <ModelBox
        style={{
          width: props.width ? props.width : '90%',
          height: props.height ? props.height : '90%',
        }}
      >
        <div className="flex flex-row justify-between p-2 px-4 border-b">
          <div className="flex flex-row items-baseline">
            {props.insightTitle ? (
              <>
                <NavTitle>Gangadhar</NavTitle>
                <NavSubTitle className="px-4">{props.insightTitle}</NavSubTitle>
              </>
            ) : (
              <NavTitle>{props.title}</NavTitle>
            )}
          </div>
          <div className="flex flex-row items-center">
            {props.downloadBtn && (
              <div className="px-4">{props.downloadBtn()}</div>
            )}
            <div className="pl-2 border-l">
              <CgClose cursor={'pointer'} size={20} onClick={() => onClose()} />
            </div>
          </div>
        </div>
        <div className="p-4 flex flex-col h-full w-full">{props.children}</div>
      </ModelBox>
    </ModelWrapper>
  );
}

const NavTitle = styled.h1`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.5px;
  color: ${props => props.theme.primary};
`;

const NavSubTitle = styled.h1`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 19px;
  letter-spacing: 0.5px;
  color: ${props => props.theme.primary};
`;

const ModelBox = styled.div`
  background-color: ${props => props.theme.secondary};
  height: 90%;
  width: 90%;
  z-index: 9999999;
  display: flex;
  flex-direction: column;
  margin: auto;
  box-shadow: 2px 2px 20px rgba(86, 86, 86, 0.6);
  border-radius: 5px;
  border: 1px solid rgba(88, 88, 90, 0.5);

  transition: 1s;
  transition-delay: 100ms;
  transition-timing-function: linear;
`;

const ModelWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: rgba(88, 88, 90, 0.4);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);

  transition: 1s;
  transition-delay: 100ms;
  transition-timing-function: linear;
`;
