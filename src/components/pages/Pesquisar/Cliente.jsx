import React, { Component } from 'react';
import Content from '../../partials/Content';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import TableComponent from '../../partials/TableComponent';
import axios from 'axios';
import { Button, IconButton, Step, Stepper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DescriptionIcon from '@mui/icons-material/Description';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StepLabel from '@mui/material/StepLabel';

// const columns = [
//   {
//     field: 'idCliente',
//     headerName: 'ID',
//     type: 'number',
//     minWidth: 100,
//     flex: 1,
//     headerAlign: 'center',
//     align: 'center',
//     hidden: true,
//   },
//   {
//     field: 'date',
//     headerName: 'Year',
//     renderCell: (params) => (
//       <strong>
//         <IconButton
//           id="menu-options"
//           aria-controls="menu-options"
//           aria-haspopup="true"
//           aria-expanded={this.state.open ? true : undefined}
//         >
//           <MoreVertIcon />
//         </IconButton>
//         {/* <Button
//           variant="contained"
//           color="primary"
//           size="small"
//           style={{ marginLeft: 16 }}
//         >
//           Open
//         </Button> */}
//       </strong>
//     ),
//   },
//   {
//     field: 'nomeCliente',
//     headerName: 'Nome',
//     editable: true,
//     minWidth: 250,
//     flex: 1,
//     headerAlign: 'center',
//     align: 'center',
//   },
//   {
//     field: 'idadeCliente',
//     headerName: 'Idade',
//     type: 'number',
//     editable: true,
//     minWidth: 110,
//     flex: 1,
//     // valueFormatter: (params) => moment(params.dataPasseio).format('MM/DD/yyyy'),
//     headerAlign: 'center',
//     align: 'center',
//   },
//   {
//     field: 'referencia',
//     headerName: 'Referencia',
//     minWidth: 250,
//     editable: true,
//     flex: 1,
//     headerAlign: 'center',
//     align: 'center',
//   },
//   {
//     field: 'telefoneCliente',
//     headerName: 'Telefone',
//     minWidth: 200,
//     editable: true,
//     flex: 1,
//     headerAlign: 'center',
//     align: 'center',
//   },
//   {
//     field: 'emailCliente',
//     headerName: 'Email',
//     minWidth: 150,
//     editable: true,
//     flex: 1,
//     headerAlign: 'center',
//     align: 'center',
//   },
//   {
//     field: 'redeSocial',
//     headerName: 'Rede Social',
//     type: 'number',
//     minWidth: 200,
//     editable: true,
//     flex: 1,
//     headerAlign: 'center',
//     align: 'center',
//   },
// ];
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
    const { pesquisarCliente } = this.state;
    this.setState({ isLoading: true });
    const {
      data: { cliente = [], success, message },
    } = await axios({
      method: 'GET',
      url: `https://fabiopasseios.com.br/ap/SistemaFabio-2.0/api/cliente.php?pesquisarCliente=${pesquisarCliente}`,
    });
    if (success) {
      toast.success(message, {
        pauseOnFocusLoss: false,
      });
    } else {
      toast.error(message, {
        pauseOnFocusLoss: false,
      });
    }
    try {
      this.setState({ row: cliente, isLoading: false });
    } catch (error) {
      console.error(error);
    }
  };
  handleChange = ({ target }) => {
    this.setState({ pesquisarCliente: target.value });
  };
  handleClick = (target) => {
    console.log(target.currentTarget);
  };
  render() {
    const { pesquisarCliente, row, isLoading } = this.state;
    const columns = [
      {
        field: 'idCliente',
        headerName: 'ID',
        type: 'number',
        minWidth: 100,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        hide: true,
      },
      {
        field: 'actions',
        headerName: 'Ações',
        minWidth: 150,
        flex: 1,
        renderCell: ({ id }) => (
          <strong>
            <Link to={`/cliente/${id}`} target="_blank">
              <IconButton
                id="menu-options"
                aria-controls="menu-options"
                aria-haspopup="true"
                aria-expanded={this.state.open ? 'true' : undefined}
                onClick={() => console.log(id)}
                color="secondary"
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Link>
            <IconButton
              id="menu-options"
              aria-controls="menu-options"
              aria-haspopup="true"
              aria-expanded={this.state.open ? 'true' : undefined}
              onClick={this.handleClick}
            >
              <DescriptionIcon fontSize="small" />
            </IconButton>
            <IconButton
              id="menu-options"
              aria-controls="menu-options"
              aria-haspopup="true"
              aria-expanded={this.state.open ? 'true' : undefined}
              onClick={this.handleClick}
              sx={{ color: '#999' }}
            >
              <ShoppingCartIcon fontSize="small" />
            </IconButton>
            <IconButton
              id="menu-options"
              aria-controls="menu-options"
              aria-haspopup="true"
              aria-expanded={this.state.open ? 'true' : undefined}
              onClick={this.handleClick}
              color="success"
            >
              <PersonRemoveIcon fontSize="small" />
            </IconButton>
            {/* <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: 16 }}
            >
              Open
            </Button> */}
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
    return (
      <Content cardTitle="Pesquisar Cliente">
        <Grid container>
          <Grid item xs={12} marginBottom={3}>
            <form action="" onSubmit={(e) => e.preventDefault()}>
              <TextField
                id="pesquisarCliente"
                label="Nome/Cpf/Telefone/Referência"
                fullWidth
                value={pesquisarCliente}
                onChange={this.handleChange}
                sx={{ marginBottom: 2 }}
              />
              <Button
                type="submit"
                onClick={this.fetchUser}
                variant="contained"
              >
                Pesquisar
              </Button>
            </form>
          </Grid>
        </Grid>
        <TableComponent
          columns={columns}
          row={row}
          id="idCliente"
          col={col}
          isLoading={isLoading}
        />
        <ToastContainer pauseOnFocusLoss />
      </Content>
    );
  }
}

export default Cliente;
