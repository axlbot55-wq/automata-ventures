# GitHub Issue Workflow

This is the safe long-term workflow for Automata Ventures.

## Principle
- Do not use a personal GitHub token (PAT) for routine AV work.
- Use GitHub App / connector access for issue creation and repository operations whenever available.
- If app access is unavailable, draft the issue content and submit it through the GitHub UI using the templates in `.github/ISSUE_TEMPLATE/`.

## Roles
- `axlBot`: intake, triage, issue drafting, status updates, reminders
- `axlBuilder`: implementation, code changes, PRs, build verification
- Humans: priorities, approvals, merge decisions, client-facing calls

## Standard flow
1. A partner posts a request in Telegram.
2. axlBot converts the request into a GitHub issue using the appropriate form.
3. axlBuilder picks up the labeled issue and implements it.
4. axlBot posts progress back to Telegram and links the issue or PR.
5. A human reviews and approves the result.

## Issue types
- `agent-task`: general tasks for axlBot or axlBuilder
- `bug`: defects and broken flows
- `website-change`: site copy, layout, pricing, or content updates
- `client-delivery`: scoped client work and implementation bundles

## What to include in every issue
- Clear summary
- Context and motivation
- Exact files or pages to touch
- Acceptance criteria
- Screenshots, links, or references when useful

## What not to do
- Do not ask for a personal PAT in chat
- Do not start implementation without a tracked issue for anything non-trivial
- Do not mix strategy, approvals, and implementation in the same chat thread when a GitHub issue will do
