const express = require('express');

const { getServices } = require('./data');

const getServicesHandler = (req, res) => {
  console.log('Returning All Services');
  res.status(200);
  res.json(getServices());
};

const servicesRouter = express.Router();

servicesRouter.route('/').get(getServicesHandler);

module.exports = servicesRouter;
