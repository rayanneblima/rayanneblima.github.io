import React from 'react';
import TimelineNav from '../../elements/TimelineNav';

import { TimelineContainer, Content, ContentContainer, MiddleContainer } from './styles';

const Timeline: React.FC = () => {
  return (
    <TimelineContainer id="timeline">
      <Content>
        <h1>Experiências</h1>
        <ContentContainer>
          <MiddleContainer>
            <TimelineNav />
          </MiddleContainer>
        </ContentContainer>
      </Content>
    </TimelineContainer>
  );
}

export default Timeline;
