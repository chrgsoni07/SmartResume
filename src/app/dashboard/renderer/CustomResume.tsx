// src/CustomResume.tsx
import React from 'react';
import { Document, Font, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

// Register custom fonts
Font.register({
  family: 'Open Sans',
  src: `https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf`,
});

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: 'Roboto',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  section: {
    marginBottom: 15,
  },
});

// Resume component
const CustomResume: React.FC = () => (
  <Page style={styles.page}>
    <View style={styles.header}>
      <Text style={styles.title}>Jane Smith</Text>
      <Text style={styles.text}>Web Developer</Text>
      <Text style={styles.text}>jane.smith@example.com</Text>
      <Text style={styles.text}>+1 (987) 654-3210</Text>
    </View>

    <View style={styles.section}>
      <Text style={styles.subtitle}>Experience</Text>
      <Text style={styles.text}>Front-End Developer at Web Solutions</Text>
      <Text style={styles.text}>January 2021 - Present</Text>
      <Text style={styles.text}>• Created responsive web pages using React.</Text>
    </View>

    <View style={styles.section}>
      <Text style={styles.subtitle}>Education</Text>
      <Text style={styles.text}>Bachelor of Arts in Web Design</Text>
      <Text style={styles.text}>Design University, 2017 - 2021</Text>
    </View>

    <View style={styles.section}>
      <Text style={styles.subtitle}>Skills</Text>
      <Text style={styles.text}>• HTML & CSS</Text>
      <Text style={styles.text}>• JavaScript & React</Text>
      <Text style={styles.text}>• UX/UI Design</Text>
    </View>
  </Page>
);

const CustomResumeApp: React.FC = () => (
  <Document title="Resume">
    <CustomResume />
  </Document>
);

export default CustomResumeApp;
