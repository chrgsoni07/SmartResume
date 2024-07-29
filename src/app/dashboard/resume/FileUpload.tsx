// FileUpload.tsx
'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  makeStyles,
  Popover,
  styled,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { MuiChipsInput } from 'mui-chips-input';

import { Resume, Suggestion, WorkExperience } from './Resume';

interface FileUploadProps {
  // onUploadSuccess: (fileName: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [resumeData, setResumeData] = useState<Resume>(new Resume());

  const [updatedWorkExperience, setUpdatedWorkExperience] = useState<WorkExperience[]>(resumeData.workExperience);
  const [suggestionArray, setSuggestionArray] = useState<Suggestion[]>(resumeData.suggestion);
  const [hoveredSuggestion, setHoveredSuggestion] = useState<Suggestion | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleResponsibilityHover = (originalText: string, event: React.MouseEvent<HTMLTextAreaElement>) => {
    const suggestion = suggestionArray.find((suggestion) => suggestion.originalText === originalText) || null;
    setHoveredSuggestion(suggestion);
    setAnchorEl(event.currentTarget);
  };

  const handleWorkExperienceChange = (newValue: string, expIndex: number, respIndex: number) => {
    const updatedExperience = [...updatedWorkExperience];
    updatedExperience[expIndex].responsibilities[respIndex] = newValue;
    setUpdatedWorkExperience(updatedExperience);
  };

  const handleApplySuggestion = () => {
    if (hoveredSuggestion) {
      const { originalText, suggestedText } = hoveredSuggestion;
      const updatedExperience = updatedWorkExperience.map((exp) => ({
        ...exp,
        responsibilities: exp.responsibilities.map((resp) => (resp === originalText ? suggestedText : resp)),
      }));
      setUpdatedWorkExperience(updatedExperience);
      setHoveredSuggestion(null);
      setAnchorEl(null);
    }
  };

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
      setSuggestionArray(response.data.suggestions);
      setUpdatedWorkExperience(response.data.workExperience);

      if (response.data.success) {
        console.log('file uploded succssfully');
        console.log(response.data);
      }
    } catch (error) {
      console.error('Error uploading file: ', error);
    } finally {
      setIsUploading(false);
    }
  };

  const isMatchingSuggestion = (responsibility: string) => {
    const matchedSuggestion = suggestionArray.find((suggestion) => suggestion.originalText === responsibility);
    return matchedSuggestion;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic
    console.log('workexperience previous', updatedWorkExperience);

    setResumeData({ ...resumeData, workExperience: updatedWorkExperience });
    //  const newResumeData =  Object.assign({},resumeData, {WorkExperience : updatedWorkExperience});
    // setResumeData(newResumeData);

    console.log('Form data to be submit', resumeData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setResumeData({ ...resumeData, [field]: e.target.value });
  };

  const handleArrayChange = (index: number, field: string, value: string, type: 'education' | 'workExperience') => {
    const updatedArray = [...resumeData[type]];
    updatedArray[index] = { ...updatedArray[index], [field]: value };
    setResumeData({ ...resumeData, [type]: updatedArray });
  };

  const handelSkillChange = (e: any) => {
    setResumeData({ ...resumeData, skills: e });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8}>
          <input id="file-upload" type="file" onChange={handleFileChange} style={{ display: 'none' }} />
          <label htmlFor="file-upload">
            <Button variant="contained" component="span" color="primary" sx={{ textTransform: 'none' }}>
              Select File
            </Button>
          </label>
          {selectedFile && (
            <Typography variant="body1" component="span" sx={{ marginLeft: 2 }}>
              {selectedFile.name}
            </Typography>
          )}
        </Grid>
        <Grid item xs={4}>
          <Box display="flex" alignItems="center" justifyContent="flex-end">
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
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Details
          </Typography>
          <div className="section">
            <TextField
              id="name"
              label="Name"
              value={resumeData.name}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setResumeData({ ...resumeData, name: e.target.value })}
              margin="normal"
            />

            <TextField
              id="email"
              label="Email"
              value={resumeData.email}
              InputLabelProps={{ shrink: true }}
              type="email"
              onChange={(e) => setResumeData({ ...resumeData, email: e.target.value })}
              margin="normal"
            />

            <TextField
              id="phone"
              label="Phone"
              value={resumeData.phone}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setResumeData({ ...resumeData, phone: e.target.value })}
              margin="normal"
            />

            <TextField
              id="location"
              label="Location/Place"
              value={resumeData.location}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setResumeData({ ...resumeData, location: e.target.value })}
              margin="normal"
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
              onChange={(e) => setResumeData({ ...resumeData, careerObjective: e.target.value })}
              margin="normal"
            />
          </div>

          <div className="section">
            <MuiChipsInput value={resumeData.skills} onChange={handelSkillChange} label="Skills" margin="normal" />
          </div>

          <div className="section">
            <Typography variant="subtitle1" gutterBottom>
              Education
            </Typography>
            {resumeData.education.map((edu, index) => (
              <div key={index}>
                <TextField
                  id={`degree#${index + 1}`}
                  label={`Degree`}
                  value={edu.degree}
                  InputLabelProps={{ shrink: true }}
                  margin="normal"
                />
                <TextField
                  id={`university#${index + 1}`}
                  label={`University`}
                  value={edu.university}
                  InputLabelProps={{ shrink: true }}
                  margin="normal"
                />
                <TextField
                  id={`duration#${index + 1}`}
                  label={`Duration`}
                  value={edu.duration}
                  InputLabelProps={{ shrink: true }}
                  margin="normal"
                />
                <TextField
                  id={`location${index + 1}`}
                  label={`location`}
                  value={edu.location}
                  InputLabelProps={{ shrink: true }}
                  margin="normal"
                />
              </div>
            ))}
          </div>

          <div className="section">
            <Typography variant="subtitle1" gutterBottom>
              Work Experience
            </Typography>
            {updatedWorkExperience.map((exp, index) => (
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
                <Typography variant="subtitle1" gutterBottom>
                  Responsiblities
                </Typography>
                {exp.responsibilities.map((resp, respIndex) => (
                  <div key={respIndex}>
                    <StyledTextareaAutosize
                      value={resp}
                      onChange={(e) => handleWorkExperienceChange(e.target.value, index, respIndex)}
                      onMouseEnter={(e) => handleResponsibilityHover(resp, e)}
                      customColor={isMatchingSuggestion(resp) ? 'orange' : ''}
                    />
                  </div>
                ))}

                <Popover
                  open={!!hoveredSuggestion}
                  anchorEl={anchorEl}
                  onClose={() => setHoveredSuggestion(null)}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  <PopoverContent onClick={handleApplySuggestion}>
                    <Typography variant="caption" display="block" gutterBottom>
                      {hoveredSuggestion?.suggestedText}
                    </Typography>
                  </PopoverContent>
                </Popover>

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
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const StyledTextareaAutosize2 = styled(TextareaAutosize)({
  width: '100%',
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  marginBottom: '2px',
  fontFamily:
    "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'",
  fontWeight: '400',
  fontSize: '1rem',
  lineHeight: '1.4375em',
  color: 'green',
});

const StyledTextareaAutosize = styled(TextareaAutosize)<{ customColor?: string }>`
  color: ${(props) => props.customColor};
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 2px;
  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Helvetica,
    Arial,
    sans-serif,
    'Apple Color Emoji',
    'Segoe UI Emoji';
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.4375em;
`;

const PopoverContent = styled('div')({
  padding: '8px',
});

export default FileUpload;
