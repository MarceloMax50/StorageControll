const express = require('express');
const route = express.Router();
const ProductController = require('./controller/ProductController');
const CategoryController = require('./controller/CategoryController');

// Rotas de produtos
route.post('/product', ProductController.create);
route.get('/product', ProductController.list);
route.get('/product/:code', ProductController.getById);
route.put('/product/:code', ProductController.update);
route.delete('/product/:code', ProductController.delete);

// Rodas de Categorias
route.post('/category', CategoryController.create);
route.get('/category', CategoryController.list);
route.get('/category/:code', CategoryController.getById);
route.put('/category/:code', CategoryController.update);
route.delete('/category/:code', CategoryController.delete);

module.exports = route;