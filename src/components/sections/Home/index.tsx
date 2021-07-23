import React, { useContext } from 'react';

import { ThemeContext } from 'styled-components';

import Header from '../../layout/Header';
import Main from '../../layout/Main';

import { HomeContainer } from './styles';

interface defaultProps {
  toggleTheme: () => void;
}

const Home: React.FC<defaultProps> = ({ toggleTheme }) => {
  const { title } = useContext(ThemeContext);

  return (
    <HomeContainer themeTitle={title}>
      <Header toggleTheme={toggleTheme} />
      <Main themeTitle={title} />
    </HomeContainer>
  );
}

export default Home;
