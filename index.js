const express = require('express');
const cors = require('cors');
const connection = require('./db-config');

const app = express();
const port = process.env.PORT || 3000;

const homeRouter = require('./routes/home');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/', homeRouter);

connection.getConnection((err) => {
  if (err) console.log('error connecting to db');
  else console.log('connected to db');
});

app.listen(port, () => {
  console.log(`Server is runing on ${port}`);
});
