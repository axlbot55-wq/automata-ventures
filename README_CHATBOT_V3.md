# Automata Ventures Chatbot v3

This repo now includes a basic backend-connected chatbot path for Cloudflare Pages Functions.

## Added
- `functions/api/chat.js` — POST `/api/chat` endpoint
- `index.html` frontend wired to call `/api/chat`

## Environment variables
Set these in Cloudflare Pages if you want live AI replies:

- `LLM_API_KEY`
- `LLM_BASE_URL`
- `LLM_MODEL`

Example:
- `LLM_BASE_URL=https://api.openai.com/v1/chat/completions`
- `LLM_MODEL=gpt-4o-mini`

## Behavior
If env vars are missing or the model call fails, the site falls back to a safe local response so the widget still works.

## Current limitations
- no persistent storage
- no CRM/webhook sink yet
- no analytics events yet
- no anti-spam / rate limiting yet

## Recommended next step
Add a lead webhook or email relay once you know where qualified leads should go.
