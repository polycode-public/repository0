# repo

This repository is powered by [intenti&ouml;n agentic-lib](https://github.com/polycode-public/agentic-lib) — autonomous code transformation driven by a one-shot `claude -p` engine on AWS Bedrock. Write an intent, and the engine writes code, runs tests, and opens pull requests.

## Getting Started

### Step 1: Create Your Repository

Click **"Use this template"** on the [repository0](https://github.com/polycode-public/repository0) page, or use the GitHub CLI:

```bash
gh repo create my-project --template polycode-public/repository0 --public --clone
cd my-project
```

### Step 2: Write Your Intent

Edit `INTENT.md` directly — describe what should exist: the features, requirements, and acceptance criteria as checkboxes. This is the fixed point the engine delivers towards. The template ships with a FizzBuzz intent as the simplest possible smoke test.

```markdown
# Intent

Build a CLI tool that converts CSV files to formatted Markdown tables.

## Requirements
- Read CSV from file or stdin
- Auto-detect delimiter

## Acceptance Criteria
- [ ] Reading a CSV with 3 columns produces a 3-column Markdown table
- [ ] All unit tests pass
```

### Step 3: Configure CI (Bedrock via GitHub OIDC)

CI runs as GitHub Actions and authenticates to AWS Bedrock with GitHub OIDC — no static keys. Set these in **Settings > Secrets and variables > Actions**:

| Kind | Name | Value |
|------|------|-------|
| var | `CLAUDE_CODE_USE_BEDROCK` | `1` |
| var | `ANTHROPIC_MODEL` | `eu.anthropic.claude-haiku-4-5-20251001-v1:0` |
| var | `AWS_REGION` | `eu-west-2` |
| secret | `AWS_OIDC_ROLE` | ARN of the Bedrock OIDC role to assume |

Then in **Settings > Actions > General**:
- Workflow permissions: **Read and write permissions**
- Allow GitHub Actions to create PRs: **Checked**

## How It Works

```
INTENT.md / issue / PR review  ->  agentic-lib transform@v8  ->  Pull Request
```

Three thin consumer workflows pin the engine via
`uses: polycode-public/agentic-lib/.github/workflows/transform.yml@v8`:

| Workflow | Fires on | What it does |
|----------|----------|--------------|
| `.github/workflows/on-intent.yml`   | issue assigned/labelled, or `INTENT.md` pushed | delivers the intent as a PR |
| `.github/workflows/on-review.yml`   | a PR review is submitted | addresses all review threads in one revision |
| `.github/workflows/on-schedule.yml` | daily cron, or manual `fix-ci` | tends the repo, or fixes a red default branch |

Each run is a one-shot `claude -p` invocation against Bedrock. The supervisor
graph, **marginalia**, scopes issues and watches the fleet.

## Examples

Below are quick examples showing how to use the fizzBuzz library from this repository.

Node (ESM):

```js
import { fizzBuzz, fizzBuzzSingle, fizzBuzzRange } from './src/lib/main.js';

console.log(fizzBuzzSingle(3)); // "Fizz"
console.log(fizzBuzz(15)); // ["1","2","Fizz",...,"FizzBuzz"]
console.log(fizzBuzzRange(1, 5)); // ["1","2","Fizz","4","Buzz"]
```

Browser (via src/web/lib.js):

```html
<script type="module">
  import { fizzBuzz, fizzBuzzSingle, fizzBuzzRange } from './src/web/lib.js';
  console.log(fizzBuzz(15));
  console.log(fizzBuzzSingle(7));
  console.log(fizzBuzzRange(10, 15)); // ["Buzz","11","Fizz","13","14","FizzBuzz"]
</script>
```

## Configuration

`agentic-lib.toml` is slim — it tells the engine (and marginalia's issue-scoper)
how to size work to the one-shot envelope:

```toml
[engine]
ref = "v8"          # pinned agentic-lib reusable-workflow ref
engine = "claude"
model = ""          # empty = resolve from the ANTHROPIC_MODEL CI variable
hosted = "C"        # A=Claude cloud, B=Copilot, C=self-hosted

[caps]
max_turns = 20
daily_runs = 8

[paths]
intent = "INTENT.md"
source = "src/lib/"
tests = "tests/unit/"
behaviour = "tests/behaviour/"
```

## File Layout

```
INTENT.md                     <- the fixed point (what should exist)
src/lib/main.js               <- library (browser-safe), evolved by the engine
src/web/index.html            <- web page (imports ./lib.js)
tests/unit/main.test.js       <- unit tests
tests/behaviour/              <- Playwright E2E
```

## Links

- [INTENT.md](INTENT.md) — your project goals
- [agentic-lib documentation](https://github.com/polycode-public/agentic-lib) — the engine
- [intenti&ouml;n website](https://xn--intenton-z2a.com)
