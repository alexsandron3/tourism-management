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
import axios from 'axios';
import ConfirmationDialog from '../../partials/ConfirmationDialog';
import { ToastContainer } from 'react-toastify';
import {
  clearEvent,
  disableButton,
  newPayment,
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
      selectedPasseio: {},
      paymentExists: false,
      cliente: {},
      error: false,
      isButtonDisabled: true,
    };
  }
  componentDidMount() {
    this.fetchCliente();
  }

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

  fetchPagamento = async () => {
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
  };

  sendData = () => {
    const {
      paymentReducer: { pagamento },
      dispatchNewPayment,
      eventReducer,
      clientReducer,
    } = this.props;
    const filteredState = pagamento.map(
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
    // console.log(this.props);
    dispatchNewPayment({
      ...filteredState[0],
      idPasseio: eventReducer.idPasseio,
      idCliente: clientReducer.idCliente,
      idadeCliente: clientReducer.idadeCliente,
    });

    //   setTimeout(() => {
    //     toast.info(left, {
    //       pauseOnFocusLoss: true,
    //     });
    //   }, 300);
    //   setTimeout(() => {
    //     window.open(
    //       `http://localhost/SistemaFabio-2.0/contrato.php?id=${idCliente}`
    //     );
    //   }, 300);
    // }
  };

  render() {
    const { error, paymentExists, isLoading } = this.state;
    const { stepperReducer, handleNext, handlePrevious } = this.props;

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
          variant="outlined"
          sx={{ mr: '5px' }}
        >
          Anterior
        </Button>
        <Button
          onClick={() =>
            stepperReducer.activeStep === 2 ? this.sendData() : handleNext()
          }
          disabled={stepperReducer.isButtonDisabled}
          variant="outlined"
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
  dispatchNewPayment: (value) => dispatch(newPayment(value)),
});

const mapStateToProps = (state) => ({ ...state });

export default connect(mapStateToProps, mapDispatchToProps)(Pagamento);
