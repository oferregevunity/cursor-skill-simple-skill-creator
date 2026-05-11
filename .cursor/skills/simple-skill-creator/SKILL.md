---
name: simple-skill-creator
description: >-
  End-to-end “skill studio” for Cursor: interviews non-technical users in plain
  language, drafts SKILL.md, runs side-by-side practice comparisons (with vs
  without the new instructions), collects structured feedback, iterates,
  tunes when the skill should attach, checks MCPs, and suggests external MCPs.
  Use when anyone wants to create, upgrade, or capture a repeatable AI workflow
  as a Cursor skill, or says skill builder, teach Cursor my process, recipe for
  the AI, playbooks, agent habits, or skill creator like Claude.
---

# Skill studio (Claude-style, human-simple)

You are running a **full quality loop** like a professional skill author: **capture → draft → practice → compare → improve → tune triggers → ship**. The human should feel like a guided conversation, not a engineering project.

## Non-negotiables

1. **Plain language outward** — See [Say this, not that](#say-this-not-that). Never volunteer file formats, schema names, or tool internals unless the user asks.
2. **Location first** — Always ask **this project only** vs **all my Cursor projects** before writing files (see Step A).
3. **Compare before declaring victory** — For each practice prompt, produce **with recipe** vs **without recipe** (or vs **old** snapshot when editing). See `references/parallel-runs-and-grader.md`. **Default in Cursor:** do this **yourself in the main chat** (read the skill, then deliberately ignore it for the baseline pass). Do **not** fan out many `Task` calls unless the user explicitly chose **thorough lab mode** (see below)—each extra task often forces another approval click, which feels broken for non-technical users.
4. **Show results before rewriting** — Put comparisons in front of the human (Canvas preferred for multi-run tables) **before** you silently “fix” the skill.
5. **Todos** — Use the todo tool for: location chosen; interview done; draft written; practice file created; **practice comparisons done** (inline by default); grading + benchmark summary; **human review**; iteration or ship; trigger set reviewed; optional Canvas created for review.

Read `references/schemas.md` and `references/parallel-runs-and-grader.md` **before** creating workspace artifacts.

---

## Say this, not that

| You may think (internal) | Say to the user |
|-------------------------|-----------------|
| YAML frontmatter | “The short label block at the top of your AI recipe” |
| Eval / baseline | “Practice question” / “without your new instructions” |
| Assertion | “Automatic check” |
| grading.json | “Scorecard for this round” |
| MCP | “A connection Cursor can use to talk to apps and accounts (when set up)” |
| Subagent / Task | “I can run an extra background pass” — only say this if they opted into thorough mode; default is you compare in this chat so they are not asked to approve many runs |
| Trigger optimization | “Teaching Cursor when to reach for this skill” |

If you must use a technical word, add **one short gloss** in parentheses, then return to normal language.

---

## Step A — Where it lives (ask first)

Offer two choices in their words:

| They pick | You create files under |
|-----------|-------------------------|
| **This project only** | `<repo>/.cursor/skills/<skill-folder>/` |
| **All my Cursor projects** | `~/.cursor/skills/<skill-folder>/` |

Never place user-authored skills in `~/.cursor/skills-cursor/` (reserved).

**`<skill-folder>`** = short `kebab-case`, matches the `name` field inside `SKILL.md`.

---

## Step B — Capture and sharpen intent

From chat first; then fill gaps with gentle questions:

1. What should the AI **reliably** do?
2. **When** should it kick in? (Exact phrases, messy real-life examples.)
3. What does **great output** look like? (Shape, tone, length, must-include sections.)
4. **Never** rules? Privacy? Things another skill already handles?

Probe edge cases with **examples** (“What if the file is empty?”) not abstract jargon.

---

## Step C — Connections (MCPs)

1. **Inventory** enabled MCP tool descriptors in this environment; read schemas before proposing calls.
2. **Explain in plain terms** what is already possible (“We can pull from Slack if you’ve connected it”).
3. If something is missing, **web search** for well-documented MCP servers; offer 1–3 with **trust + API key** caveats. Never imply a server is installed if it is not.

---

## Step D — Write the first draft

Create `SKILL.md` (required) under the chosen path. Optional: `reference.md`, `scripts/` when the same code would otherwise be reinvented every time.

**The “label block” at the top** (agents: YAML frontmatter):

- `name`: same as folder, `kebab-case`, ≤64 chars.
- `description`: third person; **what + when**; include **generous** triggers (Cursor can undert-trigger). Near-miss phrases help.
- Optional `disable-model-invocation: true` only if the user wants **manual-only** activation.

**Body:** imperative steps, output template, connection section if MCPs matter, safety boundaries. Prefer **why** over piles of MUST. Keep `SKILL.md` lean; park long policy in `reference.md` with one link.

---

## Step E — Practice set (keep it small)

Agree on **2** realistic prompts by default (3 only if they insist)—substantive enough that the skill matters (one-liners are weak tests). Fewer practices means less waiting and **no flood of approval dialogs**.

**Agent:** Save prompts to `<studio>/evals/evals.json` per `references/schemas.md`. Name the studio folder something friendly in chat (“your comparison folder”); on disk use:

`<parent-of-skill-folder>/<skill-name>-studio/` as sibling to the skill directory (or inside the skill folder only if the user prefers—**default sibling** to keep the skill clean).

Create `iteration-1/<eval-slug>/` as you go (use descriptive `eval-slug`, not `eval-0`).

---

## Step F — Run comparisons (Cursor-default: no approval storm)

Follow `references/parallel-runs-and-grader.md`.

**Default (recommended):** In this same conversation, for each practice prompt:

1. **With recipe** — Follow the new `SKILL.md` as if it had been loaded for the task; write outputs under `<studio>/iteration-<N>/<eval-slug>/with_recipe/outputs/` plus `summary.md`.
2. **Without recipe** — Answer the **same** prompt again while **not** following that skill (normal assistant behavior); save under `without_recipe/outputs/`.

Do **not** spawn one `Task` per branch by default—that pattern exists in Claude Code because subagents are cheap and silent there; in Cursor it often produces **many “allow run” prompts** (one per background task), which users read as the skill “asking too much.”

**Thorough lab mode (opt-in only):** First ask in plain language: “I can also run fully separate background passes for extra independence; Cursor may ask you to approve each one—want that, or stick to the standard comparison here?” Only if they say **yes**, use parallel `Task` as described in the reference doc.

**Editing an existing skill:** snapshot the old `SKILL.md` first; compare **new** vs **old** the same way (inline by default).

**While you work:** draft **automatic checks** only where objective; update metadata files. Tell the user once: “I’m also noting a few things we can check automatically,” not a separate approval per check.

---

## Step G — Grade, summarize, show

1. Fill `grading.json` per run (`references/schemas.md`).
2. Write `benchmark.md` for the iteration (pass rates, time/tokens if known).
3. **Present** using a **Cursor Canvas** when the comparison is multi-row or multi-artifact: write `canvases/skill-studio-review-<iteration>.canvas.tsx` under the **managed** Cursor project path (see canvas skill: `~/.cursor/projects/<workspace-id>/canvases/`), with **data inlined**—no network. If Canvas is unsuitable, use a short structured chat summary: for each practice prompt, **Side A / Side B**, key differences, automatic check scores.

Tell the user in one sentence how to use the Canvas if it is new to them.

---

## Step H — Human review and feedback

Ask conversationally: What felt better? What was missing? Any surprises?

**Agent:** Record their answers into `<studio>/iteration-<N>/feedback.json` (schema in `references/schemas.md`) even if you transcribe from chat.

---

## Step I — Improve loop

1. Update `SKILL.md` (and references/scripts) from feedback—**generalize**, do not overfit one prompt.
2. Re-run **all** practices into `iteration-<N+1>/` with the same baselines (`without_recipe` stays the same for new skills; old snapshot policy for edits).
3. Repeat Steps G–I until: user is happy, feedback is uniformly “good enough,” or gains plateau—say so honestly.

---

## Step J — “When should Cursor use this?” (trigger tuning)

After the skill works on practices:

1. **Agent:** Draft ~20 realistic chat starters: about half should clearly need this skill, half are **close but wrong** (hard negatives). Save draft to `<studio>/trigger-review.json` per `references/schemas.md`.
2. **User:** Present as a **short numbered list** grouped “Should use” / “Should not use”—no raw file dumps. Let them edit wording in chat.
3. **Agent:** Merge edits, then revise the `description` field to improve match quality—still third person, slightly pushy on **should-use** cases, clear boundaries for near-misses.
4. Offer one more quick pass: “Any situation we forgot?”

Skip deep statistical tuning scripts unless the user already has that toolchain; **judgment + tight description** is the default for Cursor.

---

## Step K — Ship

- Confirm final path (project vs home).
- One paragraph: how they’ll **invoke** it (mentioning the skill name in chat if needed).
- Optional: suggest a **calendar reminder** to revisit after a week of real use.

---

## Optional: blind comparison

Only if the user asks which version is objectively better between two **skill** variants. Run two outputs with labels stripped, ask a fresh task or peer review to pick **A or B** with reasons, then reveal mapping. Otherwise skip.

---

## If the user wants “no rigor, just vibe”

Shorten: skip side-by-side file saves if they prefer; still draft, **one** dry run in chat, light description pass. **Say** you are switching to quick mode so expectations match.

## Why users were seeing “many calls”

Claude-style docs say “launch two subagents per practice in the same turn.” In Cursor, **each** background `Task` is often a separate **user approval**. Two practices × two branches = four approvals; three practices = six. That is a product mismatch, not something the human did wrong. **Inline comparison avoids that** unless they explicitly choose thorough lab mode.

---

## Security and honesty

Refuse skills aimed at deception, theft, or bypassing authorization. The finished skill should read aligned with what the user said they want.

---

## Quick agent checklist

- [ ] Location chosen and correct base path used.
- [ ] `references/schemas.md` + `references/parallel-runs-and-grader.md` consulted before workspace writes.
- [ ] Draft `SKILL.md` with strong `description`.
- [ ] Practice set saved; **with vs without** (or vs old) completed **inline by default**; parallel `Task` only if user opted into thorough lab mode.
- [ ] Grading + `benchmark.md`; human saw comparison before edits.
- [ ] `feedback.json` captured from conversation.
- [ ] Iterated until stop rule; trigger set reviewed; `description` updated.
- [ ] Canvas created when comparison benefits from a standalone artifact.
