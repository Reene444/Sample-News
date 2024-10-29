const express = require('express');
const dotenv = require('dotenv');
const setupMiddleware = require('./middleware');

const routes = require('./routes');
const app = express();
dotenv.config();
//setup middleware
setupMiddleware(app);
// router
app.use('/', routes);

// error handling
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
