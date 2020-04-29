const express = require('express');
const router = express.Router(); // Interceptação das Rotas
const userController = require('../controllers/user-controller');

// Get
router.get('/', userController.get);

// Get by Id
router.get('/:userId', userController.getById);

// Put
router.put('/:userId', userController.put);

// Delete
router.delete('/:userId', userController.delete);

// Set Product in User
router.post('/:userId/:productId', userController.putProduct);

module.exports = router;