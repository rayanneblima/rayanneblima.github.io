import styled from 'styled-components';

export const TimelineNavContainer = styled.div`
  align-items: baseline;
  display: flex;
  gap: 20px;
  margin-inline: auto;

  ul {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    border-left: 2px solid var(--primary);
    transition: width 0.2s ease-in-out;

    li {
      cursor: pointer;
      font-size: 1.4em;
      padding: 5px 0;
      position: relative;
      transition: all 0.3s ease-in-out;
      text-align: center;
      text-transform: capitalize;
      width: 150px;
    }

    li.active {
      background: var(--primary);
      color: var(--secondary-text);
    }

    li:hover {
      border: 1px solid var(--primary);
      opacity: 0.8;
    }
  }

  @media (max-width: 640px) {
    flex-direction: column;
    width: 100%;

    ul {
      border-bottom: 2px solid var(--primary);
      border-left: 0;
      flex-direction: row;
      gap: 10px;
      overflow-x: scroll;
      padding-bottom: 10px;
      width: 100%;
    }

    li {
      min-width: 100px;
    }
  }
`;

export const TimelineContent = styled.div`
  h3 {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
  }

  span {
    color: var(--primary);
  }
`;

export const TimelineDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 10px 0;

  svg {
    margin-right: 5px;

    color: var(--primary);
    font-size: 1em;
  }
`;
