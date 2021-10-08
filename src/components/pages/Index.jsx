import React, { Component } from 'react';
import { Grid, TextField } from '@mui/material';
import Appbar from '../Appbar';
import Content from '../partials/Content';
import { DataGrid, ptBR } from '@mui/x-data-grid';
import 'date-fns';
import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
//
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue(params.id, 'firstName') || ''} ${
        params.getValue(params.id, 'lastName') || ''
      }`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];
//
export default class Index extends Component {
  constructor() {
    super();
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
    };
  }
  handleDateChange = (date, orientation) => {
    console.log(date);
    this.setState({
      [orientation]: date,
    });
  };
  render() {
    return (
      <>
        <Appbar />
        <Content cardTitle="Relatório Gerencial de Vendas">
          <Grid container>
            <Grid
              item
              xs={12}
              alignContent="center"
              justifyContent="center"
              alignItems="center"
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Basic example"
                  value={this.startDate}
                  onChange={(newValue) => {
                    this.handleDateChange(newValue, 'startDate');
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                  localeText={ptBR.props.MuiDataGrid.localeText}
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                  disableSelectionOnClick
                />
              </div>
            </Grid>
          </Grid>
        </Content>
      </>
    );
  }
}
