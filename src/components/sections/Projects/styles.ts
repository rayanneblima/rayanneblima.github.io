import styled from 'styled-components';

export const ProjectsContainer = styled.section`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-inline: auto;
  min-height: 100vh;
  max-width: 1200px;
  width: 100%;

  @media (max-width: 640px) {
    padding: 60px 0 30px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-height: 60vh;
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

  .show-more {
    align-self: center;
    font-weight: 500;
    text-transform: none;
    width: 260px;
  }
`;

export const ContentContainer = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-inline: auto;
  min-height: 60vh;
  padding: 25px 20px;
  width: 100%;

  background: var(--secondary-background);
`;

export const ReposContainer = styled.div`
  align-content: center;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  justify-items: center;
  row-gap: 25px;
  width: 100%;
`;
