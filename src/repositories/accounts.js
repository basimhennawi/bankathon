const { getAccounts } = require('../lib/coinbase');

const accounts = {
  all: getAccounts,
};

export default accounts;
