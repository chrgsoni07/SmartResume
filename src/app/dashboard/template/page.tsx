'use client';

import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import TemplateDetailsPage from './TemplateDetailsPage'; // Assume you have this page
import TemplateSelectionPage from './TemplateSelectionPage';

export default function Page(): React.JSX.Element {
  return (
    <div>
      <Stack>
        <Stack spacing={3}>
          <Router>
            <Routes>
              <Route path="/dashboard/template" element={<TemplateSelectionPage />} />
              <Route path="dashboard/template/:id" element={<TemplateDetailsPage />} />
            </Routes>
          </Router>
        </Stack>
      </Stack>
    </div>
  );
}
