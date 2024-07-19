import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
//import { useState } from "react";
import { config } from '@/config';
import FileUpload from './FileUpload';

export const metadata = { title: `Resume | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
//  const [state, setState] = useState("");

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        {/* start here*/}
        <FileUpload></FileUpload>
        {/* end here*/}
      </Stack>
    </Stack>
  );
}
