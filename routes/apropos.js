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
      res.status(500).send('error getting Apropos');
    });
});

aproposRouter.get('/:id', (req, res) => {
  const aproposId = req.params.id;
  connection
    .promise()
    .query('SELECT * FROM Apropos', [aproposId])
    .then(([results]) => {
      res.json(results);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('error getting Apropos');
    });
});

aproposRouter.post('/', (req, res) => {
  const { pictureUrl, title, description } = req.body;

  if (error) {
    res.status(422).json({ ValidationErrors: error.details });
  } else {
    connection
      .promise()
      .query('INSERT INTO Apropos (pictureUrl, title, description ) VALUES (?, ?, ?)', [pictureUrl, title, description])
      .then(([results]) => {
        const apropos = {
          id: results.insertId,
          pictureUrl,
          title,
          description,
        };
        res.json(apropos);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('error posting Apropos');
      });
  }
});

aproposRouter.put('/:id', (req, res) => {
  const aproposId = req.params.id;
  connection.query('SELECT * FROM Apropos WHERE id = ?', [eventId], (error, selectResults) => {
    const aproposFromDb = selectResults[0];
    if ((error, aproposFromDb)) {
      const aproposPropsToUpdate = req.body;
      connection.query('UPDATE Apropos SET ? WHERE id = ?', [aproposPropsToUpdate, aproposId], (err) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error updating a Apropos');
        } else {
          const updated = { ...aproposFromDb, ...aproposPropsToUpdate };
          res.status(200).json(updated);
        }
      });
    } else {
      res.status(422).send(`Apropos with id ${aproposId} not found.`);
    }
  });
});

aproposRouter.delete('/:id', (req, res) => {
  const aproposId = req.params.id;
  connection
    .promise()
    .query('DELETE FROM Apropos WHERE id = ?', [aproposId])
    .then(([results]) => {
      res.status(200).json(results).send('Apropos deleted !');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error deleting an Apropos');
    });
});

module.exports = aproposRouter;
