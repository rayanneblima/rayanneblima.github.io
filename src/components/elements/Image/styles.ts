import styled from 'styled-components';

interface imageProps {
  height?: number | undefined;
  width?: number | undefined;
}

export const Container = styled.div<imageProps>`
  height: ${(props) => props.height ? `${props.height}%` : '' };
  width: ${(props) => props.width ? `${props.width}%` : '' };

  align-items: center;
  display: flex;
  justify-content: center;

  img {
    display: block;
    /* max-width: 100%; css reset */
    margin-inline: auto;
    width: ${(props) => props.width ? `${props.width}%` : '' };
    transition: all 0.2s;
  }

  .rotate:hover {
    transform: rotate(-10deg);
  }
`;
