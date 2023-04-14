import React from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Preview } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { TableStyles } from './CourseAllocationsTable';

const columns = [
  {   
      field: '_id', 
      headerName: '_ID', 
      hide:true
  },
  {
      field: 'name',
      headerName: 'Name',
      width: 180,
  },
  {
      field: 'groups',
      headerName: 'Groups',
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

var rows = [];
var courseInfo = {};

export default function ListOfCourseLecturerTable() {
  const params = useParams();
  const data = JSON.parse(localStorage.getItem('courseAllocation'));

  if (data) {
    const {allocation, otherCourseInfo} = data;
    courseInfo = otherCourseInfo;
    if (otherCourseInfo.code === params.courseCode) {
      allocation.lecturers.forEach(element => {
        element.id = element._id;
      });
      rows = allocation.lecturers;
    } else {
      rows = [];
    }
  } else {
    rows = [];
  }

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
  const navigate = useNavigate();

  return (
    <Box>
      <Tooltip title='View / Edit'>
        <IconButton onClick={() => {  
          localStorage.setItem('lectureDetails', JSON.stringify({lecturer: params.row, otherCourseInfo: courseInfo }));
          window.location.reload();
          }}>
          <Preview />
        </IconButton>
      </Tooltip>
    </Box>
  )
}