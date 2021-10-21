import styled from 'styled-components';

export const HeaderContainer = styled.header`
  align-items: center;
  display: flex;
  min-height: 10vh;
  justify-content: space-between;
  margin-inline: auto;
  padding: 20px;
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
