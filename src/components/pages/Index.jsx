import React, { Component } from 'react';
import { Grid, TextField } from '@mui/material';
import Appbar from '../Appbar';
import Content from '../partials/Content';
import { DataGrid, ptBR } from '@mui/x-data-grid';
import 'date-fns';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import moment from 'moment';
import axios from 'axios';
const columns = [
  {
    field: 'idPasseio',
    headerName: 'ID',
    type: 'number',
    minWidth: 100,
    flex: 1,
    headerAlign: 'center',
  },
  {
    field: 'nomePasseio',
    headerName: 'Passeio',
    editable: true,
    minWidth: 250,
    flex: 1,
    headerAlign: 'center',
  },
  {
    field: 'dataPasseio',
    headerName: 'Data',
    type: 'date',
    editable: true,
    minWidth: 110,
    flex: 1,
    headerAlign: 'center',
  },
  {
    field: 'reservados',
    headerName: 'Reservados',
    type: 'number',
    editable: true,
    minWidth: 150,
    flex: 1,
    headerAlign: 'center',
  },
  {
    field: 'Interessados',
    headerName: 'Interessados',
    type: 'number',
    editable: true,
    minWidth: 130,
    flex: 1,
    headerAlign: 'center',
  },
  {
    field: 'parceiros',
    headerName: 'Parceiros',
    type: 'number',
    editable: true,
    minWidth: 130,
    flex: 1,
    headerAlign: 'center',
  },
  {
    field: 'crianças',
    headerName: 'Crianças',
    type: 'number',
    editable: true,
    minWidth: 130,
    flex: 1,
    headerAlign: 'center',
  },
  {
    field: 'lotacao',
    headerName: 'Meta de vendas',
    type: 'number',
    editable: true,
    minWidth: 130,
    flex: 1,
    headerAlign: 'center',
  },
  // {
  //   field: 'interessados',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.getValue(params.id, 'firstName') || ''} ${
  //       params.getValue(params.id, 'lastName') || ''
  //     }`,
  // },
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
      startDate: null,
      endDate: null,
      row: [],
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    // const { startDate, endDate } = this.state;
    const startDate = '2020-01-01';
    const endDate = '2030-01-01';
    const data = new FormData();
    data.append('id', 70);
    try {
      // const answer = await axios({
      //   method: 'GET',
      //   url: `http://localhost/Projetos/SistemaFabio-2.0/api/passeio.php?inicio=${moment(
      //     startDate
      //   ).format('yyyy-MM-DD')}&fim=${moment(endDate).format('yyyy-MM-DD')}`,
      // });
      const answer = await axios({
        method: 'GET',
        url: `http://localhost/Projetos/SistemaFabio-2.0/api/passeio.php`,
      });
      const {
        data: { passeios },
      } = answer;
      // const payments = Object.entries(answer.data[0]);
      // console.log(typeof passeios.passeio);
      // console.log(passeios);

      this.setState({
        row: passeios[0],
      });
      // console.log(Object.entries(payments));
      // const payments = await Promise.all(
      //   passeios.map(async (passeio) => {
      //     // const arr = payments.filter((payment) => payment[0] == passeio.idPasseio);
      //     // return http://localhost/Projetos/SistemaFabio-2.0/api/pagamento.php?id=27
      //     const pp = await axios({
      //       method: 'GET',
      //       url: `http://localhost/Projetos/SistemaFabio-2.0/api/pagamento.php?id=${passeio.idPasseio}`,
      //     });
      //     return pp.data;
      //   })
      // );
      // payments.reduce((payment) => {
      //   const [status] = Object.keys(payment.data.pagamentos);
      // });
      // payments.map((payment) => {
      //   const status = Object.keys(payment.data.pagamentos);
      // });
      // console.log(...this.state.row);
      // console.log(payments[0].data.pagamentos);
      // console.log(passeios[0].idPasseio, payments[13]);
      // const newObj = Object.assign(
      //   {},
      //   ...this.state.row.map((item) => ({ [item.key]: item.value }))
      // );

      console.log(this.state.row);
    } catch (err) {
      console.error(err);
    }
  };
  handleDateChange = (event) => {
    const { target } = event;
    const { startDate, endDate } = this.state;

    this.setState((prev, _props) => {
      prev[target.id] = moment(target.value).format('DD/MM/YYYY');
      if (!moment(prev.startDate).isValid() || !moment(prev.endDate).isValid())
        return 0;
      // this.fetchData();
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
                    id="startDate"
                    label="Início"
                    type="date"
                    sx={{ width: 220, marginBottom: '20px' }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={this.handleDateChange}
                  />
                  <TextField
                    id="endDate"
                    label="fim"
                    type="date"
                    sx={{ width: 220, marginBottom: '20px' }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={this.handleDateChange}
                  />
                </LocalizationProvider>
              </Grid>
              <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                  localeText={ptBR.props.MuiDataGrid.localeText}
                  rows={this.state.row}
                  // onClick={console.log(this.state.row)}
                  getRowId={(row) => row.idPasseio}
                  columns={columns}
                  // pageSize={5}
                  // rowsPerPageOptions={[5]}
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
