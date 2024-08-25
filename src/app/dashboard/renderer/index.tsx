// src/Resume.tsx
import React from 'react';
import { Document, Font, Page, PageProps, StyleSheet, View } from '@react-pdf/renderer';

import { Resume } from '../resume/Resume';
import CareerObjective from './CareerObjective';
import Education from './Education';
import Experience from './Experience';
import Header from './Header';
import ResumeTemplate2 from './ResumeTemplate2';
import ResumeTemplateTest from './ResumeTemplateTest';
import Skills from './Skills';

// Define the styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    '@media max-width: 400': {
      flexDirection: 'column',
    },
  },
  image: {
    marginBottom: 10,
  },
  leftColumn: {
    flexDirection: 'column',
    width: 170,
    paddingTop: 10,
    paddingRight: 15,
    '@media max-width: 400': {
      width: '100%',
      paddingRight: 0,
    },
    '@media orientation: landscape': {
      width: 200,
    },
  },
  footer: {
    fontSize: 12,
    fontFamily: 'Lato Bold',
    textAlign: 'center',
    marginTop: 15,
    paddingTop: 5,
    borderWidth: 3,
    borderColor: 'gray',
    borderStyle: 'dashed',
    '@media orientation: landscape': {
      marginTop: 10,
    },
  },
});

// Register fonts
Font.register({
  family: 'Open Sans',
  src: `https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf`,
});

Font.register({
  family: 'Lato',
  src: `https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.ttf`,
});

Font.register({
  family: 'Lato Italic',
  src: `https://fonts.gstatic.com/s/lato/v16/S6u8w4BMUTPHjxsAXC-v.ttf`,
});

Font.register({
  family: 'Lato Bold',
  src: `https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwiPHA.ttf`,
});

// Define the props type for Resume
interface ResumeProps extends Omit<PageProps, 'size'> {
  size?: PageProps['size'];
  orientation?: 'portrait' | 'landscape';
  udata?: Resume;
}

// Resume component
const ResumePDF: React.FC<ResumeProps> = (props) => (
  <Page {...props} style={styles.page}>
    <Header
      uname={props.udata?.name as string}
      jobTitle={props.udata?.jobTitle as string}
      email={props.udata?.email as string}
      phoneNo={props.udata?.phone as string}
    />
    <CareerObjective careerObjective={props.udata?.careerObjective} />
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <Education education={props.udata?.education} />
        <Skills skills={props.udata?.skills} />
      </View>
      <Experience workExperience={props.udata?.workExperience} />
    </View>
  </Page>
);

// App component
function App({ resumeData }: { resumeData: Resume }) {
  return (
    <Document
      author="Chirag Soni"
      keywords="resume, milpitas communications"
      subject="The resume of Chirag Soni"
      title="Resume"
    >
      {/*  <ResumePDF size="A4" />
      <ResumePDF orientation="landscape" size="A4" />
      <ResumePDF size={[380, 1250]} />*/}
      <ResumePDF size="A4" udata={resumeData} />
      <ResumeTemplate2 resume={resumeData} />
      <ResumeTemplateTest resume={resumeData} />
    </Document>
  );
}
export default App;
