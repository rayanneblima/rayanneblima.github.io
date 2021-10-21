import React from 'react';

import Button from '../../elements/Button';
import ArrowsDownGif from '../partials/ArrowsDownGif';
import MyPic from '../partials/MyPic';

import {
  MainContainer,
  TopContent,
  BottomContent,
  Description,
  Picture
} from './styles';

type defaultProps = {
  themeTitle: string;
}

const Main: React.FC<defaultProps> = ({ themeTitle }) => {
  return (
    <MainContainer>
      <TopContent>
        <Description>
          <h1>Rayanne B. Lima</h1>
          <h3>Desenvolvedora Full Stack</h3>
          <div>
            <Button isOutlined bgColor="primary" linkTo="contato">Orçamento</Button>
            <Button bgColor="primary" txtColor="secondary-text" linkTo="projetos">Projetos</Button>
          </div>
        </Description>

        <Picture>
          <MyPic themeTitle={themeTitle} />
        </Picture>
      </TopContent>
      <BottomContent>
        <p>saiba mais</p>
        <ArrowsDownGif themeTitle={themeTitle} />
      </BottomContent>
    </MainContainer>
  );
}

export default Main;
