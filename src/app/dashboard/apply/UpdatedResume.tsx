import React, { useState, type FC, type FormEvent } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

import EditablePreview from '../resume/EditablePreview';
import { type Resume } from '../resume/Resume';
import { ResumeFit } from '../resume/ResumeFit';
import { assessResumeFit, getSavedResumeByUserId } from '../service/api';

const UpdatedResume: FC = () => {
  const [updatedResume, setUpdatedResume] = useState<Resume>();
  const [resumeFit, setResumeFit] = useState<ResumeFit>();
  const [openAccordion, setOpenAccordion] = useState(0);

  const {
    isLoading,
    error,
    data: allResume,
  } = useQuery({ queryKey: ['getSavedResume'], queryFn: () => getSavedResumeByUserId(), refetchOnWindowFocus: false });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const location = useLocation();

  const handleAccordionChange = (accordionIndex: number) => {
    setOpenAccordion(openAccordion === accordionIndex ? -1 : accordionIndex);
  };

  const openSecondAccordion = () => {
    setOpenAccordion(1);
    setOpenAccordion(2);
  };

  const handleSelect = async (row: Resume) => {
    const jobDetail = location.state.jobDetail;

    toast.success('Resume got selected please wait');

    const responseDTO = await assessResumeFit({ jobDetail, resumeId: row.id });

    console.log('Response DTO', responseDTO);

    setUpdatedResume(responseDTO.resume);
    setResumeFit(responseDTO.resumeFit);

    openSecondAccordion();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('handleSubmit method for apply for new job ', updatedResume);
  };

  const accordionStyle = {
    bgcolor: 'rgba(0, 0, 0, 0.1)',
    boxShadow: 3,
    marginBottom: 2,
  };

  return (
    <>
      <Accordion expanded={openAccordion === 0} onChange={() => handleAccordionChange(0)} sx={accordionStyle}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
          <Typography>Select a Resume</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Job Title</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allResume.map((resume: Resume) => (
                  <TableRow key={resume.id}>
                    <TableCell>{resume.id}</TableCell>
                    <TableCell>{resume.jobTitle}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" onClick={() => handleSelect(resume)}>
                        Select
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={openAccordion === 2} onChange={() => handleAccordionChange(2)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3bh-content" id="panel3bh-header" sx={accordionStyle}>
          <Typography>Fit</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField label="ATS Score" variant="outlined" InputLabelProps={{ shrink: true }} fullWidth value={resumeFit?.ats_score} />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Domain Relevance"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={resumeFit?.domainRelevance}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Feedback"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                fullWidth
                multiline
                rows={3}
                value={resumeFit?.feedback}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={openAccordion === 1} onChange={() => handleAccordionChange(1)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header" sx={accordionStyle}>
          <Typography>Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleSubmit}>
            {updatedResume && <EditablePreview resumeData={updatedResume} setResumeData={setUpdatedResume} />}
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </form>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default UpdatedResume;
