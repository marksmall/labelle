const express = require('express');

const currentUserMiddleware = require('../authentication/middleware/currentUserMiddleware');

const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  addProductReview,
} = require('./data');

const getProductsHandler = (req, res) => {
  console.log('Returning Products');
  const products = getProducts();

  res.status(200);
  res.json(products);
};

const addProductHandler = (req, res) => {
  console.log('Adding Product');
  const newProduct = addProduct(req.body);
  res.status(200);
  res.json(newProduct);
};

const updateProductHandler = (req, res) => {
  console.log('Updating Product');
  const updatedProduct = updateProduct(req.body, req.file);
  res.status(200);
  res.json(updatedProduct);
};

const deleteProductHandler = (req, res) => {
  deleteProduct(+req.params.id);
  res.status(200);
  res.json(getProducts());
};

const createProductReviewHandler = (req, res) => {
  console.log('Creating Product Review');
  const newProduct = addProductReview(
    +req.params.id,
    req.body,
    req.currentUser,
  );
  res.status(200);
  res.json(newProduct);
};

const productsRouter = express.Router();
productsRouter.route('/').get(getProductsHandler).post(addProductHandler);
productsRouter
  .route('/:id')
  .put(updateProductHandler)
  .delete(deleteProductHandler);
productsRouter
  .route('/:id/review/')
  .post(currentUserMiddleware, createProductReviewHandler);

module.exports = productsRouter;
