import axios from 'axios';

import { type JobDetail } from '../apply/JobDetail';
import { Resume } from '../resume/Resume';

const BASE_URL = 'http://localhost:8443/api/0.1';
const BASE_URL_RESUME = `${BASE_URL}/resume`;
const BASE_URL_JOB_DETAIL = `${BASE_URL}/job`;
const BASE_URL_FILE = `${BASE_URL}/files`;
const BASE_URL_API_GATEWAY = 'http://localhost:8443';

const USER_ID = 'uid112233';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/0.1/resume',
  headers: {
    'Content-type': 'application/json',
  },
});

export const API_NEW = {
  login: `${BASE_URL_API_GATEWAY}/login`,
  signUp: `${BASE_URL_API_GATEWAY}/signup`,
  refreshToken: `${BASE_URL_API_GATEWAY}/refresh`,
  logout: `${BASE_URL_API_GATEWAY}/logout`,
  guestAuthentication: `${BASE_URL_API_GATEWAY}/authenticate/guest`,
  confirmEmail: `${BASE_URL_API_GATEWAY}/api/0.1/authentication/confirm-email`,
};

export const getResumeById = async (id: string, token: string) => {
  const fetchDataURL = `${BASE_URL_RESUME}/${id}`;

  const response = await axios.get(fetchDataURL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getSavedResumeByUserId = async () => {
  const fatchAllResume = `${BASE_URL_RESUME}/user/${USER_ID}`;

  const response = await axios.get(fatchAllResume);

  return response.data;
};

export const assessResumeFit = async ({ jobDetail, resumeId }: { jobDetail: JobDetail; resumeId: string }) => {
  const saveDataURL = `${BASE_URL_RESUME}/assess-fit/${resumeId}`;

  const response = await axios.post(saveDataURL, jobDetail, { headers: { 'Content-Type': 'application/json' } });

  return response.data;
};

export const getJobDetailsFromURL = async (url: string) => {
  const fetchDataURL = `${BASE_URL_JOB_DETAIL}/details?url=${url}`;

  const response = await axios.get(fetchDataURL);

  return response.data;
};

export const extractDataFromFile = async (formData: FormData) => {
  const extractDataURL = `${BASE_URL_RESUME}/extract`;
  const response = axios.post(extractDataURL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return (await response).data;
};

export const saveResume = async (data: Resume, token: string) => {
  const saveDataURL = `${BASE_URL_RESUME}/`; // Ensure this is the correct URL for your API
  // const saveDataURL = `http://localhost:8089/api/0.1/resume/`;
  try {
    // Make the POST request to the backend with the provided data and token in the headers
    const response = await axios.post(saveDataURL, data, {
      headers: {
        'Content-Type': 'application/json', // Ensure the content type is set correctly
        Authorization: `Bearer ${token}`, // Attach the Bearer token to the request header
      },
    });

    // Log the response from the backend for debugging
    console.log('Response from server:', response);

    // Return the data from the response, which should be the response body
    return response.data;
  } catch (error: any) {
    // Handle different types of errors (network errors, server errors, etc.)

    // Check if error.response exists, which means the request was made and the server responded
    if (error.response) {
      console.error('Error response:', error.response);

      // Handle Unauthorized (401) error, indicating invalid token or expired session
      if (error.response.status === 401) {
        console.error('Unauthorized request. Please login again.');
        alert('Session expired. Please login again.');
      } else {
        // Handle other server errors (e.g., 400, 500, etc.)
        console.error('Backend returned an error:', error.response.data);
        alert(`An error occurred: ${error.response.data.message || error.response.data}`);
      }
    }
    // Check if error.request exists, indicating the request was made but no response was received
    else if (error.request) {
      console.error('No response received:', error.request);
      alert('No response from server. Please check your internet connection or try again later.');
    }
    // Handle errors while setting up the request (e.g., wrong URL, bad request)
    else {
      console.error('Error setting up request:', error.message);
      alert('An unexpected error occurred. Please try again later.');
    }

    // Optionally, rethrow the error if you want to handle it further up the call stack
    throw error;
  }
};

export const saveJobSpecificResume = async (data: Resume) => {
  const saveDataURL = `${BASE_URL_RESUME}/job-specific/${USER_ID}`;

  const response = await axios.post(saveDataURL, data, { headers: { 'Content-Type': 'application/json' } });

  return response.data;
};
