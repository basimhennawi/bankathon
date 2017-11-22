// 'use strict';

const coinbase = require('coinbase');
const Client = coinbase.Client;

const map = require('../map');
var client;

/** Initialize client object 
 * @method init
 */
const init = () => {
  console.log('process.env.COINBASE_API_KEY', process.env.COINBASE_API_KEY);
  client = new Client({
    'apiKey': process.env.COINBASE_API_KEY,
    'apiSecret': process.env.COINBASE_API_SECRET,
  });
};

/**
 * Listing available accounts
 * @method getAccounts
 * @return {Promise} - Array of accounts
 */
const getAccounts = () => {
  return new Promise((resolve, reject) => {
    client.getAccounts({}, (err, accts) => {
      if (err) {
        reject(err);
      } else {
        resolve(map.accounts(accts));
      }
    });
  });
};

module.exports = {
  init,
  getAccounts,
};
