# simple-skill-creator (Cursor + Claude Code)

End-to-end **skill studio** instructions: interview in plain language, draft `SKILL.md`, run with/without comparisons, collect feedback, tune triggers, and suggest MCPs. Use when building or upgrading repeatable Cursor (or compatible) agent skills.

This repo ships a single skill file:

- `.cursor/skills/simple-skill-creator/SKILL.md`

## Install with npx (recommended)

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

## Manual install — Claude Code

**Project skill** (checked into the repo):

```bash
mkdir -p .claude/skills/simple-skill-creator
curl -fsSL https://raw.githubusercontent.com/oferregevunity/cursor-skill-simple-skill-creator/main/.cursor/skills/simple-skill-creator/SKILL.md \
  -o .claude/skills/simple-skill-creator/SKILL.md
```

**User / global skill** (your account on this machine):

```bash
mkdir -p ~/.claude/skills/simple-skill-creator
curl -fsSL https://raw.githubusercontent.com/oferregevunity/cursor-skill-simple-skill-creator/main/.cursor/skills/simple-skill-creator/SKILL.md \
  -o ~/.claude/skills/simple-skill-creator/SKILL.md
```

On Windows, replace `~` with `%USERPROFILE%`. If you use a custom config dir, follow [Claude Code `.claude` docs](https://code.claude.com/docs/en/claude-directory) and place skills under that tree’s `skills/` folder.

You can confirm discovery with **`claude skills list`** (or your Claude Code version’s equivalent) after restarting the CLI if needed.

## Clone and copy

```bash
git clone https://github.com/oferregevunity/cursor-skill-simple-skill-creator.git
cp -R cursor-skill-simple-skill-creator/.cursor/skills/simple-skill-creator /path/to/your/project/.cursor/skills/
# Optional: also copy SKILL.md into .claude/skills/simple-skill-creator/ for Claude Code
```

## Repo layout

| Path | Role |
|------|------|
| `.cursor/skills/simple-skill-creator/SKILL.md` | The skill (source of truth for copies) |
| `bin/install.mjs` | Installer used by `npx` |
| `package.json` | npm metadata + `bin` for `npx` |

## License

MIT
