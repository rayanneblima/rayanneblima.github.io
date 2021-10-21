import styled from 'styled-components';

export const ProjectCardContainer = styled.div`
  align-items: flex-start;
  background: var(--primary-background);
  border: 2px solid var(--primary-opacity);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: 240px;
  padding: 20px 20px 0;
  width: 260px;
`;

export const ProjectHeader = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;

  svg {
    color: var(--primary);
    font-size: 4rem;
  }

  p {
    cursor: pointer;
    display: flex;
    gap: 10px;
  }

  p svg {
    font-size: 3rem;
    transition: all 0.2s ease-in-out;
  }

  p svg:hover {
    color: var(--primary-opacity)
  }
`;

export const ProjectContent = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: 100%;
  width: 100%;

  h3 {
    font-size: 2.6rem;
    font-weight: 400;
  }

  p svg {
    color: var(--primary);
    font-size: 2.2rem;
  }

  p {
    font-size: 1.6rem;
    height: 60px;
    overflow-y: scroll;
  }
`;

export const ProjectFooter = styled.footer`
  color: var(--primary);
  display: flex;
  font-size: 1.8rem;
  font-weight: 500;
  gap: 10px;
  height: 40px;
  text-transform: capitalize;
  padding-bottom: 10px;
  margin-bottom: 10px;

  overflow-x: scroll;
  overflow-y: hidden;
  width: 100%;

  p {
    white-space: pre;
  }
`;
