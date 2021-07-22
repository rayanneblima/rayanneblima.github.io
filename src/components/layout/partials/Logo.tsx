import React from 'react';
import Image from '../../elements/Image';

const Logo = ({ ...props }) => {
  return (
    <div
      {...props}
    >
      <h1>
        {/* <Link to="/"> */}
          <Image
            srcName='logo.svg'
            alt="Rayanne B. Lima - Logomarca"
            className="header-logo"
            height={100}
            width={100} />
       {/* </Link> */}
      </h1>
    </div>
  );
}

export default Logo;