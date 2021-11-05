import { Step, Stepper, StepLabel, Button, Alert } from '@mui/material';
import React, { Component } from 'react';
import Content from '../../partials/Content';
import SelecionarPasseio from '../../partials/SelecionarPasseio';
import FormPagamento from '../../partials/FormPagamento';
import axios from 'axios';
import { BigNumber } from 'bignumber.js';
import moment from 'moment';
import ConfirmationDialog from '../../partials/ConfirmationDialog';
import { toast, ToastContainer } from 'react-toastify';

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
      validateForm: this.validateForm,
      selectedPasseio: {},
      paymentExists: false,
      cliente: {},
      pagamento: {
        valorVendido: 500,
        valorPago: 400,
        novoValorPago: 300,
        valorPendente: -100,
        taxaPagamento: 100,
        previsaoPagamento: null,
        localEmbarque: '2',
        transporte: '3',
        opcionais: '4',
        anotacoes: '5',
        seguroViagem: 1,
        clienteParceiro: 1,
        referenciaCliente: '6',
        valorContrato: 500,
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
    this.fetchCliente();
  }

  validateForm = () => {
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

  fetchCliente = async () => {
    const {
      match: { params },
    } = this.props;
    const {
      data: { cliente = [], success },
    } = await axios({
      method: 'GET',
      url: `https://apifabio.herokuapp.com/cliente.php?id=${params.id}`,
    });

    if (success) {
      this.setState({ cliente: cliente[0] });
    }
    // console.log(...cliente);
  };

  fetchPasseios = async () => {
    const {
      data: { passeio = [] /* success, message */ },
    } = await axios({
      method: 'GET',
      url: `https://apifabio.herokuapp.com/passeio.php?pesquisarPasseio=`,
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
    } = await axios({
      method: 'GET',
      url: `https://apifabio.herokuapp.com/pagamento.php?idPasseio=${selectedPasseio.idPasseio}&idCliente=${params.id}`,
    });

    if (success === 1) {
      this.setState({ paymentExists: true });
    } else {
      this.setState({ isButtonDisabled: false });
    }
    // console.log(data);
  };

  sendData = async () => {
    const {
      selectedPasseio: { idPasseio },
      cliente: { idCliente, idadeCliente },
      pagamento,
    } = this.state;
    const filteredState = [pagamento].map(
      ({
        novoValorPago,
        defaultHistoricoPagamento,
        referenciaCliente,
        ...pagamento
      }) => pagamento
    );
    const {
      data: { success, message },
      data,
    } = await axios({
      method: 'POST',
      url: `https://apifabio.herokuapp.com/pagamento.php?`,
      data: { ...filteredState[0], idCliente, idPasseio, idadeCliente },
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
  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({ activeStep: activeStep + 1 });
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
        {paymentExists && <ConfirmationDialog />}
        {steps[activeStep].content}
        {error && (
          <Alert severity="warning" sx={{ justifyContent: 'center' }}>
            Por favor, preencha todos os campos corretamente!
          </Alert>
        )}
        {/* { } */}
        <Button
          onClick={activeStep === 2 ? this.sendData : this.handleNext}
          disabled={isButtonDisabled}
        >
          Próximo
        </Button>
        <ToastContainer pauseOnFocusLoss />
      </Content>
    );
  }
}

export default Pagamento;
