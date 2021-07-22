import React from 'react';

import { ThemeProvider, DefaultTheme } from 'styled-components';
import dark from './styles/theme/dark';
import light from './styles/theme/light';

import usePersistedState from './hooks/usePersistedState';

import GlobalStyles from './styles/global';
import Header from './components/layout/Header';

const App = () => {
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', dark);

  const toggleTheme = () => {
    setTheme(theme.title === 'dark' ? light : dark);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <GlobalStyles />
        <Header toggleTheme={toggleTheme} />
      </div>
    </ThemeProvider>
  );
};

export default App;
