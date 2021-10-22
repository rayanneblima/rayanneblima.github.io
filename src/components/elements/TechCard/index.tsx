import React, { useRef } from 'react';

import StarIcon from '@material-ui/icons/Star';
import StarIconOutline from '@material-ui/icons/StarOutline';

import Image from '../Image';

import { TechCardContainer, TechContent } from './styles';

type defaultProps = {
  title: string;
  logo: string;
  level: string;
  description: string;
}

const TechCard: React.FC<defaultProps> = ({
  title,
  logo,
  level,
  description
}) => {
  const techCard = useRef(null);

  function levelRender() {
    if (level === '1') {
      return (
        <>
          <StarIcon />
          <StarIconOutline />
          <StarIconOutline />
        </>
      );
    }

    if (level === '2') {
      return (
        <>
          <StarIcon />
          <StarIcon />
          <StarIconOutline />
        </>
      );
    }

    if (level === '3') {
      return (
        <>
          <StarIcon />
          <StarIcon />
          <StarIcon />
        </>
      );
    }
  }

  return (
    <TechCardContainer
      ref={techCard}
      className="tech-card"
    >
      <Image
        srcName={`tech/${logo}-icon.svg`}
        alt={`Logomarca - ${title}`}
        className="tech-logo rotate"
        width={60}
      />
      <TechContent>
        <div>
          <h3>{ title }</h3>
          <p>{ levelRender() }</p>
        </div>
        <p>{ description }</p>
      </TechContent>
    </TechCardContainer>
  );
}

export default TechCard;
