// FileUpload.tsx
'use client';

import { useState } from 'react';
import { Box, Button, CircularProgress, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { saveData } from '../service/api';
import EditablePreview from './EditablePreview';
import { type Resume } from './Resume';

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isUploading, setIsUploading] = useState(false);
  const [resumeData, setResumeData] = useState<Resume>();

  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post('http://localhost:8080/api/0.1/resume/upload-resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResumeData(response.data);

      if (response.data.success) {
        console.log(response.data);
      }
    } catch (error) {
      console.error('Error uploading file: ', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form data to be submit', resumeData);
    const result = await saveData(resumeData);

    navigate('/dashboard/template', { state: { id: result.id } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} container alignItems="center">
          <input id="file-upload" type="file" onChange={handleFileChange} style={{ display: 'none' }} />
          <label htmlFor="file-upload">
            <TextField
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button variant="contained" component="span" color="primary">
                      Browse
                    </Button>
                  </Box>
                ),
              }}
              value={selectedFile ? selectedFile.name : ''}
              placeholder="No file selected"
              sx={{ marginRight: 2 }}
            />
          </label>

          <Button
            variant="contained"
            color="secondary"
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            startIcon={isUploading ? <CircularProgress size={24} color="inherit" /> : null}
            sx={{ textTransform: 'none' }}
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </Button>
        </Grid>

        {resumeData && <EditablePreview resumeData={resumeData} setResumeData={setResumeData} />}

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default FileUpload;
