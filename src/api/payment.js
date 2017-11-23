import resource from 'resource-router-middleware';
import response from './response';

export default ({ config, db }) => resource({

  /** POST / - List all accounts */
  create({ body }, res, next) {
    res.credential = body.credentialId;
    response(res, { accounts: [] })
  }

});
