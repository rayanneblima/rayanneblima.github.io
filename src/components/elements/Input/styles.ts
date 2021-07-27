import styled from 'styled-components';

export const InputContainer = styled.div`
  align-items: center;
  border: ${(props) => `2px solid ${props.theme.colors.primary}`};
  border-radius: 4px;
  display: flex;
  gap: 10px;
  min-height: 30px;
  padding: 5px 10px;
  width: 90%;;

  svg {
    align-self: flex-start;
    color: var(--primary);
    font-size: 2.4rem;
  }

  input,
  textarea {
    background: transparent;
    border: none;
    color: var(--primary-text);
    height: 100%;
    width: 100%;
  }

  textarea {
    height: 60px;
    resize: none;
  }

  input::placeholder,
  textarea::placeholder {
    color: var(--primary-text);
  }

  transition: all 0.4s;
`;
