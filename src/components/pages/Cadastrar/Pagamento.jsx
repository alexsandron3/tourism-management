import {
  Step,
  Stepper,
  StepLabel,
  Button,
  Alert,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import React, { Component } from 'react';
import Content from '../../partials/Content';
import SelecionarPasseio from '../../partials/SelecionarPasseio';
import FormPagamento from '../../partials/FormPagamento';
import axios from 'axios';
import { BigNumber } from 'bignumber.js';
import moment from 'moment';
import ConfirmationDialog from '../../partials/ConfirmationDialog';
import { toast, ToastContainer } from 'react-toastify';
import {
  clearEvent,
  disableButton,
  nextStep,
  previousStep,
  setNewEvent,
} from '../../../actions';
import { connect } from 'react-redux';

class Pagamento extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
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
      error: false,
      isButtonDisabled: true,
    };
  }
  componentDidMount() {
    // this.fetchPasseios();
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

  // handlePasseio = async ({ target }) => {
  //   const { dispatchSetValue } = this.props;
  //   dispatchSetValue(target.value);
  //   this.setState({ selectedPasseio: target.value, isLoading: true }, () =>
  //     this.fetchPagamento()
  //   );
  //   this.setState({ isLoading: false });
  // };

  fetchCliente = async () => {
    this.setState({ isLoading: true });
    const {
      match: { params },
    } = this.props;
    const {
      data: { cliente = [], success },
    } = await axios({
      method: 'GET',
      url: `http://localhost/SistemaFabio-2.0/api/cliente.php?id=${params.id}`,
    });
    this.setState({ isLoading: false });
    if (success) {
      this.setState({ cliente: cliente[0] });
    }
    // console.log(...cliente);
  };

  // fetchPasseios = async () => {
  //   this.setState({ isLoading: true });

  //   const {
  //     data: { passeio = [] /* success, message */ },
  //   } = await axios({
  //     method: 'GET',
  //     url: `http://localhost/SistemaFabio-2.0/api/passeio.php?pesquisarPasseio=`,
  //   });
  //   this.setState({ passeio, isLoading: false });
  // };

  fetchPagamento = async () => {
    // const { selectedPasseio } = this.state;
    const { eventReducer } = this.props;
    this.setState({ isLoading: true });

    const {
      match: { params },
    } = this.props;
    const {
      data: { success, pagamento },
      data,
    } = await axios({
      method: 'GET',
      url: `http://localhost/SistemaFabio-2.0/api/pagamento.php?idPasseio=${eventReducer.idPasseio}&idCliente=${params.id}`,
    });
    console.log(data);

    if (success === 1) {
      this.setState({
        paymentExists: true,
        isButtonDisabled: false,
        pagamento: { ...pagamento[0] },
      });
    } else {
      this.setState({ isButtonDisabled: false });
    }
    this.setState({ isLoading: false });

    // console.log(...pagamento);
  };

  sendData = async () => {
    this.setState({ isLoading: true });

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
        createdAt,
        dataPagamento,
        lastModified,
        ...pagamento
      }) => pagamento
    );
    if (Object.keys(pagamento).some((key) => key === 'idPagamento'))
      alert('opa!!');
    const {
      data: { success, message, left },
      data,
    } = await axios({
      method: 'POST',
      url: `http://localhost/SistemaFabio-2.0/api/pagamento.php?`,
      data: { ...filteredState[0], idCliente, idPasseio, idadeCliente },
    });
    console.log(data);
    if (success) {
      toast.success(message, {
        pauseOnFocusLoss: true,
      });
      setTimeout(() => {
        toast.info(left, {
          pauseOnFocusLoss: true,
        });
      }, 300);
      setTimeout(() => {
        window.open(
          `http://localhost/SistemaFabio-2.0/contrato.php?id=${idCliente}`
        );
      }, 300);
    } else {
      toast.error(message, {
        pauseOnFocusLoss: true,
      });
    }
    this.setState({ isLoading: false });
  };

  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({ activeStep: activeStep + 1 });
  };

  handlePrevious = () => {
    const { activeStep } = this.state;
    this.setState({ activeStep: activeStep - 1 });
    this.fetchPagamento();
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
    const { activeStep, error, paymentExists, isLoading } = this.state;
    const { paymentReducer, stepperReducer, handleNext, handlePrevious } =
      this.props;
    console.log(stepperReducer.steps[stepperReducer.activeStep]);

    return (
      <Content
        cardTitle={stepperReducer.steps[stepperReducer.activeStep].title}
      >
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Stepper activeStep={stepperReducer.activeStep} alternativeLabel>
          {stepperReducer.steps.map(({ label }) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {paymentExists && <ConfirmationDialog />}
        {stepperReducer.steps[stepperReducer.activeStep].content}
        {error && (
          <Alert severity="warning" sx={{ justifyContent: 'center' }}>
            Por favor, preencha todos os campos corretamente!
          </Alert>
        )}
        <Button
          onClick={() => handlePrevious()}
          disabled={stepperReducer.activeStep === 1 ? true : false}
        >
          Anterior
        </Button>
        <Button
          onClick={() =>
            stepperReducer.activeStep === 2 ? this.sendData : handleNext()
          }
          disabled={stepperReducer.isButtonDisabled}
        >
          {stepperReducer.activeStep === 2
            ? 'Concluir e emitir contrato'
            : 'Próximo'}
        </Button>

        <ToastContainer pauseOnFocusLoss newestOnTop />
      </Content>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchSetValue: (value) => dispatch(setNewEvent(value)),
  handlePrevious: () => {
    dispatch(previousStep());
    dispatch(clearEvent());
    dispatch(disableButton());
  },
  handleNext: () => dispatch(nextStep()),
});

const mapStateToProps = (state) => ({ ...state });

export default connect(mapStateToProps, mapDispatchToProps)(Pagamento);
