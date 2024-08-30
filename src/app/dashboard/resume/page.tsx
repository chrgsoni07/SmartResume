'use client';

import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { Toaster } from 'react-hot-toast';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import TemplateSelectionPage from '../template/TemplateSelectionPage';
//import { useState } from "react";

import FileUpload from './FileUpload';

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <Toaster />
      {/* <Typography variant="body1" gutterBottom>
        Upload your existing resume to receive tailored suggestions for improving your chances of getting noticed by
        Applicant Tracking Systems (ATS) and other benefits. Our ChatGPT-powered tool analyzes your resume and provides
        actionable insights to enhance its effectiveness, helping you stand out in the job market.
      </Typography> */}
      <Stack direction="row" spacing={3}>
        <Router>
          <Routes>
            <Route path="/dashboard/resume" element={<FileUpload />} />
            <Route path="/dashboard/template" element={<TemplateSelectionPage />} />
          </Routes>
        </Router>
      </Stack>

      <Stack direction="row" spacing={3}>
        {/*<ResumeShow></ResumeShow> <ResumePDF></ResumePDF>*/}
      </Stack>
    </Stack>
  );
}

// export default function Page2(): JSX.Element {
//   const [isClient, setIsClient] = useState(false);
//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   return isClient ? <Page2 /> : <p>loading</p>;
//   //return <p>loading link</p>;
// }
