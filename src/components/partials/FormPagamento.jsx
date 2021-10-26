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
import BigNumber from 'bignumber.js';
class FormPagamento extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      handleChange,
      handleNumbers,
      toFloat,
      toInt,
      pagamento: {
        valorVendido,
        valorPago,
        novoValorPago,
        valorPendente,
        taxaPagamento,
        previsaoPagamento,
        valorContrato,
        numeroVagas,
        localEmbarque,
        transporte,
        opcionais,
        anotacoes,
        clienteParceiro,
        seguroViagem,
        historico,
        referenciaCliente,
      },
      handleDateChange,
    } = this.props;
    return (
      <form action="" onSubmit={this.handleSubmit}>
        <Grid container justifyContent="space-between" p={3}>
          <Grid item xs={12} md={12}>
            <TextField
              id="standard-basic"
              label="Valor vendido: "
              variant="standard"
              fullWidth
              name="valorVendido"
              value={valorVendido || '0'}
              onChange={handleNumbers}
              onBlur={toFloat}
              sx={{ mb: 3 }}
              error={false}
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <TextField
              id="standard-basic"
              label="Valor pago: "
              variant="standard"
              fullWidth
              name="valorPago"
              value={valorPago || '0'}
              onChange={handleNumbers}
              onBlur={toFloat}
              sx={{ mb: 3 }}
              disabled
              error={false}
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <TextField
              id="standard-basic"
              label="Novo valor pago: "
              variant="standard"
              fullWidth
              name="novoValorPago"
              value={novoValorPago || '0'}
              onChange={handleNumbers}
              onBlur={toFloat}
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
              name="valorPendente"
              value={valorPendente || '0'}
              onChange={handleNumbers}
              onBlur={toFloat}
              sx={{ mb: 3 }}
              disabled
              error={false}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              id="standard-basic"
              label="Taxa de pagamento: "
              variant="standard"
              fullWidth
              name="taxaPagamento"
              value={taxaPagamento || '0'}
              onChange={handleNumbers}
              onBlur={toFloat}
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
                onChange={(e) => handleDateChange(e)}
                value={parseISO(previsaoPagamento) || ' '}
                name="previsaoPagamento"
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
              name="valorContrato"
              value={valorContrato || '0'}
              onChange={handleNumbers}
              onBlur={toFloat}
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
              name="numeroVagas"
              value={numeroVagas || '0'}
              onChange={handleNumbers}
              onBlur={toInt}
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
              name="idadeCliente"
              // value={nomeCliente}
              // onChange={this.handleChange}
              sx={{ mb: 3 }}
              disabled
              error={false}
            />
          </Grid>
          <Grid item xs={12} md={12} marginBottom={3}>
            <TextField
              id="standard-basic"
              label="Referencia: "
              multiline
              fullWidth
              disabled
              variant="standard"
              name="referenciaCliente"
              value={referenciaCliente || ' '}
              onChange={handleChange}
              sx={{ mb: 3 }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              id="standard-basic"
              label="Local de embarque: "
              variant="standard"
              fullWidth
              name="localEmbarque"
              value={localEmbarque || ' '}
              onChange={handleChange}
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
              name="transporte"
              value={transporte || ' '}
              onChange={handleChange}
              sx={{ mb: 3 }}
              required
              error={false}
            />
          </Grid>
          <Grid item xs={12} md={4} marginBottom={3}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Seguro viagem: </FormLabel>
              <RadioGroup
                aria-label="seguroViagem"
                defaultValue="ativo"
                name="seguroViagem"
                value={seguroViagem || '0'}
              >
                <FormControlLabel
                  value={1}
                  control={<Radio />}
                  label="Sim"
                  onClick={(e) => {
                    handleChange(e);
                  }}
                />
                <FormControlLabel
                  value={0}
                  control={<Radio />}
                  label="Não"
                  onClick={(e) => {
                    handleChange(e);
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
                aria-label="clienteParceiro"
                defaultValue="ativo"
                name="clienteParceiro"
                value={clienteParceiro || 0}
              >
                <FormControlLabel
                  value={1}
                  control={<Radio />}
                  label="Sim"
                  onClick={(e) => {
                    handleChange(e);
                  }}
                />
                <FormControlLabel
                  value={0}
                  control={<Radio />}
                  label="Não"
                  onClick={(e) => {
                    handleChange(e);
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
              name="opcionais"
              value={opcionais || ' '}
              onChange={handleChange}
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
              name="anotacoes"
              value={anotacoes || ' '}
              onChange={handleChange}
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
              name="historico"
              value={historico || ' '}
              onChange={handleChange}
              sx={{ mb: 3 }}
            />
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default FormPagamento;
