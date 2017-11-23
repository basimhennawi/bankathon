const coinbase = require('coinbase');
const Client = coinbase.Client;

const map = require('../map');
var client;

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
  if (key && secret) init(key, secret);

  return new Promise((resolve, reject) => {
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
  console.log(key, secret);
  if (key && secret) init(key, secret);

  return new Promise((resolve, reject) => {
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

module.exports = {
  init,
  getCurrentUser,
  getAccounts,
};
