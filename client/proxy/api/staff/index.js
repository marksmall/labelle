const express = require('express');

const { getStaff } = require('./data');

const getStaffHandler = (req, res) => {
  console.log('Returning All Staff');
  res.status(200);
  res.json(getStaff());
};

const staffRouter = express.Router();

staffRouter.route('/').get(getStaffHandler);

module.exports = staffRouter;
