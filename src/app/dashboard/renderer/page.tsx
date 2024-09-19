'use client';

import React, { FC, useState } from 'react';
import { PropTypes } from '@mui/material';
import Stack from '@mui/material/Stack';
import { PDFViewer } from '@react-pdf/renderer';

import App from '.';
import { Resume } from '../resume/Resume';
import { fetchData } from '../service/api';
import ShowAllResume from './ShowAllResume';

const Page: FC = () => {
  const [resumeData, setResumeData] = React.useState<Resume | undefined>();
  const [selectedRow, setSelectedRow] = useState<Resume | null>(null);

  async function handelFatchData(): Promise<void> {
    const fatchedPromise = fetchData('66ae2394ffb9b0287bdd5809');
    console.log('fetchedData => ', fatchedPromise);
    setResumeData(await fatchedPromise);
  }
  // Callback function to receive selected row data
  const handleRowSelection = (rowData: Resume) => {
    setResumeData(rowData);
    setSelectedRow(rowData);
    console.log('Received selected row in parent:', rowData);
  };

  return (
    <div>
      {/* <Button type="button" onClick={() => handelFatchData()}>
        Fatch Data
      </Button> 

  <RRApp />
      <PDFDownloadLink document={<ResumePDF />} fileName="resume.pdf">
        {({ loading }) => (loading ? 'Generating PDF...' : 'Download Resume')}
      </PDFDownloadLink> */}
      <Stack></Stack>
    </div>
  );
};

export default Page;
