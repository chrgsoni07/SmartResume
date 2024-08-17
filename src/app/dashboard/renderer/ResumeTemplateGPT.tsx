// src/Resume.js
import React from 'react';
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

const ResumeTemplateGPT = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.contact}>
          Email: john.doe@example.com | Phone: (123) 456-7890 | LinkedIn: linkedin.com/in/johndoe
        </Text>
        <Text style={styles.address}>123 Main St, City, State, ZIP</Text>
      </View>

      {/* Summary Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Summary</Text>
        <Text style={styles.text}>
          Results-driven marketing professional with over 5 years of experience in digital marketing and content
          creation. Proven track record of increasing website traffic by 30% and managing successful campaigns. Adept at
          leveraging SEO, data analysis, and social media to drive business growth and enhance brand visibility.
        </Text>
      </View>

      {/* Experience Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Experience</Text>
        <View style={styles.job}>
          <Text style={styles.jobTitle}>Marketing Manager</Text>
          <Text style={styles.jobCompany}>ABC Company</Text>
          <Text style={styles.jobDates}>June 2018 - Present</Text>
          <Text style={styles.jobDescription}>
            - Developed and implemented digital marketing strategies that increased website traffic by 30%. - Managed a
            team of 5 marketing specialists to execute high-impact campaigns. - Conducted market research and analyzed
            data to optimize campaign performance.
          </Text>
        </View>
        <View style={styles.job}>
          <Text style={styles.jobTitle}>Digital Marketing Specialist</Text>
          <Text style={styles.jobCompany}>XYZ Corp</Text>
          <Text style={styles.jobDates}>January 2015 - May 2018</Text>
          <Text style={styles.jobDescription}>
            - Executed SEO and PPC campaigns, resulting in a 25% increase in lead generation. - Created engaging content
            for social media channels, increasing follower engagement by 40%. - Collaborated with cross-functional teams
            to launch product promotions and advertisements.
          </Text>
        </View>
      </View>

      {/* Education Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        <Text style={styles.education}>B.A. in Marketing, University of Example, 2017</Text>
      </View>

      {/* Skills Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <Text style={styles.skills}>SEO, Content Creation, Data Analysis, Social Media Management, PPC Campaigns</Text>
      </View>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
    borderBottom: '2px solid #000',
    paddingBottom: 10,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  contact: {
    fontSize: 12,
    color: '#555',
    marginBottom: 5,
  },
  address: {
    fontSize: 12,
    color: '#777',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    borderBottom: '1px solid #ccc',
    paddingBottom: 5,
  },
  text: {
    fontSize: 12,
    lineHeight: 1.5,
    color: '#333',
  },
  job: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottom: '1px solid #ddd',
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  jobCompany: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  jobDates: {
    fontSize: 12,
    color: '#777',
    marginBottom: 5,
  },
  jobDescription: {
    fontSize: 12,
    color: '#333',
    lineHeight: 1.5,
  },
  education: {
    fontSize: 12,
    color: '#333',
  },
  skills: {
    fontSize: 12,
    color: '#333',
  },
});

export default ResumeTemplateGPT;
