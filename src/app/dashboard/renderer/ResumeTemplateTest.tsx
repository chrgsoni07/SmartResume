import React from 'react';
import { Document, Font, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

import { Resume } from '../resume/Resume';
import List, { Item } from './List';

// Ensure Lato font is loaded for consistency
Font.register({
  family: 'Lato',
  src: `https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.ttf`,
});

const ResumeTemplateTest = ({ resume }: { resume: Resume }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.name}>{resume.name}</Text>
        <Text style={styles.contact}>
          {resume.jobTitle} | {resume.email} | {resume.phone}
        </Text>
        {/* <Text style={styles.address}>{resume.location}</Text> */}
      </View>

      <View style={styles.content}>
        {/* Left Side */}
        <View style={styles.leftColumn}>
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
            {resume.workExperience.map((exp, index) => (
              <View style={styles.job} key={index}>
                <Text style={styles.jobTitle}>
                  {exp.company} | {exp.jobPosition}
                </Text>
                <Text style={styles.jobDates}>{exp.duration}</Text>
                <List>
                  {exp.responsibilities.map((resp, idx) => (
                    <Item key={idx}>{resp}</Item>
                  ))}
                </List>
              </View>
            ))}
          </View>
        </View>

        {/* Right Side */}
        <View style={styles.rightColumn}>
          {/* Education Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {resume.education.map((edu, index) => (
              <Text style={styles.education} key={index}>
                {edu.degree} from {edu.university} {edu.location} | {edu.duration}
              </Text>
            ))}
          </View>

          {/* Skills Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Text style={styles.skills}>{resume.skillsList.join(', ')}</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: 'Lato',
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contact: {
    fontSize: 12,
    color: '#555',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftColumn: {
    width: '70%',
    paddingRight: 15,
  },
  rightColumn: {
    width: '30%',
    paddingLeft: 15,
    borderLeft: '1px solid #3f51b5',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    borderBottom: '1px solid #3f51b5',
    paddingBottom: 5,
    marginBottom: 10,
  },
  text: {
    fontSize: 11,
    lineHeight: 1.5,
    textAlign: 'justify',
  },
  job: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottom: '1px solid #E0E0E0',
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  jobDates: {
    fontSize: 11,
    color: '#888',
    marginBottom: 5,
  },
  education: {
    fontSize: 11,
    marginBottom: 5,
    textAlign: 'justify',
  },
  skills: {
    fontSize: 11,
    textAlign: 'justify',
  },
  bulletPoint: {
    fontSize: 11,
    lineHeight: 1.5,
    textAlign: 'justify',
  },
});

export default ResumeTemplateTest;
