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

class Passeio extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
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
                sx={{ mb: 3 }}
              />
              <TextField
                id="standard-basic"
                label="Local: "
                variant="standard"
                fullWidth
                sx={{ mb: 3 }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="standard-basic"
                label="Valor do passeio: "
                variant="standard"
                sx={{ mb: 3 }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="standard-basic"
                label="Lotação: "
                variant="standard"
                sx={{ mb: 3 }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="standard-basic"
                label="Isenção: "
                variant="standard"
                sx={{ mb: 3 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="standard-basic"
                label="Anotações: "
                multiline
                fullWidth
                variant="standard"
                sx={{ mb: 3 }}
              />
              <TextField
                id="standard-basic"
                label="Itens do pacote: "
                multiline
                fullWidth
                variant="standard"
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
                    // marginBottom: '20px',
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
        </form>
      </Content>
    );
  }
}

export default Passeio;
