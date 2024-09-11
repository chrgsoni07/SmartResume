import axios from 'axios';
import toast from 'react-hot-toast';

import { type JobDetail } from '../apply/JobDetail';
import { type Resume } from '../resume/Resume';

const BASE_URL = 'http://localhost:8080/api/0.1';
const BASE_URL_RESUME = `${BASE_URL}/resume`;
const BASE_URL_JOB_DETAIL = `${BASE_URL}/job`;
const BASE_URL_FILE = `${BASE_URL}/files`;

const USER_ID = 'uid112233';

export const fetchData = async (id: string): Promise<Resume> => {
  const fetchDataURL = `${BASE_URL_RESUME}/${id}`;
  const response = await fetch(fetchDataURL);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json() as Promise<Resume>;
};

export const fetchJobURL = async (url: string): Promise<JobDetail> => {
  // Construct the URL with query parameters
  const fetchDataURL = new URL(`${BASE_URL_JOB_DETAIL}/details`);
  fetchDataURL.searchParams.append('url', url);

  try {
    const response = await fetch(fetchDataURL.toString(), {
      method: 'GET',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Network response was not ok: ${errorText}`);
    }

    const data = await response.json();
    return data as JobDetail;
  } catch (error) {
    console.error('Failed to fetch job URL:', error);
    throw error; // Re-throw the error after logging it
  }
};

export const saveData = async (data?: Resume): Promise<Resume> => {
  const saveDataURL = `${BASE_URL_RESUME}/${USER_ID}`;
  try {
    const response = await fetch(saveDataURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = (await response.json()) as Resume;
    toast.success('Resume data saved successfully!');
    return result;
  } catch (error) {
    toast.error(`Error: ${(error as Error).message}`);
    throw error;
  }
};

export const getAllResume = async (): Promise<Resume[]> => {
  const fatchAllResume = `${BASE_URL_RESUME}/all`;
  const response = await fetch(fatchAllResume);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json() as Promise<Resume[]>;
};

export const getAllResumeByUserId = async (): Promise<Resume[]> => {
  const fatchAllResume = `${BASE_URL_RESUME}/user/${USER_ID}`;
  const response = await fetch(fatchAllResume);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json() as Promise<Resume[]>;
};

export const uploadFileToExtract = async (formData: FormData) => {
  return await axios.post(`${BASE_URL_FILE}/extract`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getBoostedResume = async (jobDetails: JobDetail, resumeId: string) => {
  const saveDataURL = `${BASE_URL_RESUME}/boost/${resumeId}`;
  try {
    const response = await fetch(saveDataURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobDetails),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = (await response.json()) as Resume;
    toast.success('Resume updated successfully!');
    return result;
  } catch (error) {
    toast.error(`Error: ${(error as Error).message}`);
    throw error;
  }
};
