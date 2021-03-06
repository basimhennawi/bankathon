import resource from 'resource-router-middleware';
import response from './response';
import accounts from '../repositories/accounts';

export default ({ config, db }) => resource({

  /** POST / - List all accounts */
  create({ body }, res, next) {
    const key = body.loginId;
    const secret = body.pin;

    // Set the credential to response to be saved on FAPI
    // and be used in the followin requests from FAPI to BAPI
    res.credential = key;

    accounts.all({
      key,
      secret,
    })
    .then((accounts) => response(res, { accounts }))
    .catch(next);
  }

});
