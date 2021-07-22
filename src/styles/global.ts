import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
  /* UI Colors */
  --primary-background: ${(props) => props.theme.colors.primaryBackground};
  --secondary-background: ${(props) => props.theme.colors.secondaryBackground};
  --tertiary-background: ${(props) => props.theme.colors.tertiaryBackground};
  --primary-text: ${(props) => props.theme.colors.primaryText};
  --secondary-text: ${(props) => props.theme.colors.secondaryText};
  --primary: ${(props) => props.theme.colors.primary};
  --primary-opacity: ${(props) => props.theme.colors.primaryOpacity};
  --secondary: ${(props) => props.theme.colors.secondary};
  --secondary-opacity: ${(props) => props.theme.colors.secondaryOpacity};
  }

  * {
    box-sizing: border-box;
    margin: 0;
    outline: 0;
    padding: 0;
  }

  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
    /* BETTER FONT SMOOTHING - https://gist.github.com/hsleonis/55712b0eafc9b25f1944 */
		font-variant-ligatures: none;
		-webkit-font-variant-ligatures: none;
		text-rendering: optimizeLegibility;
		-moz-osx-font-smoothing: grayscale;
		font-smooth: antialiased;
		-webkit-font-smoothing: antialiased;
		text-shadow: rgba(0, 0, 0, 0.01) 0 0 1px;
  }

  /* scrollbars */
  ::-webkit-scrollbar {
    height: 6px;
    width: 6px;
  }
  ::-webkit-scrollbar-thumb:vertical,
  ::-webkit-scrollbar-thumb:horizontal {
    background-color: gray;
    border-radius: 4px;
  }

  body {
    background: ${(props) => props.theme.colors.primaryBackground};
    color: var(--primary-text);
		line-height: 1.5;
    height: 100vh;
    margin: auto;
    overflow: initial;
    /* width: 100vw; cause horizontal vertical scroll */
  }

  /* sticky header */
  #root {
    position: relative;
  }

  header {
    position: sticky;
    top: 0;
  }

  /* sticky header */

  body, input, textarea, button {
    font: 1.6rem 'Roboto', sans-serif;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-family: 'Barlow Condensed', sans-serif;
    line-height: 1.25;
		text-transform: capitalize;
  }

  /* Common base styles for the site */
	figure, img, svg, video {
		max-width: 100%;
	}

	figure {
		width: auto !important;
	}

	video {
		display: block;
		width: 100%;
	}

	h1, .h1 {
		font-size: 3.2rem;
		font-weight: 700;
		line-height: 1.1;
	}

	h2,	.h2 {
		font-size: 3rem;
	}

	h3,	.h3 {
		font-size: 2.4rem;
	}

	h4,	.h4 {
		font-size: 2rem;
	}

	h5,	.h5 {
		font-size: 1.8rem;
	}

	h6,	.h6 {
		font-size: 1.6rem;
	}

  button, a {
    font-size: 1.5rem;
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  /* Accessibly remove animations: https://gist.githubusercontent.com/bellangerq/6cdfe6e3701b4048c72546960c7c9f66/raw/dc5036697d0da57eff8e0f659106b319102e72a0/a11y-disable-animations.css */
	@media (prefers-reduced-motion: reduce) {
		*,
		*::before,
		*::after {
			animation-duration: 0.001ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.001ms !important;
		}
	}

  /* https://www.scottohara.me/blog/2017/04/14/inclusively-hidden.html */
	.hide:not(:focus):not(:active),
	.hidden:not(:focus):not(:active) {
		clip: rect(0 0 0 0);
		clip-path: inset(50%);
		height: 1px;
		overflow: hidden;
		position: absolute;
		white-space: nowrap;
		width: 1px;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 60%;
    }
    @media (max-width: 980px) {
      font-size: 48%;
    }
  }
`;
