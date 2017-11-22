const { getAcctType } = require('./helpers');

/**
 * Map coinbase accounts to BAPI accounts
 * @method accounts
 * @return {Promise} - Array of BAPI-valid-schemed accounts
 */
const accounts = (accts) => {
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
      /**
      /* HARDCODED stuff
      */
      bankCode: 'COINBASE',
      icon: 'SOME ICON',
      allowedSegTypes: [],
      bankName: 'Coinbase',
      countryCode: 'XYZ',
      currencyCode: 'ABC',
      fromUPD: false,
      holderName: 'Dennis Lutter',
      isPortfolio: false,
      onlyAllowedSegTypes: false,
    });
  });
  
  return mappedAccounts;
};

module.exports = {
    accounts,
}
