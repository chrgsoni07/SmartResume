import React, { useState } from 'react';
import { Button, Card, CardContent, CardMedia, Dialog, DialogContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Document, Font, Page, PageProps, StyleSheet, View } from '@react-pdf/renderer';
import { useLocation } from 'react-router-dom';

import ResumeTemplate2 from '../renderer/ResumeTemplate2';
import ResumeTemplateTest from '../renderer/ResumeTemplate3';
import { Resume } from '../resume/Resume';
import { fetchData } from '../service/api';

// StyledCard to position the button over the image
const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  minHeight: '280px',
  width: 320,
  '& .button': {
    position: 'absolute',
    bottom: theme.spacing(1),
    right: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontSize: '0.75rem', // Smaller font size
    padding: theme.spacing(0.5, 1), // Smaller padding
    borderRadius: theme.shape.borderRadius,
  },
}));

interface TemplateCardProps {
  id: string;
  image: string;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ id, image }) => {
  const [resumeData, setResumeData] = useState<Resume>(new Resume());
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const location = useLocation();

  const handleSelect = async () => {
    console.log('show the resume in template format ', id);
    console.log('data ', location.state.id);
    if (location.state.id != null || undefined) {
      const receivedResumeData = await fetchData(id);
      setResumeData(receivedResumeData);
    }
  };

  return (
    <>
      <Card>
        <CardMedia
          component="img"
          height="280"
          image={image}
          alt="Template Thumbnail"
          onClick={handleClickOpen}
          sx={{ objectFit: 'cover' }}
        />
        <Button className="button" variant="contained" onClick={handleSelect}>
          Select
        </Button>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <img src={image} alt="Template Full" style={{ width: '100%' }} />
        </DialogContent>
      </Dialog>

      <Document
        author="Chirag Soni"
        keywords="resume, milpitas communications"
        subject="The resume of Chirag Soni"
        title="Resume"
      >
        {<ResumeTemplate2 resume={resumeData} />}
        {<ResumeTemplateTest resume={resumeData} />}
      </Document>
    </>
  );
};

export default TemplateCard;
