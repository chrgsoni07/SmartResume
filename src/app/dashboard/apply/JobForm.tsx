import React, { useState } from 'react';
import { Button, Chip, Container, Divider, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { getJobDetailsFromURL } from '../service/api';
import { type JobDetail } from './JobDetail';

interface RowData {
  id: number;
  jobTitle: string;
  date: Date;
}

const JobForm = () => {
  const [jobDetail, setJobDetail] = useState<JobDetail>({ jobDescription: '', jobTitle: '', jobUrl: '' });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    jobTitle: '',
    jobDescription: '',
  });

  const handleFetch = async () => {
    const jobDetailResponse = await getJobDetailsFromURL(jobDetail.jobUrl);

    setJobDetail({ ...jobDetail, jobTitle: jobDetailResponse.jobTitle, jobDescription: jobDetailResponse.jobDescription });
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

    navigate('/dashboard/apply/update-resume', { state: { jobDetail: jobDetail } });
  };

  return (
    <Container>
      <Typography variant="h4">Provide job title and description</Typography>
      <form onSubmit={handleSubmit}>
        {/* <TextField
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
        </Divider> */}

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
    </Container>
  );
};

export default JobForm;
