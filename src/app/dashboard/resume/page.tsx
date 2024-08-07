'use client';

import { useEffect, useState } from 'react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Toaster } from 'react-hot-toast';

//import { useState } from "react";
import { config } from '@/config';

import App from '../renderer';
import FileUpload from './FileUpload';
import ResumePDF from './ResumePDF';
import ResumeShow from './ResumeShow';
import ResumeTemplate from './ResumeTemplate';

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <Toaster />
      <Stack direction="row" spacing={3}>
        <FileUpload></FileUpload>
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
