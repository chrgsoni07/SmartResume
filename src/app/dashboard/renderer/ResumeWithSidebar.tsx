// src/ResumeWithSidebar.tsx
import React from 'react';
import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

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
    flexDirection: 'row',
  },
  sidebar: {
    width: '30%',
    padding: 10,
  },
  content: {
    width: '70%',
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

// Resume component
const ResumeWithSidebar: React.FC = () => (
  <Page style={styles.page}>
    <View style={styles.sidebar}>
      <Image src="https://react-pdf.org/static/images/luke.jpg" style={styles.image} />
      <Text style={styles.title}>John Doe</Text>
      <Text style={styles.text}>Software Engineer</Text>
      <Text style={styles.text}>john.doe@example.com</Text>
      <Text style={styles.text}>+1 (123) 456-7890</Text>
    </View>

    <View style={styles.content}>
      <View>
        <Text style={styles.subtitle}>Education</Text>
        <Text style={styles.text}>Bachelor of Science in Computer Science</Text>
        <Text style={styles.text}>University of Example, 2018 - 2022</Text>
      </View>

      <View>
        <Text style={styles.subtitle}>Experience</Text>
        <Text style={styles.text}>Software Engineer at Example Corp</Text>
        <Text style={styles.text}>June 2022 - Present</Text>
        <Text style={styles.text}>• Developed and maintained web applications.</Text>
      </View>

      <View>
        <Text style={styles.subtitle}>Skills</Text>
        <Text style={styles.text}>• JavaScript</Text>
        <Text style={styles.text}>• React</Text>
        <Text style={styles.text}>• Node.js</Text>
      </View>
    </View>
  </Page>
);

const ResumeWithSidebarApp: React.FC = () => (
  <Document title="Resume">
    <ResumeWithSidebar />
  </Document>
);
export default ResumeWithSidebarApp;
