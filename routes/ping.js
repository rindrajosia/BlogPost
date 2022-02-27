const express = require('express');
const { getPing } = require('../controllers/ping');
const router = express.Router();

router.route('/').get(getPing);

module.exports = router;
