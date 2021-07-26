import React from 'react';

import { ThemeProvider, DefaultTheme } from 'styled-components';
import dark from './styles/theme/dark';
import light from './styles/theme/light';

import usePersistedState from './hooks/usePersistedState';

import Header from './components/layout/Header';
import Home from './components/sections/Home';
import AboutMe from './components/sections/AboutMe';
import Footer from './components/sections/Timeline';

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
        <Header toggleTheme={toggleTheme} />
        <Home />
        <AboutMe />
        <Footer />
      </>
    </ThemeProvider>
  );
};

export default App;
