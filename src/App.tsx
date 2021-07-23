import React from 'react';

import { ThemeProvider, DefaultTheme } from 'styled-components';
import dark from './styles/theme/dark';
import light from './styles/theme/light';

import usePersistedState from './hooks/usePersistedState';

import Home from './components/sections/Home';

import GlobalStyles from './styles/global';

const App = () => {
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', dark);

  const toggleTheme = () => {
    setTheme(theme.title === 'dark' ? light : dark);
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Home toggleTheme={toggleTheme} />
      </>
    </ThemeProvider>
  );
};

export default App;
