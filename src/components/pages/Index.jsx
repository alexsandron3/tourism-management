import React, { Component } from 'react';
import { Button, Grid, IconButton, TextField } from '@mui/material';
import Appbar from '../Appbar';
import Content from '../partials/Content';
import {
  DataGrid,
  ptBR,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import 'date-fns';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import moment from 'moment';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
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
const col = [
  'ID',
  'Passeio',
  'Data',
  'Reservados',
  'Interessados',
  'Parceiros',
  'Crianças',
  'Meta de vendas',
];

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
  handleClick = () => {
    const doc = new jsPDF();
    doc.text('RELATÓRIO GERENCIAL DE VENDAS', 20, 10);

    // doc.autoTable({ html: '.opa' });
    const a = this.state.row.map((column) => Object.values(column));
    doc.autoTable({
      columns: [...col],

      body: [...a],
    });
    // const a = columns.map((column) => ({
    //   // ...column,
    //   dataKey: column.headerName,
    // }));
    console.log(a);
    doc.save('table.pdf');
  };
  CustomToolbar = () => {
    return (
      <GridToolbarContainer xs={{ marginBottom: 100 }}>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />

        <IconButton
          size="large"
          edge="start"
          color="primary"
          aria-label="menu"
          onClick={() => this.handleClick('appBarOpened', true)}
        >
          {/* <GridToolbarExport /> */}
          <LocalPrintshopIcon />
        </IconButton>
      </GridToolbarContainer>
    );
  };

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
      // const pagamentos = passeios[0].reduce(
      //   (acc, curr) => {
      //     const pagamentos = acc;
      //     if (curr.statusPagamento === 0) acc.interessados += 1;
      //     if (curr.statusPagamento === 1) acc.quitados += 1;
      //     if (curr.statusPagamento === 2) acc.confirmados += 1;
      //     if (curr.statusPagamento === 3) acc.parceiros += 1;
      //     if (curr.statusPagamento === 4) acc.criancas += 1;
      //     return pagamentos;
      //   },
      //   {
      //     interessados: 0,
      //     quitados: 0,
      //     confirmados: 0,
      //     parceiros: 0,
      //     criancas: 0,
      //   }
      // );
      // passeios[0].forEach((p) =>
      //   p.pagamentos.reduce(
      //     (acc, curr) => {
      //       const pagamentos = acc;
      //       if (curr.statusPagamento === 0) acc.interessados += 1;
      //       if (curr.statusPagamento === 1) acc.quitados += 1;
      //       if (curr.statusPagamento === 2) acc.confirmados += 1;
      //       if (curr.statusPagamento === 3) acc.parceiros += 1;
      //       if (curr.statusPagamento === 4) acc.criancas += 1;
      //       return pagamentos;
      //     },
      //     {
      //       interessados: 0,
      //       quitados: 0,
      //       confirmados: 0,
      //       parceiros: 0,
      //       criancas: 0,
      //     }
      //   )
      // );
      // const a = passeios[0].map((p) =>
      //   p.pagamentos.reduce(
      //     (acc, curr) => {
      //       const pagamentos = acc;
      //       if (curr.statusPagamento === 0) acc.interessados += 1;
      //       if (curr.statusPagamento === 1) acc.quitados += 1;
      //       if (curr.statusPagamento === 2) acc.confirmados += 1;
      //       if (curr.statusPagamento === 3) acc.parceiros += 1;
      //       if (curr.statusPagamento === 4) acc.criancas += 1;
      //       return pagamentos;
      //     },
      //     {
      //       interessados: 0,
      //       quitados: 0,
      //       confirmados: 0,
      //       parceiros: 0,
      //       criancas: 0,
      //     }
      //   )
      // );
      this.setState({
        row: passeios[0],
      });
      console.log(passeios[0]);

      // console.log(pagamentos);
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
              <div style={{ height: 700, width: '100%' }}>
                <DataGrid
                  components={{
                    Toolbar: this.CustomToolbar,
                  }}
                  className="opa"
                  localeText={ptBR.props.MuiDataGrid.localeText}
                  rows={this.state.row}
                  // onClick={console.log(this.state.row)}
                  getRowId={(row) => row.idPasseio}
                  columns={columns}
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
