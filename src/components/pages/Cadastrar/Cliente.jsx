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
import {
  Backdrop,
  Button,
  CircularProgress,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { parseISO } from 'date-fns';

import axios from 'axios';
import moment from 'moment';
class Passeio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nomeCliente: 'asd',
      emailCliente: '',
      rgCliente: '',
      orgaoEmissor: '',
      cpfCliente: '',
      telefoneCliente: '',
      dataNascimento: '',
      idadeCliente: '',
      referencia: '',
      pessoaContato: '',
      telefoneContato: '',
      cpfConsultado: '',
      dataCpfConsultado: '',
      redeSocial: '',
      enderecoCliente: '',
      nacionalidade: '',
      profissao: '',
      estadoCivil: '',
      clienteRedeSocial: false,
      poltrona: '',
      isLoading: false,
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
    const { nomeCliente, valorPasseio, lotacao, idadeIsencao } = this.state;
    const isAnyInputInvalid =
      nomeCliente.length === 0 ||
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
      url: `http://localhost/Projetos/SistemaFabio-2.0/api/passeio.php`,
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
        `http://localhost/Projetos/SistemaFabio-2.0/api/passeio.php?id=${id}`
      );
      this.setState({ ...passeio[0], isLoading: false });
    } else {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const {
      nomeCliente,
      emailCliente,
      rgCliente,
      orgaoEmissor,
      cpfCliente,
      telefoneCliente,
      dataNascimento,
      idadeCliente,
      referencia,
      pessoaContato,
      telefoneContato,
      cpfConsultado,
      dataCpfConsultado,
      redeSocial,
      enderecoCliente,
      nacionalidade,
      profissao,
      estadoCivil,
      clienteRedeSocial,
      poltrona,
      isLoading,
    } = this.state;
    const { id } = this.props.match.params;
    return (
      <Content cardTitle={id ? 'Editar Cliente' : 'Cadastrar Cliente'}>
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
                label="Nome: "
                variant="standard"
                fullWidth
                name="nomeCliente"
                value={nomeCliente}
                onChange={this.handleChange}
                sx={{ mb: 3 }}
                required
                error={false}
              />
              <TextField
                id="standard-basic"
                label="EmailCliente: "
                variant="standard"
                fullWidth
                name="emailCliente"
                value={emailCliente}
                onChange={this.handleChange}
                sx={{ mb: 3 }}
              />
              <TextField
                id="standard-basic"
                label="Rg: "
                variant="standard"
                fullWidth
                name="rg"
                value={rgCliente}
                onChange={this.handleChange}
                sx={{ mb: 3 }}
              />
              <TextField
                id="standard-basic"
                label="Emissor: "
                variant="standard"
                fullWidth
                name="emissor"
                value={orgaoEmissor}
                onChange={this.handleChange}
                sx={{ mb: 3 }}
              />
              <TextField
                id="standard-basic"
                label="Cpf: "
                variant="standard"
                fullWidth
                name="cpfCliente"
                value={cpfCliente}
                onChange={this.handleChange}
                sx={{ mb: 3 }}
              />
              <TextField
                id="standard-basic"
                label="Telefone: "
                variant="standard"
                fullWidth
                name="telefoneCliente"
                value={telefoneCliente}
                onChange={this.handleChange}
                sx={{ mb: 3 }}
              />
            </Grid>
            <Grid item xs={12} md={4} marginBottom={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Nascimento"
                  renderInput={(params) => <TextField {...params} />}
                  onChange={(val) =>
                    this.setState({
                      dataNascimento: moment(val).format('YYYY-MM-DD'),
                    })
                  }
                  value={parseISO(dataNascimento)}
                  // formatDate={(date) => moment(date).format('YYYY-MM-DD')}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={4}></Grid>
            <Grid item xs={12} md={4} marginBottom={3}>
              <TextField
                id="standard-basic"
                label="Idade: "
                variant="standard"
                name="idadeCliente"
                value={idadeCliente}
                onChange={this.handleNumbers}
                onBlur={this.toInt}
                sx={{ mb: 3 }}
                fullWidth
                disabled="true"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="estado-civil">Estado Civil: </InputLabel>
                <Select
                  labelId="estado-civil"
                  value={estadoCivil}
                  label="Estado Civil"
                  // onChange={this.handleChange}
                >
                  <MenuItem>Solteiro(a)</MenuItem>
                  <MenuItem>Casado(a)</MenuItem>
                  <MenuItem>Divorciado(a)</MenuItem>
                  <MenuItem>Viúvo(a)</MenuItem>
                  <MenuItem>Separado(a)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}></Grid>
            <Grid item xs={12} md={4} marginBottom={3}>
              <TextField
                id="standard-basic"
                label="Profissão: "
                variant="standard"
                name="profissao"
                value={profissao}
                onChange={this.handleNumbers}
                onBlur={this.toInt}
                sx={{ mb: 3 }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4} marginBottom={3}>
              <TextField
                id="standard-basic"
                label="Nacionalidade: "
                variant="standard"
                name="nacionalidade"
                value={nacionalidade}
                onChange={this.handleNumbers}
                onBlur={this.toInt}
                sx={{ mb: 3 }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}></Grid>
            <Grid item xs={12} md={4} marginBottom={3}>
              <TextField
                id="standard-basic"
                label="Poltrona: "
                variant="standard"
                name="poltrona"
                value={poltrona}
                onChange={this.handleNumbers}
                onBlur={this.toInt}
                sx={{ mb: 3 }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4} marginBottom={3}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Cpf consultado: </FormLabel>
                <RadioGroup
                  aria-label="statusPasseio"
                  defaultValue="ativo"
                  name="statusPasseio"
                  value={cpfConsultado}
                >
                  <FormControlLabel
                    value={1}
                    control={<Radio />}
                    label="Sim"
                    onClick={this.handleChange}
                  />
                  <FormControlLabel
                    value={0}
                    control={<Radio />}
                    label="Não"
                    onClick={this.handleChange}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}></Grid>
            <Grid item xs={12} md={4} marginBottom={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Data de Consulta"
                  renderInput={(params) => <TextField {...params} />}
                  onChange={(val) =>
                    this.setState({
                      dataCpfConsultado: moment(val).format('YYYY-MM-DD'),
                    })
                  }
                  value={parseISO(dataCpfConsultado)}
                  // formatDate={(date) => moment(date).format('YYYY-MM-DD')}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={4} marginBottom={3}>
              <TextField
                id="standard-basic"
                label="Endereço: "
                multiline
                fullWidth
                variant="standard"
                name="enderecoCliente"
                value={enderecoCliente}
                onChange={this.handleChange}
                sx={{ mb: 3 }}
              />
            </Grid>
            <Grid item xs={12} md={4}></Grid>
            <Grid item xs={12} md={4} marginBottom={3}>
              <TextField
                id="standard-basic"
                label="Referência: "
                multiline
                fullWidth
                variant="standard"
                name="referencia"
                value={referencia}
                onChange={this.handleChange}
                sx={{ mb: 3 }}
              />
            </Grid>
            <Grid item xs={12} md={4} marginBottom={3}>
              <TextField
                id="standard-basic"
                label="Telefone para contato: "
                variant="standard"
                name="telefoneContato"
                value={telefoneContato}
                onChange={this.handleNumbers}
                onBlur={this.toInt}
                sx={{ mb: 3 }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}></Grid>
            <Grid item xs={12} md={4} marginBottom={3}>
              <TextField
                id="standard-basic"
                label="Quem contatar: "
                variant="standard"
                name="pessoaContato"
                value={pessoaContato}
                onChange={this.handleNumbers}
                onBlur={this.toInt}
                sx={{ mb: 3 }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4} marginBottom={3}>
              <TextField
                id="standard-basic"
                label="Redes sociais: "
                multiline
                fullWidth
                variant="standard"
                name="redeSocial"
                value={redeSocial}
                onChange={this.handleChange}
                sx={{ mb: 3 }}
              />
            </Grid>
            <Grid item xs={12} md={4}></Grid>

            <Grid item xs={12} md={4} marginBottom={3}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Redes sociais: </FormLabel>
                <RadioGroup
                  aria-label="redeSocial"
                  defaultValue="ativo"
                  name="redeSocial"
                  value={redeSocial}
                >
                  <FormControlLabel
                    value={1}
                    control={<Radio />}
                    label="Sim"
                    onClick={this.handleChange}
                  />
                  <FormControlLabel
                    value={0}
                    control={<Radio />}
                    label="Não"
                    onClick={this.handleChange}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            {/* <Grid item xs={12} md={4} marginBottom={3}>
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
            </Grid> */}
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
