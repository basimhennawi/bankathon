import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import initializeDb from './db';
import middleware from './middleware';
import api from './api';
import config from './config.json';
import { init as initCoinbase } from './lib/coinbase';
const dotenv = require('dotenv');
const fs = require('fs');
const resolve = require('path').resolve;

// Load env variables
if (fs.existsSync(resolve(process.cwd(), '.env'))) {
  dotenv.config();
}

// Initialize coinbase object
initCoinbase();

let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

// connect to db
initializeDb(db => {

	// internal middleware
	app.use(middleware({ config, db }));

	// api router
	app.use('/api', api({ config, db }));

	app.server.listen(process.env.PORT || config.port, () => {
		console.log(`Started Bankathon server on port ${app.server.address().port}`);
	});
});

export default app;
