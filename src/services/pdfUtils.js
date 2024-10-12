// services/pdfUtils.js
const pdf = require('pdf-parse');

const processPdf = async (pdfFile) => {
  const buffer = Buffer.from(pdfFile, 'base64'); 
  const data = await pdf(buffer);
  return data.text; // Return extracted text
};

module.exports = { processPdf };
