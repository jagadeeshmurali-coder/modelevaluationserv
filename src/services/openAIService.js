// services/openAIService.js
const axios = require('axios');
const config = require('../config/config');

const analyzeWithOpenAI = async ({ conversationHistory, userQuestion, botAnswer, context, metrics }) => {
  const prompt = `
    Analyze the following conversation history and provide different types of scores based on the bots response 
    to User Question for the specified metrics to better assess the perfomance:
    
    Conversation History: ${conversationHistory}
    Latest User Question: ${userQuestion}
    Latest Bot Answer: ${botAnswer}
    Context: ${context}
    Metrics: ${JSON.stringify(metrics)}
  `;

  const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: "gpt-4o-mini", 
    messages: [{ role: "user", content: prompt }],
  }, {
    headers: {
      'Authorization': `Bearer ${config.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data.choices[0].message.content;
};

module.exports = { analyzeWithOpenAI };
