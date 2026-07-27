---
name: add-new-multi-agent-team
description: Workflow command scaffold for add-new-multi-agent-team in awesome-llm-apps.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /add-new-multi-agent-team

Use this workflow when working on **add-new-multi-agent-team** in `awesome-llm-apps`.

## Goal

Adds a new multi-agent team application, including agent team logic, requirements, and documentation.

## Common Files

- `advanced_ai_agents/multi_agent_apps/agent_teams/*/README.md`
- `advanced_ai_agents/multi_agent_apps/agent_teams/*/requirements.txt`
- `advanced_ai_agents/multi_agent_apps/agent_teams/*/team.py`
- `advanced_ai_agents/multi_agent_apps/agent_teams/*/agent.py`
- `advanced_ai_agents/multi_agent_apps/agent_teams/*/__init__.py`
- `advanced_ai_agents/multi_agent_apps/agent_teams/*/tools.py`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Create a new directory under advanced_ai_agents/multi_agent_apps/agent_teams/.
- Add main team implementation file(s) (e.g., <team_name>_team.py, agent.py, or similar).
- Add requirements.txt for dependencies.
- Add README.md with usage/documentation.
- Optionally add tools.py, __init__.py, and other support files.

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.