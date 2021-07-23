import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import Image from '../../elements/Image';

const Logo = ({ ...props }) => {
  return (
    <BrowserRouter>
      <h1
        {...props}
      >
        <Link to="/">
          <Image
            srcName='logo.svg'
            alt="Rayanne B. Lima - Logomarca"
            className="header-logo rotate"
            width={100}
          />
        </Link>
      </h1>
    </BrowserRouter>
  );
}

export default Logo;
