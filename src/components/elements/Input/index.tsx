import React, { ReactNode } from 'react';

import { InputContainer } from './styles';

type InputProps = {
  type?: string;
  placeholder: string;
  name?: string;
  isTextArea?: boolean;
  children: ReactNode;
};

const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  name,
  isTextArea = false,
  children,
  ...props
}) => {
  return (
    <InputContainer>
      { children }
      { !isTextArea &&
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          {...props}
        />
      }
      { isTextArea &&
        <textarea
          placeholder={placeholder}
          name={name}
          {...props}
        />
      }
    </InputContainer>
  );
};

export default Input;
