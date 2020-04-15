const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    console.log("Intercepted!");
    next();
});

router.get('/', (req, res) => res.json({
    message: "OK",
}));

module.exports = router;