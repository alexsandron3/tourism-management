import React, { Component } from 'react';
import Card from '../Card';
import { nanoid } from 'nanoid';
import getDespesas from '../../services/getDespesas';

const inputs = ['Aereo', 'AlomocoCliente', 'AlmocoMotorista'];

export default class Despesa extends Component {
  constructor() {
    super();
    // this.state = inputs.reduce((a, v) => ({ ...a, [v]: 0 }), {});
    this.state = { inputName: [], states: {} };
    this.handleChange = this.handleChange.bind(this);
    this.sum = this.sum.bind(this);
  }
  componentDidMount() {
    this.getApiData();
  }
  async getApiData() {
    // .reduce((res, key) => (res[key] = obj[key]), {});
    const despesas = await getDespesas();
    const getAndOrderKeys = (obj) =>
      Object.keys(obj)
        .sort((a, b) => (a < b ? 1 : -1))
        .filter((obj) => !obj.includes('id'))
        .map((obj) => obj.split('valor').pop());
    const keys = getAndOrderKeys(despesas);
    this.setState({
      inputName: getAndOrderKeys(despesas),
      states: Object.assign({}, ...keys.map((key) => ({ [key]: 0 }))),
    });
    console.log(Object.keys(this.state.states).length);
  }
  handleChange({ target }) {
    let input = target.name.split(/(?=[A-Z])/);
    input =
      input.length > 2 ? input.slice(1 - input.length).join('') : input.pop();
    this.setState((previousState, _props) => {
      previousState[target.name] = parseFloat(target.value);
    });
    this.sum(input);
  }
  sum(input) {
    this.setState((previousState, _props) => {
      previousState[`total${input}`] =
        previousState[`valor${input}`] * previousState[`quantidade${input}`];
      document.getElementById(`total${input}`).value =
        previousState[`total${input}`];
    });
  }

  render() {
    return (
      <Card name="Despesa">
        {console.log()}
        {this.state.inputName.map((input, index) => (
          <div className="field is-horizontal columns" key={nanoid()}>
            <div className="field-label has-text-left column is-3">
              <label className="label " htmlFor="1">
                {input}
              </label>
            </div>
            <div className="field-body">
              <input
                type="number"
                className="input column is-7 mr-2"
                name={`valor${input}`}
                id={index}
                value={this.state.input}
                onChange={this.handleChange}
              />
              <input
                type="number"
                className="input mr-2"
                name={`quantidade${input}`}
                id={index}
                value={this.state.input}
                onChange={this.handleChange}
              />
              <input
                type="number"
                className="input mr-2"
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
