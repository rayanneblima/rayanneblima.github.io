import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import { BtnContainer } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  bgColor?: string;
  txtColor?: string;
  isOutlined?: boolean;
  linkTo: string;
  children?: ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  bgColor = 'primary',
  txtColor = 'text-primary',
  isOutlined = false,
  linkTo,
  children,
}) => {
  return (
    <BrowserRouter>
      <HashLink smooth to={`#${linkTo}`} style={{ width: '100%' }}>
        <BtnContainer bgColor={bgColor} txtColor={txtColor} isOutlined={isOutlined}>
          {children}
        </BtnContainer>
      </HashLink>
    </BrowserRouter>
  );
};

export default Button;
