import bodyParser from 'body-parser';
import express from 'express';
import config from './config/index';
import controllers from './controller/index';
import logger from './helper/logger';

const app = express();

app.use(bodyParser.json());
// To support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, PATCH, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Origin, Content-Type, Authorization, Accept, x-environment, x-version');
  next();
});
app.use(controllers);
// Error middleware
app.use((err, req, res, next) => {
  res.status(500).send({
    code: 500,
    message: err.stack,
  });
});

const listener = app.listen(config.app.port, () => {
  logger.info(`Listening on port ${listener.address().port}`);
});

export default listener;
