const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  // TODO: Logic for sending all the content of db/diagnostics.json
  readFromFile('./db/diagnostics.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
  // TODO: Logic for appending data to the db/diagnostics.json file
  console.log(req.body);

  const { time, error_id, errors } = req.body;

  if (req.body) {
    const newdiagnostic = {
      time,
      error_id,
      errors,
      diagnostic_id: uuidv4(),
    };

    readAndAppend(newdiagnostic, './db/diagnostics.json');
    res.json(`diagnostic added successfully 🚀`);
  } else {
    res.error('Error in adding diagnostic');
  }
});

module.exports = diagnostics;
