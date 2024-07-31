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
            Aos 25 anos, sou desenvolvedora desde 2018 e
            formanda em Ciência da
            Computação no Instituto Federal do Sudeste de
            Minas Gerais com mais de 2 anos de experiência no Programa de Educação Tutorial (PET) de Ciência da Computação.
          </p>
          <p>
            Concludente como bolsista no curso de Desenvolvimento FullStack Java pelo Santander Coders na Digital House Brasil e pós graduanda em Análise de Desenvolvimento de Sistemas Computacionais.
          </p>
          <p>
            Atualmente sou desenvolvedora Front-End Sênior na Tray, desenvolvedora Front-End voluntária na Lacrei, freelancer construindo a plataforma Web da Health Easy e desenvolvedora Front-End para um projeto internacional da Engenharia Digital.
          </p>
          <div>
            <Button linkTo="https://drive.google.com/drive/folders/1r1uh8oxsDG4BGBVtT7tnUlgg17IHRibb?usp=sharing" isOutlined isExternalLink>Certificados</Button>
            <Button linkTo="https://drive.google.com/file/d/1Jp_RSHL_rLUqLN0OK6P_oD6CvZgranp9/view?usp=drive_link" isExternalLink txtColor="secondary-text">Currículo</Button>
          </div>
          </AboutMeText>
        </ContentContainer>
      </Content>
    </AboutMeContainer>
  );
}

export default AboutMe;
