import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import Image from '../../elements/Image';

type defaultProps = {
  themeTitle: string;
}

const ArrowsDownGif: React.FC<defaultProps> = ({ themeTitle }) => {
  return (
    <BrowserRouter>
      <HashLink smooth to="#sobre">
        <Image
          srcName={`arrows-down-${themeTitle}.gif`}
          alt="saiba mais"
          className={`arrows-down ${themeTitle}`}
          width={60}
        />
      </HashLink>
    </BrowserRouter>
  );
};

export default ArrowsDownGif;
