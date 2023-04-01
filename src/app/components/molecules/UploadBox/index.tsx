/**
 *
 * UploadBox
 *
 */
import * as React from 'react';
// import styled from 'styled-components/macro';
// import { useTranslation } from 'react-i18next';
// import { messages } from './messages';
import { AiOutlineUpload } from 'react-icons/ai';
import { InputBox } from 'app/components/atoms/InputBox';
import { BsFiletypeCsv } from 'react-icons/bs';

interface Props {
  onChange: Function;
}

export function UploadBox(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { t, i18n } = useTranslation();

  const [fileName, setFileName] = React.useState('');

  const fileInput = React.useRef({} as any);

  const handleFileUpload = event => {
    setFileName(event.target.files[0].name);
    props.onChange(event);
  };

  return (
    <>
      <div
        onClick={() => (fileInput.current as HTMLElement).click()}
        className="border border-dashed cursor-pointer flex flex-col h-full items-center justify-center my-2 p-8"
      >
        {fileName ? (
          <>
            <BsFiletypeCsv fontSize={30} />
            <p className="mt-2">{fileName}</p>
          </>
        ) : (
          <>
            <AiOutlineUpload fontSize={30} />
            <p className="mt-2">Upload a CSV as source for table</p>{' '}
          </>
        )}
      </div>
      <InputBox
        innerRef={fileInput}
        onChange={handleFileUpload}
        hidden={true}
        accept=".csv"
        type={'file'}
      />
    </>
  );
}
