import styled from 'styled-components';

export const MainContainer = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 90vh;
  justify-content: space-between;
  margin-inline: auto;
  max-width: 1200px;
  padding: 0 20px 20px;
  width: 100%;
  
  @media (max-width: 590px) {
    justify-content: center;
    gap: 2rem;
  }
`;

export const TopContent = styled.div`
  align-items: center;
  display: flex;
  gap: 8rem;
  height: 90vh;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 590px) {
    flex-direction: column-reverse;
    gap: 4rem;
    height: 80vh;
  }

  @media (max-width: 425px) {
    flex-direction: column-reverse;
    gap: 1rem;
    height: 60vh;
  }
`;

export const Description = styled.div`
  /* align-items: center; */
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  width: 100%;

  h1 {
    font-size: 4.5em;
    font-weight: 500;
    margin: 0;
    text-align: center;
  }

  h3 {
    align-self: flex-end;
    color: var(--primary);
    font-size: 2.6em;
    font-weight: 300;
    margin: 0 6rem 1rem 0;
    text-align: end;
    width: 50%;
  }

  div {
    align-items: center;
    display: flex;
    gap: 10px;
    justify-content: space-between;
    padding: 0 20px;
  }

  @media (max-width: 590px) {
    h3 {
      align-self: center;
      margin: 0 0 1rem 0;
      text-align: center;
      width: 100%;
    }
  }

  @media (max-width: 425px) {
    div {
      flex-direction: column;
    }
  }

  @media (max-width: 375px) {
    h1 {
      font-size: 3.5em;
    }

    h3 {
      font-size: 2.2em;
    }
  }
`;

export const Picture = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  justify-content: center;
  width: 100%;
  
   @media (max-width: 1100px) {
    div, img {
      width: 90%;
    }
  }

  @media (max-width: 768px) {
    div, img {
      width: 100%;
    }
  }

  @media (max-width: 590px) {
    width: 60%;
  }

  @media (max-width: 375px) {
    width: 60%;
  }
`;

export const BottomContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  /* height: 15vh; */

  p {
    color: var(--primary);
    font-size: 1.2em;
    top: 20px;
  }

  div {
    margin-inline: auto;
  }

  @media (max-width: 590px) {
    margin-top: 10px;
  }

  @media (max-width: 375px) {
    .arrows-down {
      width: 60%;
    }
  }
`;
