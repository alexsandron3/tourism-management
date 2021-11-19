import {
  Grid,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  Typography,
} from '@mui/material';
import React, { Component } from 'react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import moment from 'moment';
import { parseISO } from 'date-fns';
import BigNumber from 'bignumber.js';
import { connect } from 'react-redux';
import { setPaymentInfo } from '../../actions';
class FormPagamento extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagamento: {
        valorVendido: 0,
        valorPago: 0,
        novoValorPago: 0,
        valorPendente: 0,
        taxaPagamento: 0,
        previsaoPagamento: null,
        localEmbarque: ' ',
        transporte: ' ',
        opcionais: ' ',
        anotacoes: ' ',
        seguroViagem: 0,
        clienteParceiro: 0,
        referenciaCliente: ' ',
        valorContrato: 0,
        clienteDesistente: 0,
        historicoPagamento: ' ',
        defaultHistoricoPagamento: ' ',
      },
    };
  }
  validateForm = () => {
    const { dispatchPaymentInfo } = this.props;
    const {
      pagamento: {
        valorVendido,
        novoValorPago,
        valorPago,
        taxaPagamento,
        localEmbarque,
        transporte,
        opcionais,
      },
      pagamento,
      activeStep,
    } = this.state;
    const isValorVendidoHighestNumber =
      valorVendido >= novoValorPago &&
      valorVendido >= valorPago &&
      valorVendido >= taxaPagamento;

    const areAllMandatoryFilleds =
      localEmbarque.length && transporte.length && opcionais.length;
    if (
      !isValorVendidoHighestNumber ||
      (!areAllMandatoryFilleds && activeStep === 2)
    ) {
      this.setState({ error: true, isButtonDisabled: true });
    } else {
      this.setState({ error: false, isButtonDisabled: false });
      dispatchPaymentInfo(pagamento);
    }
  };

  handleNumbers = ({ target }) => {
    if (/^[0-9.]*$/.test(target.value)) {
      this.setState(
        (prevState) => {
          return {
            ...prevState,
            pagamento: {
              ...prevState.pagamento,
              [target.name]: target.value,
            },
          };
        },
        () => {
          this.calculateForm(target.value);
        }
      );
    }
  };

  calculateForm = () => {
    const {
      pagamento: { novoValorPago, taxaPagamento, valorVendido },
    } = this.state;
    let valorPago = [novoValorPago, taxaPagamento].reduce((acc, curr) => {
      let novoValorPago = new BigNumber(acc);
      let taxaPagamento = new BigNumber(curr);
      if (isNaN(novoValorPago)) novoValorPago = 0;
      if (isNaN(taxaPagamento)) taxaPagamento = 0;

      return new BigNumber(
        Number(novoValorPago.toFixed(2)) + Number(taxaPagamento.toFixed(2))
      ).toFixed(2);
    });
    const valorPendente =
      Number(new BigNumber(valorPago).toFixed(2)) -
      Number(new BigNumber(valorVendido).toFixed(2));

    this.setState(
      (prevState) => {
        return {
          ...prevState,
          pagamento: {
            ...prevState.pagamento,
            valorPago: Number(new BigNumber(valorPago).toFixed(2)),
            valorPendente: Number(new BigNumber(valorPendente).toFixed(2)),
          },
        };
      },
      () => this.validateForm()
    );
  };

  toFloat = ({ target }) => {
    this.setState(
      (prevState) => {
        const value = new BigNumber(target.value);

        return {
          ...prevState,
          pagamento: {
            ...prevState.pagamento,
            [target.name]: value.toFixed(2),
          },
        };
      },
      (prevState) => {
        if (isNaN(Number(target.value))) {
          return {
            ...prevState,
            pagamento: {
              ...prevState.pagamento,
              [target.name]: 0,
            },
          };
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

  handleChange = ({ target }) => {
    this.setState(
      (prevState) => {
        const value = target.value.toUpperCase();
        return {
          ...prevState,
          pagamento: {
            ...prevState.pagamento,
            [target.name]: value,
          },
        };
      },
      () => this.validateForm()
    );
  };

  setHistory = () => {
    const {
      pagamento: { novoValorPago, defaultHistoricoPagamento },
    } = this.state;

    this.setState((prevState) => {
      let historicoPagamento = `${prevState.pagamento.historicoPagamento}
${moment().format('DD-MM-YYY')} R$: ${novoValorPago}`;
      if (novoValorPago === '0' || isNaN(novoValorPago))
        historicoPagamento = defaultHistoricoPagamento;
      return {
        ...prevState,
        pagamento: {
          ...prevState.pagamento,
          historicoPagamento,
        },
      };
    });
  };

  handleDateChange = (date) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        pagamento: {
          ...prevState.pagamento,
          previsaoPagamento: moment(date).format('YYYY-MM-DD'),
        },
      };
    });
  };

  componentDidMount() {
    this.validateForm();
  }

  render() {
    const {
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
        historicoPagamento,
        referenciaCliente,
        clienteDesistente,
      },
    } = this.state;
    const {
      clientReducer: { idadeCliente, nomeCliente },
      eventReducer: { nomePasseio, dataPasseio },
    } = this.props;
    return (
      <form action="" id="form-send" onSubmit={this.handleSubmit}>
        <Alert
          icon={false}
          severity="info"
          sx={{ justifyContent: 'center', textAlign: 'center' }}
        >
          <Typography variant="h5">{`Cliente: ${nomeCliente}`}</Typography>
          <Typography variant="h5">{`Passeio: ${nomePasseio} EM ${moment(
            dataPasseio
          ).format('DD/MM/YYYY')}`}</Typography>
        </Alert>
        <Grid container justifyContent="space-between" p={3}>
          <Grid item xs={12} md={12}>
            <TextField
              id="standard-basic"
              label="Valor vendido: "
              variant="standard"
              fullWidth
              name="valorVendido"
              value={valorVendido || '0'}
              onChange={this.handleNumbers}
              onBlur={this.toFloat}
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
              onChange={this.handleNumbers}
              onBlur={this.toFloat}
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
              onChange={this.handleNumbers}
              onBlur={(e) => {
                this.toFloat(e);
                this.setHistory();
              }}
              sx={{ mb: 3 }}
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
              onChange={this.handleNumbers}
              onBlur={this.toFloat}
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
              onChange={this.handleNumbers}
              onBlur={this.toFloat}
              sx={{ mb: 3 }}
              error={false}
            />
          </Grid>
          <Grid item xs={12} md={4} marginBottom={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Previsão de pagamento: "
                renderInput={(params) => <TextField {...params} />}
                onChange={(e) => this.handleDateChange(e)}
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
              onChange={this.handleNumbers}
              onBlur={this.toFloat}
              sx={{ mb: 3 }}
              error={false}
              required
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
              onChange={this.handleNumbers}
              onBlur={this.toInt}
              sx={{ mb: 3 }}
              error={false}
              required
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
              value={idadeCliente}
              // onChange={this.this.handleChange}
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
              onChange={this.handleChange}
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
              onChange={this.handleChange}
              sx={{ mb: 3 }}
              error={false}
              required
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
              onChange={this.handleChange}
              sx={{ mb: 3 }}
              error={false}
              required
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
                    this.handleChange(e);
                  }}
                />
                <FormControlLabel
                  value={0}
                  control={<Radio />}
                  label="Não"
                  onClick={(e) => {
                    this.handleChange(e);
                  }}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}></Grid>
          <Grid item xs={12} md={4} marginBottom={3}>
            <FormControl component="fieldset">
              <FormLabel component="legend" required>
                Cliente parceiro:
              </FormLabel>
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
                    this.handleChange(e);
                  }}
                />
                <FormControlLabel
                  value={0}
                  control={<Radio />}
                  label="Não"
                  onClick={(e) => {
                    this.handleChange(e);
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
              onChange={this.handleChange}
              sx={{ mb: 3 }}
              required
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
              name="historicoPagamento"
              value={historicoPagamento || ' '}
              onChange={this.handleChange}
              sx={{ mb: 3 }}
            />
          </Grid>
        </Grid>
      </form>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  dispatchPaymentInfo: (state) => dispatch(setPaymentInfo(state)),
});
const mapStateToProps = (state) => ({ ...state });

export default connect(mapStateToProps, mapDispatchToProps)(FormPagamento);
