import { name, version } from '../../package.json';
import { Router } from 'express';
import accounts from './accounts';
import transactions from './transactions';

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

	return api;
}
