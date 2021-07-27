import styled from 'styled-components';

import bgWavesDark from '../../../assets/waves-dark.svg';
import bgWavesLight from '../../../assets/waves-light.svg';
import formEffect from '../../../assets/form-effect.svg';

type defaultProps = {
  themeTitle: string;
}

export const ContactContainer = styled.section<defaultProps>`
  background: url('${(props) => props.themeTitle === 'dark' ? bgWavesDark : bgWavesLight}');
  background-color: ${(props) => props.themeTitle === 'dark' ? 'var(--primary-text)' : 'var(--secondary-background)'};
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: contain;

  align-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 50px;
  height: 100vh;
  justify-content: center;
  margin-inline: auto;
  max-width: 1200px;
  width: 100%;


  @media (max-width: 780px) {
    background-size: contain;
    min-height: 140vh;
    padding: 20px 0;
  }

  @media (max-width: 560px) {
    background-size: 100vh;
  }
`;

export const FormContainer = styled.div`
  background: url(${formEffect});
  background-color: var(--primary-background);
  background-position: center;
  background-repeat: no-repeat;
  background-size: auto;

  align-items: center;
  border-radius: 10px;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, 1fr);
  min-height: 340px;
  justify-content: center;
  padding: 20px;
  text-align: center;
  width: 80%;


  h1 {
    font-size: 4.6rem;
    font-weight: 300;
    position: relative;
    text-transform: none;
  }

  @media (max-width: 540px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  width: 80%;

  a svg {
    font-size: 8rem;
    transition: all 0.2s ease-in-out;
  }

  a:hover {
    color: var(--primary-opacity);
  }
`;

export const FooterContact = styled.footer`
color: var(--secondary-text);
  text-align: center;

  span {
    text-decoration: underline;
  }
`;
