// src/components/DataComponent.tsx
{
  /*
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { fetchData, saveData } from '../service/api';

const DataComponent: React.FC = () => {
  const queryClient = useQueryClient();

  // Fetch data
  const { data, error, isLoading } = useQuery('data', fetchData);

  // Mutation to save data
  const mutation = useMutation(saveData, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('data');
    },
  });

  const [inputData, setInputData] = useState<any>({});

  const handleSave = () => {
    mutation.mutate(inputData);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div>
      <h1>Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>

      <h2>Save Data</h2>
      <textarea
        value={JSON.stringify(inputData, null, 2)}
        onChange={(e) => setInputData(JSON.parse(e.target.value))}
        rows={10}
        cols={50}
      />
      <button onClick={handleSave} disabled={mutation.isLoading}>
        {mutation.isLoading ? 'Saving...' : 'Save Data'}
      </button>
      {mutation.isError && <div>An error occurred: 'Error aayi'</div>}
      {mutation.isSuccess && <div>Data saved successfully!</div>}
    </div>
  );
};

export default DataComponent;
*/
}
