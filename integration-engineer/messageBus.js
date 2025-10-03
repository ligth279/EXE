// messageBus.js — routes messages between UI, AI, and storage

async function handleUserQuery(payload){
  try{
    const prompt = promptManager.buildSimplePrompt(payload);
    // fetch API key from storage (if any)
    const config = await Storage.get('ai_config') || {};
    const apiKey = config.apiKey;

    const aiResp = await aiService.callGoogleNano(apiKey, prompt);
    const answer = aiResp && aiResp.output ? aiResp.output : (aiResp.text || JSON.stringify(aiResp));

    // save to history
    await HistoryManager.append({user: payload, assistant: answer});

    return { answer };
  }catch(err){
    return { error: err.message };
  }
}

// Expose handler for background worker to call
if(typeof self !== 'undefined') self.messageBus = { handleUserQuery };
