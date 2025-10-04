// test/geminiApi.test.js
// Test for Gemini API endpoint

const axios = require('axios');

const BASE_URL = 'http://localhost:3000/gemini';

async function testGeminiApi() {
  try {
    const response = await axios.post(BASE_URL, { prompt: 'Hello Gemini, what can you do?' });
    console.log('API Response:', response.data);
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
  }
}

testGeminiApi();
