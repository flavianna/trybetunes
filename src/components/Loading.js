import React, { Component } from 'react';

export default class Loading extends Component {
  render() {
    return (
      <section className="Loading">
        <div className="loading" />
        <span className="material-symbols-outlined m-">
          pending
        </span>
      </section>
    );
  }
}
