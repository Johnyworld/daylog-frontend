import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../Styles/GlobalStyles';
import Theme from '../Styles/Theme';
import AppRouter from './Router';

export default () => (
  <ThemeProvider theme={Theme}>
    <>
      <AppRouter isLoggedIn={false} />
      <GlobalStyles />
    </>
  </ThemeProvider>
);