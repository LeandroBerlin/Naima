import React, { Component } from "react";
import "../styles/App.css";
import { createTransaction } from "./Bigchaindb";
import Logo from "./Logo";
import Credit from "./Credit";

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = { hash: [], message: "", project: "", amount: 10 };
  }

  sendTransaction = () => {
    let tx = createTransaction(
      this.state.project,
      this.state.amount,
      this.state.message
    );
    tx.then(resp => this.setState({ hash: resp }));
  };

  updateProject = event => {
    this.setState({ project: event.target.value });
  };

  updateAmount = event => {
    this.setState({ amount: event.target.value });
  };

  updateMessage = event => {
    this.setState({ message: event.target.value });
  };

  render() {
    return (
      <div className="App">
        <main className="App-header">
          <Logo />
          <h3>Write data to BigChainDB</h3>
          {this.state.hash.id ? (
            <div>
              <h4>Transaction Hash: </h4>
              <p className="hash">{this.state.hash.id}</p>
              <p>
                <a
                  href={`/view/` + this.state.hash.id}
                  target="_blank"
                  title="View message"
                  rel="noopener noreferrer"
                >
                  View message in ReactChain
                </a>
              </p>
              <p>
                <a
                  href={
                    `https://test.bigchaindb.com/api/v1/transactions/` +
                    this.state.hash.id
                  }
                  target="_blank"
                  title="BigchainDB"
                  rel="noopener noreferrer"
                >
                  View transaction on BigChainDB testnet
                </a>
              </p>
            </div>
          ) : (
            <div className="form">
              <p>Fill the form to create your donation</p>

              <p>
                <strong>Select a project to support</strong>
              </p>

              <div onChange={this.updateProject} className="projects">
                <div>
                  <input type="radio" name="project" value="A Good Cause" />
                  <label htmlFor="A Good Cause">A Good Cause</label>
                </div>

                <div>
                  <input type="radio" name="project" value="Save the World" />
                  <label htmlFor="Save the World">Save the World</label>
                </div>

                <div>
                  <input type="radio" name="project" value="Save the Oceans" />
                  <label htmlFor="Save the Oceans">Save the Oceans</label>
                </div>
              </div>
              <p>
                <strong>Select amount</strong>
              </p>
              <div>
                <input
                  type="number"
                  name="amount"
                  value={this.state.amount}
                  onChange={this.updateAmount}
                />
                €
              </div>
              <textarea
                placeholder="Add a message"
                onChange={this.updateMessage}
                value={this.state.message}
                cols="50"
                rows="5"
              />

              <button
                onClick={() => this.sendTransaction()}
                disabled={!this.state.message}
              >
                Create transaction
              </button>
            </div>
          )}
        </main>
        <Credit />
      </div>
    );
  }
}

export default Add;
