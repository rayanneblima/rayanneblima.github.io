import React, { useContext } from 'react';
import Switch from 'react-switch';

import { ThemeContext } from 'styled-components';

import Logo from '../partials/Logo';

import { } from './styles';

interface defaultProps {
  toggleTheme: () => void;
}

const Header: React.FC<defaultProps> = ({ toggleTheme }) => {
  const { title, colors } = useContext(ThemeContext);

  return (
    <header>
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
        // uncheckedHandleIcon={<LightThemeIcon />}
        // checkedHandleIcon={<DarkThemeIcon />}
      />
    </header>
  );
}

export default Header;
