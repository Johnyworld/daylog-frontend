import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { gql } from 'apollo-boost'
import { ThemeProvider } from 'styled-components';
import { useQuery } from 'react-apollo-hooks';
import GlobalStyles from './Styles/GlobalStyles';
import Theme from './Styles/Theme';
import AppRouter from './Router';
import InputRange from './Styles/InputRange';

const QUERY = gql`
  { isLoggedIn @client }
`;

export default () => {
  const { data: { isLoggedIn }} = useQuery(QUERY);

  let lastTouchEnd = 0;
  
  document.documentElement.addEventListener('touchend', function (event) {
      var now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
          event.preventDefault();
      }
      lastTouchEnd = now;
  }, false);
  
  return (
      <ThemeProvider theme={Theme}>
        <>
          <GlobalStyles />
          <InputRange />
          <Router>
            <AppRouter isLoggedIn={isLoggedIn} />
          </Router>
        </>
      </ThemeProvider>
  )
} 