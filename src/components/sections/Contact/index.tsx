import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TelegramIcon from '@material-ui/icons/Telegram';
import EmailIcon from '@material-ui/icons/Email';

import ContactForm from '../../elements/ContactForm';

import { ContactContainer, FormContainer, SocialIcons, FooterContact } from './styles';

const Contact: React.FC = () => {
  const { title } = useContext(ThemeContext);

  return (
    <ContactContainer themeTitle={title} id="contato">
      <FormContainer>
        <span>
          <h1>Vamos conversar sobre um novo projeto?</h1>
          <p>Informe os detalhes e entrarei em contato assim que possível.</p>
        </span>
        <ContactForm />
      </FormContainer>
      <SocialIcons>
        <a href="https://github.com/rayanneblima" target="_blank" rel="noreferrer">
          <GitHubIcon />
        </a>
        <a href="https://linkedin.com/in/rayannebertolacelima" target="_blank" rel="noreferrer">
          <LinkedInIcon />
        </a>
        <a href="https://t.me/rayanneblima" target="_blank" rel="noreferrer">
          <TelegramIcon />
        </a>
        <a href="mailto:rayanne22a@gmail.com" target="_blank" rel="noreferrer">
          <EmailIcon />
        </a>
      </SocialIcons>
      <FooterContact>
        <p>
          Desenvolvido com 💖 por
          <span> Rayanne B. Lima </span>
        </p>
        <p>© 2021 - All Rights Reserved.</p>
      </FooterContact>
    </ContactContainer>
  );
}

export default Contact;
