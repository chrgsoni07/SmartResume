import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { DataGrid, type GridRenderCellParams } from '@mui/x-data-grid';

import { type Resume } from '../resume/Resume';
import { getAllResume } from '../service/api';

const ShowAllResume = ({ onRowSelect }) => {
  const [allResume, setAllResume] = React.useState<Resume[]>([]);

  const [selectedRow, setSelectedRow] = useState<Resume | null>(null);

  // const [selectedRow, setSelectedRow] = useState<Resume>(new Resume());

  const handleButtonClick = (singleResume: Resume) => {
    setSelectedRow(singleResume);
    //  console.log('Selected row data:', singleReume);
    // Call the parent callback function with the selected row data
    if (onRowSelect) {
      onRowSelect(singleResume);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', minWidth: 90, flex: 1 },
    { field: 'name', headerName: 'Name', minWidth: 150, flex: 1 },
    { field: 'jobTitle', headerName: 'Job Title', minWidth: 150, flex: 1 },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params: GridRenderCellParams<Resume>) => (
        <Button variant="contained" onClick={() => handleButtonClick(params.row)}>
          Get Data
        </Button>
      ),
    },
  ];

  async function handleFatchData(): Promise<void> {
    const fatchedPromise = getAllResume();
    console.log('fetchedData => ', fatchedPromise);
    setAllResume(await fatchedPromise);
  }

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Box sx={{ mb: 2 }}>
        <Button variant="contained" color="primary" onClick={() => handleFatchData()}>
          All Resume
        </Button>
      </Box>
      <DataGrid rows={allResume} columns={columns} autoHeight />
      {/* {selectedRow && (
          <div style={{ marginTop: '20px' }}>
            <h3>Selected Row Data:</h3>
           <pre>{JSON.stringify(selectedRow, null, 2)}</pre>
          </div>
        )} */}
    </Box>
  );
};

export default ShowAllResume;
