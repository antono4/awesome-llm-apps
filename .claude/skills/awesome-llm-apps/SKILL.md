```markdown
# awesome-llm-apps Development Patterns

> Auto-generated skill from repository analysis

## Overview
The `awesome-llm-apps` repository is a curated collection of AI agent applications, with a focus on Large Language Model (LLM) powered agents. The codebase is written in Python, and contributions span single-agent, multi-agent, and full-stack applications. The repository is organized for modularity and extensibility, supporting both backend and frontend components, as well as database schema evolution.

## Coding Conventions

- **File Naming:**  
  Use `snake_case` for Python files and directories.  
  *Example:*  
  ```
  autonomous_game_playing_agent_apps/
    my_agent_app/
      agent.py
      app.py
      requirements.txt
  ```

- **Import Style:**  
  Use alias imports where appropriate.  
  *Example:*  
  ```python
  import numpy as np
  import pandas as pd
  ```

- **Export Style:**  
  Mixed export style. You may use `__all__` or simply define functions/classes as needed.

- **Commit Messages:**  
  - Use the `feat` prefix for new features.
  - Keep messages concise (~55 characters on average).
  *Example:*  
  ```
  feat: add autonomous game playing agent for chess
  ```

## Workflows

### Add New Agent App
**Trigger:** When you want to contribute a new AI agent app (single or multi-agent)  
**Command:** `/new-agent-app`

1. Create a new directory under the appropriate agent apps folder, e.g.:
   ```
   advanced_ai_agents/autonomous_game_playing_agent_apps/my_new_agent/
   ```
2. Add main implementation file(s): `agent.py`, `app.py`, or similar.
3. Add `requirements.txt` listing dependencies.
4. Add `README.md` with usage and documentation.
5. Optionally add `tools.py`, `__init__.py`, and other support files.

*Example directory structure:*
```
my_new_agent/
  agent.py
  app.py
  requirements.txt
  README.md
  tools.py
  __init__.py
```

---

### Add New Multi-Agent Team
**Trigger:** When you want to contribute a new multi-agent team (e.g., for finance, legal, SEO, etc.)  
**Command:** `/new-agent-team`

1. Create a new directory under:
   ```
   advanced_ai_agents/multi_agent_apps/agent_teams/<team_name>/
   ```
2. Add main team implementation file(s): `<team_name>_team.py`, `agent.py`, etc.
3. Add `requirements.txt` for dependencies.
4. Add `README.md` with usage and documentation.
5. Optionally add `tools.py`, `__init__.py`, and other support files.

*Example directory structure:*
```
agent_teams/
  finance_team/
    finance_team.py
    agent.py
    requirements.txt
    README.md
    tools.py
    __init__.py
```

---

### Add New Backend and Frontend App
**Trigger:** When you want to contribute a new full-stack agent app with both backend and frontend  
**Command:** `/new-fullstack-app`

1. Create a `backend/` directory with main server code (`main.py`, `app.py`, or `api/`).
2. Add `requirements.txt` or `pyproject.toml` for backend dependencies.
3. Add a backend `Dockerfile` and `.env.example`.
4. Create a `client/` or `frontend/` directory for the frontend (Next.js/React).
5. Add frontend files: `package.json`, `tsconfig.json`, `next.config.js`, `.env.example`, `.gitignore`, etc.
6. Add a `README.md` for documentation.

*Example structure:*
```
my_fullstack_app/
  backend/
    main.py
    requirements.txt
    Dockerfile
    .env.example
  frontend/
    package.json
    tsconfig.json
    next.config.js
    .env.example
    .gitignore
  README.md
```

---

### Add Database Schema and Migrations
**Trigger:** When you want to add or modify database tables/schema  
**Command:** `/new-table`

1. Edit or add schema definition files (e.g., `schema.prisma`, `schema.sql`, `models/*.py`).
2. Generate migration files (e.g., `prisma/migrations/*/migration.sql`, `migrations/*.sql`).
3. Update repository/model files as needed.
4. Commit migration lock files if required.

*Example:*
```
prisma/
  schema.prisma
  migrations/
    20240601_add_user_table/
      migration.sql
models/
  user.py
repository/
  user_repository.py
migration_lock.toml
```

## Testing Patterns

- **Test File Naming:**  
  Test files follow the pattern `*_test.py`.
  *Example:*  
  ```
  agent_test.py
  app_test.py
  ```

- **Testing Framework:**  
  The specific framework is not enforced; common choices are `pytest` or `unittest`.

- **Test Example:**  
  ```python
  # agent_test.py
  def test_agent_response():
      agent = MyAgent()
      assert agent.respond("hello") == "Hi there!"
  ```

## Commands

| Command           | Purpose                                                |
|-------------------|--------------------------------------------------------|
| /new-agent-app    | Add a new AI agent application                         |
| /new-agent-team   | Add a new multi-agent team application                 |
| /new-fullstack-app| Add a new backend + frontend full-stack agent app      |
| /new-table        | Add or modify database schema and generate migrations  |
```
