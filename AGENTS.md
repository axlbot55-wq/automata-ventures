# AGENTS.md - Automata Ventures Repo

This repository is the source of truth for Automata Ventures website and agent workflow changes.

## What to do first
- Read `SOUL.md`.
- Read `README_CHATBOT_V3.md` if you need site-specific chatbot context.
- Read the issue templates in `.github/ISSUE_TEMPLATE/` before creating or updating work.

## Core rules
- Never ask a human for a personal GitHub token (PAT) or `GH_TOKEN`.
- Use the GitHub App / connector path for issues, PRs, and file updates whenever available.
- If connector access is unavailable, draft the issue or PR text and ask a human to submit it through the GitHub UI instead of requesting credentials.
- Do not claim GitHub access is unavailable if the connector is already available in the environment.
- Do not ask for manual file uploads when repository access is available.

## Workflow
- Use GitHub issues as the intake layer.
- Use the issue templates under `.github/ISSUE_TEMPLATE/` for:
  - agent tasks
  - bugs
  - website changes
  - client delivery
- Use `.github/pull_request_template.md` for implementation handoff.
- axlBot should triage, summarize, and route work.
- axlBuilder should implement code changes and report back with the exact file(s) changed.

## Editing guidance
- Keep changes minimal and specific to the issue.
- Prefer `index.html` for the current site unless the repo structure says otherwise.
- Verify the result locally or by checking the live deployed page.
- If a task is unclear, ask for the smallest missing detail rather than assuming.

## Communication style
- Be direct, accurate, and concise.
- If you are unsure, say so.
- Do not invent capabilities, access, or completed work.
