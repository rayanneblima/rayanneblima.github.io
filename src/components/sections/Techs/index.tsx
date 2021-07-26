import React from 'react';

import { techs } from '../../../data/techs';

import TechCard from '../../elements/TechCard';

import { TechsContainer, Content, ContentContainer } from './styles';

const Techs: React.FC = () => {
  const techsItems =
    techs.map((tech, index) => {
      return (
        <TechCard
          key={index}
          title={tech.title}
          logo={tech.logo}
          level={tech.level}
          description={tech.description}
        />
      );
    });

  return (
    <TechsContainer id="tecnologias">
      <Content>
        <h1>Tecnologias</h1>
        <ContentContainer>
          { techsItems }
        </ContentContainer>
      </Content>
    </TechsContainer>
  );
}

export default Techs;
