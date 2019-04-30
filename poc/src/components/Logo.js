import React, { Component } from "react";
import logo from "../styles/logo.svg";
export default class Logo extends Component {
  render() {
    return (
      <React.Fragment>
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Naima PoC</h1>
      </React.Fragment>
    );
  }
}
