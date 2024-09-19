// src/Resume.js
import React from 'react';
import { Document, Font, Link, Page, PDFViewer, StyleSheet, Text, View } from '@react-pdf/renderer';

import { type Resume } from '../resume/Resume';
import List, { Item } from './List';

// Ensure Helvetica font is loaded for consistency
Font.register({
  family: 'Lato',
  src: `https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.ttf`,
});

const ResumeTemplate2 = ({ resume }: { resume: Resume }) => (
  <PDFViewer width="100%" height="600">
    <Document keywords="resume, ATS, multinational componay" title="Resume">
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>{resume.name}</Text>
          <Text style={styles.contact}>{` ${resume.jobTitle} | ${resume.email} | ${resume.phone}`}</Text>
          <Link style={styles.text} src={resume.linkedIn}>
            LinkedIn
          </Link>
          <Link style={styles.text} src={resume.github}>
            GitHub
          </Link>

          {/* <Text style={styles.address}>{resume.location}</Text> */}
        </View>

        {/* Professional Summary Section */}
        {resume.careerObjective && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.text}>{resume.careerObjective}</Text>
          </View>
        )}

        {/* Experience Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {resume.workExperience.map((exp) => (
            <View style={styles.job} key={exp.company}>
              <Text style={styles.jobTitle}>{`${exp.company} | ${exp.jobPosition}`}</Text>
              <Text style={styles.jobDates}>{exp.duration}</Text>
              <List>
                {exp.responsibilities.map((resp, index) => (
                  <Item key={index}>{resp}</Item>
                ))}
              </List>
            </View>
          ))}
        </View>

        {/* Education Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {resume.education.map((edu) => (
            <Text style={styles.education} key={edu.university}>{`${edu.degree} from ${edu.university} ${edu.location} | ${edu.duration}`}</Text>
          ))}
        </View>
        {/* Skills Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <Text style={styles.skills}>{resume.skills?.join(' , ')}</Text>
        </View>
      </Page>
    </Document>
  </PDFViewer>
);
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: 'Lato',
  },
  header: {
    marginBottom: 10,
    textAlign: 'center',
    borderBottom: '2px solid #000',
    paddingBottom: 10,
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  contact: {
    fontSize: 10,
    marginBottom: 5,
  },
  address: {
    fontSize: 10,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 12,
    marginBottom: 5,
    fontWeight: 'bold',
    borderBottom: '1px solid #BDC3C7',
    paddingBottom: 5,
  },
  text: {
    fontSize: 10,
    lineHeight: 1.6,
    textAlign: 'justify', // Justify text
  },
  job: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottom: '1px solid #E0E0E0',
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  jobDates: {
    fontSize: 12,
    color: '#BDC3C7',
    marginBottom: 5,
  },
  jobDescription: {
    fontSize: 10,
    lineHeight: 1.6,
    textAlign: 'justify', // Justify text
  },
  bulletPoint: {
    fontSize: 10,
    lineHeight: 1.6,
    textAlign: 'justify', // Justify text
    marginBottom: 5,
  },
  education: {
    fontSize: 10,
    textAlign: 'justify', // Justify text
  },
  skills: {
    fontSize: 10,
    textAlign: 'justify', // Justify text
  },
});

export default ResumeTemplate2;
