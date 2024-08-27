// TemplateDetailsPage.tsx
import React from 'react';
import { Button, Card, CardContent, CardMedia, Container, Typography } from '@mui/material';
import { Document, Font, Page, PageProps, StyleSheet, View } from '@react-pdf/renderer';
import { useParams } from 'react-router-dom';

import ResumeTemplate2 from '../renderer/ResumeTemplate2';
import ResumeTemplateTest from '../renderer/ResumeTemplateTest';
import { Resume } from '../resume/Resume';
import { fetchData } from '../service/api';

const TemplateDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [resumeData, setResumeData] = React.useState<Resume>(new Resume());

  async function handelFatchData(): Promise<void> {
    const fatchedPromise = fetchData('66ae2394ffb9b0287bdd5809');
    console.log('fetchedData => ', fatchedPromise);
    setResumeData(await fatchedPromise);
  }
  // Use a type guard to safely access the template details
  return (
    // <Container>
    //   <Button variant="contained" color="primary" onClick={() => window.history.back()}>
    //     Back to Selection
    //   </Button>
    //   <p>selected template {id}</p>
    // </Container>

    <Document
      author="Chirag Soni"
      keywords="resume, milpitas communications"
      subject="The resume of Chirag Soni"
      title="Resume"
    >
      if(id ==1 ) {<ResumeTemplate2 resume={resumeData} />}
      else {<ResumeTemplateTest resume={resumeData} />}
    </Document>
  );
};

export default TemplateDetailsPage;
