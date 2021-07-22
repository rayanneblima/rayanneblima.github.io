import styled from 'styled-components';

interface imageProps {
  height: number;
  width: number;
}

export const Container = styled.div<imageProps>`
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;

  img {
    display: block;
    /* max-width: 100%; css reset */
    transition: all 0.2s;
  }

  img:hover {
    transform: rotate(-10deg);
  }
`;