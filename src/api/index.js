import { name, version } from '../../package.json';
import { Router } from 'express';
import accounts from './accounts';
import transactions from './transactions';
import payment from './payment';

export default ({ config, db }) => {
	let api = Router();

  // Expose API metadata at the root
  api.get('/version', (req, res) => {
    res.json({ name, version });
  });

  // Mount the accounts resource
  api.use('/register', accounts({ config, db }));

  // Mount the transactions resource
  api.use('/updateStatement', transactions({ config, db }));

  // Mount the paymentParameters
  api.use('/paymentParameters', payment({ config, db }));

	return api;
}
