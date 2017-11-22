const { getAccounts } = require('../lib/coinbase');

const accounts = {
  all: data => getAccounts(data),
};

export default accounts;
