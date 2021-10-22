import {
  Grid,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import React, { Component } from 'react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import moment from 'moment';
import { parseISO } from 'date-fns';

class FormPagamento extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <form action="" onSubmit={this.handleSubmit}>
        <Grid container justifyContent="space-between" p={3}>
          <Grid item xs={12} md={12}>
            <TextField
              id="standard-basic"
              label="Valor vendido: "
              variant="standard"
              fullWidth
              name="nomeCliente"
              // value={nomeCliente}
              onChange={this.handleChange}
              sx={{ mb: 3 }}
              required
              error={false}
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <TextField
              id="standard-basic"
              label="Valor pago: "
              variant="standard"
              fullWidth
              name="nomeCliente"
              // value={nomeCliente}
              onChange={this.handleChange}
              sx={{ mb: 3 }}
              required
              error={false}
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <TextField
              id="standard-basic"
              label="Novo valor pago: "
              variant="standard"
              fullWidth
              name="nomeCliente"
              // value={nomeCliente}
              onChange={this.handleChange}
              sx={{ mb: 3 }}
              required
              error={false}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              id="standard-basic"
              label="Valor pendente: "
              variant="standard"
              fullWidth
              name="nomeCliente"
              // value={nomeCliente}
              onChange={this.handleChange}
              sx={{ mb: 3 }}
              required
              error={false}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              id="standard-basic"
              label="Taxa de pagamento: "
              variant="standard"
              fullWidth
              name="nomeCliente"
              // value={nomeCliente}
              onChange={this.handleChange}
              sx={{ mb: 3 }}
              required
              error={false}
            />
          </Grid>
          <Grid item xs={12} md={4} marginBottom={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Previsão de pagamento: "
                renderInput={(params) => <TextField {...params} />}
                onChange={(val) => {
                  this.setState({
                    dataNascimento: moment(val).format('YYYY-MM-DD'),
                  });
                  this.calculateAge(val);
                }}
                // value={parseISO(dataNascimento)}
                // formatDate={(date) => moment(date).format('YYYY-MM-DD')}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={4}></Grid>
          <Grid item xs={12} md={4}>
            <TextField
              id="standard-basic"
              label="Valor contrato: "
              variant="standard"
              fullWidth
              name="nomeCliente"
              // value={nomeCliente}
              onChange={this.handleChange}
              sx={{ mb: 3 }}
              required
              error={false}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              id="standard-basic"
              label="Número de vagas: "
              variant="standard"
              fullWidth
              name="nomeCliente"
              // value={nomeCliente}
              onChange={this.handleChange}
              sx={{ mb: 3 }}
              required
              error={false}
            />
          </Grid>
          <Grid item xs={12} md={4}></Grid>
          <Grid item xs={12} md={4}>
            <TextField
              id="standard-basic"
              label="Idade: "
              variant="standard"
              fullWidth
              name="nomeCliente"
              // value={nomeCliente}
              onChange={this.handleChange}
              sx={{ mb: 3 }}
              required
              error={false}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              id="standard-basic"
              label="Local de embarque: "
              variant="standard"
              fullWidth
              name="nomeCliente"
              // value={nomeCliente}
              onChange={this.handleChange}
              sx={{ mb: 3 }}
              required
              error={false}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              id="standard-basic"
              label="Local de embarque: "
              variant="standard"
              fullWidth
              name="nomeCliente"
              // value={nomeCliente}
              onChange={this.handleChange}
              sx={{ mb: 3 }}
              required
              error={false}
            />
          </Grid>
          <Grid item xs={12} md={4}></Grid>
          <Grid item xs={12} md={4}>
            <TextField
              id="standard-basic"
              label="Transporte: "
              variant="standard"
              fullWidth
              name="nomeCliente"
              // value={nomeCliente}
              onChange={this.handleChange}
              sx={{ mb: 3 }}
              required
              error={false}
            />
          </Grid>
          <Grid item xs={12} md={4} marginBottom={3}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Seguro viagem: </FormLabel>
              <RadioGroup
                aria-label="cpfConsultado"
                defaultValue="ativo"
                name="cpfConsultado"
                // value={cpfConsultado}
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
            <FormControl component="fieldset">
              <FormLabel component="legend">Cliente parceiro: </FormLabel>
              <RadioGroup
                aria-label="cpfConsultado"
                defaultValue="ativo"
                name="cpfConsultado"
                // value={cpfConsultado}
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
          <Grid item xs={12} md={12} marginBottom={3}>
            <TextField
              id="standard-basic"
              label="Opcionais: "
              multiline
              fullWidth
              variant="standard"
              name="enderecoCliente"
              // value={enderecoCliente}
              onChange={this.handleChange}
              sx={{ mb: 3 }}
            />
          </Grid>
          <Grid item xs={12} md={12} marginBottom={3}>
            <TextField
              id="standard-basic"
              label="Anotações: "
              multiline
              fullWidth
              variant="standard"
              name="enderecoCliente"
              // value={enderecoCliente}
              onChange={this.handleChange}
              sx={{ mb: 3 }}
            />
          </Grid>
          <Grid item xs={12} md={12} marginBottom={3}>
            <TextField
              id="standard-basic"
              label="Histórico: "
              multiline
              fullWidth
              variant="standard"
              name="enderecoCliente"
              // value={enderecoCliente}
              onChange={this.handleChange}
              sx={{ mb: 3 }}
            />
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default FormPagamento;
