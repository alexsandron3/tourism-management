import React, { Component } from 'react';
import Content from '../../partials/Content';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Backdrop, Button, CircularProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { parseISO } from 'date-fns';

import axios from 'axios';
import moment from 'moment';
class Passeio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nomePasseio: 'asd',
      localPasseio: '',
      valorPasseio: 0,
      lotacao: 0,
      idadeIsencao: 5,
      anotacoes: '',
      itensPacote: '',
      dataPasseio: '',
      statusPasseio: 1,
      dataLancamento: '',
      prazoVigencia: '',
      isLoading: true,
    };
  }
  componentDidMount() {
    this.fetchPasseio();
  }
  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value.toUpperCase() });
  };

  handleNumbers = ({ target }) => {
    if (/^[0-9.]*$/.test(target.value)) {
      this.setState({ [target.name]: target.value });
    }
  };

  toFloat = ({ target }) => {
    this.setState(
      {
        [target.name]: Number(target.value).toFixed(2),
      },
      () => {
        if (isNaN(Number(target.value))) {
          this.setState({ [target.name]: 0 });
        }
      }
    );
  };

  toInt = ({ target }) => {
    this.setState({ [target.name]: parseInt(target.value) }, () => {
      if (isNaN(Number(target.value))) {
        this.setState({ [target.name]: 0 });
      }
    });
  };

  validateInputs = () => {
    const { nomePasseio, valorPasseio, lotacao, idadeIsencao } = this.state;
    const isAnyInputInvalid =
      nomePasseio.length === 0 ||
      valorPasseio < 0 ||
      idadeIsencao < 0 ||
      lotacao < 0;
    return isAnyInputInvalid;
  };

  sendData = async () => {
    const { id } = this.props.match.params;
    const method = id ? 'UPDATE' : 'POST';
    const state = [];
    state.push(this.state);
    const filteredState = state.map(({ isLoading, ...rest }) => rest);
    const {
      data: { success, message },
      data,
    } = await axios({
      method: method,
      url: `http://localhost/SistemaFabio-2.0/api/passeio.php`,
      data: { ...filteredState[0] },
    });
    console.log(data);
    if (success) {
      toast.success(message, {
        pauseOnFocusLoss: false,
      });
    } else {
      toast.error(message, {
        pauseOnFocusLoss: false,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const isAnyInputInvalid = this.validateInputs();
    if (isAnyInputInvalid) {
      toast.error('Por favor, preencha todos os campos corretamente!', {
        pauseOnFocusLoss: false,
      });
    } else {
      this.sendData();
    }
  };

  fetchPasseio = async () => {
    const { id } = this.props.match.params;
    if (id) {
      const {
        data: { passeio },
      } = await axios.get(
        `http://localhost/SistemaFabio-2.0/api/passeio.php?id=${id}`
      );
      this.setState({ ...passeio[0], isLoading: false });
    } else {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const {
      nomePasseio,
      localPasseio,
      valorPasseio,
      lotacao,
      idadeIsencao,
      anotacoes,
      itensPacote,
      statusPasseio,
      isLoading,
    } = this.state;
    const { id } = this.props.match.params;
    return (
      <Content cardTitle={id ? 'Editar Passeio' : 'Cadastrar Passeio'}>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <form action="" onSubmit={this.handleSubmit}>
          <Grid container justifyContent="space-between" p={3}>
            <Grid item xs={12} md={12}>
              <TextField
                id="standard-basic"
                label="Passeio: "
                variant="standard"
                fullWidth
                name="nomePasseio"
                value={nomePasseio}
                onChange={this.handleChange}
                sx={{ mb: 3 }}
                required
                error={false}
              />
              <TextField
                id="standard-basic"
                label="Local: "
                variant="standard"
                fullWidth
                name="localPasseio"
                value={localPasseio}
                onChange={this.handleChange}
                sx={{ mb: 3 }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                id="standard-basic"
                label="Valor do passeio: "
                variant="standard"
                name="valorPasseio"
                value={valorPasseio}
                onChange={this.handleNumbers}
                onBlur={this.toFloat}
                sx={{ mb: 3 }}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                id="standard-basic"
                label="Lotação: "
                variant="standard"
                name="lotacao"
                value={lotacao}
                onChange={this.handleNumbers}
                onBlur={this.toInt}
                sx={{ mb: 3 }}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                id="standard-basic"
                label="Isenção: "
                variant="standard"
                name="idadeIsencao"
                value={idadeIsencao}
                onChange={this.handleNumbers}
                onBlur={this.toInt}
                sx={{ mb: 3 }}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                id="standard-basic"
                label="Anotações: "
                multiline
                fullWidth
                variant="standard"
                name="anotacoes"
                value={anotacoes}
                onChange={this.handleChange}
                sx={{ mb: 3 }}
              />
              <TextField
                id="standard-basic"
                label="Itens do pacote: "
                multiline
                fullWidth
                variant="standard"
                name="itensPacote"
                value={itensPacote}
                onChange={this.handleChange}
                sx={{ mb: 3 }}
              />
            </Grid>
            <Grid item xs={12} md={4} marginBottom={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Data do passeio"
                  renderInput={(params) => <TextField {...params} />}
                  onChange={(val) =>
                    this.setState({
                      dataPasseio: moment(val).format('YYYY-MM-DD'),
                    })
                  }
                  value={parseISO(this.state.dataPasseio)}
                  // formatDate={(date) => moment(date).format('YYYY-MM-DD')}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={4}></Grid>
            <Grid item xs={12} md={4} marginBottom={3}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Status do passeio: </FormLabel>
                <RadioGroup
                  aria-label="statusPasseio"
                  defaultValue="ativo"
                  name="statusPasseio"
                  value={statusPasseio}
                >
                  <FormControlLabel
                    value={1}
                    control={<Radio />}
                    label="Ativo"
                    onClick={this.handleChange}
                  />
                  <FormControlLabel
                    value={0}
                    control={<Radio />}
                    label="Inativo"
                    onClick={this.handleChange}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4} marginBottom={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Data de lançamento"
                  renderInput={(params) => <TextField {...params} />}
                  onChange={(val) =>
                    this.setState({
                      dataLancamento: moment(val).format('YYYY-MM-DD'),
                    })
                  }
                  value={parseISO(this.state.dataLancamento)}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Prazo de vingência"
                  renderInput={(params) => <TextField {...params} />}
                  onChange={(val) =>
                    this.setState({
                      prazoVigencia: moment(val).format('YYYY-MM-DD'),
                    })
                  }
                  value={parseISO(this.state.prazoVigencia)}
                  required
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Button type="submit" sx={{ marginLeft: 3 }} variant="contained">
            Enviar
          </Button>
        </form>
        <ToastContainer pauseOnFocusLoss />
      </Content>
    );
  }
}

export default Passeio;
