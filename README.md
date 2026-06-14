# repository0

The **MIT template** a fleet repo is cut from. It ships a clean Node/ESM library
skeleton (a browser-safe library + a tiny web demo + a Playwright behaviour test)
and an `INTENT.md`. Write an intent, and [intentïon agentic-lib](https://github.com/polycode-public/agentic-lib)
— a one-shot `claude -p` engine on AWS Bedrock — writes the code, runs the tests, and
opens pull requests towards it.

The template is **clean**: the product is just the package identity (no delivered
example). `INTENT.md` carries a FizzBuzz smoke-test as the fixed point the engine
delivers towards — the simplest proof the pipeline works end to end.

## Getting started

### 1. Create your repository

Click **"Use this template"** on the [repository0](https://github.com/polycode-public/repository0)
page, or:

```bash
gh repo create my-project --template polycode-public/repository0 --public --clone
cd my-project && npm install
```

### 2. Write your intent

Edit `INTENT.md` — describe what should exist (features, requirements, acceptance
criteria as checkboxes). This is the fixed point the engine delivers towards.

### 3. Configure CI (Bedrock via GitHub OIDC)

CI authenticates to AWS Bedrock with GitHub OIDC — no static keys. In **Settings >
Secrets and variables > Actions**:

| Kind | Name | Value |
|------|------|-------|
| var | `CLAUDE_CODE_USE_BEDROCK` | `1` |
| var | `ANTHROPIC_MODEL` | `eu.anthropic.claude-haiku-4-5-20251001-v1:0` |
| var | `AWS_REGION` | `eu-west-2` |
| secret | `AWS_OIDC_ROLE` | ARN of the Bedrock OIDC role to assume |

And in **Settings > Actions > General**: workflow permissions **Read and write**,
**Allow GitHub Actions to create PRs** checked.

To connect the repo to its **marginalia graph** (chat seed, webhooks, MCP — see
below), also set the secrets `MARGINALIA_GRAPH_ID` and `MARGINALIA_API_KEY`.

## CLI tools (npm scripts)

The engine's CLI is exposed as simplified `npm run` scripts (they call
`npx github:polycode-public/agentic-lib#v8` — once agentic-lib is published to npm,
`npx @polycode-public/agentic-lib` works the same way):

| Script | What it does |
|--------|--------------|
| `npm run init` | Lay down / refresh the consumer workflows, `AGENTS.md`, `agentic-lib.toml`, `.mcp.json`, and the engine CLI scripts + tooling deps in `package.json` (non-destructive — never overwrites your name/version/product). |
| `npm run init:dry` | Show what `init` would change, writing nothing. |
| `npm run reset` | **Full reset to a clean template** — re-seed the product skeleton (library + web demo + behaviour test) and clean the GitHub side (close issues/PRs, delete stale branches/runs). Removes any delivered example (e.g. fizzbuzz). |
| `npm run reset:mission -- <name>` | Reset and set `INTENT.md` from a built-in mission, e.g. `npm run reset:mission -- 6-kyu-understand-roman-numerals`. |
| `npm run missions` | List the built-in mission library (8-kyu → 1-dan graded seeds). |
| `npm run engine:version` | Print the agentic-lib engine version. |
| `npm test` | Unit + system tests (Vitest). |
| `npm run test:unit` | Unit tests with coverage. |
| `npm run test:behaviour` | Playwright behaviour tests. |
| `npm run start:cli` | Run the library entry point. |

> `reset` is the canonical way to get back to a clean template: it strips any
> delivered code and regenerates the seed skeleton green.

## Delivery via GitHub Actions

Three thin consumer workflows pin the engine via
`uses: polycode-public/agentic-lib/.github/workflows/transform.yml@v8`. Each is one
trigger → one one-shot `claude -p` transformation on Bedrock → one draft PR:

| Workflow | Fires on | Transform `type` | What it does |
|----------|----------|------------------|--------------|
| `.github/workflows/on-intent.yml` | issue assigned/labelled, or `INTENT.md` pushed | `deliver-intent` | delivers the intent as a PR |
| `.github/workflows/on-review.yml` | a PR review is submitted | `address-review` | addresses all review threads in one revision |
| `.github/workflows/on-schedule.yml` | daily cron, or manual `fix-ci` | `tend` / `fix-ci` | tends the repo, or fixes a red default branch |

You can also dispatch a transformation directly:

```bash
gh workflow run on-intent.yml -f work_item=12     # deliver issue #12
gh workflow run on-schedule.yml -f mode=fix-ci    # repair a red main
```

### Remote scaffolding — `on-init`

A fourth workflow, `.github/workflows/on-init.yml`, is the **init analogue of
`on-intent`**: it remotely runs `agentic-lib init` in its various flavours and opens
a **draft PR** with the result, so the seed/scaffolding layer (workflows, `AGENTS.md`,
`agentic-lib.toml`, `.mcp.json`, the package.json tooling) can be refreshed without a
local checkout.

```bash
gh workflow run on-init.yml -f mode=init                       # refresh scaffolding (non-destructive)
gh workflow run on-init.yml -f mode=init -f dry_run=true       # preview only, no commit
gh workflow run on-init.yml -f mode=reset \
   -f mission=6-kyu-understand-roman-numerals                  # full reset: clean product + seed a mission
```

| input | values | effect |
|-------|--------|--------|
| `mode` | `init` (default) / `reset` | `init` refreshes scaffolding; `reset` = `init --purge` (reset product skeleton + clean the GitHub repo) |
| `mission` | a mission name / `random` | `reset` only — seed `INTENT.md` from the mission library |
| `dry_run` | `true` / `false` | show what would change without writing or committing |

Delivery (`on-intent`/`on-review`/`on-schedule`) → `transform.yml@v8`; scaffolding
(`on-init`) → `init.yml@v8`. The supervisor graph, **marginalia**, scopes issues to
the engine's one-shot
envelope and watches the fleet.

## Marginalia integration (graph memory + chat + provenance)

Each repo is bound to a private **marginalia graph** that holds its provenanced
memory. Three integration surfaces:

### 1. MCP — graph memory for `claude -p` (`.mcp.json`)

The template ships a `.mcp.json` registering the **`marginalia-seon`** MCP server,
which exposes this repo's code-map/memory graph as read-only tools the engine can
call during a transformation:

```json
{
  "mcpServers": {
    "marginalia-seon": {
      "command": "npx",
      "args": ["-y", "@polycode-projects/marginalia-seon"],
      "env": {
        "MARGINALIA_BASE_URL": "${MARGINALIA_BASE_URL:-https://marginalia.polycode.co.uk}",
        "MARGINALIA_API_KEY": "${MARGINALIA_API_KEY}",
        "MARGINALIA_GRAPH_ID": "${MARGINALIA_GRAPH_ID}"
      }
    }
  }
}
```

Tools (query-only, every answer carries provenance):

| Tool | Purpose |
|------|---------|
| `seon_describe({symbol})` | resolve a symbol → its class, typed edges (imports/calls/defines/tests), attestation, provenance |
| `seon_impact({module})` | reverse closure — "what breaks if I change this", with covering tests |
| `seon_search({query})` | natural-language fallback over the graph (symbol sweeps, commit deltas) |

`transform.yml` attaches the MCP **automatically when `MARGINALIA_API_KEY` is set
and a `.mcp.json` is present** (and adds the `mcp__marginalia-seon__*` tools to the
agent's allowlist). It degrades gracefully: no key, or an unreachable server, just
means the engine runs without the graph tools. The `x-api-key` is never logged.

Locally, point `claude` at your graph the same way:

```bash
MARGINALIA_API_KEY=mga_… MARGINALIA_GRAPH_ID=<graph-uuid> claude --mcp-config .mcp.json -p "…"
```

### 2. Webhooks → marginalia (GitHub activity updates the graph)

A **per-repo webhook** feeds this repo's GitHub activity into its graph:

- **Payload URL:** `https://marginalia.polycode.co.uk/api/hooks/github/<graph_id>`
- **Content type:** `application/json`, **Secret:** the shared HMAC secret (signatures verified server-side; a bad signature is `401`).
- **Events:** `push`, `pull_request`, `issues`, `issue_comment`, `discussion`, `release` (everything else is dropped).

This is how the graph stays current with what happens on GitHub — issues filed,
PRs opened/merged, pushes — so the supervisor and the chat seed reflect reality.

### 3. `summary-export` → the showcase chat seed (graph updates the repo)

The optional `on-summary` workflow calls `agentic-lib summary-export@v8`, which
pulls this repo's graph summary (`GET /api/graph/{id}/summary`, authed with the
graph's `X-API-Key`) and commits it to `agentic-lib-logs/summary.json`. The
intentïon.com showcase fetches that file raw to **seed the embedded chat** for this
repo. It no-ops until `MARGINALIA_GRAPH_ID` / `MARGINALIA_API_KEY` are set.

**The loop:** GitHub activity → (webhook) → graph memory → (`summary-export`) →
`summary.json` → the showcase chat; and during delivery, `claude -p` reads that same
graph back through the SEON MCP.

## How it works

```
INTENT.md / issue / PR review  ─▶  agentic-lib transform@v8 (claude -p + Bedrock)  ─▶  Pull Request
                                          ▲ reads graph memory via marginalia-seon MCP
GitHub activity  ─▶ webhook ─▶ marginalia graph ─▶ summary-export ─▶ showcase chat seed
```

Each run is a one-shot `claude -p` invocation against Bedrock. The engine holds no
state between runs — the plan and memory live in marginalia.

## Configuration

`agentic-lib.toml` is slim — it tells the engine (and marginalia's issue-scoper)
how to size work to the one-shot envelope:

```toml
[engine]
ref = "v8"          # pinned agentic-lib reusable-workflow ref
engine = "claude"
model = ""          # empty = resolve from the ANTHROPIC_MODEL CI variable
hosted = "C"        # A=Claude cloud, B=Copilot, C=self-hosted Path B

[caps]
max_turns = 20
daily_runs = 8

[paths]
intent = "INTENT.md"
source = "src/lib/"
tests = "tests/unit/"
behaviour = "tests/behaviour/"
```

## File layout

```
INTENT.md                       <- the fixed point (what should exist)
.mcp.json                       <- marginalia-seon MCP registration (graph memory)
agentic-lib.toml                <- slim engine config
src/lib/main.js                 <- library (browser-safe), evolved by the engine
src/web/{index.html,lib.js}     <- web demo (shows the library identity)
tests/unit/{main,web}.test.js   <- unit + structure tests
tests/behaviour/homepage.test.js<- Playwright E2E
.github/workflows/on-*.yml      <- thin consumer workflows (on-intent/review/schedule + on-init)
```

## Links

- [INTENT.md](INTENT.md) — your project goals
- [agentic-lib](https://github.com/polycode-public/agentic-lib) — the engine
- [intentïon](https://xn--intenton-z2a.com) — the showcase
