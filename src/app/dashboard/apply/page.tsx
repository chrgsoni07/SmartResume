'use client';

import { type FC } from 'react';
import Stack from '@mui/material/Stack';
import { Toaster } from 'react-hot-toast';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import JobForm from './JobForm';

const Page: FC = () => {
  return (
    <Stack spacing={3}>
      <Toaster />
      <Stack direction="row" spacing={3}>
        <JobForm />
      </Stack>
    </Stack>
  );
};

export default Page;
