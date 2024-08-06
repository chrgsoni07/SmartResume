// ResumePDF.js
'use client';

import React from 'react';
import { Button } from '@mui/material';
import { Document, Page, PDFViewer, StyleSheet, Text, View } from '@react-pdf/renderer';

import { fetchData } from '../service/api';
import { Resume } from './Resume';

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subheader: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  list: {
    marginBottom: 5,
    fontSize: 12,
  },
});

const ResumePDF = () => {
  const [resumeData, setResumeData] = React.useState<Resume>(new Resume());

  async function handelFatchData(): Promise<void> {
    const fatchedPromise = fetchData('66ae2394ffb9b0287bdd5809');
    console.log('fetchedData => ', fatchedPromise);
    setResumeData(await fatchedPromise);
  }

  return (
    // <PDFViewer>
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>{'Chirag Soni'}</Text>
          <Text style={styles.text}>Email: {'chrgsoni07@gmail.com'}</Text>
          {/* <Text style={styles.text}>Phone: {resumeData.phone}</Text>
            <Text style={styles.text}>Location: {resumeData.location}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.subheader}>Career Objective</Text>
            <Text style={styles.text}>{resumeData.careerObjective}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.subheader}>Work Experience</Text>
            {resumeData.workExperience.map((exp, index) => (
              <View key={index}>
                <Text style={styles.subheader}>
                  {exp.jobPosition} at {exp.company}
                </Text>
                <Text style={styles.text}>Duration: {exp.duration}</Text>
                <Text style={styles.text}>Location: {exp.location}</Text>
                <Text style={styles.text}>Responsibilities:</Text>
                {exp.responsibilities.map((resp, idx) => (
                  <Text key={idx} style={styles.list}>
                    - {resp}
                  </Text>
                ))}
                <Text style={styles.text}>Achievements:</Text>
                {exp.achievements.map((ach, idx) => (
                  <Text key={idx} style={styles.list}>
                    - {ach}
                  </Text>
                ))}
              </View>
            ))}
          </View>
          <View style={styles.section}>
            <Text style={styles.subheader}>Education</Text>
            {resumeData.education.map((edu, index) => (
              <View key={index}>
                <Text style={styles.subheader}>{edu.degree}</Text>
                <Text style={styles.text}>University: {edu.university}</Text>
                <Text style={styles.text}>Duration: {edu.duration}</Text>
                <Text style={styles.text}>Location: {edu.location}</Text>
              </View>
            ))}
          </View>
          <View style={styles.section}>
            <Text style={styles.subheader}>Skills</Text>
            {resumeData.skills.map((skill, index) => (
              <Text key={index} style={styles.list}>
                - {skill}
              </Text>
            ))}
          </View>
          <View style={styles.section}>
            <Text style={styles.subheader}>Projects</Text>
            {resumeData.projects.map((project, index) => (
              <View key={index}>
                <Text style={styles.subheader}>{project.name}</Text>
                <Text style={styles.subheader}>{project.technologies}</Text>
                <Text style={styles.text}>{project.description}</Text>
              </View>
            ))}  */}
        </View>
      </Page>
    </Document>
    // </PDFViewer>
  );
};

export default ResumePDF;
