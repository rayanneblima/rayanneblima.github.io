import React, { useContext } from 'react';
import Switch from 'react-switch';

import { ThemeContext } from 'styled-components';

import Logo from '../partials/Logo';
import DarkThemeIcon from '../partials/DarkThemeIcon';
import LightThemeIcon from '../partials/LightThemeIcon';

import { HeaderContainer, RightContainer } from './styles';
import HeaderNav from '../partials/HeaderNav';

interface defaultProps {
  toggleTheme: () => void;
}

const Header: React.FC<defaultProps> = ({ toggleTheme }) => {
  const { title, colors } = useContext(ThemeContext);

  return (
    <HeaderContainer>
      <Logo />

      <RightContainer>
        <HeaderNav />
        <Switch
          className="switch-theme"
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
      </RightContainer>
    </HeaderContainer>
  );
}

export default Header;
