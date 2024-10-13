const express = require('express');
const { evaluateInputs, analyzeData } = require('../controller/evaluationController');
const multer = require('multer');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Route to evaluate inputs
router.post('/evaluate', evaluateInputs);

// Route to analyze data
router.post('/analyze', analyzeData);

module.exports = router;
