import styled from 'styled-components';

export const TimelineContainer = styled.section`
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
  gap: 40px;
  justify-content: space-between;
  width: 100%;

  h1 {
    font-family: 'Roboto' ;
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
  display: flex;
  margin-inline: auto;
  padding: 0 20px;
  width: 100%;

  background: var(--secondary-background);
`;

export const MiddleContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-inline: auto;
  padding: 0 20px;

  height: 70%;
  width: 70%;

  @media (max-width: 640px) {
    padding: 0;
    width: 90%;
  }
`;
