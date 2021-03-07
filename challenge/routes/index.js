const express = require('express');
const router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', function (req, res, next) {
	console.log(path.join(__dirname, '..', 'dist', 'index.html'));
	res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

module.exports = router;
