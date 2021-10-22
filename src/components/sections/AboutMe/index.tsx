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
            Aos 24 anos, sou desenvolvedora desde 2018 e
            formanda em Ciência da
            Computação no Instituto Federal do Sudeste de
            Minas Gerais com mais de 2 anos de experiência no Programa de Educação Tutorial (PET) de Ciência da Computação.
          </p>
          <p>
            Concludente como bolsista no curso de Desenvolvimento FullStack Java pelo Santander Coders na Digital House Brasil.
          </p>
          <p>
            Atualmente sou desenvolvedora Web FullStack na Tek-System Informática, membro da EmComp do IF Sudeste e freelancer em projetos Web.
          </p>
          <div>
            <Button linkTo="https://drive.google.com/drive/folders/1r1uh8oxsDG4BGBVtT7tnUlgg17IHRibb?usp=sharing" isOutlined isExternalLink>Certificados</Button>
            <Button linkTo="https://drive.google.com/file/d/14jlZwcjElima6_-2gKlBpa2IAuNYkYje/view?usp=sharing" isExternalLink txtColor="secondary-text">Currículo</Button>
          </div>
          </AboutMeText>
        </ContentContainer>
      </Content>
    </AboutMeContainer>
  );
}

export default AboutMe;
