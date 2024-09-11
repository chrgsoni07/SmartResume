import React, { useState } from 'react';
import {
  Button,
  Chip,
  Container,
  Divider,
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

import EditablePreview from '../resume/EditablePreview';
import { type Resume } from '../resume/Resume';
import { fetchJobURL, getAllResumeByUserId, getBoostedResume } from '../service/api';
import { type JobDetail } from './JobDetail';

interface RowData {
  id: number;
  jobTitle: string;
  date: Date;
}

const JobForm = () => {
  const [jobDetail, setJobDetail] = useState<JobDetail>({ jobDescription: '', jobTitle: '', jobUrl: '' });
  const [updatedResume, setUpdatedResume] = useState<Resume>();

  const [errors, setErrors] = useState({
    jobTitle: '',
    jobDescription: '',
  });

  const [allResume, setAllResume] = useState<Resume[]>([]);

  const handleSelect = async (row: Resume) => {
    console.log('Selected Row', row);

    const newResume = await getBoostedResume(jobDetail, row.id);

    setUpdatedResume(newResume);
  };

  const handleRedirect = () => {};

  const handleFetch = async () => {
    try {
      const jobDetailResponse = await fetchJobURL(jobDetail.jobUrl);

      console.log('job details comming from backend  ', jobDetailResponse);

      // Assuming the response contains JSON with 'title' and 'description'
      setJobDetail({ ...jobDetail, jobTitle: jobDetailResponse.jobTitle, jobDescription: jobDetailResponse.jobDescription });
    } catch (error) {
      console.error('Error fetching job details:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let hasErrors = false;
    const newErrors = {
      jobTitle: '',
      jobDescription: '',
    };

    if (!jobDetail.jobTitle.trim()) {
      newErrors.jobTitle = 'Job Title is required';
      hasErrors = true;
    }

    if (!jobDetail.jobDescription.trim()) {
      newErrors.jobDescription = 'Job Description is required';
      hasErrors = true;
    }

    setErrors(newErrors);

    if (hasErrors) return;

    let allResume = await getAllResumeByUserId();
    console.log(allResume);
    setAllResume(allResume);
  };

  return (
    <Container>
      <Typography variant="h4">Job Form</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Job Link"
          variant="outlined"
          fullWidth
          margin="normal"
          value={jobDetail.jobUrl}
          onChange={(e) => setJobDetail((prevJobDetail) => ({ ...prevJobDetail, jobUrl: e.target.value }))}
        />
        <Button variant="contained" color="primary" onClick={() => handleFetch()}>
          Fetch Job Details
        </Button>

        <Divider>
          <Chip label="or" size="medium" />
        </Divider>

        <TextField
          label="Job Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={jobDetail.jobTitle}
          onChange={(e) => setJobDetail({ ...jobDetail, jobTitle: e.target.value })}
          error={!!errors.jobTitle}
          helperText={errors.jobTitle}
        />
        <TextField
          label="Job Description"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={10}
          value={jobDetail.jobDescription}
          onChange={(e) => setJobDetail({ ...jobDetail, jobDescription: e.target.value })}
          helperText={errors.jobDescription}
          error={!!errors.jobDescription}
        />

        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
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

      {updatedResume && <EditablePreview resumeData={updatedResume} setResumeData={setUpdatedResume} />}
    </Container>
  );
};

export default JobForm;
