// ResumePDF.js
import React from 'react';
import { Document, Font, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

// Register custom fonts if needed
// Font.register({ family: 'Roboto', src: 'path/to/Roboto.ttf' });

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 5,
  },
  contact: {
    fontSize: 12,
    marginTop: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    borderBottom: '2px solid #007bff',
    paddingBottom: 5,
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  jobCompany: {
    fontSize: 12,
    color: '#555',
  },
  list: {
    marginTop: 5,
  },
  listItem: {
    marginBottom: 5,
  },
});

const ResumePDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.subtitle}>Web Developer</Text>
        <Text style={styles.contact}>
          Email: john.doe@example.com | Phone: (123) 456-7890 | LinkedIn: linkedin.com/in/johndoe
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Summary</Text>
        <Text>
          Results-driven web developer with 5 years of experience in creating dynamic and user-friendly websites.
          Proficient in HTML, CSS, JavaScript, and various frameworks. Adept at problem-solving and collaborating with
          cross-functional teams.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        <View>
          <Text style={styles.jobTitle}>Senior Web Developer</Text>
          <Text style={styles.jobCompany}>Company Name, Location | Jan 2020 – Present</Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>Developed and maintained high-traffic websites.</Text>
            <Text style={styles.listItem}>Collaborated with designers to create responsive web designs.</Text>
            <Text style={styles.listItem}>Optimized web performance and improved SEO rankings.</Text>
          </View>
        </View>
        <View>
          <Text style={styles.jobTitle}>Junior Web Developer</Text>
          <Text style={styles.jobCompany}>Another Company, Location | Jun 2016 – Dec 2019</Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>Assisted in building and testing web applications.</Text>
            <Text style={styles.listItem}>Supported the development of internal tools and features.</Text>
            <Text style={styles.listItem}>Provided technical support and troubleshooting.</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        <Text>Bachelor's Degree in Computer Science | University Name, Location | 2012 – 2016</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <Text>HTML, CSS, JavaScript, React, Node.js, Git, SQL</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Certifications</Text>
        <Text>Certified Web Developer | Issuing Organization | 2018</Text>
      </View>
    </Page>
  </Document>
);

export default ResumePDF;
