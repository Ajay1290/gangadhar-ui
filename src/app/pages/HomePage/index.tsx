import { PageWrapper } from 'app/components/layouts/PageWrapper';
import { Insight } from 'app/components/molecules/Insight';
import * as React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import _ from 'lodash';
import styled from 'styled-components';
import BoyGirlAnalytics from '../../../assets/IMG/boy_girl_analytics.jpg';
import { Button } from 'app/components/atoms/Button/Loadable';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
  const navigation = useNavigate();

  return (
    <PageWrapper
      title="Home Page"
      description="A Boilerplate application homepage"
    >
      <div className="flex flex-col h-full w-full  ">
        <div className="p-16 flex flex-row h-full items-center justify-around">
          <LandingTitle>
            <div className="flex flex-col">
              <div>
                <div>Modern Big Data</div>
                <div>
                  <span style={{ letterSpacing: '1px', fontWeight: 800 }}>
                    Analytics Platform
                  </span>
                </div>
              </div>
              <span className="m-2">
                <Button
                  onClick={e => {
                    navigation('/wizards');
                  }}
                  title="Explore Your Data"
                  className="px-10"
                  variant="outline"
                />
              </span>
            </div>
          </LandingTitle>
          <div>
            <img
              style={{ height: 450 }}
              src={BoyGirlAnalytics}
              alt="Boy & Girl Analytics"
            />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

const LandingTitle = styled.h1`
  font-size: 38px;
  width: 35vw;
  line-height: 1.2em;
  font-weight: 500;
`;
