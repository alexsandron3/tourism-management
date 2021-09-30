import React from "react";
import { Component } from "react";

export class Header extends Component { 
  render () {
    return (
      <nav className="navbar mb-6">
      <div className="navbar-brand">
      <a className="navbar-item" href="#google.com">
        <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width={112} height={28} />
      </a>
      <div className="navbar-burger" data-target="navLinks" id="burger">
        <span />
        <span />
        <span />
      </div>
    </div>
    <div id="navLinks" className="navbar-menu">
      <div className="navbar-start is-uppercase">
        <a className="navbar-item" href="#google.com">
          Início
        </a>
        {/* Cadastrar */}
        <div className="navbar-item has-dropdown is-hoverable">
          <a className="navbar-link" href="#google.com">
            Cadastrar
          </a>
          <div className="navbar-dropdown is-boxed">
            <a className="navbar-item" href="#google.com">
              Cliente
            </a>
            <a className="navbar-item" href="#google.com">
              Despesas
            </a>
            <a className="navbar-item" href="#google.com">
              Passeio
            </a>
          </div>
        </div>
        {/* Passeios */}
        <a className="navbar-item" href="#google.com">
          Passeios
        </a>
        {/* Pesquisar */}
        <div className="navbar-item has-dropdown is-hoverable">
          <a className="navbar-link" href="#google.com">
            Pesquisar
          </a>
          <div className="navbar-dropdown is-boxed">
            <a className="navbar-item" href="#google.com">
              Cliente
            </a>
            <a className="navbar-item" href="#google.com">
              Passeio
            </a>
            <a className="navbar-item" href="#google.com">
              Passeio
            </a>
          </div>
        </div>
        {/* Relatórios */}
        <div className="navbar-item has-dropdown is-hoverable">
          <a className="navbar-link" href="#google.com">
            Relatórios
          </a>
          <div className="navbar-dropdown is-boxed">
            <a className="navbar-item" href="#google.com">
              Aniversariantes do Mês
            </a>
            <a className="navbar-item" href="#google.com">
              Logs
            </a>
            <a className="navbar-item" href="#google.com">
              Pagamentos Pendentes
            </a>
            <a className="navbar-item" href="#google.com">
              Pagamentos Realizados
            </a>
            <a className="navbar-item" href="#google.com">
              Relatório Periódico de Vendas
            </a>
            <hr className="navbar-divider" />
            <a className="navbar-item" href="#google.com">
              Relatório de Vendas
            </a>
          </div>
        </div>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="field is-grouped">
            <p className="control">
              <a className="bd-tw-button button" data-social-network="Twitter" data-social-action="tweet" data-social-target="https://bulma.io" target="_blank" href="https://twitter.com/intent/tweet?text=Bulma: a modern CSS framework based on Flexbox&hashtags=bulmaio&url=https://bulma.io&via=jgthms" rel="noreferrer">
                <span className="icon">
                  <i className="fas fa-sign-out-alt" />
                </span>
                <span>
                  Sair
                </span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </nav>
  
    );
  }
};