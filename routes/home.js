const express = require('express');

const homeRouter = express.Router();

homeRouter.use(express.urlencoded({ extended: false }));
homeRouter.use(express.json());

homeRouter.get('/', (req, res) => {
  res.send(`<h1> TEST </h1>
  `);
});

module.exports = homeRouter;
