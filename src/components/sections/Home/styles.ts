import styled from 'styled-components';

import bgEffectDark from '../../../assets/background-effect-dark.svg';
import bgEffectLight from '../../../assets/background-effect-light.svg';

type defaultProps = {
  themeTitle: string;
}

export const HomeContainer = styled.div<defaultProps>`
  background: url('${(props) => props.themeTitle === 'dark' ? bgEffectDark : bgEffectLight}');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  /* height: 100vh; */
`;
