import { Step, Stepper, StepLabel, Button } from '@mui/material';
import React, { Component } from 'react';
import Content from '../../partials/Content';
import SelecionarPasseio from '../../partials/SelecionarPasseio';
import FormPagamento from '../../partials/FormPagamento';
import axios from 'axios';
import { BigNumber } from 'bignumber.js';
import moment from 'moment';
class Pagamento extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 2,
      passeio: [],
      handleChange: this.handleChange,
      handleNumbers: this.handleNumbers,
      handleDateChange: this.handleDateChange,
      toFloat: this.toFloat,
      toInt: this.toInt,
      selectedPasseio: {},
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
      },
    };
  }
  componentDidMount() {
    this.fetchPasseios();
  }

  fetchPasseios = async () => {
    const {
      data: { passeio = [], success, message },
    } = await axios({
      method: 'GET',
      url: `http://localhost/Projetos/SistemaFabio-2.0/api/passeio.php?pesquisarPasseio=`,
    });
    this.setState({ passeio });
  };

  fetchPagamento = async () => {
    const { selectedPasseio } = this.props;
    const {
      data: { passeio = [], success, message },
    } = await axios({
      method: 'GET',
      url: `http://localhost/Projetos/SistemaFabio-2.0/api/passeio.php?idPasseio=${selectedPasseio}`,
    });
    this.setState({ selectedPasseio: passeio });
  };
  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({ activeStep: activeStep + 1 });
  };

  handleChange = ({ target }) => {
    console.log(target);
    this.setState({ [target.name]: target.value });
  };

  handleNumbers = ({ target }) => {
    if (/^[0-9.]*$/.test(target.value)) {
      console.log(target.value);
      this.setState({ pagamento: { [target.name]: target.value } });

      // console.log(this.state[state]);
    }
  };

  toFloat = ({ target }) => {
    this.setState(
      () => {
        const value = new BigNumber(target.value);

        return {
          pagamento: { [target.name]: value.toFixed(2) },
        };
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
  handleDateChange = (date) => {
    // console.log(target);
    this.setState({
      pagamento: { previsaoPagamento: moment(date).format('YYYY-MM-DD') },
    });
    // this.calculateAge(target.value);
  };

  render() {
    const { activeStep, selectedPasseio } = this.state;
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
        {steps[activeStep].content}
        <Button
          onClick={this.handleNext}
          disabled={selectedPasseio ? false : true}
        >
          Próximo
        </Button>
      </Content>
    );
  }
}

export default Pagamento;
