import styled from 'styled-components';

interface ButtonProps {
  bgColor: string;
  txtColor: string;
  isOutlined: boolean;
}

export const BtnContainer = styled.button<ButtonProps>`
  height: 60px;
  min-width: 240px;
  width: 100%;

  @media (max-width: 1200px) {
    height: 40px;
    min-width: 140px;
  }

  background: ${(props) =>
    props.isOutlined ? 'transparent' : `var(--${props.bgColor})`};
  border: ${(props) =>
    props.isOutlined ? `2px solid var(--${props.bgColor})` : 'none'};
  border-radius: 4px;
  color: ${(props) => `var(--${props.txtColor})`};
  text-align: center;
  text-transform: capitalize;

  transition: all 0.4s;

  &:hover {
    box-shadow: 4px 4px 14px 4px
      ${(props) =>
        props.theme.title === 'dark'
          ? 'rgba(255, 255, 255, 0.15)'
          : 'rgba(0, 0, 0, 0.15)'};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
