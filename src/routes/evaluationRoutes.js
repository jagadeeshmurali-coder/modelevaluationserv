const express = require('express');
const { evaluateInputs, analyzeData } = require('../controller/evaluationController');

const router = express.Router();

// Route to evaluate inputs
router.post('/evaluate', evaluateInputs);

// Route to analyze data
router.post('/analyze', analyzeData);

module.exports = router;
