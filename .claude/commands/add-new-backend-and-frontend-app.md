---
name: add-new-backend-and-frontend-app
description: Workflow command scaffold for add-new-backend-and-frontend-app in awesome-llm-apps.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /add-new-backend-and-frontend-app

Use this workflow when working on **add-new-backend-and-frontend-app** in `awesome-llm-apps`.

## Goal

Adds a new full-stack AI agent app with both backend (Python/Flask/FastAPI) and frontend (Next.js/React) components, including Docker and environment setup.

## Common Files

- `**/backend/main.py`
- `**/backend/app.py`
- `**/backend/requirements.txt`
- `**/backend/Dockerfile`
- `**/backend/.env.example`
- `**/client/package.json`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Create backend directory with main server code (e.g., main.py, app.py, api/).
- Add backend requirements.txt or pyproject.toml.
- Add backend Dockerfile and .env.example.
- Create frontend directory (e.g., client/ or frontend/) with Next.js/React app structure.
- Add frontend package.json, tsconfig.json, next.config.js, etc.

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.