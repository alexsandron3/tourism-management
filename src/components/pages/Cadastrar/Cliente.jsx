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
  Step,
  Stepper,
  StepLabel,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { parseISO } from 'date-fns';

import axios from 'axios';
import moment from 'moment';
import { Redirect } from 'react-router-dom';

class Cliente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nomeCliente: '',
      emailCliente: '',
      rgCliente: '',
      orgaoEmissor: '',
      cpfCliente: '',
      telefoneCliente: '',
      dataNascimento: null,
      idadeCliente: 0,
      referencia: '',
      pessoaContato: '',
      telefoneContato: '',
      cpfConsultado: 0,
      dataCpfConsultado: null,
      redeSocial: '',
      enderecoCliente: '',
      nacionalidade: '',
      profissao: '',
      estadoCivil: '',
      clienteRedeSocial: 0,
      poltrona: '',
      isLoading: false,
      cliente: '',
    };
  }
  componentDidMount() {
    this.fetchCliente();
  }

  handleChange = ({ target }) => {
    let value;
    switch (target.name) {
      case 'cpfCliente':
        value = this.cpfMask(target.value);
        break;
      case 'telefoneCliente':
        value = this.telefoneMask(target);
        break;
      case 'telefoneContato':
        value = this.telefoneMask(target);
        break;

      default:
        value = target.value.toUpperCase();
        break;
    }
    this.setState({ [target.name]: value });
  };

  cpfMask = (value) => {
    const { cpfCliente } = this.state;
    let maskedValue = value;
    maskedValue = value.replace(/[^\d]/g, '');
    maskedValue = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    console.log(maskedValue.length < 14);
    if (maskedValue.length > 14) return cpfCliente;
    return maskedValue;
  };

  telefoneMask = (target) => {
    if (target.value.length > 11) return this.state[target.name];
    return target.value;
  };

  calculateAge = (date) => {
    const idadeCliente = moment().diff(moment(date), 'years');
    this.setState({ idadeCliente });
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
    const filteredState = state.map(
      ({ isLoading, modified, created, cliente, ...rest }) => rest
    );
    const {
      data: { success, message, cliente },
      data,
    } = await axios({
      method: method,
      url: `https://apifabio.herokuapp.com/cliente.php`,
      data: { ...filteredState[0] },
    });
    console.log(data);
    if (success) {
      toast.success(message, {
        pauseOnFocusLoss: false,
      });
      setTimeout(() => {
        this.setState({ cliente });
      }, 3000);
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

  fetchCliente = async () => {
    const { id } = this.props.match.params;
    if (id) {
      const {
        data: { cliente },
      } = await axios.get(
        `https://apifabio.herokuapp.com/cliente.php?id=${id}`
      );
      this.setState({ ...cliente[0], isLoading: false });
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
      cliente,
    } = this.state;
    const { id } = this.props.match.params;
    const steps = [
      {
        label: 'Registrar Cliente',
      },
      {
        label: 'Selecionar Passeio',
        title: 'Selecione um passeio para Pagamento',
        // content: <SelecionarPasseio {...this.state} />,
      },
      {
        label: 'Realizar Pagamento',
        title: 'Pagamento',
        // content: <FormPagamento {...this.state} />,
      },
      {
        label: 'Emitir Contrato',
      },
    ];

    if (cliente)
      return <Redirect push to={`/cadastrar/pagamento/${cliente}`} />;
    return (
      <Content cardTitle={id ? 'Editar Cliente' : 'Cadastrar Cliente'}>
        <Stepper activeStep={0} alternativeLabel>
          {steps.map(({ label }) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
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
                type="email"
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
                name="rgCliente"
                value={rgCliente}
                onChange={this.handleChange}
                sx={{ mb: 3 }}
              />
              <TextField
                id="standard-basic"
                label="Emissor: "
                variant="standard"
                fullWidth
                name="orgaoEmissor"
                value={orgaoEmissor}
                onChange={this.handleChange}
                sx={{ mb: 3 }}
              />

              <TextField
                type="text"
                id="standard-basic"
                label="CPF : "
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
                  onChange={(val) => {
                    this.setState({
                      dataNascimento: moment(val).format('YYYY-MM-DD'),
                    });
                    this.calculateAge(val);
                  }}
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
                value={idadeCliente || 0}
                onChange={this.handleNumbers}
                onBlur={this.toInt}
                sx={{ mb: 3 }}
                fullWidth
                disabled={true}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="estado-civil">Estado Civil: </InputLabel>
                <Select
                  labelId="estado-civil"
                  value={estadoCivil}
                  label="Estado Civil"
                  name="estadoCivil"
                  onChange={this.handleChange}
                >
                  <MenuItem value="SOLTEIRO(A)">Solteiro(a)</MenuItem>
                  <MenuItem value="CASADO(A)">Casado(a)</MenuItem>
                  <MenuItem value="DIVORCIADO(A)">Divorciado(a)</MenuItem>
                  <MenuItem value="VIÚVO(A)">Viúvo(a)</MenuItem>
                  <MenuItem value="SEPARADO(A)">Separado(a)</MenuItem>
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
                onChange={this.handleChange}
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
                onChange={this.handleChange}
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
                onChange={this.handleChange}
                sx={{ mb: 3 }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4} marginBottom={3}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Cpf consultado: </FormLabel>
                <RadioGroup
                  aria-label="cpfConsultado"
                  defaultValue="ativo"
                  name="cpfConsultado"
                  value={cpfConsultado}
                >
                  <FormControlLabel
                    value={1}
                    control={<Radio />}
                    label="Sim"
                    onClick={(e) => {
                      this.handleChange(e);
                      this.setState({
                        dataCpfConsultado: moment().format('YYYY-MM-DD'),
                      });
                    }}
                  />
                  <FormControlLabel
                    value={0}
                    control={<Radio />}
                    label="Não"
                    onClick={(e) => {
                      this.handleChange(e);
                      this.setState({ dataCpfConsultado: null });
                    }}
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
                  value={parseISO(dataCpfConsultado) || null}
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
                onChange={this.handleChange}
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
                onChange={this.handleChange}
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
              <FormControl component="fieldset" required>
                <FormLabel component="legend">Redes sociais: </FormLabel>
                <RadioGroup
                  aria-label="clienteRedeSocial"
                  defaultValue="ativo"
                  name="clienteRedeSocial"
                  value={clienteRedeSocial}
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
                    defaultChecked="true"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Button type="submit" sx={{ marginLeft: 3 }} variant="contained">
            Enviar
          </Button>
          {/* <Link to="/cadastrar/pagamento" target="_blank">
            <Button sx={{ marginLeft: 3 }} variant="contained">
              Próximo
            </Button>
          </Link> */}
        </form>
        <ToastContainer pauseOnFocusLoss />
      </Content>
    );
  }
}

export default Cliente;
