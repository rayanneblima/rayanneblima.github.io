import styled from 'styled-components';

type defaultProps = {
  open: boolean;
}

export const NavContainer = styled.nav<defaultProps>`
  align-items: center;
  display: flex;
  margin-inline: auto;

  .btn-menu {
    display: none;
    font-size: 2em;
    position: relative;
    transition: all 0.3s ease-in-out;
    z-index: 10;
  }

  .btn-menu.close {
    right: 50vw;
  }

  ul {
    align-items: center;
    display: flex;
    justify-content: space-between;
    gap: 8rem;

    transition: width 0.2s ease-in-out;

    a {
      font-family: 'Barlow Condensed';
      font-size: 1.6em;
      font-weight: 500;
      position: relative;
      text-transform: uppercase;
    }

    a.active-anchor {
      color: var(--secondary);
    }

    a:before {
      background: var(--secondary);
      bottom: 0;
      content: "";
      height: 0;
      left: -10px;
      position: absolute;
      transition: all 0.3s ease-in-out;
      visibility: hidden;
      width: 100%;
    }

    a.active-anchor:before {
      height: 2px;
      left: 0;
      visibility: visible;
    }

    a:hover:before {
      height: 2px;
      left: 0;
      visibility: visible;
    }
  }

  @media (max-width: 590px) {
    .btn-menu.open {
      display: ${(props) => props.open ? 'none' : 'block'};
    }

    .btn-menu.close {
      display: ${(props) => props.open ? 'block' : 'none'};
    }

    ul {
      background: var(--secondary-background);

      display: ${(props) => props.open ? 'flex' : 'none'};
      flex-direction: column;
      flex-wrap: wrap;
      gap: 4rem;
      height: 100vh;
      justify-content: center;

      position: absolute;
      right: -2px;
      top: 0;
      width: ${(props) => props.open ? '50vh' : '0'};

    }
  }
`;
