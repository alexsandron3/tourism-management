import React, { Component } from 'react';
import { Grid, TextField } from '@mui/material';
import Appbar from '../Appbar';
import Content from '../partials/Content';
import { DataGrid, ptBR } from '@mui/x-data-grid';
import 'date-fns';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
//
import moment from 'moment';
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
      startDate: moment(new Date()).format('yyyy/MM/DD'),
      endDate: null,
    };
  }
  handleDateChange = (event, orientation) => {
    const { target } = event;
    // console.log(moment(target).format('DD/MM/YYYY'));
    this.setState({
      [orientation]: moment(target.value).format('DD/MM/YYYY'),
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
              <Grid container justifyContent="space-around" p={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TextField
                    id="inicio"
                    label="Início"
                    type="date"
                    sx={{ width: 220 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(value) =>
                      this.handleDateChange(value, 'startDate')
                    }
                  />
                  <TextField
                    id="fim"
                    label="fim"
                    type="date"
                    sx={{ width: 220 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(value) =>
                      this.handleDateChange(value, 'endDate')
                    }
                  />
                </LocalizationProvider>
              </Grid>
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
