'use client';

import React, { useState } from 'react';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

import App from '.';
import { Resume } from '../resume/Resume';
import ResumeTemplate from '../resume/ResumeTemplate';
import { fetchData } from '../service/api';
import BasicResumeApp from './BasicResume';
import CustomResumeApp from './CustomResume';
import ResumeTemplateGPT from './ResumeTemplateGPT';
import ResumeTemplateGPT2 from './ResumeTemplateGPT2';
import ResumeWithSidebarApp from './ResumeWithSidebar';
import ShowAllResume from './ShowAllResume';
import RRApp from './test/Calling';
import ResumePDF from './test/ReactPDF';

export default function Page(): React.JSX.Element {
  const [resumeData, setResumeData] = React.useState<Resume>(new Resume());
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
      <Stack>
        <Stack spacing={3}>
          <ShowAllResume onRowSelect={handleRowSelection} />
        </Stack>

        <PDFViewer width="100%" height="600">
          {<App resumeData={resumeData} />}
        </PDFViewer>
      </Stack>
    </div>
  );
}
