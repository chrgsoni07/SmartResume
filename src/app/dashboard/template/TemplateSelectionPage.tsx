// TemplateSelectionPage.tsx
import React from 'react';
import { Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import TemplateCard from './TemplateCard';

const templates = [
  { id: '1', image: '/assets/template1.jpg' },
  { id: '2', image: '/assets/template2.jpg' },
  { id: '3', image: '/assets/template3.jpg' },
];

const TemplateSelectionPage: React.FC = () => {
  return (
    <Container>
      <Grid container spacing={3}>
        {templates.map((template) => (
          <Grid item xs={12} sm={6} md={4} key={template.id}>
            <TemplateCard image={template.image} id={template.id}></TemplateCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TemplateSelectionPage;
