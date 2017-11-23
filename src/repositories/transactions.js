const { getTransactions } = require('../lib/coinbase');

const transactions = {
  all: data => getTransactions(data),
};

export default transactions;
