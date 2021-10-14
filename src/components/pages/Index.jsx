import React, { Component } from 'react';
import {
  Grid,
  IconButton,
  TextField,
  FormControlLabel,
  Checkbox,
  LinearProgress,
} from '@mui/material';
import Appbar from '../Appbar';
import Content from '../partials/Content';
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridOverlay,
} from '@mui/x-data-grid';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import 'date-fns';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import moment from 'moment';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import TableComponent from '../partials/TableComponent';
const columns = [
  {
    field: 'idPasseio',
    headerName: 'ID',
    type: 'number',
    minWidth: 100,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'nomePasseio',
    headerName: 'Passeio',
    editable: true,
    minWidth: 250,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'dataPasseio',
    headerName: 'Data',
    type: 'date',
    editable: true,
    minWidth: 160,
    flex: 1,
    // valueFormatter: (params) => moment(params.dataPasseio).format('MM/DD/yyyy'),
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'quitado',
    headerName: 'Reservados',
    type: 'number',
    minWidth: 100,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'interessado',
    headerName: 'Interessados',
    type: 'number',
    minWidth: 100,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'parceiro',
    headerName: 'Parceiros',
    type: 'number',
    minWidth: 100,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'crianca',
    headerName: 'Crianças',
    type: 'number',
    minWidth: 100,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'lotacao',
    headerName: 'Meta de vendas',
    type: 'number',
    minWidth: 100,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'disponivel',
    headerName: 'Vagas disponíveis',
    type: 'number',
    minWidth: 100,
    valueGetter: (params) =>
      params.row.lotacao - params.row.quitado + params.row.confirmado,
    headerAlign: 'center',
    align: 'center',
  },
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
      showCloseds: false,
      row: [],
      isLoading: false,
      tableConfig: {},
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  handlePrint = () => {
    const doc = new jsPDF();
    doc.text('RELATÓRIO GERENCIAL DE VENDAS', 20, 10);
    const a = this.state.row.map((column) => Object.values(column));
    doc.autoTable({
      columns: [...col],

      body: [...a],
    });

    doc.save('table.pdf');
  };

  fetchData = async () => {
    // const { startDate, endDate, showCloseds } = this.state;
    const startDate = '2020-01-01';
    const endDate = '2030-01-01';
    const showCloseds = true;
    const data = new FormData();
    data.append('id', 70);
    try {
      this.setState({ isLoading: true });
      const answer = await axios({
        method: 'GET',
        url: `http://localhost/Projetos/SistemaFabio-2.0/api/pagamento.php?inicio=${moment(
          startDate
        ).format('yyyy-MM-DD')}&fim=${moment(endDate).format(
          'yyyy-MM-DD'
        )}&exibirEncerrados=${showCloseds}`,
      });
      const {
        data: { passeios },
      } = answer;

      this.setState({
        row: passeios,
        isLoading: false,
      });
    } catch (err) {
      console.error(err);
    }
  };
  handleDateChange = (event) => {
    const { target } = event;
    this.setState({ [target.id]: moment(target.value).format() }, () => {
      const { startDate, endDate } = this.state;
      if (!moment(startDate).isValid() || !moment(endDate).isValid()) {
        return 0;
      }
      this.fetchData();
    });
  };
  handleChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [target.id]: value,
    });
    this.fetchData();
  };
  CustomToolbar = () => {
    return (
      <GridToolbarContainer xs={{ marginBottom: 100 }}>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        <IconButton
          size="large"
          edge="start"
          color="primary"
          aria-label="menu"
          onClick={() => this.handlePrint('appBarOpened', true)}
        >
          <LocalPrintshopIcon />
        </IconButton>
      </GridToolbarContainer>
    );
  };
  CustomLoadingOverlay = () => {
    return (
      <GridOverlay>
        <div style={{ position: 'absolute', top: 0, width: '100%' }}>
          <LinearProgress />
        </div>
      </GridOverlay>
    );
  };
  render() {
    const { isLoading, row } = this.state;
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
                <Grid container justifyContent="space-around">
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        onClick={this.handleChange}
                        id="showCloseds"
                      />
                    }
                    label="Exibir Encerrados"
                  />
                </Grid>
                <TableComponent
                  columns={columns}
                  row={row}
                  id="idPasseio"
                  isLoading={isLoading}
                  CustomToolbar={this.CustomToolbar}
                  CustomLoadingOverlay={this.CustomLoadingOverlay}
                />
              </Grid>
            </Grid>
          </Grid>
        </Content>
      </>
    );
  }
}
