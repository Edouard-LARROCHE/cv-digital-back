const express = require('express');

const aproposRouter = express.Router();
const connection = require('../db-config');

aproposRouter.get('/', (req, res) => {
  connection
    .promise()
    .query('SELECT * FROM Apropos')
    .then(([results]) => {
      res.json(results);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('error getting events');
    });
});

module.exports = aproposRouter;
