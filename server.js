const express = require('express');
const path = require('path');
const cors = require('cors');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public')); 

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
