// Simple popup UI wiring to the background message bus
const $ = id => document.getElementById(id);
const chat = $('chat');
const input = $('input');
const send = $('send');
const clear = $('clear');

function appendMessage(text, cls='ai'){
  const el = document.createElement('div');
  el.className = 'message ' + cls;
  el.textContent = text;
  chat.appendChild(el);
  chat.scrollTop = chat.scrollHeight;
}

send.addEventListener('click', async () => {
  const text = input.value.trim();
  if(!text) return;
  appendMessage(text, 'user');
  input.value = '';

  // Send to background to process (AI + storage)
  chrome.runtime.sendMessage({type: 'user-query', payload: text}, (resp) => {
    if(chrome.runtime.lastError){
      appendMessage('Error: ' + chrome.runtime.lastError.message, 'ai');
      return;
    }
    if(resp && resp.answer) appendMessage(resp.answer, 'ai');
  });
});

clear.addEventListener('click', () => { chat.innerHTML = ''; });

// Load recent history when popup opens
chrome.runtime.sendMessage({type:'get-history'}, (resp)=>{
  if(resp && Array.isArray(resp.history)){
    resp.history.forEach(h => appendMessage(h, 'ai'));
  }
});
