import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { gql } from 'apollo-boost'
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../Styles/GlobalStyles';
import Theme from '../Styles/Theme';
import AppRouter from './Router';
import { useQuery } from 'react-apollo-hooks';

const QUERY = gql`
  { isLoggedIn @client }
`;

export default () => {
  const { data: { isLoggedIn }} = useQuery(QUERY);
  
  return (
      <ThemeProvider theme={Theme}>
        <>
          <GlobalStyles />
          <Router>
            <AppRouter isLoggedIn={isLoggedIn} />
          </Router>
        </>
      </ThemeProvider>
  )
} 