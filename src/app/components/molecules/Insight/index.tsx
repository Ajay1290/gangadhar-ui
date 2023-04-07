/**
 *
 * Insight
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
// import { useTranslation } from 'react-i18next';
import { DataGrid } from 'app/components/atoms/DataGrid';
import { CgMaximizeAlt } from 'react-icons/cg';
import { FiDownload, FiEdit3 } from 'react-icons/fi';
import { BarChart } from 'app/components/insights/BarChart';
import { LineChart } from 'app/components/insights/LineChart';
import { Model } from 'app/components/atoms/Model/Loadable';
import { Loader } from 'app/components/atoms/Loader';
import { useNavigate } from 'react-router-dom';
import { Kpi } from 'app/components/insights/Kpi';
import { AiOutlineDelete } from 'react-icons/ai';
import axios from 'axios';
import { PieChart } from 'app/components/insights/PieChart/Loadable';
import { Allotment } from 'allotment';
import { MapChart } from 'app/components/insights/MapChart';

enum insightTypeEnum {
  Table = 'table',
  Bar = 'bar',
  Line = 'line',
  Text = 'text',
  KPI = 'kpis',
  Pie = 'pie',
  Map = 'map',
}

interface Props {
  title: string;
  insightType: string;
  data?: any;
  id?: string;
  dataApi?: Promise<any>;
  onDelete?: Function;
  groupBy?: any;
}

export function Insight(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isMaximized, setisMaximized] = React.useState(false);
  const insightWrapperRef = React.useRef({} as any);
  const insightModelWrapperRef = React.useRef({} as any);

  const [width, setWidth] = React.useState(100);
  const [height, setHeight] = React.useState(100);

  const [widthModel, setWidthModel] = React.useState(100);
  const [heightModel, setHeightModel] = React.useState(100);

  const [data, setData] = React.useState([] as any);

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    try {
      if (
        props.insightType == insightTypeEnum.Bar ||
        props.insightType == insightTypeEnum.Line
      ) {
        const resizeObserver = new ResizeObserver(event => {
          setIsLoading(true);

          if (event.length > 0) {
            setWidth(
              Number(event[0]?.contentBoxSize[0]?.inlineSize) >= 0
                ? Number(event[0]?.contentBoxSize[0]?.inlineSize)
                : 0,
            );
            setHeight(
              Number(event[0]?.contentBoxSize[0]?.blockSize) >= 0
                ? Number(event[0]?.contentBoxSize[0]?.blockSize)
                : 0,
            );
            if (event[1]) {
              setWidthModel(
                Number(event[1]?.contentBoxSize[0]?.inlineSize) >= 0
                  ? Number(event[1]?.contentBoxSize[0]?.inlineSize)
                  : 0,
              );
              setHeightModel(
                Number(event[1]?.contentBoxSize[0]?.blockSize) >= 0
                  ? Number(event[1]?.contentBoxSize[0]?.blockSize)
                  : 0,
              );
            }
          }

          setTimeout(() => {
            setIsLoading(false);
          }, 400);
        });

        if (resizeObserver) {
          if (insightWrapperRef && insightWrapperRef.current) {
            resizeObserver.observe(insightWrapperRef.current);
          }
          if (insightModelWrapperRef && insightModelWrapperRef.current) {
            resizeObserver.observe(insightModelWrapperRef.current);
          }
        }
      }
    } catch (error) {
      console.log('error: ', error);
    }

    if (props.dataApi) {
      props.dataApi
        ?.then(r => {
          setData(r);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        })
        .catch(e => {
          console.log(e);
          setTimeout(() => {
            setIsLoading(false);
          }, 400);
        });
    } else {
      setData(props.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 400);
    }
  }, []);

  const DownloadBtn = ({ iconSize = 14 }) => {
    let url = '#';
    let fileName = '';
    if (props.insightType === (insightTypeEnum.Bar || insightTypeEnum.Line)) {
      const str = JSON.stringify(data);
      const bytes = new TextEncoder().encode(str);
      const blob = new Blob([bytes], {
        type: 'application/json;charset=utf-8',
      });
      url = URL.createObjectURL(blob);
      fileName = `${props.title}.json`;
    }
    if (props.insightType === insightTypeEnum.Table) {
      const str = JSON.stringify(data.rows);
      const bytes = new TextEncoder().encode(str);
      const blob = new Blob([bytes], {
        type: 'application/json;charset=utf-8',
      });
      url = URL.createObjectURL(blob);
      fileName = `${props.title}.json`;
    }
    if (props.insightType === insightTypeEnum.Text) {
      const str = JSON.stringify(data.text);
      const bytes = new TextEncoder().encode(str);
      const blob = new Blob([bytes], {
        type: 'application/text;charset=utf-8',
      });
      url = URL.createObjectURL(blob);
      fileName = `${props.title}.txt`;
    }
    return (
      <a href={url} target={'_blank'} download={fileName} rel="noreferrer">
        <FiDownload size={iconSize} />
      </a>
    );
  };

  const RenderInisght = ({ height, width }) => {
    if (props.insightType === insightTypeEnum.Bar) {
      return (
        <BarChart
          height={height}
          width={width}
          groupBy={props.groupBy}
          data={data}
        />
      );
    } else if (props.insightType === insightTypeEnum.Line) {
      return <LineChart height={height} width={width} data={data} />;
    } else if (props.insightType === insightTypeEnum.Table) {
      return <DataGrid data={data} />;
    } else if (props.insightType === insightTypeEnum.Text) {
      return <p>{data.text}</p>;
    } else if (props.insightType === insightTypeEnum.KPI) {
      return <Kpi data={data} aggType={data.config.agg_type} />;
    } else if (props.insightType === insightTypeEnum.Pie) {
      return <PieChart data={data} height={height} width={width} />;
    } else if (props.insightType === insightTypeEnum.Map) {
      return <MapChart data={data} height={height} width={width} />;
    } else {
      return <p>NO RENDER</p>;
    }
  };

  const onModelClosed = () => {
    setisMaximized(false);
  };

  const onEditClicked = () => {
    if (props.id) {
      navigate(`/insight/${props.id}`);
    }
  };

  const onDeleteClicked = () => {
    if (props.id) {
      axios
        .delete(`http://localhost:5000/insight/${props.id}`)
        .then(r => {
          console.log('Delete: ', r);
          props.onDelete && props.onDelete();
        })
        .catch(e => {
          console.log('E: ', e);
        });
    }
  };

  return (
    <InsightWrapper>
      <div className="border-b p-1 flex flex-row justify-between items-center ">
        <InsightTitle>{props.title}</InsightTitle>
        <div className="flex flex-row">
          <span className="px-1">
            <AiOutlineDelete
              cursor={'pointer'}
              onClick={onDeleteClicked}
              size={14}
            />
          </span>
          <span className="px-1">
            <DownloadBtn />
          </span>
          <span className="px-1">
            <CgMaximizeAlt
              cursor={'pointer'}
              size={14}
              onClick={() => {
                setisMaximized(true);
              }}
            />
          </span>
          <span className="px-1">
            <FiEdit3 cursor={'pointer'} onClick={onEditClicked} size={14} />
          </span>
        </div>
      </div>
      <div
        className="p-2 h-full relative overflow-auto "
        ref={insightWrapperRef}
      >
        {!isLoading ? (
          <RenderInisght height={height} width={width}></RenderInisght>
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <Loader />
          </div>
        )}
      </div>
      <Model
        insightTitle={props.title}
        downloadBtn={() => DownloadBtn({ iconSize: 16 })}
        show={isMaximized}
        onClose={() => onModelClosed()}
      >
        <div className="flex w-full h-full items-center justify-center">
          <div
            className="p-2 h-full relative overflow-auto flex w-full flex-col"
            ref={insightModelWrapperRef}
          >
            {isLoading ? (
              <div className="flex w-full h-full items-center justify-center">
                <Loader />
              </div>
            ) : (
              <RenderInisght height={height} width={width}></RenderInisght>
            )}
          </div>
        </div>
      </Model>
    </InsightWrapper>
  );
}

const InsightWrapper = styled.div`
  height: 400px;
  display: flex;
  flex-direction: column;
`;

const InsightTitle = styled.h6`
  font-size: 15px;
`;
