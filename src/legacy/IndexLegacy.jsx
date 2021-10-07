import React, { Component } from "react";
import Card from "../components/Card";

export default class Index extends Component {
  render() {
    return (
      <Card name="Relatório Gerencial de Vendas">
        <form action>
          <div className="field is-horizontal">
            <div className="field-body">
              <div className="field">
                <input
                  type="date"
                  className="title has-text-black"
                  name="date"
                  id="date"
                />
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-body">
              <div className="field">
                <div className="control mb-2">
                  <input type="checkbox" name id="showCloseds" />
                  <label htmlFor="showCloseds" className="checkbox">
                    EXIBE PASSEIOS ENCERRADOS
                  </label>
                </div>
                <button
                  className="button is-info is-outlined is-small"
                  id="search"
                >
                  Pesquisar
                </button>
              </div>
            </div>
          </div>
        </form>
        <div className="container">
          <div className="b-table">
            <div className="table-wrapper has-mobile-cards mt-3">
              <table
                className="table has-text-centered is-striped is-hoverable is-fullwidth"
                id="indexTable"
              >
                <thead>
                  <tr>
                    <th>PASSEIO</th>
                    <th>DATA</th>
                    <th>RESERVADOS</th>
                    <th>INTERESSADOS</th>
                    <th>PARCEIROS</th>
                    <th>CRIANÇAS</th>
                    <th>META DE VENDA</th>
                    <th>VAGAS DISPONÍVEIS</th>
                  </tr>
                </thead>
                <tbody className id="tableBody"></tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}
