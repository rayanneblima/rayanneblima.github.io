import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import { BtnContainer } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  id?: string;
  bgColor?: string;
  txtColor?: string;
  isOutlined?: boolean;
  isExternalLink?: boolean;
  linkTo?: string;
  children?: ReactNode;
  clickHandler?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button: React.FC<ButtonProps> = ({
  className = 'btn',
  bgColor = 'primary',
  txtColor = 'primary-text',
  isOutlined = false,
  isExternalLink = false,
  linkTo,
  children,
  clickHandler
}) => {
  return (
    <>
      { linkTo
        ? (
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
        )
        : (
          <BtnContainer
            className={className}
            bgColor={bgColor}
            txtColor={txtColor}
            isOutlined={isOutlined}
            onClick={clickHandler}
          >
            {children}
          </BtnContainer>
        )
      }
    </>
  );
};

export default Button;
