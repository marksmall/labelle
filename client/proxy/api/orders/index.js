const express = require('express');

const { getOrders, addOrder, updateOrder, deleteOrder } = require('./data');

const getOrdersHandler = (req, res) => {
  console.log('Returning Orders');
  const orders = getOrders();

  res.status(200);
  res.json(orders);
};

const addOrderHandler = (req, res) => {
  console.log('Adding Order');
  const newOrder = addOrder(req.body);
  res.status(200);
  res.json(newOrder);
};

const updateOrderHandler = (req, res) => {
  console.log('Updating Order');
  const updatedOrder = updateOrder(req.body, req.file);
  res.status(200);
  res.json(updatedOrder);
};

const deleteOrderHandler = (req, res) => {
  deleteOrder(+req.params.id);
  res.status(200);
  res.json(getOrders());
};

const ordersRouter = express.Router();
ordersRouter.route('/').get(getOrdersHandler).post(addOrderHandler);
ordersRouter.route('/:id').put(updateOrderHandler);
ordersRouter.route('/:id').delete(deleteOrderHandler);

module.exports = ordersRouter;
