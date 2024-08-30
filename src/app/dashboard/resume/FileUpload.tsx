// FileUpload.tsx
'use client';

import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Popover,
  styled,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { MuiChipsInput } from 'mui-chips-input';
import { useNavigate } from 'react-router-dom';

import { saveData } from '../service/api';
import { Resume, Suggestion } from './Resume';

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [resumeData, setResumeData] = useState<Resume>(new Resume());
  const [suggestionArray, setSuggestionArray] = useState<Suggestion[]>([]);
  const [hoveredSuggestion, setHoveredSuggestion] = useState<Suggestion | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();

  const handleResponsibilityHover = (originalText: string, event: React.MouseEvent<HTMLTextAreaElement>) => {
    const suggestion = suggestionArray.find((suggestion) => suggestion.originalText === originalText) || null;
    setHoveredSuggestion(suggestion);
    setAnchorEl(event.currentTarget);
  };

  const handleApplySuggestion = () => {
    if (hoveredSuggestion && resumeData?.workExperience) {
      const { originalText, suggestedText } = hoveredSuggestion;
      const updatedExperience = resumeData.workExperience.map((exp) => ({
        ...exp,
        responsibilities: exp.responsibilities.map((resp) => (resp === originalText ? suggestedText : resp)),
      }));
      setResumeData({ ...resumeData, workExperience: updatedExperience });
      setHoveredSuggestion(null);
      setAnchorEl(null);
    }
  };

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
      setSuggestionArray(response.data.suggestions);

      if (response.data.success) {
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form data to be submit', resumeData);
    const result = await saveData(resumeData);

    navigate('/dashboard/template', { state: { id: result.id } });
  };

  const handelWorkExperienceChange = (
    index: number,
    field: string,
    value: string,
    type: 'education' | 'workExperience'
  ) => {
    const updatedArray = [...resumeData[type]];
    updatedArray[index] = { ...updatedArray[index], [field]: value };
    setResumeData({ ...resumeData, [type]: updatedArray });
  };

  const handelWorkExOnResponsiblity = (newValue: string, expIndex: number, respIndex: number) => {
    const copyWorkExperience = [...resumeData.workExperience];
    copyWorkExperience[expIndex].responsibilities[respIndex] = newValue;
    setResumeData({ ...resumeData, workExperience: copyWorkExperience });
  };

  const handelWorkExOnAchievements = (newValue: string, expIndex: number, achIndex: number) => {
    const copyWorkExperience = [...resumeData.workExperience];
    copyWorkExperience[expIndex].achievements[achIndex] = newValue;
    setResumeData({ ...resumeData, workExperience: copyWorkExperience });
  };

  const handelSkillChange = (e: any) => {
    setResumeData({ ...resumeData, skillsList: e });
  };

  function removeResponsibility(expIndex: number, respIndex: number): void {
    const filteredRespon = resumeData.workExperience[expIndex].responsibilities.filter((_, i) => i !== respIndex);
    const updateResumeData = { ...resumeData };
    updateResumeData.workExperience[expIndex].responsibilities = filteredRespon;
    setResumeData(updateResumeData);
  }

  function addResponsibility(expIndex: number): void {
    handelWorkExOnResponsiblity('', expIndex, resumeData.workExperience[expIndex].responsibilities.length);
  }

  function addAchievements(expIndex: number): void {
    handelWorkExOnAchievements('', expIndex, resumeData.workExperience[expIndex].achievements.length);
  }

  function removeAchivements(index: number, achIndex: number): void {
    const filterdAch = resumeData.workExperience[index].achievements.filter((_, i) => i !== achIndex);
    const updateResumeData = { ...resumeData };
    updateResumeData.workExperience[index].achievements = filterdAch;
    setResumeData(updateResumeData);
  }

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
        {/* start here */}
        {resumeData.name != null ? (
          <Grid item xs={12}>
            <Typography style={{ color: '#635BFF' }} variant="subtitle1" gutterBottom>
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

            {resumeData.skillsList == undefined ? (
              <div className="section">
                <MuiChipsInput
                  value={resumeData.skillsList}
                  onChange={handelSkillChange}
                  label="Skills"
                  margin="normal"
                />
              </div>
            ) : (
              <div className="section">
                {Object.entries(resumeData.skillsCategory).map(([category, skillList], index, array) => (
                  <MuiChipsInput value={skillList} onChange={handelSkillChange} label={category} margin="normal" />
                ))}
              </div>
            )}

            <div className="section">
              <Typography style={{ color: '#635BFF' }} variant="subtitle1" gutterBottom>
                Education
              </Typography>
              {resumeData.education.map((edu, index) => (
                <div key={index}>
                  <TextField
                    id={`degree${index + 1}`}
                    label={`Degree`}
                    value={edu.degree}
                    InputLabelProps={{ shrink: true }}
                    margin="normal"
                    onChange={(e) => handelWorkExperienceChange(index, 'degree', e.target.value, 'education')}
                  />
                  <TextField
                    id={`university${index + 1}`}
                    label={`University`}
                    value={edu.university}
                    InputLabelProps={{ shrink: true }}
                    margin="normal"
                    onChange={(e) => handelWorkExperienceChange(index, 'university', e.target.value, 'education')}
                  />
                  <TextField
                    id={`duration${index + 1}`}
                    label={`Duration`}
                    value={edu.duration}
                    InputLabelProps={{ shrink: true }}
                    margin="normal"
                    onChange={(e) => handelWorkExperienceChange(index, 'duration', e.target.value, 'education')}
                  />
                  <TextField
                    id={`location${index + 1}`}
                    label={`Location`}
                    value={edu.location}
                    InputLabelProps={{ shrink: true }}
                    margin="normal"
                    onChange={(e) => handelWorkExperienceChange(index, 'location', e.target.value, 'education')}
                  />
                </div>
              ))}
            </div>

            <div className="section">
              <Typography style={{ color: '#635BFF' }} variant="subtitle1" gutterBottom>
                Work Experience
              </Typography>
              {resumeData.workExperience.map((exp, index) => (
                <div key={index} className="experience">
                  <Divider>
                    <Chip label={`${exp.company} | ${exp.jobPosition}`} size="small" />
                  </Divider>

                  <TextField
                    id={`jobPosition${index + 1}`}
                    label="Job Position"
                    value={exp.jobPosition}
                    InputLabelProps={{ shrink: true }}
                    margin="normal"
                    onChange={(e) => handelWorkExperienceChange(index, 'jobPosition', e.target.value, 'workExperience')}
                  />
                  <TextField
                    id={`company${index + 1}`}
                    label="Company"
                    value={exp.company}
                    InputLabelProps={{ shrink: true }}
                    margin="normal"
                    onChange={(e) => handelWorkExperienceChange(index, 'company', e.target.value, 'workExperience')}
                  />

                  <TextField
                    id={`location${index + 1}`}
                    label="Location"
                    value={exp.location}
                    InputLabelProps={{ shrink: true }}
                    margin="normal"
                    onChange={(e) => handelWorkExperienceChange(index, 'location', e.target.value, 'workExperience')}
                  />

                  <TextField
                    id={`duration${index + 1}`}
                    label="Duration"
                    value={exp.duration}
                    InputLabelProps={{ shrink: true }}
                    margin="normal"
                    onChange={(e) => handelWorkExperienceChange(index, 'duration', e.target.value, 'workExperience')}
                  />
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography style={{ color: '#635BFF' }} variant="subtitle1" gutterBottom>
                      Responsiblities
                    </Typography>
                    <IconButton onClick={() => addResponsibility(index)} aria-label="add" color="primary">
                      +
                    </IconButton>
                  </div>
                  {exp.responsibilities.map((resp, respIndex) => (
                    <div key={respIndex} style={{ display: 'flex', alignContent: 'center' }}>
                      <StyledTextareaAutosize
                        value={resp}
                        onChange={(e) => handelWorkExOnResponsiblity(e.target.value, index, respIndex)}
                        onMouseEnter={(e) => handleResponsibilityHover(resp, e)}
                        customColor={isMatchingSuggestion(resp) ? 'orange' : ''}
                      />
                      <IconButton onClick={() => removeResponsibility(index, respIndex)} aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
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

                  {exp.achievements && exp.achievements.length > 0 && (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography style={{ color: '#635BFF' }} variant="subtitle1" gutterBottom>
                          Achievements
                        </Typography>
                        <IconButton onClick={() => addAchievements(index)} aria-label="add" color="primary">
                          +
                        </IconButton>
                      </div>
                      {exp.achievements.map((ach, achIndex) => (
                        <div key={achIndex} style={{ display: 'flex', alignContent: 'center' }}>
                          <StyledTextareaAutosize value={ach} />
                          <IconButton onClick={() => removeAchivements(index, achIndex)} aria-label="delete">
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Grid>
        ) : (
          <div></div>
        )}
        {/* end here */}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Save
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
  width: 97%;
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
