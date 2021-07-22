import React, { useRef } from 'react';

import { Container } from './styles';

type defaultProps = {
  alt: string;
  className: string;
  srcName: string;
  height: number;
  width: number;
}

const Image: React.FC<defaultProps> = ({
  alt,
  className,
  srcName,
  height,
  width,
  ...props
}) => {

  const image = useRef(null);

  return (
    <Container
      className={className}
      height={height}
      width={width}
    >
      <img
        {...props}
        ref={image}
        alt={alt}
        src={require(`../../../assets/${srcName}`).default}
      />
    </Container>
  );
}

export default Image;