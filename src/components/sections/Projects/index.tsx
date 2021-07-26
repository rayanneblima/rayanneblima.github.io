import React, { useState, useEffect } from 'react';

import { RepoDataInterface } from '../../../model/interfaces/repoData';

import ProjectCard from '../../elements/ProjectCard';
import Button from '../../elements/Button';

import { ProjectsContainer, Content, ContentContainer, ReposContainer } from './styles';

const Projects: React.FC = () => {
  const username = "rayanneblima";

  const [showBtn, setShowBtn] = useState(true);
  const [page, setPage] = useState(1);
  const [repoList, setRepoList] = useState<RepoDataInterface[]>([]);

  function getRepos() {
    fetch(`https://api.github.com/users/${username}/repos?page=${page}&per_page=6`,
      {
      method: "GET",
      headers: {
      Accept: "application/vnd.github.mercy-preview+json"
      }
    })
    .then(async response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      const data = await response.json();
      if (!data.length) {
        setShowBtn(false);
      }
      return setRepoList(repoList.concat(data));
    });
  }

  useEffect(() => {
    getRepos();
  }, [page]);

  return (
    <ProjectsContainer id="projetos">
      <Content>
        <h1>Projetos</h1>
        <ContentContainer>
          <ReposContainer>
            { repoList.map((repo) => {
                return (
                  <ProjectCard
                    key={repo.id}
                    id={repo.id}
                    name={repo.name}
                    html_url={repo.html_url}
                    homepage={repo.homepage}
                    description={repo.description}
                    language={repo.language}
                    topics={repo.topics}
                  />
                );
              })
            }
          </ReposContainer>
          { showBtn && <Button
              className="show-more"
              txtColor="secondary-text"
              clickHandler={() => setPage(page+1) }
            >
              ver mais
            </Button>
          }
        </ContentContainer>
      </Content>
    </ProjectsContainer>
  );
}

export default Projects;
