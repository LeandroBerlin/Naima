import React, { Component } from "react";
import "../styles/App.css";
import Logo from "./Logo";
import Credit from "./Credit";

class About extends Component {
  render() {
    return (
      <div className="App">
        <main className="App-header">
          <Logo />
          <p className="about">
            A boilerplate to start working with BigChainDB using React.
          </p>
          <ul className="tools">
            <li>
              <a
                target="_blank"
                title="React Docs"
                rel="noopener noreferrer"
                href="https://reactjs.org/docs/"
              >
                React 16.7.0
              </a>
            </li>
            <li>
              <a
                target="_blank"
                title="React Router Docs"
                rel="noopener noreferrer"
                href="https://reacttraining.com/react-router/"
              >
                React Router 5
              </a>
            </li>
            <li>
              <a
                target="_blank"
                title="BigchainDB Docs"
                rel="noopener noreferrer"
                href="https://docs.bigchaindb.com/en/latest/"
              >
                BigchainDB 2
              </a>
            </li>
            <li>
              <a
                target="_blank"
                title="BigchainDB JS Driver Docs"
                rel="noopener noreferrer"
                href="https://docs.bigchaindb.com/projects/js-driver/en/latest/index.html"
              >
                BigchainDB JS Driver 4
              </a>
            </li>
            <li>
              <a
                target="_blank"
                title="Bip39 Mnemonic code"
                rel="noopener noreferrer"
                href="https://github.com/bitcoinjs/bip39"
              >
                Bip39 Mnemonic code
              </a>
            </li>
          </ul>
          <p className="about">This POC is using BigchainDB Testnet</p>
        </main>
        <Credit />
      </div>
    );
  }
}

export default About;
