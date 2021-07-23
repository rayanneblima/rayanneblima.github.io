import React from 'react';

import Image from '../../elements/Image';

type defaultProps = {
  themeTitle: string;
}

const MyPic: React.FC<defaultProps> = ({ themeTitle }) => {
  return (
    <Image
      srcName={`my-picture-${themeTitle}.png`}
      alt="Rayanne B. Lima - Foto"
      className={`my-picture ${themeTitle}`}
      height={100}
      width={70}
    />
  );
};

export default MyPic;
