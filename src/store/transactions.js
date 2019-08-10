const RECEIVE_TRANSACTIONS = "/transactions/RECEIVE_TRANSACTIONS";
import db, { listenTo, getDataByType, deleteData, addData } from "./db";

const initialState = {
  transactions: []
};

export const addTransaction = params => {
  return (dispatch, getState) => {
    addData("transaction", params);
  };
};

export const getTransactions = () => {
  return (dispatch, getState) => {
    getDataByType({
      type: "transaction",
      relations: [
        { name: "article", relations: [{ name: "brand", relations: [] }] }
      ]
    }).then(res => {
      dispatch(receiveTransactions(res.docs));
    });
  };
};

export const loadTransactions = () => {
  return (dispatch, getState) => {
    dispatch(getTransactions());
    listenTo("type", "transaction", dispatch, getTransactions);
  };
};

export const deleteTransaction = id => {
  return dispatch => {
    deleteData(id);
  };
};

export const receiveTransactions = transactions => ({
  type: RECEIVE_TRANSACTIONS,
  transactions: transactions
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_TRANSACTIONS:
      return { ...state, transactions: action.transactions };
    default:
      return state;
  }
}

export default reducer;
