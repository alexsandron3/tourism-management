import React, { Component } from "react";
import Card from "../Card";
import { nanoid } from "nanoid";
const inputs = ["Aereo", "AlomocoCliente", "AlmocoMotorista"];
export default class Despesa extends Component {
  render() {
    return (
      <Card name="Despesa">
        {inputs.map((input) => (
          <div className="field columns">
            <div className="field-body">
              <div className="field-label column is-one-fifth has-text-left">
                <label className="label" htmlFor="1">
                  {input}
                </label>
              </div>
              <input
                type="number"
                className="input column is-6 mr-2"
                name={`valor${input}`}
                id="1"
              />
              <input
                type="number"
                className="input is-1 mr-2"
                name={`quantidade${input}`}
                id="3"
              />
              <input
                type="number"
                className="input mr-2"
                name={`total${input}`}
                id="4"
                disabled
              />
            </div>
          </div>
        ))}
      </Card>
    );
  }
}
