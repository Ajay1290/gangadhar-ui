/**
 *
 * NotebookPage
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
// import { useTranslation } from 'react-i18next';
// import { messages } from './messages';
import { PageWrapper } from 'app/components/layouts/PageWrapper';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { IoAddOutline, IoPlayOutline } from 'react-icons/io5';
import { VscClearAll, VscRunAll } from 'react-icons/vsc';

import { Loader } from 'app/components/atoms/Loader';
import { Button } from 'app/components/atoms/Button';
import { marked } from 'marked';

interface Props {}

export function NotebookPage(props: Props) {
  const { notebookId } = useParams();
  const [isLoading, setIsLoading] = React.useState(true);
  const [notebook, setNotebook] = React.useState({} as any);

  React.useEffect(() => {
    fetchNotebooks();
  }, []);

  const reRunAllNotebooks = () => {
    setIsLoading(true);
    axios
      .post(`http://localhost:8080/api/notebook/job/${notebookId}`)
      .then((res: any) => {
        // setNotebook(res.data.body);
        console.log(res.data);
        setIsLoading(false);
      })
      .catch(e => {
        console.log('E: ', e);
        setIsLoading(false);
      });
  };

  const stopRunningAllNotebooks = () => {
    setIsLoading(true);
    axios
      .delete(`http://localhost:8080/api/notebook/job/${notebookId}`)
      .then((res: any) => {
        // setNotebook(res.data.body);
        console.log(res.data);
        setIsLoading(false);
      })
      .catch(e => {
        console.log('E: ', e);
        setIsLoading(false);
      });
  };

  const fetchNotebooks = () => {
    setIsLoading(true);
    axios
      .get(`http://localhost:8080/api/notebook/${notebookId}`)
      .then((res: any) => {
        setNotebook(res.data.body);
        console.log(res.data);
        setIsLoading(false);
      })
      .catch(e => {
        console.log('E: ', e);
        setIsLoading(false);
      });
  };

  const Paragraph = ({ paragraph }) => {
    return (
      <div className="flex flex-row w-full items-start mb-4 shadow">
        <div className="w-full flex flex-col">
          <div className="w-full border rounded-b-none p-2 rounded ">
            <div className="border-b flex pb-1 flex-row justify-between">
              <div>{paragraph.title}</div>
              <div className="flex flex-row">
                <span className="px-2 flex flex-row items-center text-orange-500">
                  <IoPlayOutline fontSize={14} />
                  <span className="px-1">RUN</span>
                </span>
                <span className=" text-green-500">{paragraph.status}</span>
              </div>
            </div>
            <textarea
              className="py-1 w-full outline-none"
              style={{
                resize: 'vertical',
                whiteSpace: 'pre-line',
              }}
              rows={paragraph.text.split('\n').length}
              value={paragraph.text}
              onChange={e => {}}
            ></textarea>
            {/* <input type={'text'} className="py-1" value={} /> */}
          </div>
          {paragraph.results && (
            <div className="w-full relative bg-slate-100 shadow-inner  p-2">
              <div className="text-green-500">{paragraph.results.code}</div>
              <div style={{ maxHeight: 200, overflow: 'auto' }}>
                {paragraph.results.msg.map((m, i) => (
                  <div key={`msg-${i}`}>
                    {m.type === 'TEXT' && (
                      <p style={{ whiteSpace: 'pre-line' }}>{m.data}</p>
                    )}
                    {m.type === 'HTML' && (
                      <div
                        style={{ whiteSpace: 'pre-line' }}
                        dangerouslySetInnerHTML={{
                          __html: marked.parse(m.data),
                        }}
                      ></div>
                    )}
                  </div>
                ))}
              </div>

              <p className="mt-2 text-gray-400" style={{ fontSize: 10 }}>
                Took 24 sec. Last updated by anonymous at March 31 2023, 4:18:46
                PM.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <PageWrapper
      title="Dashboard Grid Page"
      description="A Boilerplate application homepage"
    >
      {isLoading ? (
        <Loader />
      ) : (
        <div className="p-4">
          <PageTitle className="border-b">
            <div className="flex-1">{notebook.name}</div>
            <div className="">
              <span className="">
                <Button
                  variant="outline"
                  sm
                  startIcon={<IoAddOutline />}
                  title="Cell"
                />
              </span>
              <span className="px-1">
                <Button
                  variant="outline"
                  sm
                  startIcon={<IoAddOutline />}
                  title="Markdown"
                />
              </span>
              <span className="border-l px-1">
                <Button
                  variant="outline"
                  sm
                  onClick={() => reRunAllNotebooks()}
                  startIcon={<VscRunAll />}
                  title="Run All"
                />
              </span>
              <span className=" px-1">
                <Button
                  variant="outline"
                  sm
                  onClick={() => stopRunningAllNotebooks()}
                  startIcon={<VscClearAll />}
                  title="Stop All"
                />
              </span>
              <span className=" px-1">
                <Button
                  variant="outline"
                  sm
                  startIcon={<VscClearAll />}
                  title="Clear All Outputs"
                />
              </span>
            </div>
          </PageTitle>
          <div>
            <div className="w-full h-full flex flex-col items-center justify-center p-2">
              {notebook.paragraphs?.map((paragraph, i) => (
                <Paragraph key={`para-${i}`} paragraph={paragraph} />
              ))}
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}

const PageTitle = styled.h2`
  margin-bottom: 0.25rem;
  padding: 0.25rem 0.5rem;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  width: 100%;
`;
