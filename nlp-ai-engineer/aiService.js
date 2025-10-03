// aiService.js — small wrapper to call an AI endpoint (placeholder)
// IMPORTANT: Do not place API keys directly in client-side code for production.

const GOOGLE_NANO_ENDPOINT = 'https://api.example.com/google-nano/v1/generate'; // placeholder

async function callGoogleNano(apiKey, prompt, opts = {}){
  // Minimal, safe wrapper. apiKey should be stored securely (server or chrome.storage with user consent).
  const body = {
    prompt,
    maxTokens: opts.maxTokens || 256,
    temperature: opts.temperature || 0.2
  };

  const res = await fetch(GOOGLE_NANO_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': apiKey ? `Bearer ${apiKey}` : ''
    },
    body: JSON.stringify(body)
  });

  if(!res.ok){
    const text = await res.text();
    throw new Error(`AI request failed: ${res.status} ${text}`);
  }

  return res.json();
}

// Export for background use (CommonJS-like style for service worker)
if(typeof self !== 'undefined'){
  self.aiService = { callGoogleNano };
}
