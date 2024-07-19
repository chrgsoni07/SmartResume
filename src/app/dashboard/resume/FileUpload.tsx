// FileUpload.tsx
'use client';

import { useState } from 'react';
import { Button, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';

import { Resume } from './Resume';

interface FileUploadProps {
  // onUploadSuccess: (fileName: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [resumeData, setResumeData] = useState<Resume>(new Resume());

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const joinString = (obj: string[]) => {
    return obj.join(' ,');
  };

  const joinStringNewLine = (lines: string[]) => {
    return lines.join('\n');
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

      //console.log(response.data);
      if (response.data.success) {
        //    onUploadSuccess(selectedFile.name);
        console.log('file uploded succssfully');
        console.log(response.data);
      }
    } catch (error) {
      console.error('Error uploading file: ', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={8}>
        <TextField
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <label htmlFor="file-upload"> 
          <Button variant="contained" component="span">
            Select File
          </Button>
        </label>
        {selectedFile && (
          <Typography variant="body1" component="span" style={{ marginLeft: '8px' }}>
            {selectedFile.name}
          </Typography>
        )}
      </Grid>
      <Grid item xs={4}>
        <Button variant="contained" color="primary" onClick={handleUpload} disabled={!selectedFile || isUploading}>
          {isUploading ? <CircularProgress size={24} /> : 'Upload'}
        </Button>
      </Grid>

      <Grid>
        <div>
          <h2>Details: </h2>
          <div className="section">
            <TextField id="name" label="Name" value={resumeData.name} InputLabelProps={{ shrink: true }} margin="normal" />

            <TextField id="email" label="Email" value={resumeData.email} InputLabelProps={{ shrink: true }} margin="normal" />

            <TextField id="phone" label="Phone" value={resumeData.phone} InputLabelProps={{ shrink: true }} margin="normal" />

            <TextField
              id="location"
              label="Location/Place"
              value={resumeData.location}
              InputLabelProps={{ shrink: true }} margin="normal" 
            />
          </div>

          <div className="section">
            <TextField
              id="careerObjective"
              label="Carrer Objective"
              value={resumeData.careerObjective}
              InputLabelProps={{ shrink: true }}
              multiline
              rows={4}
              fullWidth 
              margin="normal" 
            />
          </div>

          <div className="section">
            <TextField
              id="skill"
              label="Skills"
              value={joinString(resumeData.skills)}
              InputLabelProps={{ shrink: true }}
              fullWidth
              margin="normal" 
            />
          </div>

          <div className="section">
            <h3>Education:</h3>
            {resumeData.education.map((edu, index) => (
              <div key={index}>
                <TextField
                  id={`degree#${index + 1}`}
                  label={`Degree ${index + 1}`}
                  value={edu.degree}
                  InputLabelProps={{ shrink: true }}
                  margin="normal" 
                />
                <TextField
                  id={`university#${index + 1}`}
                  label={`university ${index + 1}`}
                  value={edu.university}
                  InputLabelProps={{ shrink: true }}
                  margin="normal" 
                />
                <TextField
                  id={`duration#${index + 1}`}
                  label={`duration ${index + 1}`}
                  value={edu.duration}
                  InputLabelProps={{ shrink: true }}
                  margin="normal" 
                />
                <TextField
                  id={`location${index + 1}`}
                  label={`location ${index + 1}`}
                  value={edu.location}
                  InputLabelProps={{ shrink: true }}
                  margin="normal" 
                />
              </div>
            ))}
          </div>

          <div className="section">
            <h3>Work Experience:</h3>
            {resumeData.workExperience.map((exp, index) => (
              <div key={index} className="experience">
                <TextField
                  id={`exp#${index + 1}`}
                  label="Job Position"
                  value={exp.jobPosition}
                  InputLabelProps={{ shrink: true }}
                  margin="normal" 
                />
                <TextField
                  id={`exp#${index + 1}`}
                  label="Company"
                  value={exp.company}
                  InputLabelProps={{ shrink: true }}
                  margin="normal" 
                />

                <TextField
                  id={`exp#${index + 1}`}
                  label="Location"
                  value={exp.location}
                  InputLabelProps={{ shrink: true }}
                  margin="normal" 
                />

                <TextField
                  id={`exp#${index + 1}`}
                  label="Duration"
                  value={exp.duration}
                  InputLabelProps={{ shrink: true }}
                  margin="normal" 
                />

                <TextField
                  id={`exp#${index + 1}`}
                  label="Responsibilities"
                  value={joinStringNewLine(exp.responsibilities)}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  multiline
                  rows={6}
                  margin="normal" 
                />

                <TextField
                  id={`exp#${index + 1}`}
                  label="Achievements"
                  value={joinStringNewLine(exp.achievements)}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"                  

                />
              </div>
            ))}
          </div>

          <div className="section">
            <h3>Suggestions:</h3>
            <TextField
              id="suggestions"
              label="Suggestions"
              value={joinStringNewLine(resumeData.suggestions.map(ogTxt => ogTxt.suggestedText))}
              InputLabelProps={{ shrink: true }}
              fullWidth
              multiline
              rows={4}
              margin="normal"    
            />
          </div>

        </div>
      </Grid>
    </Grid>
  );
};

export default FileUpload;
