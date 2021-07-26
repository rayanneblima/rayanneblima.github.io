import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';

import Image from '../../elements/Image';

const Logo = ({ ...props }) => {
  return (
    <BrowserRouter>
      <h1
        {...props}
      >
        <NavHashLink to="#home">
          <Image
            srcName='logo.svg'
            alt="Rayanne B. Lima - Logomarca"
            className="header-logo rotate"
            width={100}
          />
        </NavHashLink>
      </h1>
    </BrowserRouter>
  );
}

export default Logo;
