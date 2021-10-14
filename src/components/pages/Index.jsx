import React, { Component } from 'react';
import Appbar from '../Appbar';
import Content from '../partials/Content';
import TableComponent from '../partials/TableComponent';
import DateRange from '../partials/DateRange';
import { Grid } from '@mui/material';
import 'date-fns';
import moment from 'moment';
import axios from 'axios';
import 'jspdf-autotable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      isRangeDateValid: false,
      tableConfig: {},
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    // this.notify();
    const { startDate, endDate, showCloseds, isRangeDateValid } = this.state;
    // const startDate = '2020-01-01';
    // const endDate = '2030-01-01';
    // const showCloseds = true;
    // const isRangeDateValid = true;
    // const data = new FormData();
    // data.append('id', 70);

    if (isRangeDateValid === false) return 0;
    console.log('opa');
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
      console.log(answer);
    } catch (err) {
      toast.error('Houve um problema ao buscar informações, tente novamente!', {
        pauseOnFocusLoss: false,
      });
      this.setState({
        isLoading: false,
      });
      // console.error(err);
    }
  };

  handleDateChange = ({ target }) => {
    this.setState({ [target.id]: moment(target.value).format() }, () => {
      const { startDate, endDate } = this.state;
      let isDateValid;
      if (moment(startDate).isValid() && moment(endDate).isValid()) {
        isDateValid = true;
      } else {
        isDateValid = false;
      }
      this.setState({ isRangeDateValid: isDateValid }, () => this.fetchData());
    });
  };
  handleChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [target.id]: value,
    });
    this.fetchData();
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
                <DateRange
                  handleChange={this.handleChange}
                  handleDateChange={this.handleDateChange}
                />
                <TableComponent
                  columns={columns}
                  row={row}
                  id="idPasseio"
                  isLoading={isLoading}
                  CustomToolbar={this.CustomToolbar}
                  CustomLoadingOverlay={this.CustomLoadingOverlay}
                  col={col}
                />
              </Grid>
            </Grid>
            <ToastContainer pauseOnFocusLoss />
          </Grid>
        </Content>
      </>
    );
  }
}
