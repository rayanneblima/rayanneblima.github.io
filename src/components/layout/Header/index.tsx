import React, { useContext } from 'react';
import Switch from 'react-switch';

import { ThemeContext } from 'styled-components';

import Logo from '../partials/Logo';
import DarkThemeIcon from '../partials/DarkThemeIcon';
import LightThemeIcon from '../partials/LightThemeIcon';

import { Container } from './styles';

interface defaultProps {
  toggleTheme: () => void;
}

const Header: React.FC<defaultProps> = ({ toggleTheme }) => {
  const { title, colors } = useContext(ThemeContext);

  return (
    <Container>
      <Logo />

      <Switch
        onChange={toggleTheme}
        checked={title === 'dark'}
        handleDiameter={16}
        onHandleColor={colors.secondary}
        offHandleColor={colors.secondary}
        height={20}
        width={42}
        offColor={colors.secondaryOpacity}
        onColor={colors.secondaryOpacity}
        uncheckedIcon={false}
        checkedIcon={false}
        uncheckedHandleIcon={<LightThemeIcon />}
        checkedHandleIcon={<DarkThemeIcon />}
      />
    </Container>
  );
}

export default Header;
