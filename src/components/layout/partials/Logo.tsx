import React from 'react';
import Image from '../../elements/Image';

const Logo = ({ ...props }) => {
  return (
    <h1
      {...props}
    >
      {/* <Link to="/"> */}
        <Image
          srcName='logo.svg'
          alt="Rayanne B. Lima - Logomarca"
          className="header-logo"
          width={100}
        />
    {/* </Link> */}
    </h1>
  );
}

export default Logo;