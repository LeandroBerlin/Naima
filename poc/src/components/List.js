import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/App.css";
import { getTransaction, getTransactions, getHistory } from "./Bigchaindb";
import Logo from "./Logo";
import Credit from "./Credit";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //hash: props.match.params.hash,
      hash: "bbd08d2369edc7f2418d8ac6746f59d778cb062d247db2a11bdbb8e2fdc19cb2",
      transactionsIds: [],
      transactions: []
    };
  }

  componentDidMount() {
    if (typeof this.state.hash === "undefined") {
      this.getTransactions();
    } else {
      this.getHistory();
    }
  }

  getHistory = () => {
    const history = getHistory(this.state.hash);
    history.then(res => this.setState({ transactions: res }));
  };

  getTransactions = () => {
    let listOutputs = getTransactions();
    listOutputs.then(res => {
      this.setState({ transactionsIds: res });
      this.getMetadata();
    });
  };

  getMetadata = () => {
    Object.keys(this.state.transactionsIds).map(transaction => {
      let tx = getTransaction(this.state.transactionsIds[transaction].id);
      return tx.then(res =>
        this.setState(state => {
          const transactions = [...state.transactions, res];
          return {
            transactions
          };
        })
      );
    });
  };

  render() {
    return (
      <div className="App">
        <main className="App-header">
          <Logo />
          <h3>List transaction from BigChainDB</h3>
          {this.state.transactions
            ? Object.keys(this.state.transactions).map((transaction, key) => (
                <table key={key} className="transaction">
                  <tbody>
                    <tr>
                      <th colSpan="2">Transaction</th>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <p className="hash">
                          <Link
                            to={`/view/${
                              this.state.transactions[transaction].id
                            }`}
                          >
                            {this.state.transactions[transaction].id}
                          </Link>
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <th>Date</th>
                      <th>Type</th>
                    </tr>
                    <tr>
                      <td>
                        {new Date(
                          this.state.transactions[transaction].metadata.date
                        ).toLocaleDateString("en-GB", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </td>
                      <td>{this.state.transactions[transaction].operation}</td>
                    </tr>
                  </tbody>
                </table>
              ))
            : "No data available"}
        </main>
        <Credit />
      </div>
    );
  }
}

export default List;
