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
      field: 'name',
      headerName: 'Name',
      width: 250,
  },
  {
      field: 'code',
      headerName: 'Code',
      width: 130,
  },{
      field: 'credits',
      headerName: 'Credits',
      width: 70,
  },
  {
      field: 'department',
      headerName: 'Department',
      width: 200,
  },{
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      width: 70,
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

const CoursesTable = ({data}) => {
  rows = data;
  
  return (
    <Box sx={{height: 350, width:'100%'}}>
      <DataGrid 
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        experimentalFeatures={{newEditingApi: true}}
        components={{Toolbar: CustomToolbar}}
      />
    </Box>
      
  );
}

export default CoursesTable;

// Table actions
const TableActions = ({params}) => {
  const navigate = useNavigate();

  return (
    <Box>
      <Tooltip title='View / Edit'>
        <IconButton onClick={() => {  
          navigate(`../course/${params.id}`);
          }}>
          <Preview />
        </IconButton>
      </Tooltip>
    </Box>
  )
}