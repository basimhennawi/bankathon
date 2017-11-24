import resource from 'resource-router-middleware';
import response from './response';
import transactions from '../repositories/transactions';

export default ({ config, db }) => resource({

  /** POST / - List all transactions */
  create({ body }, res, next) {
    const key = body.credentialId;
    const secret = body.pin;
    const accountIds = body.accounts.map(acc => acc.acctNo);

    // Set the credential to response to be saved on FAPI
    // and be used in the followin requests from FAPI to BAPI
    res.credential = key;

    transactions.all({
      key,
      secret,
      accountIds,
    })
    .then((accounts) => response(res, { accounts }))
    .catch(next);
  }

});
