const { analyzeWithOpenAI } = require('../services/openAIService');

const evaluateInputs = async (req, res) => {
    const { conversationHistory, userQuestion, botAnswer, context, metrics } = req.body;

    try {
        const requestData = {
            conversationHistory,
            userQuestion,
            botAnswer,
            context,
            metrics : JSON.stringify(metrics),
        };

        res.json({
            message: 'Evaluation data processed successfully',
            data: requestData,
        });
    } catch (error) {
        // console.error('Error processing request:', error);
        res.status(500).json({ error: 'Failed to process the request' });
    }
};

const analyzeData = async (req, res) => {
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
        // console.error('Error analyzing data:', error);
        res.status(500).json({ error: 'Failed to analyze the data' });
    }
};

module.exports = { evaluateInputs, analyzeData };
