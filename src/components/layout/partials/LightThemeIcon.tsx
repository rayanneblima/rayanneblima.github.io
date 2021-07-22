import React from 'react';

import Image from '../../elements/Image';

const LightThemeIcon = () => {
  return (
    <Image
      srcName='sun.svg'
      alt=""
      className="switch-light-icon"
      height={100}
      width={90}
    />
  );
};

export default LightThemeIcon;