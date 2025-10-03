// historyManager.js — save & retrieve simple chat history

const HISTORY_KEY = 'ai_chat_history_v1';

const HistoryManager = {
  async append(entry){
    const list = (await Storage.get(HISTORY_KEY)) || [];
    list.push({ts: Date.now(), entry});
    // keep last 50
    const truncated = list.slice(-50);
    await Storage.set(HISTORY_KEY, truncated);
    return truncated;
  },
  async getAll(){
    return (await Storage.get(HISTORY_KEY)) || [];
  },
  async clear(){
    await Storage.set(HISTORY_KEY, []);
  }
};

if(typeof self !== 'undefined') self.HistoryManager = HistoryManager;
