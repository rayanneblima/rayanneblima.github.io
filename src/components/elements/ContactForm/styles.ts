import styled from 'styled-components';

export const ContactFormContainer = styled.form`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  padding: 20px 0;
  width: 360px;

  border: 1px solid var(--primary);
  border-radius: 4px;

  .send-message {
    width: 90%;
  }

  @keyframes fullRotation {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .refresh-icon {
    animation: fullRotation infinite 2s linear;
  }
`;
