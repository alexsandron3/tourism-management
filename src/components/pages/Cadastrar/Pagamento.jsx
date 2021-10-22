import { Step, Stepper, StepLabel, Button } from '@mui/material';
import React, { Component } from 'react';
import Content from '../../partials/Content';
import SelecionarPagamento from '../../partials/SelecionarPasseio';
import axios from 'axios';
class Pagamento extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 1,
      passeio: [],
      handleChange: this.handleChange,
      selectedPasseio: {},
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
  render() {
    const { activeStep, selectedPasseio } = this.state;
    const steps = [
      {
        label: 'Registrar Cliente',
      },
      {
        label: 'Selecionar Passeio',
        title: 'Selecione um passeio para Pagamento',
        content: <SelecionarPagamento {...this.state} />,
      },
      {
        label: 'Realizar Pagamento',
        title: 'Pagamento',
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
