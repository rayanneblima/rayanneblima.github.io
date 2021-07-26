import styled from 'styled-components';

export const HeaderContainer = styled.header`
  align-items: center;
  display: flex;
  height: 15vh;
  justify-content: space-between;
  margin-inline: auto;
  max-width: 1200px;
  padding: 0 20px;
  width: 100%;
  z-index: 1;

  background: var(--primary-background);
`;

export const RightContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 8rem;
  justify-content: space-between;

  @media (max-width: 575px) {
    flex-direction: row-reverse;
  }
`;
