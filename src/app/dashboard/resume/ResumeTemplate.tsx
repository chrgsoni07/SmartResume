// components/ResumeTemplate.js
'use client';

import React from 'react';
import Button from '@mui/material/Button';

import { fetchData } from '../service/api';

import './ResumeTemplate.css'; // Import CSS for styling

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { Resume } from './Resume';

const ResumeTemplate = () => {
  const [resumeData, setResumeData] = React.useState<Resume>(new Resume());

  async function handelFatchData(): Promise<void> {
    const fatchedPromise = fetchData('66ae2394ffb9b0287bdd5809');
    console.log('fetchedData => ', fatchedPromise);
    setResumeData(await fatchedPromise);
  }

  const isProjectValid = Array.isArray(resumeData.projects) && resumeData.projects.length > 0;

  const generatePDF = () => {
    const element = document.getElementById('resume');

    // Check if element is not null
    if (element) {
      html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 210; // A4 size in mm
        const pageHeight = 295; // A4 size in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position -= pageHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('my-file.pdf');
      });
    } else {
      console.error('Element not found');
    }
  };

  return (
    <div>
      <Button type="button" onClick={() => handelFatchData()}>
        Fatch Data
      </Button>
      <Button type="button" onClick={() => generatePDF()}>
        Print PDF
      </Button>

      <div className="resume-container" id="resume">
        <header className="resume-header">
          <h1>{resumeData.name}</h1>
          <p>
            {resumeData.email} | {resumeData.phone} | {resumeData.location}
          </p>
        </header>
        <section className="resume-section">
          <h2>Career Objective</h2>
          <p>{resumeData.careerObjective}</p>
        </section>
        <section className="resume-section  work-experience">
          <h2>Work Experience</h2>
          {resumeData.workExperience.map((exp, index) => (
            <div key={index} className="work-experience">
              <h3>
                {exp.jobPosition} at {exp.company}
              </h3>
              <p>
                {exp.duration} - {exp.location}
              </p>
              <p>Responsibilities:</p>
              <ul>
                {exp.responsibilities.map((resp, idx) => (
                  <li key={idx}>{resp}</li>
                ))}
              </ul>
              <p>Achievements:</p>
              <ul>
                {exp.achievements.map((ach, idx) => (
                  <li key={idx}>{ach}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
        <section className="resume-section">
          <h2>Education</h2>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="education">
              <h3>{edu.degree}</h3>
              <p>
                {edu.university} | {edu.duration} | {edu.location}
              </p>
            </div>
          ))}
        </section>
        <section className="resume-section">
          <h2>Skills</h2>
          <ul>
            {resumeData.skillsList.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </section>
        {isProjectValid ? (
          <section className="resume-section">
            <h2>Projects</h2>
            {resumeData.projects.map((project, index) => (
              <div key={index} className="project">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
              </div>
            ))}
          </section>
        ) : (
          <span></span>
        )}
      </div>
    </div>
  );
};

export default ResumeTemplate;
