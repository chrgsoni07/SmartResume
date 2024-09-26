'use client';

import { useState, type ChangeEvent, type FC, type FormEvent } from 'react';
import { Box, Button, CircularProgress, Grid, TextField } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { extractDataFromFile, getResumeById, saveResume } from '../service/api';
import EditablePreview from './EditablePreview';
import { type Resume } from './Resume';

const getPokemon = () => axios.get('https://pokeapi.co/api/v2/pokemon/ditto').then((response) => response.data);

const FileUpload: FC = () => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isUploading, setIsUploading] = useState(false);
  const [resumeData, setResumeData] = useState<Resume>();

  //const { data } = useQuery({ queryKey: ['pokemon'], queryFn: getPokemon });
  //const { isLoading, error, data } = useQuery({ queryKey: ['oneResume'], queryFn: () => getResumeById('66d88b0e4f923d777f2753e1') });
  const {
    data: responseData,
    mutate: postCall,
    error: postError,
  } = useMutation({
    mutationFn: (rData: FormData): Promise<Resume> => {
      return extractDataFromFile(rData);
    },
    onSuccess(data) {
      console.log('file upload', responseData);
      setResumeData(data);
    },
  });

  const navigate = useNavigate();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async (): Promise<void> => {
    if (!selectedFile) return;

    const formData = new FormData();

    formData.append('file', selectedFile);

    postCall(formData);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('Form data to be submit', resumeData);

    const result = await saveResume(resumeData);

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
