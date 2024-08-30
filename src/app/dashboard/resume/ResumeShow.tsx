'use client';

import * as React from 'react';

import { Resume } from './Resume';

import './ResumeShow.css';

import Button from '@mui/material/Button';

import { fetchData } from '../service/api';

const ResumeShow = () => {
  const [resumeData, setResumeData] = React.useState<Resume>(new Resume());

  async function handelFatchData(): Promise<void> {
    const fatchedPromise = fetchData('66ae2394ffb9b0287bdd5809');
    console.log('fetchedData => ', fatchedPromise);
    setResumeData(await fatchedPromise);
  }

  return (
    <div>
      <Button type="button" onClick={() => handelFatchData()}>
        Fatch Data
      </Button>
      <div className="resume-container">
        <header className="resume-header">
          <h1 className="resume-name">{resumeData.name}</h1>
          <p className="resume-contact">
            Email: <a href={`mailto:${resumeData.email}`}>{resumeData.email}</a> | Phone: {resumeData.phone}
          </p>
        </header>
        <section className="resume-summary">
          <h2>Summary</h2>
          <p>{resumeData.careerObjective}</p>
        </section>
        <section className="resume-experience">
          <h2>Experience</h2>
          <ul>
            {resumeData.workExperience.map((exp, index) => (
              <li key={index} className="resume-experience-item">
                <h3>
                  {exp.jobPosition} <span className="resume-company">@ {exp.company}</span>
                </h3>
                <p className="resume-dateRange">{exp.duration}</p>
                <ul className="bullet-list">
                  {exp.responsibilities.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
        <section className="resume-education">
          <h2>Education</h2>
          <ul>
            {resumeData.education.map((edu, index) => (
              <li key={index} className="resume-education-item">
                <h3>{edu.degree}</h3>
                <p>{edu.university}</p>
                <p className="resume-dateRange">{edu.duration}</p>
              </li>
            ))}
          </ul>
        </section>
        <section className="resume-skills">
          <h2>Skills</h2>
          <ul>
            {resumeData.skills.map((skill, index) => (
              <li key={index} className="resume-skill">
                {skill}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default ResumeShow;
