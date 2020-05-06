const express = require('express');
const router = express.Router(); // Interceptação das Rotas
const productController = require('../controllers/product-controller');
const security = require('../services/authenticate-service');

router.use(security.authorize);

// Post - Create
router.post("/", productController.post);

// Get all - Read
router.get("/", productController.get);

// Get by Id
router.get("/:productId", productController.getById);

// Put - Update
router.put("/:productId", productController.put);

// Delete
router.delete("/:productId", productController.delete);

module.exports = router;