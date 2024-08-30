// TemplateSelectionPage.tsx
import React, { useState } from 'react';
import { Button, Card, CardMedia, Container, Dialog, DialogContent, Grid } from '@mui/material';
import { Document, Font, Page, PDFViewer, StyleSheet, Text, View } from '@react-pdf/renderer';
import { useLocation, useNavigate } from 'react-router-dom';

import ResumeTemplate1 from '../renderer/ResumeTempate1';
import ResumeTemplate2 from '../renderer/ResumeTemplate2';
import ResumeTemplate3 from '../renderer/ResumeTemplate3';
import { Resume } from '../resume/Resume';
import { fetchData } from '../service/api';

const templates = [
  { id: 1, image: '/assets/template1.jpg' },
  { id: 2, image: '/assets/template2.jpg' },
  { id: 3, image: '/assets/template3.jpg' },
];

// Ensure Lato font is loaded for consistency
Font.register({
  family: 'Lato',
  src: `https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.ttf`,
});

const TemplateSelectionPage: React.FC = () => {
  const [resumeData, setResumeData] = useState<Resume>(new Resume());
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const location = useLocation();
  const [templateType, setTemplateType] = useState(1);
  const navigate = useNavigate();

  const handleSelect = async (templateId: number) => {
    console.log('show the resume in template format ', templateId);

    if (location.state != null && location.state.id != null) {
      if (resumeData == null || resumeData.id == null) {
        await updateResumeState();
      }
      setTemplateType(templateId);
    } else {
      navigate('/dashboard/resume');
    }
  };

  async function updateResumeState() {
    const receivedResumeData = await fetchData(location.state.id);
    console.log('Data from db ', receivedResumeData);
    setResumeData(receivedResumeData);
  }

  const handleClickOpen = (image: string) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage('');
  };

  return (
    <Container>
      <Grid container spacing={3}>
        {templates.map((template) => (
          <Grid item xs={12} sm={6} md={4} key={template.id}>
            <Card>
              <CardMedia
                component="img"
                height="280"
                image={template.image}
                alt="Template Thumbnail"
                onClick={() => handleClickOpen(template.image)}
                sx={{ objectFit: 'cover' }}
              />
              <Button className="button" variant="contained" onClick={() => handleSelect(template.id)}>
                Select
              </Button>
            </Card>

            <Dialog open={open} onClose={handleClose}>
              <DialogContent>
                <img src={selectedImage} alt="Template Full" style={{ width: '100%' }} />
              </DialogContent>
            </Dialog>
          </Grid>
        ))}
      </Grid>

      <TemplateRenderer resumeData={resumeData} templateType={templateType} />
    </Container>
  );
};

interface TemplateRendererProps {
  resumeData: Resume;
  templateType: number;
}

const TemplateRenderer: React.FC<TemplateRendererProps> = ({ resumeData, templateType }) => {
  if (!resumeData) {
    return <div>Loading...</div>;
  }

  const renderTemplate = () => {
    switch (templateType) {
      case 1:
        return <ResumeTemplate1 udata={resumeData} orientation="portrait" />;
      case 2:
        return <ResumeTemplate2 resume={resumeData} />;
      case 3:
        return <ResumeTemplate3 resume={resumeData} />;
      default:
        return <div>Template not found</div>;
    }
  };

  return (
    <PDFViewer width="100%" height="600">
      <Document
        author="Chirag Soni"
        keywords="resume, milpitas communications"
        subject="The resume of Chirag Soni"
        title="Resume"
      >
        {renderTemplate()}
      </Document>
    </PDFViewer>
  );
};

export default TemplateSelectionPage;
