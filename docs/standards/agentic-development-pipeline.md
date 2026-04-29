# Agentic Development Pipeline

## Purpose

This pipeline defines how Udbhavi development should happen before, during, and after implementation so that agentic work stays robust and maintainable.

## Pipeline Stages

### 1. Context Build

Before writing code:

- Read `docs/PLAN.md`.
- Read the relevant planning, architecture, and setup docs.
- Read existing QA records in `docs/qa/`.
- Inspect the current code paths that will be touched.

Output:

- The implementer should know the relevant constraints, scope boundaries, and prior decisions.

### 2. Question And Decision Capture

Before or during feature design:

- Ask the user the questions that materially affect the design.
- Record the resolved answers in `docs/qa/`.
- Update architecture or roadmap docs when the answer changes the plan.

Output:

- Product intent is captured in repo docs rather than left in chat history.

### 3. Task Framing

Before implementation:

- Define the scope of the change.
- Identify files/modules likely to be touched.
- Decide whether the change should create new components/services/modules.
- Confirm what is explicitly out of scope.

Output:

- The change is small enough to implement cleanly.

### 4. Implementation

During implementation:

- Tell the user implementation is starting.
- Ask for user input when a meaningful decision or tradeoff would change the implementation shape.
- Keep files small.
- Split modules when responsibilities diverge.
- Reuse established patterns.
- Avoid surprise architecture changes.
- Update docs when decisions are made.

Output:

- The code is modular and consistent with repo standards.

### 5. Verification

After implementation:

- Run the relevant checks.
- Fix mechanical formatter/lint issues with the configured tools.
- Verify that docs still match behavior.
- Record blockers if environment limitations prevent full verification.

Output:

- The result is verified, and any remaining risk is explicit.

### 6. Closeout

At the end of the work session:

- Summarize what changed.
- State what was verified.
- Record limitations or blockers.
- Update roadmap/setup docs if the phase status changed.

## Required Artifacts

The pipeline expects these repo artifacts to stay current:

- `docs/planning/phase-roadmap.md`
- `docs/qa/`
- `docs/journey/`
- setup docs
- architecture docs
- `AGENTS.md`

## Hard Rules

- Do not start substantial development without reading the relevant docs.
- Do not leave important product answers only in conversation history.
- Do not allow large files to grow unchecked when splitting is the better design.
- Do not merge architecture, data access, UI, and business logic into the same files when a cleaner split is available.
- Do not begin major implementation silently; notify the user that implementation is beginning.
- Do not finalize important implementation decisions without either documented prior context or direct user confirmation when needed.
