---
name: mcp-easy-install
description: >-
  Installs or wires up an MCP (Model Context Protocol) server for Cursor or
  Claude Code without asking the human to hand-edit JSON. Takes a server name,
  package, or documentation URL; searches the web for official install steps;
  merges Cursor mcp config or runs Claude Code mcp CLI / project config. Use
  when someone says add MCP, install MCP, connect Notion/Slack/Jira to Cursor,
  set up Claude Code tools, new AI integration, Model Context Protocol setup,
  or I do not want to edit config files.
---

## Installing this skill (Claude Code and Cursor)

**Claude Code:** `<project root>/.claude/skills/mcp-easy-install/SKILL.md` or `~/.claude/skills/mcp-easy-install/SKILL.md` (see [Claude Code `.claude` directory](https://code.claude.com/docs/en/claude-directory)).

**Cursor:** `<project root>/.cursor/skills/mcp-easy-install/SKILL.md` or `~/.cursor/skills/mcp-easy-install/SKILL.md`.

---

# Easy MCP setup (human never edits JSON)

You help someone **connect an external tool** to their AI assistant (Cursor or Claude Code) using **MCP**. They should not need to open or merge JSON by hand—that is **your** job with file tools and clear copy-paste **terminal** lines when the product expects a CLI.

## Non-negotiables

1. **Plain language outward** — Say “connection for your AI,” “app link,” “sign-in window.” Say “settings file” only if they ask how it works; default is “I’ll add this for you.”
2. **Ask scope first** — Which app (**Cursor**, **Claude Code**, or **both**)? **This project only** vs **all my work on this computer** (see [Where it lands](#where-it-lands)).
3. **No DIY JSON** — Do not instruct the human to edit `mcp.json`, `.mcp.json`, or Claude’s config by hand. You **read → merge → write** Cursor files, or run **`claude mcp add`** (or write project `.mcp.json` only if the CLI is unavailable).
4. **Verify the source** — Prefer the **official** npm scope, GitHub org, or vendor docs. If the match is ambiguous, offer **2–3 options** with one-line trust notes; let them pick.
5. **Secrets** — Never commit real API keys or tokens into a **project** file that might be git-pushed. Prefer **environment placeholders** (Cursor: `${env:VAR}` in values; see [Cursor MCP interpolation](https://cursor.com/docs/context/mcp)) and tell them once where to set the variable (shell profile, OS env, or host UI). For Claude Code, use **`--env VAR=value`** only for transient local adds or after warning about shell history; prefer env vars already on the machine.

---

## Say this, not that

| Internal | Say to the user |
|------------|-----------------|
| MCP / Model Context Protocol | “A **connection** so the AI can use [Slack / your DB / …] safely once set up” |
| stdio / HTTP transport | “Runs on your machine” vs “hosted link” (only if they ask) |
| `mcp.json` / `.mcp.json` | “I’ll update your **assistant’s connection list** for you” |
| Merge `mcpServers` | “I’ll add this next to your existing connections without removing them” |
| `claude mcp add` | “One install command for Claude Code—I’ll paste it when ready” |

---

## Where it lands

| They use | This project only | Everywhere on this computer |
|----------|-------------------|-----------------------------|
| **Cursor** | `<repo>/.cursor/mcp.json` | `~/.cursor/mcp.json` |
| **Claude Code** | `.mcp.json` at repo root (team-shared) or **local** scope (default; often not committed—confirm intent) | `claude mcp add … --scope user` |

**Claude Code scopes** (from official docs): **`local`** (default)—this project, you only; **`project`**—shared via `.mcp.json`; **`user`**—all projects for you. Confirm whether teammates should get the same connection before choosing `project`.

**Cursor** project vs global: [Cursor MCP docs](https://cursor.com/docs/context/mcp)—project file is `.cursor/mcp.json`; global is `~/.cursor/mcp.json`. If both exist, entries merge; **project wins on name conflicts**.

---

## Workflow (follow in order)

### 1) Intake (plain questions)

- What do they want to connect (name, product, or paste of **docs / GitHub** URL)?
- Cursor, Claude Code, or both?
- This repo only vs all projects / team-shared?

### 2) Research

- **Web search** (and optional **fetch** of README) for install instructions: package name, command (`npx`, `uvx`, `docker`, etc.), required **env vars**, **OAuth** vs API key, and **transport** (HTTP URL vs local command).
- If the user **already pasted** official docs or a config snippet, prefer that over search.
- Summarize in **one short paragraph**: what access the server gets, what they must supply (login, API key name only—not the value in chat if avoidable).

### 3) Cursor — you implement

1. Resolve target path: `.cursor/mcp.json` or `~/.cursor/mcp.json`.
2. Read existing file if present; otherwise start from `{ "mcpServers": {} }`.
3. Add or update **one** entry under `mcpServers` with a **stable key** (lowercase, hyphenated, e.g. `notion`, `company-snowflake`). If the key exists, ask: replace vs pick a new name.
4. Shape the entry per [Cursor MCP](https://cursor.com/docs/context/mcp):
   - **Local / CLI:** `type`: `"stdio"`, `command`, `args`, optional `env`, optional `envFile`.
   - **Remote:** `url`, optional `headers`, optional `auth` for static OAuth client fields—prefer env interpolation for secrets.
5. Preserve all other servers and formatting where practical.
6. Tell them: **fully quit and reopen Cursor** after changes; if something fails, **Output → MCP logs** (Cmd+Shift+U on Mac).

### 4) Claude Code — prefer CLI

Official pattern ([Anthropic: MCP in Claude Code](https://docs.anthropic.com/en/docs/claude-code/mcp/)):

- **HTTP (recommended for hosted):**  
  `claude mcp add --transport http [--scope local|project|user] <name> <url>`  
  Headers: `--header "Name: value"` (repeat as needed). **All flags before `<name>`**; then URL.
- **Stdio (local):**  
  `claude mcp add [--transport stdio] [--scope …] [--env KEY=value …] <name> -- <command> [args…]`  
  **Critical:** options (`--transport`, `--scope`, `--env`, `--header`) come **before** the server name; **`--`** separates the server name from the command and args.

Choose **`--scope project`** only when they want `.mcp.json` committed for the team; otherwise default **`local`** or **`user`** per their answer.

After giving the command, tell them to run it in a terminal (they approve the run), then **`claude mcp list`** and **`/mcp`** for OAuth if docs say so.

**Fallback:** If `claude` is not installed or they refuse CLI, write **`mcpServers`** JSON into the correct file per docs (`.mcp.json` or user config)—still **you** edit, not them.

### 5) What only the human can do

- **Browser OAuth** or vendor “Connect” button—describe the clicks, not the JSON.
- **Create an API key** in the vendor’s website—name the page; do not ask them to paste the secret into chat if it can go straight into env or a one-off approved command with `--env`.

### 6) Done checklist

- [ ] Right **app** and **scope** chosen.
- [ ] **Official** or knowingly trusted source.
- [ ] Cursor file merged **or** Claude command / file written.
- [ ] **No secrets** in git-tracked project files.
- [ ] Restart / `claude mcp list` / `/mcp` verification steps said aloud.

---

## Security and honesty

- MCP servers can **run code** and **access accounts**. If the source is unknown or only a random npm name appears, **say so** and suggest verifying the publisher before installing.
- Refuse wiring malware, credential theft, or bypassing org policy.
- Do not claim the server is “installed” until config is written or the CLI command succeeded (check exit code when you run it for them).

---

## Quick agent checklist

- [ ] Asked: app + scope + what to connect.
- [ ] Researched or used user-provided docs.
- [ ] Cursor: merged `mcpServers` into the correct `mcp.json`.
- [ ] Claude: `claude mcp add …` with correct flag order and `--scope`, or safe file fallback.
- [ ] Secrets via env / interpolation; nothing sensitive committed to shared project config.
- [ ] Clear **restart** / **list** / **OAuth** follow-ups for the human.
