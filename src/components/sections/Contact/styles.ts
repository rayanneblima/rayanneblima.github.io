import styled from 'styled-components';

import bgWavesDark from '../../../assets/waves-dark.svg';
import bgWavesLight from '../../../assets/waves-light.svg';

type defaultProps = {
  themeTitle: string;
}

export const ContactContainer = styled.section<defaultProps>`
  background: url('${(props) => props.themeTitle === 'dark' ? bgWavesDark : bgWavesLight}');
  background-position: initial;
  background-repeat: no-repeat;
  background-size: cover;

  align-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 50px;
  height: auto;
  justify-content: center;
  margin-inline: auto;
  /* max-width: 1200px; */
  padding: 20px 0;
  width: 100%;
`;

export const FormContainer = styled.div`
  background-color: var(--secondary-background);

  align-items: center;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-evenly;
  min-height: 340px;
  padding: 20px;
  text-align: center;
  width: 80%;

  h1 {
    font-size: 4.6rem;
    font-weight: 300;
    position: relative;
    text-transform: none;
  }

  p {
    font-size: 2rem;
    margin-top: 20px;
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
color: var(--primary-text);
  text-align: center;

  span {
    text-decoration: underline;
  }
`;
