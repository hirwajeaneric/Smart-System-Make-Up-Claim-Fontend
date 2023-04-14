import React, { useContext } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Preview } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const columns = [
  {   
      field: '_id', 
      headerName: '_ID', 
      hide:true
  },
  {
      field: 'academicYear',
      headerName: 'Academic Year',
      width: 180,
  },
  {
      field: 'semester',
      headerName: 'Semester',
      width: 180,
  },{
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      width: 180,
      renderCell: (params) => <TableActions params= {params} />
  },
]

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export const TableStyles = {
  padding: '15px',
  width: '100%',
  height: '350px'
}

var rows = [];
var course = {};

export default function CourseAllocationsTable({data}) {
  course = data;

  data.allocations.forEach(element => {
    element.id = element._id;
  });

  rows = data.allocations;
  
  return (
    <Box sx={TableStyles}>
      <DataGrid
        rowHeight={38}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        experimentalFeatures={{newEditingApi: true}}
        // components={{Toolbar: CustomToolbar}}
      />
    </Box>
      
  );
};

// Table actions
const TableActions = ({params}) => {
  return (
    <Box>
      <Tooltip title='View / Edit'>
        <IconButton onClick={() => {  
          localStorage.setItem('courseAllocation', JSON.stringify({allocation: params.row, otherCourseInfo: course}));
          window.location.reload();
          }}>
          <Preview />
        </IconButton>
      </Tooltip>
    </Box>
  )
}