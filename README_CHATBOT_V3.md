# Automata Ventures Chatbot v4

This repo now includes a backend-connected chatbot path for Cloudflare Pages Functions plus simple lead forwarding.

## Added
- `functions/api/chat.js` — POST `/api/chat` endpoint
- `functions/api/lead.js` — POST `/api/lead` endpoint
- `index.html` frontend wired to call `/api/chat`
- lead handoff attempt after email capture

## Environment variables
Set these in Cloudflare Pages if you want live AI replies:

- `LLM_API_KEY`
- `LLM_BASE_URL`
- `LLM_MODEL`

Optional lead forwarding:
- `LEAD_WEBHOOK_URL`
- `LEAD_WEBHOOK_BEARER`

Example:
- `LLM_BASE_URL=https://api.openai.com/v1/chat/completions`
- `LLM_MODEL=gpt-4o-mini`

## Behavior
If model env vars are missing or the model call fails, the site falls back to a safe local response so the widget still works.

If `LEAD_WEBHOOK_URL` is set, captured leads can be forwarded to your chosen sink.

## Current limitations
- no persistent storage in-repo
- no analytics events yet
- no anti-spam / rate limiting yet
- no native calendar booking yet

## Recommended next step
Point `LEAD_WEBHOOK_URL` to Airtable, Sheets, Zapier, Make, a CRM bridge, or an email relay.
