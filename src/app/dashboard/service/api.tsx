const BASE_URL = 'http://localhost:8080/mongo/';

export const fetchData = async (id: string): Promise<any> => {
  const fetchDataURL = BASE_URL + 'resume/' + id;
  const response = await fetch(fetchDataURL);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const saveData = async (data: any): Promise<any> => {
  const saveDataURL = BASE_URL + 'uid112233';
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
  return response.json();
};
