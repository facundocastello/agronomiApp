import React, { Component } from "react";
import { connect } from "react-redux";

import {
  addTransaction,
  deleteTransaction,
  loadTransactions
} from "../store/transactions";

class TransactionsComponent extends Component {
  state = {
    transactionArticle: "",
    articleName: "",
    transactionQtty: "",
    pouch: ""
  };

  componentDidMount() {
    this.props.loadTransactions();
  }

  renderSelectArticles = () => {
    const { articles } = this.props;
    return (
      articles &&
      articles.map((element, index) => (
        <option id={element._id} key={`user-${index}`} selected={index === 0}>
          {element.name}
        </option>
      ))
    );
  };

  renderTransactions = () => {
    const { transactions } = this.props;
    return (
      transactions &&
      transactions.map((transaction, index) => (
        <div
          className="d-flex justify-content-around"
          id={transaction._id}
          key={`user-${index}`}
          selected={index === 0}
        >
          <div className="border w-100">{transaction.article[0].name}</div>
          <div className="border w-100">
            {transaction.article[0].brand[0].name}
          </div>
          <div className="border w-100">{transaction.qtty}</div>
          {/* <div className="bg-danger" onClick={deleteBrand(brand._id)} >X</div> */}
        </div>
      ))
    );
  };

  onInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleAddTransaction = () => {
    let { transactionArticle } = this.state;
    if (transactionArticle === "")
      transactionArticle = this.props.articles[0]._id;
    this.props.addTransaction({
      qtty: this.state.transactionQtty,
      article: transactionArticle
    });
  };

  handleSelect = event => {
    this.setState({
      transactionArticle: this.props.articles[event.target.selectedIndex]._id
    });
  };

  render() {
    return (
      <div>
        <div className="d-flex justify-content-around">
          <div className="w-75 mt-4">
            <h1 className="bg-light">Transactions</h1>
            <div className="d-flex">
              <div>Quantity</div>
              <div>
                <input
                  onChange={this.onInputChange}
                  name="transactionQtty"
                  type="text"
                />
              </div>
              <div>Article</div>
              <div>
                <select
                  onChange={this.handleSelect}
                  name="transactionArticle"
                  id=""
                >
                  {" "}
                  {this.renderSelectArticles()}{" "}
                </select>
              </div>
            </div>
            <a class='bg-warning p-2 rounded border' onClick={this.handleAddTransaction}>Add transaction</a>
            <div className="d-flex justify-content-around bg-warning mt-3">
              <div className="font-weight-bold w-100">article name</div>
              <div className="font-weight-bold w-100">brand name</div>
              <div className="font-weight-bold w-100">qtty</div>
              {/* <div className="bg-danger" onClick={deleteBrand(brand._id)} >X</div> */}
            </div>
            <div>{this.renderTransactions()}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ articles, transactions }) => ({
  ...transactions,
  ...articles
});

const mapDispatchToProps = {
  addTransaction,
  deleteTransaction,
  loadTransactions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsComponent);
