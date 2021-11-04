import React, { Component } from 'react';
import Content from '../../partials/Content';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import TableComponent from '../../partials/TableComponent';
import axios from 'axios';
import { Button, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DescriptionIcon from '@mui/icons-material/Description';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import GroupsIcon from '@mui/icons-material/Groups';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const col = ['ID', 'Nome', 'Data do passeio', 'Local do passeio', 'Vagas'];
class Passeio extends Component {
  constructor() {
    super();
    this.state = {
      pesquisarPasseio: '',
      row: [],
      isLoading: false,
    };
  }
  componentDidMount() {
    this.fetchUser();
  }
  fetchUser = async () => {
    const { pesquisarPasseio } = this.state;
    this.setState({ isLoading: true });
    const {
      data: { passeio = [], success, message },
    } = await axios({
      method: 'GET',
      url: `https://fabiopasseios.com.br/ap/passeio.php?pesquisarPasseio=${pesquisarPasseio}`,
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
      this.setState({ row: passeio, isLoading: false });
    } catch (error) {
      console.error(error);
    }
  };
  handleChange = ({ target }) => {
    this.setState({ pesquisarPasseio: target.value });
  };
  handleClick = (target) => {
    console.log(target.currentTarget);
  };
  render() {
    const { pesquisarPasseio, row, isLoading } = this.state;
    const columns = [
      {
        field: 'actions',
        headerName: 'Ações',
        minWidth: 180,
        flex: 1,
        renderCell: ({ id }) => (
          <strong>
            <Link to={`/cadastrar/passeio/${id}`} target="_blank">
              <Tooltip title="Editar">
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
              </Tooltip>
            </Link>
            <Tooltip title="Relatórios">
              <IconButton
                id="menu-options"
                aria-controls="menu-options"
                aria-haspopup="true"
                aria-expanded={this.state.open ? 'true' : undefined}
                onClick={this.handleClick}
              >
                <DescriptionIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Lista de clientes">
              <IconButton
                id="menu-options"
                aria-controls="menu-options"
                aria-haspopup="true"
                aria-expanded={this.state.open ? 'true' : undefined}
                onClick={this.handleClick}
                color="primary"
              >
                <GroupsIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Lucros">
              <IconButton
                id="menu-options"
                aria-controls="menu-options"
                aria-haspopup="true"
                aria-expanded={this.state.open ? 'true' : undefined}
                onClick={this.handleClick}
                color="success"
              >
                <PriceCheckIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Remover">
              <IconButton
                id="menu-options"
                aria-controls="menu-options"
                aria-haspopup="true"
                aria-expanded={this.state.open ? 'true' : undefined}
                onClick={this.handleClick}
                sx={{ color: 'red' }}
              >
                <DeleteForeverIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </strong>
        ),
      },
      {
        field: 'idPasseio',
        headerName: 'ID',
        type: 'number',
        minWidth: 100,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        hide: true,
      },
      {
        field: 'nomePasseio',
        headerName: 'Nome',
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
        minWidth: 110,
        flex: 1,
        // valueFormatter: (params) => moment(params.dataPasseio).format('MM/DD/yyyy'),
        headerAlign: 'center',
        align: 'center',
      },
      {
        field: 'localPasseio',
        headerName: 'Local',
        minWidth: 250,
        editable: true,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
      },
      {
        field: 'lotacao',
        headerName: 'Vagas',
        minWidth: 200,
        editable: true,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
      },
    ];
    return (
      <Content cardTitle="Pesquisar Passeio">
        <Grid container>
          <Grid item xs={12} marginBottom={3}>
            <form action="" onSubmit={(e) => e.preventDefault()}>
              <TextField
                id="pesquisarPasseio"
                label="NOME/LOCAL"
                fullWidth
                value={pesquisarPasseio}
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
          id="idPasseio"
          col={col}
          isLoading={isLoading}
        />
        <ToastContainer pauseOnFocusLoss />
      </Content>
    );
  }
}

export default Passeio;
