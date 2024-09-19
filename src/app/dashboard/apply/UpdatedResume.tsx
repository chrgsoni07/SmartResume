import React, { FC, useEffect, useState } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
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

  const handleSelect = async (row: Resume) => {
    const jobDetail = location.state.jobDetail;

    console.log('Selected Row', row);

    const newResume = await getBoostedResume(jobDetail, row.id);

    setUpdatedResume(newResume);
  };

  useEffect(() => {
    console.log('value for new page', location.state.jobDetail);

    const fetchAllSavedResumeOfUser = async () => {
      const resumes = await getAllResumeByUserId();
      setAllResume(resumes);
    };

    fetchAllSavedResumeOfUser();
  }, []);

  return (
    <>
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography variant="h6" align="center">
                    Select a Resume
                  </Typography>
                </TableCell>
              </TableRow>
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
      </div>
      {updatedResume && <EditablePreview resumeData={updatedResume} setResumeData={setUpdatedResume} />}
    </>
  );
};

export default UpdatedResume;
