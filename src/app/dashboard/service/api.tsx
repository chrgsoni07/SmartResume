import axios from 'axios';

import { type JobDetail } from '../apply/JobDetail';
import { Resume } from '../resume/Resume';

const BASE_URL_API_GATEWAY = 'http://localhost:8443';

// Create a base API client with common configuration
const createApiClient = (baseURL: string) => {
  const apiClient = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
  });

  // Add Authorization token for all requests
  apiClient.interceptors.request.use((config) => {
    const token = getJWTToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

  return apiClient;
};

// Reusable function to retrieve JWT token
const getJWTToken = () => {
  const tokenString = localStorage.getItem('custom-auth-token');
  return tokenString ? JSON.parse(tokenString)?.authToken || null : null;
};

// API clients for different services
const apiClientResume = createApiClient(`${BASE_URL_API_GATEWAY}/api/0.1/resume/`);
const apiClientJob = createApiClient(`${BASE_URL_API_GATEWAY}/api/0.1/job/`);
const apiClientFile = createApiClient(`${BASE_URL_API_GATEWAY}/api/0.1/files/`);

// Authentication API endpoints
export const Authentication_API = {
  login: `${BASE_URL_API_GATEWAY}/login`,
  signUp: `${BASE_URL_API_GATEWAY}/signup`,
  refreshToken: `${BASE_URL_API_GATEWAY}/refresh`,
  logout: `${BASE_URL_API_GATEWAY}/logout`,
  guestAuthentication: `${BASE_URL_API_GATEWAY}/authenticate/guest`,
  confirmEmail: `${BASE_URL_API_GATEWAY}/api/0.1/authentication/confirm-email`,
};

// Generalized error handler
const handleApiError = (error: any) => {
  if (error.response?.status === 401) {
    alert('Session expired. Please login again.');
  } else {
    alert(`An error occurred: ${error.response?.data?.message || error.message}`);
  }
  throw error;
};

// Resume-related API calls
export const getResumeById = async (id: string) => {
  try {
    const response = await apiClientResume.get(id);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getAllResumeOfUser = async () => {
  try {
    const response = await apiClientResume.get('all');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateResumeByResumeId = async (id: string) => {
  try {
    const response = await apiClientResume.put(id);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteResumeByResumeId = async (id: string) => {
  try {
    const response = await apiClientResume.delete(id);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const assessResumeFit = async ({ jobDetail, resumeId }: { jobDetail: JobDetail; resumeId: string }) => {
  try {
    const response = await apiClientResume.post(`/assess-fit/${resumeId}`, jobDetail);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Job-related API calls
export const getJobDetailsFromURL = async (url: string) => {
  try {
    const response = await apiClientJob.get(`details?url=${url}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// File-related API calls
export const extractDataFromFile = async (formData: FormData) => {
  try {
    const response = await apiClientFile.post('extract', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Save or update a resume
export const saveResume = async (data: Resume) => {
  try {
    const response = await apiClientResume.post('', data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Save job-specific resume
export const saveJobSpecificResume = async (data: Resume) => {
  try {
    const response = await apiClientResume.post('job-specific', data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
