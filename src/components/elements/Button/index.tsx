import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import { BtnContainer } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  bgColor?: string;
  txtColor?: string;
  isOutlined?: boolean;
  isExternalLink?: boolean;
  linkTo: string;
  children?: ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  bgColor = 'primary',
  txtColor = 'primary-text',
  isOutlined = false,
  isExternalLink = false,
  linkTo,
  children,
}) => {
  return (
    <BrowserRouter>
      { isExternalLink
        ? (
          <a href={linkTo} target="_blank" rel="noopener noreferrer" style={{ width: '100%' }}>
            <BtnContainer bgColor={bgColor} txtColor={txtColor} isOutlined={isOutlined}>
              {children}
            </BtnContainer>
          </a>
        )
        : (
          <HashLink smooth to={`#${linkTo}`} style={{ width: '100%' }}>
            <BtnContainer bgColor={bgColor} txtColor={txtColor} isOutlined={isOutlined}>
              {children}
            </BtnContainer>
          </HashLink>
        )
      }
    </BrowserRouter>
  );
};

export default Button;
