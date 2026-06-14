# Claude Code Memory - intentïon repository0

## What This Repository Is

The **MIT template** a fleet repo is cut from. It carries the product (a
Node/ESM library skeleton) and *zero* engine machinery in its end-state. A fleet
repo is created by cutting this template and giving it an `INTENT.md` (the fixed
point — what *should* exist); the **agentic-lib** engine then evolves
`src/lib/main.js` to deliver that intent via pull requests.

- **Package**: `repo` (renamed per fleet repo)
- **Organisation**: `polycode-public` (GitHub)
- **License**: **MIT** — keep it. The template must stay unencumbered so anything
  cut from it is permissive. Do **not** relicense to AGPL. (Our IP — agentic-lib,
  the site, marginalia — is AGPL; the template is deliberately permissive.)
- **Entry point**: `src/lib/main.js`
- **Node**: 24+, ESM (`"type": "module"`)

## What This Repository Is NOT

- Not a production application — it's a template and demonstration.
- The code in `src/lib/main.js` is intentionally evolved by the engine.

## Key Files

- `INTENT.md` — the fixed point (renamed from the old `MISSION.md`). Describes
  what should exist; the engine delivers it.
- `src/lib/main.js` — the product code the engine evolves.
- `tests/unit/` — unit + system tests. `tests/behaviour/` — Playwright tests.
- `agentic-lib.toml` — slim engine config (`[engine]` / `[caps]` / `[paths]`),
  read machine-readably by the engine and by marginalia's issue-scoper to size
  work to the one-shot envelope.

## The Engine: agentic-lib 8.0.0

The engine is **agentic-lib 8.0.0** — a thin `claude -p` + Bedrock wrapper. This
repo consumes it through **3 thin consumer workflows**, each calling the pinned
reusable workflow `polycode-public/agentic-lib/.github/workflows/transform.yml@v8`:

| Workflow | Fires on | Transform `type` |
|----------|----------|------------------|
| `.github/workflows/on-intent.yml`   | issue assigned/labelled, or `INTENT.md` pushed | `deliver-intent` |
| `.github/workflows/on-review.yml`   | PR review submitted | `address-review` |
| `.github/workflows/on-schedule.yml` | daily cron, or manual `fix-ci` | `tend` / `fix-ci` |

These are the only workflows. The actors in the architecture are the
`claude -p` engine (one-shot in CI) and **marginalia** (the supervisor graph).
There is **no** vendored `.github/agentic-lib/` machinery, no `agentic-lib-*.yml`
workflows, no `.github/agents/`, no Copilot, and no discussions bot — all gone.

An optional `on-summary` workflow can call `agentic-lib summary-export@v8` to
publish `agentic-lib-logs/summary.json` (the showcase chat seed) once the
`MARGINALIA_GRAPH_ID` / `MARGINALIA_API_KEY` secrets are set.

## CI / AWS Configuration

CI is **GitHub Actions**; AWS auth is **GitHub-OIDC** (no static keys). Per-repo
config lives in repo/org Actions variables and secrets:

| Kind | Name | Value |
|------|------|-------|
| var | `CLAUDE_CODE_USE_BEDROCK` | `1` |
| var | `ANTHROPIC_MODEL` | `eu.anthropic.claude-haiku-4-5-20251001-v1:0` (Claude Haiku 4.5) |
| var | `AWS_REGION` | `eu-west-2` |
| secret | `AWS_OIDC_ROLE` | `arn:aws:iam::285034436101:role/intention-fleet-bedrock-role` |

The OIDC role (`intention-ci`) is Anthropic-invoke-only with trust
`repo:polycode-public/*`. Default model is **Claude Haiku 4.5** (~$0.10/simple
delivery). The workflows pass `model: ""` so the engine resolves the model from
`ANTHROPIC_MODEL`.

AWS accounts: intention-ci `285034436101`, intention-prod `813333281588`
(Workloads OU, mgmt `541134664601`), region `eu-west-2`.

## Related Repositories

| Repository | Relationship |
|------------|-------------|
| `agentic-lib` | The engine; this repo consumes `transform.yml@v8` from it |
| `marginalia` | The supervisor graph that scopes issues and watches the fleet |

## Test Commands

```bash
npm test                  # vitest unit + system tests (tests/unit/)
npx vitest run            # same, directly
npm run test:behaviour    # Playwright behaviour tests (tests/behaviour/)
```

## Git Workflow

The default branch (`main`) is delivered to by the **engine's pull requests** —
on-intent/on-review/on-schedule open PRs that humans (or marginalia) review and
merge. When working here by hand:

**You may**: create branches, commit changes, push branches, open pull requests.

**You may NOT** (without explicit permission given immediately before execution):
merge PRs, delete branches, rewrite history.

**Branch naming**: `claude/<short-description>`.

### The three hands (this repo cannot self-drive)

Nothing autonomous triggers delivery here: `on-schedule` is disabled (`tend` only),
and `on-intent`/`on-review` need an externally raised issue, a pushed `INTENT.md`,
or a manual dispatch. Delivery is driven by exactly one of **three hands**: **a
human** (issues + dispatch + review/merge), **Claude + the benchmark harness** (the
`intention` session orchestrating a run), or **marginalia** (the supervisor graph,
one piece at a time via its `repo_dispatch` actuator). Rule: **one reliable
one-shot per issue** — decompose a big `INTENT.md` into many one-shot-sized issues,
each delivered as its own PR, re-worked until green, then merged. Decomposition and
merge policy belong to the driver, not the engine.

## Code Quality Rules

- **No unnecessary formatting** — don't reformat lines you're not changing.
- **No backwards-compatible aliases** — update all callers instead.
- Only run linting/formatting fixes when specifically asked.

## Security Checklist

- Never commit secrets — use GitHub Actions secrets and OIDC, not static keys.
- Never commit API keys or tokens.
