import React, { useContext } from 'react';

import { ThemeContext } from 'styled-components';

import Main from '../../layout/Main';

import { HomeContainer } from './styles';

const Home: React.FC = () => {
  const { title } = useContext(ThemeContext);

  return (
    <HomeContainer themeTitle={title} id="home">
      <Main themeTitle={title} />
    </HomeContainer>
  );
}

export default Home;
