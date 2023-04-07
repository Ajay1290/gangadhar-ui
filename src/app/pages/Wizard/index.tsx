/**
 *
 * Wizard
 *
 */
import * as React from 'react';
import { useTheme } from 'styled-components/macro';
// import { useTranslation } from 'react-i18next';
// import { messages } from './messages';
import { PageWrapper } from 'app/components/layouts/PageWrapper';
import { DataGrid } from 'app/components/atoms/DataGrid/Loadable';
import { CgInfo } from 'react-icons/cg';
import {
  AiFillDatabase,
  AiOutlineClose,
  AiOutlineReload,
  AiOutlineUpload,
} from 'react-icons/ai';
import { BsTextWrap } from 'react-icons/bs';

import { SearchBox } from 'app/components/atoms/SearchBox';
import { Accordian } from 'app/components/atoms/Accordian/Loadable';
import { FiDownload, FiEdit3 } from 'react-icons/fi';
import { SiReacttable } from 'react-icons/si';
import { TbDragDrop2 } from 'react-icons/tb';
import { MdOutlineDragIndicator, MdOutlineInsights } from 'react-icons/md';

import axios from 'axios';
import { Loader } from 'app/components/atoms/Loader/Loadable';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'app/components/atoms/Button';
import { Model } from 'app/components/atoms/Model/Loadable';
import { InputBox } from 'app/components/atoms/InputBox';
import { LineChart } from 'app/components/insights/LineChart/Loadable';
import { BarChart } from 'app/components/insights/BarChart';
import { Kpi } from 'app/components/insights/Kpi/Loadable';
import { PieChart } from 'app/components/insights/PieChart/Loadable';
import { MapChart } from 'app/components/insights/MapChart/Loadable';

interface Props {}

export function Wizard(props: Props) {
  const theme = useTheme() as any;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { t, i18n } = useTranslation();

  const navigate = useNavigate();
  const { insightId } = useParams();

  const [isLoading, setIsLoading] = React.useState(true);
  const [tables, setTables] = React.useState([] as any);
  const [list, setList] = React.useState([] as any);
  const [groupingList, setGroupingList] = React.useState([] as any);
  const [rawDataSourceData, setRawDataSourceData] = React.useState({} as any);
  const [selectedTable, setSelectedTable] = React.useState({} as any);
  const [dataSourceData, setDataSourceData] = React.useState({} as any);
  const [insightData, setInsightData] = React.useState({} as any);
  const [selectedAggType, setSelectedAggType] = React.useState({ type: 'sum' });
  const [selectedInsightType, setSelectedInsightType] = React.useState({
    type: 'table',
  });

  const [showSaveModel, setShowSaveModel] = React.useState(false);

  const dragItem = React.useRef({} as any);
  const dragOverItem = React.useRef({} as any);

  const dragStart = (e: DragEvent, rawData, position) => {
    dragItem.current = position;
    e.dataTransfer?.setData('text/plain', JSON.stringify(rawData));
  };

  const dragEnter = (e, position) => {
    e.preventDefault();
    e.stopPropagation();
    dragOverItem.current = position;
  };

  React.useEffect(() => {
    axios
      .get('http://localhost:5000/tables/all')
      .then(tblRes => {
        setTables(tblRes.data);
        if (insightId) {
          axios
            .get(`http://localhost:5000/insight/${insightId}`)
            .then(async res => {
              console.log('res: ', res);
              setInsightData(res.data);
              setSelectedInsightType({ type: res.data.insight_type });
              setSelectedAggType({ type: res.data.agg_type });
              setSelectedTable(
                tblRes.data.find(
                  tbl => tbl.id === res.data.measures[0].table_id,
                ),
              );
              setGroupingList(res.data.group_by);
              setList(res.data.measures);
              await bringTableData(
                res.data.measures[0].table_id,
                res.data.group_by,
                res.data.agg_type,
                res.data.measures,
              );
              setTimeout(() => {
                setIsLoading(false);
              }, 1000);
            })
            .catch(e => {
              setIsLoading(false);
            });
        } else {
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        }
      })
      .catch(e => {
        setIsLoading(false);
      });
  }, []);

  const onRefreshClicked = () => {
    bringTableData(selectedTable.id)
      .then(r => {
        setIsLoading(false);
      })
      .catch(e => {
        setIsLoading(false);
      });
  };

  const bringTableData = async (
    table_id,
    groupList = groupingList,
    aggType = selectedAggType,
    measureList = list,
  ) => {
    const res = await axios.get(
      `http://localhost:5000/tables/${table_id}/query?groupBy=${groupList.map(
        d => d.title,
      )}&aggType=${aggType.type}`,
    );
    const columns = res.data.schema.fields;
    setRawDataSourceData(res.data.data as any);
    setDataSourceData({
      columns: measureList,
      rows: res.data.data,
    });
  };

  const onDrop = async (e, type, isInternal = true) => {
    e.preventDefault();
    e.stopPropagation();
    let colData = {};
    const l = e.dataTransfer?.getData('text/plain');
    try {
      colData = JSON.parse(l || '');
    } catch (error) {}
    if (Object.keys(colData).length > 0) {
      const copyListItems = type === 'grouping' ? [...groupingList] : [...list];
      // if (isInternal) {
      //   copyListItems.splice(dragItem.current, 1);
      //   copyListItems.splice(dragOverItem.current, 0, colData);
      // } else {
      // }
      copyListItems.push(colData);
      dragItem.current = null;
      dragOverItem.current = null;
      console.log('type: ', type);
      if (type === 'grouping') {
        setGroupingList(copyListItems);
        await bringTableData(selectedTable.id, copyListItems);
      } else {
        setList(copyListItems);
        setDataSourceData({
          columns: copyListItems,
          rows: rawDataSourceData,
        });
      }
    }
  };

  const onDragOver = e => {
    e.preventDefault();
  };

  const wrapAllTable = () => {
    setSelectedTable({} as any);
    setList([]);
  };

  const DownloadBtn = ({ iconSize = 14 }) => {
    let url = '#';
    let fileName = '';
    const str = JSON.stringify(dataSourceData.rows);
    const bytes = new TextEncoder().encode(str);
    const blob = new Blob([bytes], {
      type: 'application/json;charset=utf-8',
    });
    url = URL.createObjectURL(blob);
    fileName = `Analyzer-insight.json`;
    return (
      <a href={url} target={'_blank'} download={fileName} rel="noreferrer">
        <FiDownload size={iconSize} />
      </a>
    );
  };

  const openSaveModel = () => {
    setShowSaveModel(true);
  };

  const SaveInsightModel = () => {
    const [selectedDashboard, setSelectedDashboard] = React.useState({
      id: null,
    } as any);
    const [isDashboardLoading, setIsDashboardLoading] = React.useState(true);
    const [dashboards, setDashboards] = React.useState([] as any);
    const [insightName, setInsightName] = React.useState('');

    React.useEffect(() => {
      setInsightName(insightData.title);
      setSelectedDashboard({ id: insightData.dashboard_id });
      if (showSaveModel) {
        axios
          .get('http://localhost:5000/dashboard/all')
          .then((res: any) => {
            setDashboards(res.data as any);
            setTimeout(() => {
              setIsDashboardLoading(false);
            }, 500);
          })
          .catch(e => {
            setIsDashboardLoading(false);
          });
      }
    }, []);

    const onCancleClicked = () => {
      setShowSaveModel(false);
    };

    const onSaveClicked = () => {
      var formData = new FormData();
      formData.append('insightName', insightName);
      formData.append('description', '');
      formData.append(
        'measures',
        list.map(l => l.id),
      );
      formData.append(
        'groupBy',
        groupingList.map(l => l.id),
      );
      formData.append('dashboard_id', selectedDashboard.id);
      formData.append('insightType', selectedInsightType.type);
      formData.append('aggType', selectedAggType.type);

      axios
        .post(
          `http://localhost:5000/insight/${
            insightId ? `update/${insightData.id}` : `create`
          }`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )
        .then(r => {
          navigate(`/dashboards/${selectedDashboard.id}`);
        });

      setShowSaveModel(false);
    };

    return (
      <Model
        width="40vw"
        height="75vh"
        show={showSaveModel}
        title="Save Insight"
      >
        <div className="flex w-full h-full items-center justify-center">
          <div className="p-2 h-full relative overflow-auto flex w-full flex-col">
            {isLoading ? (
              <div className="flex w-full h-full items-center justify-center">
                <Loader />
              </div>
            ) : (
              <div className="flex flex-col h-full w-full">
                <div className="flex flex-col flex-1">
                  <div>
                    <InputBox
                      onChange={e => {
                        setInsightName(e.target.value);
                      }}
                      valuePass={insightName}
                      placeholder="Table Name"
                    />
                  </div>
                  <div className="h-full my-4">
                    {isDashboardLoading ? (
                      <span className="flex flex-col h-full">
                        <Loader />
                      </span>
                    ) : (
                      dashboards.map((dashboard: any, i: any) => (
                        <div
                          key={`dash-${i}`}
                          className="flex flex-row  items-center"
                        >
                          <span className="p-1 flex flex-row items-center justify-center">
                            <input
                              type="checkbox"
                              checked={selectedDashboard.id === dashboard.id}
                              onChange={e => {
                                if (e.target.checked) {
                                  setSelectedDashboard(dashboard);
                                } else {
                                  setSelectedDashboard({} as any);
                                }
                              }}
                              name=""
                              id=""
                            />
                          </span>
                          <span className="flex flex-row items-center justify-center p-1">
                            {dashboard.title}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                <div className="flex flex-row items-center justify-end">
                  <Button
                    className="mx-1"
                    variant="outline"
                    title="Cancel"
                    sm
                    onClick={onCancleClicked}
                  />
                  <Button
                    className="mx-1"
                    title="Save"
                    sm
                    onClick={onSaveClicked}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Model>
    );
  };

  const RenderInsight = () => {
    const Renderer = () => {
      if (selectedInsightType.type === 'table') {
        return <DataGrid compact data={dataSourceData} />;
      } else if (selectedInsightType.type === 'line') {
        return <LineChart data={dataSourceData} height={600} width={900} />;
      } else if (selectedInsightType.type === 'bar') {
        return (
          <BarChart
            data={dataSourceData}
            groupBy={groupingList}
            height={500}
            width={900}
          />
        );
      } else if (selectedInsightType.type === 'pie') {
        return <PieChart data={dataSourceData} height={600} width={900} />;
      } else if (selectedInsightType.type === 'kpis') {
        return <Kpi aggType={selectedAggType.type} data={dataSourceData} />;
      } else if (selectedInsightType.type === 'map') {
        return <MapChart data={dataSourceData} height={600} width={900} />;
      } else {
        return <></>;
      }
    };
    return list.length > 0 ? (
      <Renderer />
    ) : (
      <p className="flex flex-col items-center text-sm justify-center h-full w-full">
        <SiReacttable fontSize={40} className="mb-4" />
        Drag and drop columns to measures to start seeing data here.
      </p>
    );
  };

  const onInsightTypeChanged = type => {
    setSelectedInsightType({ type });
    // setList([]);
    // setGroupingList([]);
  };

  const onAggTypeChanged = async type => {
    await bringTableData(selectedTable.id, groupingList, { type });
    setSelectedAggType({ type });
  };

  const InsightTypeButton = ({ type }) => (
    <span
      style={{
        maxWidth: 74,
        backgroundColor:
          selectedInsightType.type === type.toLowerCase() ? '#58585a' : '#FFF',
        color:
          selectedInsightType.type === type.toLowerCase() ? '#FFF' : '#58585a',
      }}
      onClick={e => onInsightTypeChanged(type.toLowerCase())}
      className={`cursor-pointer border rounded m-1 p-2 text-xs w-full text-center mx-1`}
    >
      {type}
    </span>
  );

  const AggTypeButton = ({ type }) => (
    <span
      onClick={e => onAggTypeChanged(type.toLowerCase())}
      style={{
        maxWidth: 70,
        fontSize: 10,
        backgroundColor:
          selectedAggType.type === type.toLowerCase() ? '#58585a' : '#FFF',
        color: selectedAggType.type === type.toLowerCase() ? '#FFF' : '#58585a',
      }}
      className={`cursor-pointer border rounded p-1 text-xs w-full text-center mx-1`}
    >
      {type}
    </span>
  );

  const onTableSelect = async (isChecked, table) => {
    setList([]);
    if (isChecked) {
      setSelectedTable(table);
      if (table.id) {
        await bringTableData(table.id);
      }
    }
  };

  const InsightSidebar = () => {
    const MeasuresWindow = ({ type }) => {
      const onCloseClicked = (item, i, type) => {
        console.log('type: ', type);
        if (type === 'grouping') {
          setGroupingList(groupingList.filter((l, j) => j !== i));
          bringTableData(
            selectedTable.id,
            groupingList.filter((l, j) => j !== i),
          ).then(r => {
            console.log(r);
          });
        } else {
          console.log(
            'Ds: ',
            list.filter((l, j) => j !== i),
          );
          setList(list.filter((l, j) => j !== i));
          setDataSourceData({
            columns: list.filter((l, j) => j !== i),
            rows: rawDataSourceData,
          });
        }
        // await bringTableData(selectedTable.id);
      };

      const onClearAll = type => {
        if (type === 'grouping') {
          setGroupingList([]);
          bringTableData(selectedTable.id, []).then(r => {
            console.log(r);
          });
        } else {
          setList([]);
        }
        setDataSourceData({
          columns: [],
          rows: rawDataSourceData,
        });
      };

      const Measures = ({ data, type }) => {
        return data.length > 0 ? (
          data.map((l, i) => (
            <div
              key={`ld-${i}`}
              style={{
                background: theme.primary,
                border: `1px solid ${theme.primary}`,
              }}
              className="p-1 text-white border m-1 rounded cursor-move"
              onDragOver={e => dragEnter(e, i)}
              onDragStart={(e: any) => dragStart(e, l, i)}
              onDragEnd={e => onDrop(e, type, false)}
              draggable
            >
              <span className="flex flex-row justify-between items-center">
                <span
                  className="border-r flex flex-row items-center w-full mr-1"
                  style={{ fontSize: 10 }}
                >
                  <MdOutlineDragIndicator fontSize={14} />
                  <span
                    className="ml-1"
                    style={{
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      maxWidth: '100px',
                    }}
                  >
                    {l.name}
                  </span>
                </span>
                <span className=" h-full">
                  <AiOutlineClose
                    onClick={() => onCloseClicked(l, i, type)}
                    fontSize={12}
                    cursor={'pointer'}
                  />
                </span>
              </span>
            </div>
          ))
        ) : (
          <div className="flex flex-col border-dashed border border-t-0 h-full items-center justify-center">
            <TbDragDrop2 fontSize={20} />
            <span className="text-center mt-2">
              Drag and drop columns to measures
            </span>
          </div>
        );
      };

      return (
        <>
          <h6 className="border-b p-1 flex flex-row justify-between items-center">
            {type === 'grouping' ? (
              <span className="py-1">
                Group By{' '}
                <span style={{ fontSize: 10 }}>({groupingList.length})</span>
              </span>
            ) : (
              <span className="py-1">
                Measure <span style={{ fontSize: 10 }}>({list.length})</span>
              </span>
            )}
            <span
              className="cursor-pointer"
              onClick={() => onClearAll(type)}
              style={{ fontSize: 10 }}
            >
              Clear All
            </span>
          </h6>
          <div
            className="w-full h-full flex flex-col overflow-auto"
            onDragOver={e => onDragOver(e)}
            onDrop={e => onDrop(e, type)}
          >
            <Measures
              type={type}
              data={type === 'grouping' ? groupingList : list}
            />
          </div>
        </>
      );
    };

    return (
      <div
        style={{ flex: 2 }}
        className="w-full border-r flex flex-col h-full border border-l-0 p-1"
      >
        <h6 className="p-1 flex flex-row items-center">
          <MdOutlineInsights fontSize={16} />
          <span className="ml-1">Insight</span>
        </h6>
        <div className="w-full flex flex-row flex-wrap justify-between items-center my-1">
          <select
            value={selectedInsightType.type}
            onChange={e => onInsightTypeChanged(e.target.value)}
            className={`cursor-pointer border rounded m-1 p-2 text-xs w-full  mx-1`}
          >
            <option value={'table'}>Table</option>
            <option value={'kpis'}>KPIs</option>
            <option value={'bar'}>Bar</option>
            <option value={'line'}>Line</option>
            <option value={'pie'}>Pie</option>
            <option value={'map'}>Map</option>
          </select>
        </div>
        <div className="flex flex-row border-t items-center justify-center border-b py-1">
          <label htmlFor="agg-select" style={{ fontSize: 10 }}>
            Aggregation
          </label>
          <select
            id="agg-select"
            value={selectedAggType.type}
            style={{ fontSize: 10, outline: 'none' }}
            onChange={e => onAggTypeChanged(e.target.value)}
            className={`cursor-pointer border text-xs rounded m-1 p-1 w-full text-center`}
          >
            <option value={'sum'}>Sum</option>
            <option value={'count'}>Count</option>
            <option value={'min'}>Min</option>
            <option value={'max'}>Max</option>
          </select>
          {/* <AggTypeButton type="Sum" />
          <AggTypeButton type="Count" />
          <AggTypeButton type="Mean" /> */}
        </div>
        <MeasuresWindow type="grouping" />
        <MeasuresWindow type="measures" />
        {/* <MeasuresWindow type="filters" /> */}
      </div>
    );
  };

  return (
    <PageWrapper
      title="Wizard Page"
      description="A Boilerplate application homepage"
    >
      <div className="flex flex-row h-full">
        <div style={{ flex: 2 }} className="w-full border p-1 flex flex-col">
          <h6 className="border-b p-1 flex flex-row justify-between items-center">
            <span className="flex flex-row items-center">
              <AiFillDatabase fontSize={14} />
              <span className="ml-1">DATA</span>
            </span>
          </h6>
          <div className="py-2 flex flex-row items-center">
            <SearchBox list={[]} searchKey="name" />
            <BsTextWrap
              fontSize={20}
              className="mx-1"
              cursor={'pointer'}
              onClick={wrapAllTable}
            />
          </div>
          <div className="flex flex-col  h-full overflow-auto ">
            {isLoading ? (
              <div className="flex flex-col h-full items-center justify-center">
                <Loader />
              </div>
            ) : tables.length > 0 ? (
              tables.map((table, j) => (
                <Accordian
                  selectable
                  selected={table.id === selectedTable.id}
                  onSelect={e => onTableSelect(e, table)}
                  key={`tbl-${j}`}
                  className="p-1 "
                  title={table.title}
                >
                  <div className="" key={`tbl-col-${j}`}>
                    {table.columns.map((col, i) => (
                      <div
                        className="p-1 m-1 text-xs border rounded cursor-move"
                        key={`col-${i}`}
                        draggable
                        onDragStart={(e: any) => dragStart(e, col, i)}
                      >
                        <span className="flex flex-row justify-between items-center">
                          <span
                            className="flex flex-row items-center"
                            style={{ fontSize: 10 }}
                          >
                            <MdOutlineDragIndicator fontSize={14} />
                            <span className="ml-1">{col.title}</span>
                          </span>
                          <span>
                            <CgInfo />
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                </Accordian>
              ))
            ) : (
              <Link
                to={'/data-source'}
                className="flex flex-col h-full border border-dashed items-center text-center w-full justify-center"
              >
                <span className="mb-2">
                  <AiOutlineUpload fontSize={24} />
                </span>
                <span>Upload a CSV to create table here</span>
              </Link>
            )}
          </div>
        </div>
        <InsightSidebar />
        <div
          style={{ flex: 12 }}
          className="w-full h-full flex flex-col border border-l-0 p-1"
        >
          <div className="flex flex-row justify-between p-2 mb-2 border-b">
            <span className="flex flex-row items-center">
              <span className="mr-2">
                {insightData.title
                  ? insightData.title
                  : 'Sample Analyzer Insight Title'}
              </span>
              <FiEdit3 fontSize={14} cursor={'pointer'} color="#F00" />
            </span>
            <span className="flex flex-row items-center">
              <AiOutlineReload
                className="mr-2"
                fontSize={16}
                onClick={onRefreshClicked}
                cursor="pointer"
              />
              <DownloadBtn iconSize={16} />
              <span className="border-l pl-2 ml-2">
                <Button sm title="Save" onClick={openSaveModel}></Button>
              </span>
            </span>
          </div>
          <div
            className="p-1  flex flex-col w-full"
            style={{ height: 'calc(100% - 3rem)' }}
          >
            <RenderInsight></RenderInsight>
          </div>
        </div>
        <SaveInsightModel />
      </div>
    </PageWrapper>
  );
}
