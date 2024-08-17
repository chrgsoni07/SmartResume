// Resume.js
import React from 'react';

import './RR.css';

interface RRPrompts {
  name: string;
  email: string;
  phone: string;
  location: string;
  jobTitle: string;
  careerObjective: string;
  education: string[];
  workExperience: WorkExp[];
  skills: string[];
}

interface WorkExp {
  title: string;
  company: string;
  dates: string;
  description: string;
}
const RR: React.FC<RRPrompts> = ({
  name,
  email,
  phone,
  location,
  jobTitle,
  careerObjective,
  education,
  skills,
  workExperience,
}) => {
  return (
    <div className="resume-container">
      <header className="resume-header">
        <h1 className="resume-name">{name}</h1>
        <div className="resume-contact">
          <p>{email}</p>
          <p>{phone}</p>
          <p>{location}</p>
        </div>
        <h2 className="resume-title">{jobTitle}</h2>
      </header>

      <section className="resume-objective">
        <h3>Career Objective</h3>
        <p>{careerObjective}</p>
      </section>

      <section className="resume-education">
        <h3>Education</h3>
        <ul>
          {education.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="resume-skills">
        <h3>Skills</h3>
        <ul>
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </section>

      <section className="resume-experience">
        <h3>Work Experience</h3>
        {workExperience.map((job, index) => (
          <div key={index} className="experience-item">
            <h4>
              {job.title} at {job.company}
            </h4>
            <p>{job.dates}</p>
            <p>{job.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default RR;
