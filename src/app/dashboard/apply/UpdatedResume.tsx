import React, { FC, useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useLocation } from 'react-router-dom';

import EditablePreview from '../resume/EditablePreview';
import { type Resume } from '../resume/Resume';
import { getAllResumeByUserId, getBoostedResume } from '../service/api';
import { JobDetail } from './JobDetail';

type PropTypes = {
  jobDetail: JobDetail;
};

const UpdatedResume: FC = () => {
  const [allResume, setAllResume] = useState<Resume[]>([]);
  const [updatedResume, setUpdatedResume] = useState<Resume>();
  const location = useLocation();

  const [openAccordion, setOpenAccordion] = useState(0); // 0 for first accordion, 1 for second

  const handleAccordionChange = (accordionIndex: number) => {
    setOpenAccordion(openAccordion === accordionIndex ? -1 : accordionIndex);
  };

  const openSecondAccordion = () => {
    setOpenAccordion(1);
  };

  const handleSelect = async (row: Resume) => {
    const jobDetail = location.state.jobDetail;

    console.log('Selected Row', row);

    const newResume = await getBoostedResume(jobDetail, row.id);

    setUpdatedResume(newResume);

    openSecondAccordion();
  };

  useEffect(() => {
    console.log('value for new page', location.state.jobDetail);

    const fetchAllSavedResumeOfUser = async () => {
      const resumes = await getAllResumeByUserId();
      setAllResume(resumes);
    };

    fetchAllSavedResumeOfUser();
  }, []);

  const accordionStyle = {
    bgcolor: 'rgba(0, 0, 0, 0.1)',
    boxShadow: 3,
    marginBottom: 2,
  };

  return (
    <>
      <div>
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
                  {allResume.map((resume) => (
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
      </div>
      <Accordion expanded={openAccordion === 1} onChange={() => handleAccordionChange(1)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header" sx={accordionStyle}>
          <Typography>Details</Typography>
        </AccordionSummary>
        <AccordionDetails>{updatedResume && <EditablePreview resumeData={updatedResume} setResumeData={setUpdatedResume} />}</AccordionDetails>
      </Accordion>
    </>
  );
};

export default UpdatedResume;
