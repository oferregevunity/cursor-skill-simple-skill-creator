# Cursor + Claude Code skills

This repo ships **repeatable agent skills** for **Cursor** and **Claude Code**:

| Skill | What it does |
|-------|----------------|
| **simple-skill-creator** | Skill studio: interview in plain language, draft `SKILL.md`, compare with/without runs, feedback, triggers, MCP ideas. |
| **mcp-easy-install** | Hands-free MCP setup: name or docs URL → web research → merge **Cursor** `.cursor/mcp.json` / `~/.cursor/mcp.json` or **`claude mcp add`** (no hand-edited JSON for the human). |

The **`npx`** installer below only installs **simple-skill-creator** today. For **mcp-easy-install**, use the [curl / clone](#mcp-easy-install-manual-install) section.

---

## If you use Claude Code (start here)

Claude Code discovers skills as **`SKILL.md` inside a named folder** under a `skills` directory.

| Where you want it | Exact path (folder must be `simple-skill-creator`, file must be `SKILL.md`) |
|-------------------|----------------------------------------------------------------------------|
| **This git repo only** | `<project root>/.claude/skills/simple-skill-creator/SKILL.md` |
| **All repos for your user** | `~/.claude/skills/simple-skill-creator/SKILL.md` |

On Windows, the global path is `%USERPROFILE%\.claude\skills\simple-skill-creator\SKILL.md`. If you use a custom Claude config directory, follow [Claude Code: the `.claude` directory](https://code.claude.com/docs/en/claude-directory) and place the same folder under that tree’s `skills/` directory.

**Important:** Do not only create `.cursor/skills/...` if you work in Claude Code—Claude Code reads **`.claude/skills/`**, not `.cursor/`.

### Quickest install (Claude Code project skill)

From the **root of the repo** where you want the skill:

```bash
npx -y github:oferregevunity/cursor-skill-simple-skill-creator -- --claude
```

Global (your user) install:

```bash
npx -y github:oferregevunity/cursor-skill-simple-skill-creator -- --claude-global
```

### Manual install (Claude Code) — copy from this repo’s Claude layout

Same content as the Cursor copy; this URL matches the path Claude Code expects conceptually:

```bash
mkdir -p .claude/skills/simple-skill-creator
curl -fsSL https://raw.githubusercontent.com/oferregevunity/cursor-skill-simple-skill-creator/main/.claude/skills/simple-skill-creator/SKILL.md \
  -o .claude/skills/simple-skill-creator/SKILL.md
```

Global:

```bash
mkdir -p ~/.claude/skills/simple-skill-creator
curl -fsSL https://raw.githubusercontent.com/oferregevunity/cursor-skill-simple-skill-creator/main/.claude/skills/simple-skill-creator/SKILL.md \
  -o ~/.claude/skills/simple-skill-creator/SKILL.md
```

Then confirm with **`claude skills list`** (or your Claude Code version’s equivalent) after a restart if needed.

### Clone for Claude Code

```bash
git clone https://github.com/oferregevunity/cursor-skill-simple-skill-creator.git
cp -R cursor-skill-simple-skill-creator/.claude/skills/simple-skill-creator /path/to/your/project/.claude/skills/
```

---

## If you use Cursor

See [Install with npx](#install-with-npx-recommended) (default installs **both** Cursor and Claude Code project skills) and [Manual install — Cursor](#manual-install--cursor) below.

---

## This repo ships

Each skill is duplicated under **`.cursor/skills/<name>/`** and **`.claude/skills/<name>/`** so Cursor, Claude Code, raw GitHub URLs, and clones all see the same content. **Keep each pair in sync** when you edit the repo.

- **simple-skill-creator** — `.cursor/skills/…` and `.claude/skills/…`
- **mcp-easy-install** — `.cursor/skills/…` and `.claude/skills/…`

### mcp-easy-install (manual install)

**Cursor (project):**

```bash
mkdir -p .cursor/skills/mcp-easy-install
curl -fsSL https://raw.githubusercontent.com/oferregevunity/cursor-skill-simple-skill-creator/main/.cursor/skills/mcp-easy-install/SKILL.md \
  -o .cursor/skills/mcp-easy-install/SKILL.md
```

**Claude Code (project):**

```bash
mkdir -p .claude/skills/mcp-easy-install
curl -fsSL https://raw.githubusercontent.com/oferregevunity/cursor-skill-simple-skill-creator/main/.claude/skills/mcp-easy-install/SKILL.md \
  -o .claude/skills/mcp-easy-install/SKILL.md
```

Use `~/.cursor/skills/…` or `~/.claude/skills/…` for a **user-wide** copy (same `curl`, change the output path).

## Install with npx (recommended) — simple-skill-creator only

From the **project root** where you want the skill (installs **both** Cursor and Claude Code **project** skills by default):

```bash
npx -y github:oferregevunity/cursor-skill-simple-skill-creator
```

After [npm publish](https://docs.npmjs.com/cli/v10/commands/npm-publish), you can use the registry name instead:

```bash
npx -y cursor-skill-simple-skill-creator
```

### npx options

| Flag | Installs to |
|------|-------------|
| *(none)* | `<cwd>/.cursor/skills/simple-skill-creator/` **and** `<cwd>/.claude/skills/simple-skill-creator/` |
| `--cursor` | Cursor project skill only (under `--cwd`, default `.`) |
| `--claude` | Claude Code project skill only |
| `--cursor-user` | `~/.cursor/skills/simple-skill-creator/` (all Cursor projects on this machine) |
| `--claude-global` | `~/.claude/skills/simple-skill-creator/` (all Claude Code sessions for this user) |
| `--cwd <path>` | Base directory for `--cursor` / `--claude` project installs |

Passing **any** of `--cursor`, `--claude`, `--cursor-user`, or `--claude-global` turns off the default pair: only the flags you pass are applied.

Examples (use `--` so flags reach the installer, not `npx`):

```bash
# Cursor project skill only
npx -y github:oferregevunity/cursor-skill-simple-skill-creator -- --cursor

# Claude Code project skill only
npx -y github:oferregevunity/cursor-skill-simple-skill-creator -- --claude

# Claude Code global (user) skill
npx -y github:oferregevunity/cursor-skill-simple-skill-creator -- --claude-global

# Another repo’s root
npx -y github:oferregevunity/cursor-skill-simple-skill-creator -- --cwd /path/to/other/repo

# Installer usage
npx -y github:oferregevunity/cursor-skill-simple-skill-creator -- --help
```

## Manual install — Cursor

**Project skill** (recommended for a team / one codebase):

```bash
mkdir -p .cursor/skills/simple-skill-creator
curl -fsSL https://raw.githubusercontent.com/oferregevunity/cursor-skill-simple-skill-creator/main/.cursor/skills/simple-skill-creator/SKILL.md \
  -o .cursor/skills/simple-skill-creator/SKILL.md
```

**User skill** (all projects on this machine):

```bash
mkdir -p ~/.cursor/skills/simple-skill-creator
curl -fsSL https://raw.githubusercontent.com/oferregevunity/cursor-skill-simple-skill-creator/main/.cursor/skills/simple-skill-creator/SKILL.md \
  -o ~/.cursor/skills/simple-skill-creator/SKILL.md
```

Cursor loads skills from `.cursor/skills/<skill-folder>/SKILL.md` (and from user-level paths Cursor is configured to use).

## Manual install — Claude Code (same commands as above)

The Claude-specific **`curl`** and **`git clone`** flows are in [If you use Claude Code](#if-you-use-claude-code-start-here) at the top of this README.

## Clone and copy (both tools)

```bash
git clone https://github.com/oferregevunity/cursor-skill-simple-skill-creator.git
cd cursor-skill-simple-skill-creator
# Cursor — simple-skill-creator + mcp-easy-install
cp -R .cursor/skills/simple-skill-creator /path/to/your/project/.cursor/skills/
cp -R .cursor/skills/mcp-easy-install /path/to/your/project/.cursor/skills/
# Claude Code
cp -R .claude/skills/simple-skill-creator /path/to/your/project/.claude/skills/
cp -R .claude/skills/mcp-easy-install /path/to/your/project/.claude/skills/
```

## Repo layout

| Path | Role |
|------|------|
| `.cursor/skills/*/SKILL.md` | Cursor + `npx` bundle source (per skill folder) |
| `.claude/skills/*/SKILL.md` | Same markdown at Claude Code’s expected path |
| `bin/install.mjs` | Installs **simple-skill-creator** via `npx` |
| `package.json` | npm metadata + `bin` for `npx` |

When you change a skill, update **both** `.cursor` and `.claude` copies for that skill so they stay identical.

## License

MIT
