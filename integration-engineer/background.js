// background.js — MV3 service worker that handles messages from popup

// Import other role-based scripts so their globals (messageBus, Storage, HistoryManager, etc.) are available.
// importScripts is available in worker contexts and works for MV3 service workers.
try{
  importScripts(
    'nlp-ai-engineer/aiService.js',
    'nlp-ai-engineer/promptManager.js',
    'storage-engineer/storage.js',
    'storage-engineer/historyManager.js',
    'integration-engineer/messageBus.js'
  );
}catch(e){
  console.warn('One or more imported scripts failed to load in service worker:', e);
}

console.log('Background service worker loaded');

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  (async () => {
    try{
      if(msg.type === 'user-query'){
        if(typeof messageBus?.handleUserQuery !== 'function'){
          throw new Error('messageBus.handleUserQuery is not available');
        }
        const result = await messageBus.handleUserQuery(msg.payload);
        sendResponse({ answer: result.answer, error: result.error });
      } else if(msg.type === 'get-history'){
        if(typeof HistoryManager?.getAll !== 'function'){
          sendResponse({ history: [] });
          return;
        }
        const history = await HistoryManager.getAll();
        // return only assistant text for quick display
        sendResponse({ history: history.map(h => h.entry && h.entry.assistant ? h.entry.assistant : JSON.stringify(h.entry)) });
      } else {
        sendResponse({});
      }
    }catch(err){
      sendResponse({ error: err.message });
    }
  })();

  // Necessary for async sendResponse
  return true;
});
