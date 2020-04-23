const express = require('express');
const fs = require('fs');
const router = express.Router();
const authController = require('../controllers/auth-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.use(authMiddleware);

// Authenticate
router.post('/authenticate', authController.authenticate);

module.exports = router;