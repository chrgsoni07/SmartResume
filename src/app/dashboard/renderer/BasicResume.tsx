// src/Resume.tsx
import React from 'react';
import { Document, Font, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

// Register fonts
Font.register({
  family: 'Open Sans',
  src: `https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf`,
});

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Open Sans',
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

// Resume component
const BasicResume: React.FC = () => (
  <Page style={styles.page}>
    <View style={styles.section}>
      <Text style={styles.title}>John Doe</Text>
      <Text style={styles.text}>Software Engineer</Text>
      <Text style={styles.text}>john.doe@example.com</Text>
      <Text style={styles.text}>+1 (123) 456-7890</Text>
    </View>

    <View style={styles.section}>
      <Text style={styles.subtitle}>Education</Text>
      <Text style={styles.text}>Bachelor of Science in Computer Science</Text>
      <Text style={styles.text}>University of Example, 2018 - 2022</Text>
    </View>

    <View style={styles.section}>
      <Text style={styles.subtitle}>Experience</Text>
      <Text style={styles.text}>Software Engineer at Example Corp</Text>
      <Text style={styles.text}>June 2022 - Present</Text>
      <Text style={styles.text}>• Developed and maintained web applications.</Text>
    </View>

    <View style={styles.section}>
      <Text style={styles.subtitle}>Skills</Text>
      <Text style={styles.text}>• JavaScript</Text>
      <Text style={styles.text}>• React</Text>
      <Text style={styles.text}>• Node.js</Text>
    </View>
  </Page>
);

// Document component
const BasicResumeApp: React.FC = () => (
  <Document title="Resume">
    <BasicResume />
  </Document>
);

export default BasicResumeApp;
