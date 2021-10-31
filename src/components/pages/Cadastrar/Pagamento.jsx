import { Step, Stepper, StepLabel, Button, Alert } from '@mui/material';
import React, { Component } from 'react';
import Content from '../../partials/Content';
import SelecionarPasseio from '../../partials/SelecionarPasseio';
import FormPagamento from '../../partials/FormPagamento';
import axios from 'axios';
import { BigNumber } from 'bignumber.js';
import moment from 'moment';
import ConfirmationDialog from '../../partials/ConfirmationDialog';

class Pagamento extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 1,
      passeio: [],
      handleChange: this.handleChange,
      handleNumbers: this.handleNumbers,
      handleDateChange: this.handleDateChange,
      toFloat: this.toFloat,
      toInt: this.toInt,
      setHistory: this.setHistory,
      handlePasseio: this.handlePasseio,
      fetchPagamento: this.fetchPagamento,
      selectedPasseio: {},
      paymentExists: false,
      pagamento: {
        valorVendido: 0,
        valorPago: 0,
        novoValorPago: 0,
        valorPendente: 0,
        taxaPagamento: 0,
        previsaoPagamento: '',
        localEmbarque: '',
        transporte: '',
        opcionais: '',
        anotacoes: '',
        seguroViagem: 0,
        clienteParceiro: 0,
        historico: '',
        referenciaCliente: '',
        valorContrato: 0,
        clienteDesistente: 0,
        historicoPagamento: 'salve',
        defaultHistoricoPagamento: 'salve',
      },
      error: false,
      isButtonDisabled: true,
    };
  }
  componentDidMount() {
    this.fetchPasseios();
  }

  validateForm = () => {
    const {
      pagamento: { valorVendido, novoValorPago, valorPago, taxaPagamento },
    } = this.state;

    // console.log(valorPago);
    const isValorVendidoHighestNumber =
      valorVendido >= novoValorPago &&
      valorVendido >= valorPago &&
      valorVendido >= taxaPagamento;
    if (!isValorVendidoHighestNumber) {
      this.setState({ error: true, isButtonDisabled: true });
    } else {
      this.setState({ error: false, isButtonDisabled: false });
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

  handlePasseio = async ({ target }) => {
    this.setState({ selectedPasseio: target.value }, () =>
      this.fetchPagamento()
    );
  };

  fetchPasseios = async () => {
    const {
      data: { passeio = [] /* success, message */ },
    } = await axios({
      method: 'GET',
      url: `http://localhost/SistemaFabio-2.0/api/passeio.php?pesquisarPasseio=`,
    });
    this.setState({ passeio });
  };

  fetchPagamento = async () => {
    const { selectedPasseio } = this.state;
    const {
      match: { params },
    } = this.props;
    const {
      data: { /* pagamento = [], */ success /* message */ },
      data,
    } = await axios({
      method: 'GET',
      url: `http://localhost/SistemaFabio-2.0/api/pagamento.php?idPasseio=${selectedPasseio.idPasseio}&idCliente=${params.id}`,
    });

    if (success === 1) {
      this.setState({ paymentExists: true });
    } else {
      this.setState({ isButtonDisabled: false });
    }
    console.log(data);
  };

  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({ activeStep: activeStep + 1 });
  };

  handleChange = ({ target }) => {
    this.setState((prevState) => {
      const value = target.value.toUpperCase();
      return {
        ...prevState,
        pagamento: {
          ...prevState.pagamento,
          [target.name]: value,
        },
      };
    });
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

  render() {
    const { activeStep, error, isButtonDisabled, paymentExists } = this.state;
    const steps = [
      {
        label: 'Registrar Cliente',
      },
      {
        label: 'Selecionar Passeio',
        title: 'Selecione um passeio para Pagamento',
        content: <SelecionarPasseio {...this.state} />,
      },
      {
        label: 'Realizar Pagamento',
        title: 'Pagamento',
        content: <FormPagamento {...this.state} />,
      },
      {
        label: 'Emitir Contrato',
      },
    ];

    return (
      <Content cardTitle={steps[activeStep].title}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(({ label }) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {error && (
          <Alert severity="error" sx={{ justifyContent: 'center' }}>
            Por favor, verifique os campos e tente novamente!
          </Alert>
        )}
        {paymentExists && <ConfirmationDialog />}
        {steps[activeStep].content}
        <Button onClick={this.handleNext} disabled={isButtonDisabled}>
          Próximo
        </Button>
      </Content>
    );
  }
}

export default Pagamento;
