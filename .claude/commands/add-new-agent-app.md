---
name: add-new-agent-app
description: Workflow command scaffold for add-new-agent-app in awesome-llm-apps.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /add-new-agent-app

Use this workflow when working on **add-new-agent-app** in `awesome-llm-apps`.

## Goal

Adds a new AI agent application (single or multi-agent) to the repository, including code, requirements, and documentation.

## Common Files

- `advanced_ai_agents/**/README.md`
- `advanced_ai_agents/**/requirements.txt`
- `advanced_ai_agents/**/agent.py`
- `advanced_ai_agents/**/app.py`
- `advanced_ai_agents/**/__init__.py`
- `advanced_ai_agents/**/tools.py`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Create a new directory under the appropriate agent apps folder (e.g., advanced_ai_agents/autonomous_game_playing_agent_apps/ or advanced_ai_agents/multi_agent_apps/).
- Add main implementation file(s) (e.g., agent.py, app.py, or similar).
- Add requirements.txt for dependencies.
- Add README.md with usage/documentation.
- Optionally add tools.py, __init__.py, and other support files.

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.