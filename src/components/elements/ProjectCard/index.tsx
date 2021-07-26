import React, { useRef } from 'react';

import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import GitHubIcon from '@material-ui/icons/GitHub';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

import { ProjectCardContainer, ProjectHeader, ProjectContent, ProjectFooter } from './styles';

type defaultProps = {
  id: number;
  name: string;
  html_url: string;
  homepage?: string;
  description: string;
  language?: string;
  topics?: string[];
}

const ProjectCard: React.FC<defaultProps> = ({
  id,
  name,
  html_url,
  homepage,
  description,
  language,
  topics
}) => {
  const projectCard = useRef(null);

  const allTopics = topics?.map((topic, index) => {
    return (
      <p key={index}>{ topic }</p>
    )
  });

  return (
    <ProjectCardContainer
      ref={projectCard}
      className="project-card"
    >
      <ProjectHeader>
        <FolderOpenIcon />

        <p>
          <a href={html_url} target="_blank" rel="noopener noreferrer">
            <GitHubIcon />
          </a>
        { homepage &&
          <a href={homepage} target="_blank" rel="noopener noreferrer">
            <OpenInNewIcon />
          </a>
        }
        </p>
      </ProjectHeader>

      <ProjectContent>
        <h3>{ name }</h3>
        <p>{ description }</p>
      </ProjectContent>

      <ProjectFooter>
        { topics?.length
          ? <>{ allTopics }</>
          : <p>{ language }</p>
        }
      </ProjectFooter>
    </ProjectCardContainer>
  );
}

export default ProjectCard;
