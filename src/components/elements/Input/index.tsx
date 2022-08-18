import React, { ReactNode } from 'react';

import { InputContainer } from './styles';

type InputProps = {
  type?: string;
  placeholder: string;
  name?: string;
  isTextArea?: boolean;
  children: ReactNode;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => void;
  value?: string;
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
          onChange={props.changeHandler}
          value={props.value}
          required
          {...props}
        />
      }
      { isTextArea &&
        <textarea
          placeholder={placeholder}
          name={name}
          onChange={props.changeHandler}
          value={props.value}
          required
          {...props}
        />
      }
    </InputContainer>
  );
};

export default Input;
