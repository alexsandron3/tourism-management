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

class Passeio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nomePasseio: '',
      localPasseio: '',
      valorPasseio: '',
      lotacao: '',
      idadeIsencao: '',
      anotacoes: '',
      itensPacote: '',
      statusPasseio: '',
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
    this.setState({ [target.name]: parseInt(target.value) });
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
        <form action="">
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
                  type="date"
                  sx={{
                    width: 220,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleDateChange}
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
                    value="ativo"
                    control={<Radio />}
                    label="Ativo"
                  />
                  <FormControlLabel
                    value="inativo"
                    control={<Radio />}
                    label="Inativo"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TextField
                  id="startDate"
                  label="Data de lançamento"
                  type="date"
                  sx={{
                    width: 220,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleDateChange}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TextField
                  id="startDate"
                  label="Prazo de vingência"
                  type="date"
                  sx={{
                    width: 220,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleDateChange}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Button
            sx={{ marginLeft: 3 }}
            variant="contained"
            onClick={this.handleButtonClick}
          >
            Enviar
          </Button>
        </form>
      </Content>
    );
  }
}

export default Passeio;
