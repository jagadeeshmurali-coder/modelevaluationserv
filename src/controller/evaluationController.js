const { processPdf } = require('../services/pdfUtils');
const { analyzeWithOpenAI } = require('../services/openAIService');

const evaluateInputs = async (req, res) => {
  console.log('Received request body:', req.body);
  
  // Extracting the fields from req.body
  const { conversationHistory, userQuestion, botAnswer, context, metrics, pdfFile } = req.body;
  //const pdfFile = req.file; 
  
  try {
    let conversationText = conversationHistory || '';

    // If a PDF file is provided, extract text from it
    if (pdfFile) {
      conversationText = await processPdf(pdfFile); 
    }

    const requestData = {
      conversationHistory: conversationText,
      userQuestion,
      botAnswer,
      context,
      metrics: JSON.parse(metrics || '{}'),
    };

    res.json({
      message: 'Evaluation data processed successfully',
      data: requestData,
    });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Failed to process the request' });
  }
};

const analyzeData = async (req, res) => {
  console.log('Received analysis request body:', req.body);
  
  const { conversationHistory, userQuestion, botAnswer, context, metrics } = req.body;

  try {
    const analysisResult = await analyzeWithOpenAI({
      conversationHistory,
      userQuestion,
      botAnswer,
      context,
      metrics,
    });

    res.json({
      message: 'Analysis completed successfully',
      result: analysisResult,
    });
  } catch (error) {
    console.error('Error analyzing data:', error);
    res.status(500).json({ error: 'Failed to analyze the data' });
  }
};

module.exports = { evaluateInputs, analyzeData };
