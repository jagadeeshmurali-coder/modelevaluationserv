// server.js
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const evaluationRoutes = require('./src/routes/evaluationRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000',
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', evaluationRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
