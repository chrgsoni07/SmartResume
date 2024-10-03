'use client';

import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import { Toaster } from 'react-hot-toast';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import FileUpload from '../resume/FileUpload';
import TemplateSelectionPage from './TemplateSelectionPage';

export default function Page(): React.JSX.Element {
  return (
    <div>
      <Stack>
        <Toaster />
        <Stack spacing={3}>
          <Router>
            <Routes>
              <Route path="/dashboard/template" element={<TemplateSelectionPage />} />
              <Route path="/dashboard/resume" element={<FileUpload />} />
            </Routes>
          </Router>
        </Stack>
      </Stack>
    </div>
  );
}
