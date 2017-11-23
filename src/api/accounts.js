import resource from 'resource-router-middleware';
import accounts from '../repositories/accounts';

const response = (res, data) => {
  res.json({
    status: 200,
    data: {
      ...data,
      credential: '38508b40-e349-4952-878e-4ccfebfc1cfe' // Hardcode credential
    },
    traceId: '245bcbd7b3cad60a13e2479527f4ebad' // Hardcode traceID
  })
}
export default ({ config, db }) => resource({

  /** POST / - List all accounts */
  create({ body }, res, next) {
    accounts.all({
      key: body.loginId,
      secret: body.pin,
    })
    .then((accounts) => response(res, { accounts }))
    .catch(next);
  }

});
