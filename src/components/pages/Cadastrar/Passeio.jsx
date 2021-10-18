import React, { Component } from 'react';
import Content from '../../partials/Content';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
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
    const {
      data: { success, message },
    } = await axios({
      method: 'POST',
      url: `http://localhost/Projetos/SistemaFabio-2.0/api/passeio.php`,
      data: { ...this.state },
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
    } = this.state;
    return (
      <Content cardTitle="Cadastrar Passeio">
        <form action="" onSubmit={this.handleSubmit}>
          <Grid container justifyContent="space-between" p={3}>
            <Grid item xs={12}>
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
            <Grid item xs={4}>
              <TextField
                id="standard-basic"
                label="Valor do passeio: "
                variant="standard"
                name="valorPasseio"
                value={valorPasseio}
                onChange={this.handleNumbers}
                onBlur={this.toFloat}
                sx={{ mb: 3 }}
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="standard-basic"
                label="Lotação: "
                variant="standard"
                name="lotacao"
                value={lotacao}
                onChange={this.handleNumbers}
                onBlur={this.toInt}
                sx={{ mb: 3 }}
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="standard-basic"
                label="Isenção: "
                variant="standard"
                name="idadeIsencao"
                value={idadeIsencao}
                onChange={this.handleNumbers}
                onBlur={this.toInt}
                sx={{ mb: 3 }}
                required
              />
            </Grid>
            <Grid item xs={12}>
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
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TextField
                  id="startDate"
                  label="Data do passeio"
                  name="dataPasseio"
                  type="date"
                  sx={{
                    width: 220,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChange}
                  required
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4} marginBottom={3}>
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
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TextField
                  id="startDate"
                  label="Data de lançamento"
                  name="dataLancamento"
                  type="date"
                  sx={{
                    width: 220,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChange}
                  required
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TextField
                  id="startDate"
                  label="Prazo de vingência"
                  name="prazoVigencia"
                  type="date"
                  sx={{
                    width: 220,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleChange}
                  required
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Button
            type="submit"
            sx={{ marginLeft: 3 }}
            variant="contained"
            // onClick={this.handleSubmit}
          >
            Enviar
          </Button>
        </form>
        <ToastContainer pauseOnFocusLoss />
      </Content>
    );
  }
}

export default Passeio;
