'use client';

import Stack from '@mui/material/Stack';
import { PDFViewer } from '@react-pdf/renderer';

import App from '.';
import BasicResumeApp from './BasicResume';
import CustomResumeApp from './CustomResume';
import ResumeWithSidebarApp from './ResumeWithSidebar';

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <PDFViewer width="100%" height="600">
        <App />
      </PDFViewer>
    </Stack>
  );
}
