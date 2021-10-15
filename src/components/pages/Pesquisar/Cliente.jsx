import React, { Component } from 'react';
import Content from '../../partials/Content';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import TableComponent from '../../partials/TableComponent';
import axios from 'axios';
import { Button } from '@mui/material';
const columns = [
  {
    field: 'idCliente',
    headerName: 'ID',
    type: 'number',
    minWidth: 100,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'date',
    headerName: 'Year',
    renderCell: (params) => (
      <strong>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
        >
          Open
        </Button>
      </strong>
    ),
  },
  {
    field: 'nomeCliente',
    headerName: 'Nome',
    editable: true,
    minWidth: 250,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'idadeCliente',
    headerName: 'Idade',
    type: 'number',
    editable: true,
    minWidth: 110,
    flex: 1,
    // valueFormatter: (params) => moment(params.dataPasseio).format('MM/DD/yyyy'),
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'referencia',
    headerName: 'Referencia',
    minWidth: 250,
    editable: true,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'telefoneCliente',
    headerName: 'Telefone',
    minWidth: 200,
    editable: true,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'emailCliente',
    headerName: 'Email',
    minWidth: 150,
    editable: true,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'redeSocial',
    headerName: 'Rede Social',
    type: 'number',
    minWidth: 200,
    editable: true,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
];
const col = [
  'ID',
  'Nome',
  'Idade',
  'Referencia',
  'Telefone',
  'Email',
  'Rede Social',
];
class Cliente extends Component {
  constructor() {
    super();
    this.state = {
      pesquisarCliente: '',
      row: [],
      isLoading: false,
    };
  }
  componentDidMount() {
    this.fetchUser();
  }
  fetchUser = async () => {
    // const { pesquisarCliente } = this.state;
    const pesquisarCliente = '167.489';
    const {
      data: { usuario },
    } = await axios({
      method: 'GET',
      url: `http://localhost/Projetos/SistemaFabio-2.0/api/Cliente.php?pesquisarCliente=${pesquisarCliente}`,
    });
    this.setState({ row: usuario, isLoading: false });
    console.log(usuario);
  };
  handleChange = ({ target }) => {
    this.setState({ pesquisarCliente: target.value, isLoading: true }, () =>
      this.fetchUser()
    );
  };
  render() {
    const { pesquisarCliente, row, isLoading } = this.state;
    return (
      <Content cardTitle="Pesquisar Cliente">
        <Grid container>
          <Grid item xs={12} marginBottom={3}>
            <TextField
              id="pesquisarCliente"
              label="Nome/Cpf/Telefone/Referência"
              fullWidth
              value={pesquisarCliente}
              onChange={this.handleChange}
            />
          </Grid>
        </Grid>
        <TableComponent
          columns={columns}
          row={row}
          id="idCliente"
          col={col}
          isLoading={isLoading}
        />
      </Content>
    );
  }
}

export default Cliente;
