import React, { useState, useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';

import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

import { NavContainer } from './styles';

const NavHeader: React.FC = () => {
  const nav = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);

  function handleToggleOpenMenu () {
    setOpenMenu(!openMenu);
  }

  return (
    <BrowserRouter>
      <NavContainer
        ref={nav}
        className='header-nav'
        open={openMenu}
      >
        <MenuIcon onClick={handleToggleOpenMenu} className="btn-menu open" />
        <CloseIcon onClick={handleToggleOpenMenu} className="btn-menu close" />
        <ul>
          <li>
            <NavHashLink
              activeClassName='active-anchor'
              smooth
              to="#home"
            >
              Home
            </NavHashLink>
          </li>
          <li>
            <NavHashLink
              activeClassName='active-anchor'
              smooth
              to="#sobre"
            >
              Sobre
            </NavHashLink>
          </li>
          <li>
            <NavHashLink
              activeClassName='active-anchor'
              smooth
              to="#projetos"
            >
              Projetos
            </NavHashLink>
          </li>
          <li>
            <NavHashLink
              activeClassName='active-anchor'
              smooth
              to="#contato"
            >
              Contato
            </NavHashLink>
          </li>
        </ul>
      </NavContainer>
    </BrowserRouter>
  );
}

export default NavHeader;
