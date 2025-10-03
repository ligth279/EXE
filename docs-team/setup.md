# Setup

1. Load as unpacked extension
   - Open `chrome://extensions` → Developer mode → Load unpacked → choose this folder
2. Optional: add API key
   - Use the Storage API or add a simple options page to save `ai_config.apiKey` into `chrome.storage.local`.

Security note: For production, store AI keys on a backend and mint short-lived tokens for the extension.
