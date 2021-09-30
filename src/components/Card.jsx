import React, { Component } from "react";

export default class Card extends Component {
  render() {
    return (
      <main class="main-content container py-3">
        <div class="columns is-mobile is-centered p-5">
          <div class="column is-four-fifths box p-5">
            <p class="is-size-3 has-text-centered has-text-black p-2 mb-6">
              {this.props.name}
            </p>
            {this.props.children}
          </div>
        </div>
      </main>
    );
  }
}
