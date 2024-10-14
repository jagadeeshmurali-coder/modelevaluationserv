// services/openAIService.js
const axios = require('axios');
const config = require('../config/config');

const analyzeWithOpenAI = async ({ conversationHistory, userQuestion, botAnswer, context, metrics }) => {
  const prompt = `
  Analyze the given Input data, for the metrics that are given, provide 4 types of scores like mentioned below and 2 liner recommendation to improvise the same.
  Output data should strictly be a Json and no other characters can be included

  Instructions to follow :
  For every metric set true, add the below score types in your response 
  Percentage relation - how related is the LLM/bots response to the user in percentage,
  Average word length - no of words provided in relation to user response
  Response percentage clarification - Percentage of clarification needed to the user question versus the bot response
  Overall confidence score - Total confidence score in accordance to the metric
  
  Example format to follow :
  {
      "result" : {
          "Coherence" : {
              "Percentage relation" : "82.33%",
              "Average word length" : "122289",
              "Response percentage clarification" : "65%",
              "Overall confidence score" : "90%"
          },
          "Clarity" : {
              "Percentage relation" : "89.33%",
              "Average word length" : "1239",
              "Response percentage clarification" : "85%",
              "Overall confidence score" : "70%"
          }
      },
      "recommendations" : "The bot offers good suggestions, but the response lacks an engaging tone. It could have included a question back to the user or an invitation to share experiences, which would foster a more interactive conversation"
  }  
  
  Input Data :
    
    Conversation History: ${conversationHistory}
    Latest User Question: ${userQuestion}
    Latest Bot Answer: ${botAnswer}
    Context: ${context}
    Metrics: ${JSON.parse(metrics)}
  `;

//   console.log(prompt)

  const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: "gpt-4o-mini", 
    messages: [{ role: "user", content: prompt }],
  }, {
    headers: {
      'Authorization': `Bearer ${config.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  console.log(response.data.choices[0].message.content);
  return response.data.choices[0].message.content;
};

module.exports = { analyzeWithOpenAI };
