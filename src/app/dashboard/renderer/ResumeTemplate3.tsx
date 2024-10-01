import React from 'react';
import { Document, Font, Image, Page, PDFViewer, StyleSheet, Text, View } from '@react-pdf/renderer';

import { type Resume } from '../resume/Resume';
import List, { Item } from './List';

// Ensure Lato font is loaded for consistency
Font.register({
  family: 'Lato',
  src: `https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.ttf`,
});

const ResumeTemplate3 = ({ resume }: { resume: Resume }) => (
  <PDFViewer width="100%" height="600">
    <Document keywords="resume, ATS, multinational company" title="Resume">
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{resume.name}</Text>
          <Text style={styles.jobTitleHeader}>{resume.jobTitle}</Text>
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
            {/* Contact Information Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contact</Text>
              <Text style={styles.text}>
                <Image src={{ uri: '/assets/Icons/envelope.png', method: 'GET', headers: { 'Cache-Control': 'no-cache' }, body: '' }} />
                {resume.email}
              </Text>

              <Text style={styles.text}>
                <Image src={{ uri: '/assets/Icons/phone.png', method: 'GET', headers: { 'Cache-Control': 'no-cache' }, body: '' }} />
                {resume.phone}
              </Text>

              <Text style={styles.text}>
                <Image src={{ uri: '/assets/Icons/map-pin.png', method: 'GET', headers: { 'Cache-Control': 'no-cache' }, body: '' }} />
                {resume.location}
              </Text>

              <Text style={styles.text}>
                <Image src={{ uri: '/assets/Icons/linkedin-logo.png', method: 'GET', headers: { 'Cache-Control': 'no-cache' }, body: '' }} />
                {resume.linkedIn}
              </Text>

              <Text style={styles.text}>
                <Image src={{ uri: '/assets/Icons/github-logo.png', method: 'GET', headers: { 'Cache-Control': 'no-cache' }, body: '' }} />
                {resume.github}
              </Text>
            </View>

            {/* Education Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {resume.education.map((edu, index) => (
                <View key={index} style={styles.educationContainer}>
                  <Text style={styles.education}>{edu.degree}</Text>
                  <Text style={styles.education}>{edu.university}</Text>
                  <Text style={styles.education}>
                    <Image src={{ uri: '/assets/Icons/map-pin.png', method: 'GET', headers: { 'Cache-Control': 'no-cache' }, body: '' }} />
                    {edu.location}
                  </Text>
                  <Text style={styles.education}>
                    <Image src={{ uri: '/assets/Icons/calendar-dots.png', method: 'GET', headers: { 'Cache-Control': 'no-cache' }, body: '' }} />
                    {edu.duration}
                  </Text>
                </View>
              ))}
            </View>

            {/* Skills Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <Text style={styles.skills}>{resume.skills?.join(', ')}</Text>
            </View>
          </View>
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
    textAlign: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  jobTitleHeader: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  jobTitle: {
    fontSize: 12,
    color: '#555',
    marginBottom: 10,
  },
  contact: {
    fontSize: 12,
    color: '#555',
    marginBottom: 10,
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
  jobDates: {
    fontSize: 11,
    color: '#888',
    marginBottom: 5,
  },
  educationContainer: {
    marginBottom: 10, // Add space between education entries
  },
  education: {
    fontSize: 11,
    textAlign: 'justify',
  },
  skills: {
    fontSize: 11,
    textAlign: 'justify',
  },
});

export default ResumeTemplate3;
