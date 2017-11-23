const { getAcctType } = require('./helpers');

/**
 * Map coinbase accounts to BAPI accounts
 * @method accounts
 * @return {Promise} - Array of BAPI-valid-schemed accounts
 */
const accounts = (accts, user) => {
  var mappedAccounts = [];

  accts.forEach(acc => {
    mappedAccounts.push({
      acctNo: acc.id,
      acctName: acc.name,
      acctType: getAcctType(acc.type),
      balance: {
        balance: acc.balance.amount,
        balanceCurrencyCode: acc.balance.currency,
        balanceDate: acc.updated_at,
        currencyCode: acc.currency,
      },
      currencyCode: acc.currency,
      /**
      /* HARDCODED stuff
      */
      bankCode: '123454321',
      icon: 'SOME ICON',
      allowedSegTypes: [],
      bankName: 'Coinbase',
      countryCode: 'XYZ',
      fromUPD: false,
      holderName: user ? user.name : '',
      isPortfolio: false,
      onlyAllowedSegTypes: false,
      statement: [],
    });
  });
  
  return mappedAccounts;
};

/**
 * Map coinbase transactions to BAPI transactions
 * @method transactions
 * @return {Promise} - Array of BAPI-valid-schemed account with transactions
 */
const transactions = (txns, account, user) => {
  var mappedAccounts = accounts([account], user);

  txns.forEach(tx => {
    mappedAccounts[0].statement.push({
      amount: tx.amount.amount,
      currency: tx.amount.currency,
      entryDate: tx.created_at,
      valueDate: tx.created_at,
      paymtPurpose: [tx.description, tx.details.title, tx.details.subtitle].join(':'),
    });
  });
  
  return mappedAccounts;
};

module.exports = {
    accounts,
    transactions,
}
