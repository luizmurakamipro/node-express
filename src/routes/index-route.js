const express = require('express');
const fs = require('fs');
const router = express.Router();
const logMiddleware = require('../middlewares/log-middleware');

router.use(logMiddleware);

module.exports = router;