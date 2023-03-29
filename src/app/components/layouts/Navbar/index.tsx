/**
 *
 * Navbar
 *
 */
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
// import { useTranslation } from 'react-i18next';
// import { messages } from './messages';

interface Props {}

export function Navbar(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { t, i18n } = useTranslation();

  return (
    <Nav>
      <div className="flex items-center" style={{ flex: 6 }}>
        <NavTitle>Gangadhar</NavTitle>
        <NavMenu className="ml-4">
          <NavMenuLink style={{ paddingLeft: 0 }} to="/">
            Home
          </NavMenuLink>
          <NavMenuLink to="/dashboards">Dashboards</NavMenuLink>
          <NavMenuLink to="/wizards">Wizard</NavMenuLink>
          <NavMenuLink to="/data-source">Data</NavMenuLink>
          <NavMenuLink to="/notebooks">Notebooks</NavMenuLink>
        </NavMenu>
      </div>
      <div className="flex items-center justify-end" style={{ flex: 1 }}>
        <NavMenuLink to={'/'}>?</NavMenuLink>
      </div>
    </Nav>
  );
}

const NavTitle = styled.h1`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.5px;

  color: #ffffff;
`;

const NavMenu = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 1rem;
`;

const NavMenuLink = styled(Link)`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
  padding: 0 0.5rem;
  letter-spacing: 0.25px;
`;

const Nav = styled.nav`
  color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1rem;
  background-color: #58585a;
  position: sticky;
  top: 0;
  z-index: 9999;
  box-shadow: 1px 5px 10px #58585a99;
  height: 45px;
`;
