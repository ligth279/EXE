// storage.js — thin wrapper over chrome.storage.local

const Storage = {
  async get(key){
    return new Promise(resolve => {
      chrome.storage.local.get(key, (items) => resolve(items[key]));
    });
  },
  async set(key, value){
    return new Promise(resolve => {
      chrome.storage.local.set({[key]: value}, () => resolve());
    });
  },
  async remove(key){
    return new Promise(resolve => {
      chrome.storage.local.remove(key, () => resolve());
    });
  }
};

if(typeof self !== 'undefined') self.Storage = Storage;
