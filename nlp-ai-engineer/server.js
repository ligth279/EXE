// server.js
// Simple Express API endpoint for Google Gemini access

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Store the Gemini API key securely in environment variable in production
const GEMINI_API_KEY = 'hereaddapikey';

app.use(bodyParser.json());

// POST /gemini endpoint
app.post('/gemini', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  try {
    // Example Gemini API call (replace with actual Gemini endpoint and params)
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      {
        params: { key: GEMINI_API_KEY },
        headers: { 'Content-Type': 'application/json' }
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Gemini API server running on port ${PORT}`);
});
