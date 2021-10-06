import React, { Component } from 'react';
import Card from '../Card';
import { nanoid } from 'nanoid';
import BigNumber from 'bignumber.js';
// or

const defaultInputs = [
  'Aereo',
  'AlmocoCliente',
  'AlmocoMotorista',
  'AutorizacaoTransporte',
  'Escuna',
  'Estacionamento',
  'Guia',
  'Hospedagem',
  'Impulsionamento',
  'Ingresso',
  'KitLanche',
  'Marketing',
  'Micro',
  'Onibus',
  'Pulseira',
  'SeguroViagem',
  'Servicos',
  'Taxi',
  'Van',
  'outros',
  'totalDespesas',
];
export default class Despesa extends Component {
  constructor() {
    super();
    this.state = { inputName: defaultInputs, states: {} };
    this.handleChange = this.handleChange.bind(this);
    this.multiply = this.multiply.bind(this);
  }
  
  componentDidMount() {
    this.setDefaultState();
  }

  setDefaultState() {
    const inputsState = defaultInputs.map((input) => ({
      [`valor${input}`]: 0,
      [`quantidade${input}`]: 1,
      [`total${input}`]: 0,
    }));
    this.setState({
      states: Object.assign({}, ...inputsState),
    });
  }
  handleChange({ target }) {
    let input = target.name.split(/(?=[A-Z])/);
    input =
      input.length > 2 ? input.slice(1 - input.length).join('') : input.pop();
    this.setState((previousState, _props) => {
      const newValue = new BigNumber(target.value);
      previousState.states[target.name] = newValue.toFixed(2);
    });
    this.multiply(input);
  }
  multiply(input) {
    this.setState((previousState, _props) => {
      const total = new BigNumber(
        previousState.states[`valor${input}`] *
          previousState.states[`quantidade${input}`] || 0
      );

      previousState.states[`total${input}`] = total.toFixed(2);
      document.getElementById(`total${input}`).value =
        previousState.states[`total${input}`];
    });
  }

  total() {}

  render() {
    return (
      <Card name="Despesa">
        {console.log()}
        {this.state.inputName.map((input, index) => (
          <div className="field is-horizontal columns" key={nanoid()}>
            <div className="field-label has-text-left column is-3">
              <label className="label " htmlFor="1">
                {/* {colocando espaço entre as palavras} */}
                {input.split(/(?=[A-Z])/).join(' ')}
              </label>
            </div>
            <div className="field-body">
              <input
                type="number"
                className="input column is-6 mr-2"
                name={`valor${input}`}
                id={index}
                value={this.state.inputName.input}
                onChange={this.handleChange}
              />
              <input
                type="number"
                className={`input mr-2 ${
                  input === 'outros' || input === 'totalDespesas'
                    ? 'is-hidden'
                    : ''
                }`}
                name={`quantidade${input}`}
                id={index}
                value={this.state.inputName.input}
                onChange={this.handleChange}
              />
              <input
                type="number"
                className={`input mr-2 ${
                  input === 'outros' || input === 'totalDespesas'
                    ? 'is-hidden'
                    : ''
                }`}
                name={`total${input}`}
                id={`total${input}`}
                value={this.state.input}
                disabled
              />
            </div>
          </div>
        ))}
      </Card>
    );
  }
}
