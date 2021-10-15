import React, { Component } from 'react';
import Content from '../../partials/Content';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import TableComponent from '../../partials/TableComponent';
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
    field: 'nomeCliente',
    headerName: 'Nome',
    editable: true,
    minWidth: 250,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'idade',
    headerName: 'idade',
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
    field: 'Telefone',
    headerName: 'Telefone',
    minWidth: 200,
    editable: true,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'email',
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
  {
    field: 'acao',
    headerName: 'Meta de vendas',
    type: 'number',
    minWidth: 100,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
];
const row = [
  {
    idCliente: 1,
    nomeCliente: 1,
    idade: 1,
    referencia: 1,
    Telefone: 1,
    email: 1,
    redeSocial: 1,
    acao: 1,
  },
  {
    idCliente: 2,
    nomeCliente: 1,
    idade: 1,
    referencia: 1,
    Telefone: 1,
    email: 1,
    redeSocial: 1,
    acao: 1,
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
class Cliente extends Component {
  constructor() {
    super();
    this.state = {
      pesquisarCliente: '',
    };
  }
  fetchUser = async () => {};
  handleChange = ({ target }) => {
    this.setState({ pesquisarCliente: target.value });
    this.fetchUser();
  };
  render() {
    const { pesquisarCliente } = this.state;
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
        <TableComponent columns={columns} row={row} id="idCliente" col={col} />
      </Content>
    );
  }
}

export default Cliente;
