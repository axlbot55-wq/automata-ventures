# Agent Guidance for Automata Ventures

This repository is used by human partners plus AV agents.

## Core rule
- Never ask a human for a personal GitHub token (PAT) or GH_TOKEN.
- Use the GitHub App / connector path when creating or reading issues.
- If connector access is unavailable, do not request credentials in chat. Instead, draft the issue body and ask a human to submit it through the GitHub UI.

## Issue intake
- Prefer the GitHub issue forms in `.github/ISSUE_TEMPLATE/`.
- Use:
  - `agent-task.yml` for general work routed to axlBot or axlBuilder
  - `bug-report.yml` for bugs
  - `website-change.yml` for site copy/layout/pricing changes
  - `client-delivery.yml` for scoped client work

## Suggested routing
- `axlBot`: triage, summaries, reminders, issue drafting, status updates
- `axlBuilder`: implementation, code edits, PR creation, build fixes
- Humans: approvals, strategic decisions, production sign-off

## Working style
- Keep issues small and specific.
- Include the exact file(s) or page(s) to change.
- Include acceptance criteria and any screenshots or references.
- Link PRs back to the issue number.

## Before editing code
- Check whether an issue already exists.
- If not, create one or ask for one to be created using the forms above.
- Then make the minimal change needed to satisfy the issue.
