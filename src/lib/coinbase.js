const coinbase = require('coinbase');
const Client = coinbase.Client;

const map = require('../map');
var client;

const errorMessage = {
  MISSING_API_KEY_AND_SECRET: 'Missing coinbase API key and secret.',
}

/** Initialize client object 
 * @method init
 */
const init = (key, secret) => {
  client = new Client({
    'apiKey': key || process.env.COINBASE_API_KEY,
    'apiSecret': secret || process.env.COINBASE_API_SECRET,
  });
};

/**
 * Ger
 * @method getCurrentUser
 * @return {Promise} - User data
 */
const getCurrentUser = ({ key, secret }) => {
  return new Promise((resolve, reject) => {
    if (key && secret) {
      init(key, secret);
    } else {
      reject(new Error(errorMessage.MISSING_API_KEY_AND_SECRET));
    }
    client.getCurrentUser((err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
};

/**
 * Listing available accounts
 * @method getAccounts
 * @return {Promise} - Array of accounts
 */
const getAccounts = ({ key, secret }) => {
  return new Promise((resolve, reject) => {
    if (key && secret) {
      init(key, secret);
    } else {
      reject(new Error(errorMessage.MISSING_API_KEY_AND_SECRET));
    }
    getCurrentUser({ key, secret })
      .then(user => {
        client.getAccounts({}, (err2, accts) => {
          if (err2) {
            reject(err2);
          } else {
            resolve(map.accounts(accts, user));
          }
        });
      })
  });
};

/**
 * Listing current transactions
 * @method getTransactions
 * @return {Promise} - Array of transactions
 */
const getTransactions = ({ key, secret, accountId }) => {
  return new Promise((resolve, reject) => {
    if (key && secret) {
      init(key, secret);
    } else {
      reject(new Error(errorMessage.MISSING_API_KEY_AND_SECRET));
    }
    getCurrentUser({ key, secret })
      .then(user => {
        client.getAccount(accountId, function(err, account) {
          account.getTransactions(null, (err2, txns) => {
            if (err2) {
              reject(err2);
            } else {
              resolve(map.transactions(txns, account, user));
            }
          });
        });
      });
  });
};

module.exports = {
  init,
  getCurrentUser,
  getAccounts,
  getTransactions,
};
