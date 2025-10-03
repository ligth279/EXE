# AI Assistant Extension (skeleton)

This repository contains a small Chrome extension skeleton split into role-based folders for easy team collaboration.

Structure
- `ui-ux-engineer/` — popup UI files
- `nlp-ai-engineer/` — AI call / prompt manager
- `storage-engineer/` — chrome.storage helpers & history
- `integration-engineer/` — background/service worker and message bus
- `docs-team/` — optional docs

How to run
1. Open Chrome (or Edge Chromium) and go to `chrome://extensions`.
2. Enable "Developer mode".
3. Click "Load unpacked" and select this `ai-assistant-extension` folder.

Notes
- This is a skeleton. The `nlp-ai-engineer/aiService.js` contains a placeholder for calling the Google Nano API — do not embed secrets in source; use extension storage or a remote token manager.
- Manifest is v3.
