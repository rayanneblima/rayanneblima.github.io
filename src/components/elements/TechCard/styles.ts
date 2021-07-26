import styled from 'styled-components';

export const TechCardContainer = styled.div`
  align-items: center;
  background: var(--primary-background);
  border: 2px solid var(--primary-opacity);
  border-radius: 10px;
  display: flex;
  width: 300px;

  @media (max-width: 375px) {
    width: 260px;
`;

export const TechContent = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 10px 20px;
  width: 100%;

  div {
    align-items: center;
    display: flex;
    font-size: 2.6rem;
    justify-content: space-between;
    width: 100%;

    h3 {
      font-weight: 400;
    }

    p svg {
      color: var(--primary);
      font-size: 2.2rem;
    }
  }

  p {
    font-size: 1.6rem;
  }
`;
