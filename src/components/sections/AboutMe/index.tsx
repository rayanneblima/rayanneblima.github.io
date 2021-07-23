import React from 'react';

import Button from '../../elements/Button';
import Illustration from '../../layout/partials/Illustration';

import { AboutMeContainer, Content, ContentContainer, AboutMeText } from './styles';

const AboutMe: React.FC = () => {
  return (
    <AboutMeContainer id="sobre">
      <Content>
        <h1>Sobre mim</h1>
        <ContentContainer>
          <Illustration />
          <AboutMeText>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non hic temporibus
            officiis aperiam quibusdam voluptate, deserunt quod assumenda iste quos alias
            magnam ut, tempore totam esse, quam minima quaerat atque.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non hic temporibus
            officiis aperiam quibusdam voluptate, deserunt quod assumenda iste quos alias
            magnam ut, tempore totam esse, quam minima quaerat atque.
          </p>
          <div>
            <Button linkTo="http://www.google.com/" isOutlined isExternalLink>Certificados</Button>
            <Button linkTo="http://www.google.com/" isExternalLink txtColor="secondary-text">Currículo</Button>
          </div>
          </AboutMeText>
        </ContentContainer>
      </Content>
    </AboutMeContainer>
  );
}

export default AboutMe;
