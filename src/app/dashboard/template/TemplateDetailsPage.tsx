// TemplateDetailsPage.tsx
import React from 'react';
import { Button, Card, CardContent, CardMedia, Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

// Define the TemplateDetails type
interface TemplateDetails {
  image: string;
  description: string;
}

// Simulated data
const templates: Record<string, TemplateDetails> = {
  '1': {
    image: 'src/app/dashboard/template/templateImg/template1.jpg',
    description: 'This is a detailed description of Template 1.',
  },
  '2': {
    image: 'template/templateImg/template2.jpg',
    description: 'This is a detailed description of Template 2.',
  },
  // Add more templates as needed
};

const TemplateDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Use a type guard to safely access the template details
  const templateDetails = id && templates[id] ? templates[id] : { image: '', description: 'No details available' };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Template Details
      </Typography>
      <Card>
        <CardMedia component="img" height="300" image={templateDetails.image} alt="Template Full" />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Description
          </Typography>
          <Typography variant="body1" paragraph>
            {templateDetails.description}
          </Typography>
          <Button variant="contained" color="primary" onClick={() => window.history.back()}>
            Back to Selection
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default TemplateDetailsPage;
