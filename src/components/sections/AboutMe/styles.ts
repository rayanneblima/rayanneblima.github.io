import styled from 'styled-components';

export const AboutMeContainer = styled.section`
  align-items: center;
  display: flex;
  height: auto;
  justify-content: space-between;
  margin-inline: auto;
  max-width: 1200px;
  padding-top: 15vh;
  width: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h1 {
    font-family: 'Roboto';
    font-weight: 500;

    margin-bottom: 1.2em;
    padding: 0 20px 0 25px;
    position: relative;
    text-transform: none;
  }

  h1:before {
    background: var(--primary);
    bottom: 0;
    content: "";
    height: 2px;
    left: 20px;
    position: absolute;
    width: 10%;
  }
`;

export const ContentContainer = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: auto;
  margin-inline: auto;
  padding: 0 20px;

  div {
    margin-inline: auto;
  }

  @media (max-width: 624px) {
    gap: 20px;
    grid-template-columns: none;
    grid-template-rows: repeat(2, 1fr);
    padding: 20px;
  }
`;

export const AboutMeText = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 10px;

  p {
    font-size: 2rem;
  }

  div {
    display: flex;
    gap: 10px;
    width: 80%;
  }

  @media (max-width: 624px) {
    order: -1;
  }

  @media (max-width: 400px) {
    div {
      flex-direction: column;
    }
  }
`;
