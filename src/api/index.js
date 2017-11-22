import { version } from '../../package.json';
import { Router } from 'express';
import accounts from './accounts';

export default ({ config, db }) => {
	let api = Router();

  // Expose API metadata at the root
  api.get('/version', (req, res) => {
    res.json({ version });
  });

  // mount the accounts resource
  api.use('/register', accounts({ config, db }));

	return api;
}
