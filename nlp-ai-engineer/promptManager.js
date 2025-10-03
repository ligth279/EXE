// promptManager.js — simple prompt templates and utilities

const PromptManager = (() => {
  function buildSimplePrompt(userText){
    return `User: ${userText}\nAssistant:`;
  }

  function buildSystemPrompt(config = {}){
    return config.system || 'You are a helpful assistant.';
  }

  return { buildSimplePrompt, buildSystemPrompt };
})();

if(typeof self !== 'undefined'){
  self.promptManager = PromptManager;
}
