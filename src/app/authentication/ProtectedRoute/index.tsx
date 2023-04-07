/**
 *
 * ProtectedRoute
 *
 */
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';

interface Props {
  children: React.ReactNode;
}

export function ProtectedRoute(props: Props) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const checkUserToken = () => {
    const userToken = localStorage.getItem('user-token');
    if (!userToken || userToken === 'undefined') {
      setIsLoggedIn(false);
      return navigate('/login');
    }
    setIsLoggedIn(true);
  };

  React.useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);

  return <React.Fragment>{isLoggedIn ? props.children : null}</React.Fragment>;
}
