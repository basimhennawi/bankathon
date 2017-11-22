'use strict';

const coinbase = require('coinbase');
const Client = coinbase.Client;

const config = require('../config')
const map = require('../map');

const client = new Client({
  'apiKey': config.apiKey,
  'apiSecret': config.apiSecret
});

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
  getAccounts,
};
