const cors = require('cors');
const express = require('express');

const app = express();
const upload = require('express-fileupload');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const analyseRoutes = require('./web_services/analyse');
const pingRoutes = require('./controlleurs/ping');
const routes = require('./router');

require('dotenv').config();

const { PORT } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use(cors({ origin: true }));
app.use(upload({ limit: '5mb' }));
app.use(
  morgan(
    ':date[web] :remote-user IP :remote-addr Method :method URL :url Status:status - :response-time ms Agent :user-agent'
  )
);
// Load all routes
routes.forEach((route) => {
  app.use(route.root, route.router);
});
app.use('/api/analyse', analyseRoutes);

app.use(pingRoutes);
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({ error: { status: err.status || 500, message: err.message } });
});

app.get('/hello', (req, res) => {
  res.send('je suis là');
});

app.listen(PORT, () => {
  console.log(` serveur démarrer avec sucées sur le Port: ${PORT}`);
});
