import React from 'react';

import Image from '../../elements/Image';

const Illustration: React.FC = () => {
  return (
    <Image
      srcName={`illustration-about-me.svg`}
      alt="Sobre mim - Ilustração"
      className='illustration-about-me'
      width={90}
    />
  );
};

export default Illustration;
