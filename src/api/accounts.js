import resource from 'resource-router-middleware';
import accounts from '../repositories/accounts';

const response = (res, data) => {
  res.json({
    status: 200,
    data,
    traceId: '245bcbd7b3cad60a13e2479527f4ebad' // Hardcode traceID
  })
}
export default ({ config, db }) => resource({

  /** POST / - List all accounts */
  create({ body }, res, next) {
    accounts.all({
      key: body.customId,
      secret: body.customId2,
    })
    .then((accounts) => response(res, { accounts }))
    .catch(next);
  }

});
