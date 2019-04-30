import React, { Component } from "react";
import "../styles/App.css";
import { getTransaction } from "./Bigchaindb";
import Logo from "./Logo";
import Credit from "./Credit";

class View extends Component {
  constructor(props) {
    super(props);
    this.state = { hash: props.match.params.hash, transaction: "" };
  }

  componentDidMount() {
    if (typeof this.state.hash !== "undefined") {
      this.getTransaction();
    }
  }

  getTransaction = () => {
    let tx = getTransaction(this.state.hash);
    tx.then(res => this.setState({ transaction: res }));
  };

  updateHash = event => {
    this.setState({ hash: event.target.value });
  };

  render() {
    return (
      <div className="App">
        <main className="App-header">
          <Logo />
          <h3>View data from the Blockchain</h3>
          {this.state.transaction ? (
            this.state.transaction.metadata ? (
              <div>
                <table className="transaction">
                  <tbody>
                    <tr>
                      <th colSpan="2">Transaction</th>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <p className="hash">{this.state.hash}</p>
                      </td>
                    </tr>
                    <tr>
                      <th colSpan="2">Project</th>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <p className="hash">
                          {this.state.transaction.asset.data
                            ? this.state.transaction.asset.data.project
                            : this.state.transaction.asset.id}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <th colSpan="2">Donor</th>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <p className="hash">
                          {this.state.transaction.outputs[0].public_keys}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <th>Date</th>
                      <th>Amount</th>
                    </tr>
                    <tr>
                      <td>
                        {new Date(
                          this.state.transaction.metadata.date
                        ).toLocaleDateString("en-GB", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </td>
                      <td>{this.state.transaction.metadata.amount} €</td>
                    </tr>
                    <tr>
                      <th colSpan="2">Message:</th>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        {this.state.transaction.metadata.message}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              "No data available"
            )
          ) : (
            <div className="form">
              <p>Search a transition by hash:</p>
              <input
                placeholder="Insert transaction hash..."
                onChange={this.updateHash}
                value={this.state.hash}
                size="64"
              />

              <button
                onClick={() => this.getTransaction()}
                disabled={!this.state.hash}
              >
                Get transaction
              </button>
            </div>
          )}
        </main>
        <Credit />
      </div>
    );
  }
}

export default View;
