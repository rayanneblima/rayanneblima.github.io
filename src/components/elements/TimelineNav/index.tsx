import React, { useState, useRef, useEffect } from 'react';

import { jobs } from '../../../data/jobs';
import ArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';

import { TimelineNavContainer, TimelineContent, TimelineDescription } from './styles';

const TimelineNav: React.FC = () => {
  const timeline = useRef(null);

  const [jobIndex, setJobIndex] = useState(0);
  const [jobCompany, setJobCompany] = useState('');
  const [jobFunction, setJobFunction] = useState('');
  const [jobDate, setJobDate] = useState('');
  const [jobDescription, setJobDescription] = useState<string[]>([]);

  const jobsItems =
    jobs.map((job, index) => {
      return (
        <li
          key={index}
          className={ index === jobIndex ? "active" : ''}
          onClick={() => handleChangeCompany(index)}
        >
          { job.company }
        </li>
      );
    });

  const descriptionItems =
    jobDescription.map((item, index) => {
      if (item !== '') {
        return (
          <p key={index}>
            <ArrowRightIcon />
            { item }
          </p>
        );
      }

      return (<p key="default"></p>);
    });

  useEffect(() => {
    setJobCompany(jobs[jobIndex].company);
    setJobFunction(jobs[jobIndex].function);
    setJobDate(jobs[jobIndex].date);

    const paragraphs: string[] = [];
    jobs[jobIndex].description.map(p => paragraphs.push(p));
    setJobDescription(paragraphs);
  }, [jobIndex]);

  function handleChangeCompany(index: number) {
    setJobIndex(index);
  }

  return (
    <TimelineNavContainer
      ref={timeline}
      className="timeline"
    >
      <ul className="timeline-nav">
        { jobsItems }
      </ul>
      <TimelineContent>
        <h3>{ jobFunction } <span>@ { jobCompany }</span></h3>
        <p>{ jobDate }</p>
        <TimelineDescription>
          { descriptionItems }
        </TimelineDescription>
      </TimelineContent>
    </TimelineNavContainer>
  );
}

export default TimelineNav;
