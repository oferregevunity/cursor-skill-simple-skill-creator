#!/usr/bin/env node
/**
 * Copies bundled SKILL.md into Cursor / Claude Code skill directories.
 */
import { copyFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";

const SKILL_DIR = "simple-skill-creator";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkgRoot = join(__dirname, "..");

function bundledSkillPath() {
  const cursor = join(pkgRoot, ".cursor", "skills", SKILL_DIR, "SKILL.md");
  const claude = join(pkgRoot, ".claude", "skills", SKILL_DIR, "SKILL.md");
  if (existsSync(cursor)) return cursor;
  if (existsSync(claude)) return claude;
  throw new Error(
    `Bundled skill missing (tried .cursor and .claude under ${pkgRoot})`,
  );
}

function usage() {
  console.log(`cursor-skill-simple-skill-creator — copy SKILL.md for Cursor / Claude Code

Usage:
  npx -y github:oferregevunity/cursor-skill-simple-skill-creator
  npx -y cursor-skill-simple-skill-creator

Options (default: --cursor --claude in current directory):
  --cwd <path>       Base directory for project installs (default: ${process.cwd()})
  --cursor           Install to <cwd>/.cursor/skills/${SKILL_DIR}/
  --claude           Install to <cwd>/.claude/skills/${SKILL_DIR}/
  --cursor-user      Install to ~/.cursor/skills/${SKILL_DIR}/
  --claude-global    Install to ~/.claude/skills/${SKILL_DIR}/

If any option above is passed, only the listed targets run (no implicit default pair).
`);
}

function parseArgs(argv) {
  const out = {
    cwd: process.cwd(),
    cursor: false,
    claude: false,
    cursorUser: false,
    claudeGlobal: false,
    help: false,
  };
  const explicitInstall = { cursor: false, claude: false, cursorUser: false, claudeGlobal: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--help" || a === "-h") out.help = true;
    else if (a === "--cwd") {
      out.cwd = argv[++i];
      if (!out.cwd) throw new Error("--cwd requires a path");
    } else if (a === "--cursor") explicitInstall.cursor = out.cursor = true;
    else if (a === "--claude") explicitInstall.claude = out.claude = true;
    else if (a === "--cursor-user") explicitInstall.cursorUser = out.cursorUser = true;
    else if (a === "--claude-global") explicitInstall.claudeGlobal = out.claudeGlobal = true;
    else throw new Error(`Unknown argument: ${a}`);
  }
  const anyExplicit =
    explicitInstall.cursor ||
    explicitInstall.claude ||
    explicitInstall.cursorUser ||
    explicitInstall.claudeGlobal;
  if (!anyExplicit && !out.help) {
    out.cursor = true;
    out.claude = true;
  }
  return out;
}

function installOne(destDir) {
  mkdirSync(destDir, { recursive: true });
  const dest = join(destDir, "SKILL.md");
  const skillSrc = bundledSkillPath();
  copyFileSync(skillSrc, dest);
  return dest;
}

function main() {
  const argv = process.argv.slice(2);
  let opts;
  try {
    opts = parseArgs(argv);
  } catch (e) {
    console.error(e.message || e);
    usage();
    process.exit(1);
  }
  if (opts.help) {
    usage();
    process.exit(0);
  }

  const written = [];
  if (opts.cursor) {
    written.push(installOne(join(opts.cwd, ".cursor", "skills", SKILL_DIR)));
  }
  if (opts.claude) {
    written.push(installOne(join(opts.cwd, ".claude", "skills", SKILL_DIR)));
  }
  if (opts.cursorUser) {
    written.push(installOne(join(homedir(), ".cursor", "skills", SKILL_DIR)));
  }
  if (opts.claudeGlobal) {
    written.push(installOne(join(homedir(), ".claude", "skills", SKILL_DIR)));
  }

  for (const p of written) console.log("Installed:", p);
  if (written.length === 0) {
    console.error("No install targets. Pass --help for usage.");
    process.exit(1);
  }
}

main();
