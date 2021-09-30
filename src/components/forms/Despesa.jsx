import React, { Component } from "react";
import Card from "../Card";

export default class Despesa extends Component {
  render() {
    return (
      <Card name="Despesa">
        <div className="field columns">
          <div className="field-body">
            <div className="field-label">
              <label className="label ml-3 mt-1" htmlFor="1">
                1
              </label>
            </div>
            <input
              type="number"
              className="input column is-9 mr-2"
              name=""
              id="1"
              clas
            />
            <input type="number" className="input" name="" id="3" />
            <input type="number" className="input is-" name="" id="4" />
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-body">
            <div className="field-label">
              <label className="label" htmlFor="2">
                2
              </label>
            </div>
            <input type="number" className="input" name="" id="2" />
            <input type="number" className="input" name="" id="5" />
            <input type="number" className="input" name="" id="6" />
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label">
            <label className="label" htmlFor="3">
              3
            </label>
          </div>
          <input type="number" className="input" name="" id="7" />
          <input type="number" className="input" name="" id="8" />
          <input type="number" className="input" name="" id="9" />
        </div>
      </Card>
    );
  }
}
