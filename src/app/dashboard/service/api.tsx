import toast from 'react-hot-toast';

import { Resume } from '../resume/Resume';

const BASE_URL = 'http://localhost:8080/mongo/';

export const fetchData = async (id: string): Promise<any> => {
  const fetchDataURL = BASE_URL + 'resume/' + id;
  const response = await fetch(fetchDataURL);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const saveData = async (data?: Resume): Promise<Resume> => {
  const saveDataURL = BASE_URL + 'uid112233';
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
    const result = await response.json();
    toast.success('Resume data saved successfully!');
    return result;
  } catch (error) {
    toast.error(`Error: ${error}`);
    throw error;
  }
};

export const getAllResume = async (): Promise<any> => {
  const fatchAllResume = BASE_URL + 'all';
  const response = await fetch(fatchAllResume);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
