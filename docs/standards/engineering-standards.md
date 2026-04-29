# Engineering Standards

## Purpose

This document defines the default engineering standards for Udbhavi so that implementation stays modular, maintainable, and scalable as more features and agents get involved.

## General Principles

- Prefer small, focused files.
- Prefer composition over large multi-purpose modules.
- Keep responsibilities separated.
- Choose predictable, testable patterns over clever shortcuts.
- Preserve repo consistency even when moving quickly.

## File Size Guidelines

Default limits:

- React component: 200 lines.
- React hook: 200 lines.
- Backend router/controller: 150 lines.
- Backend service: 250 lines.
- Repository/data-access file: 250 lines.
- Utility/helper file: 200 lines.
- Test file: 300 lines.

These are not style theater. They are guardrails. If a file grows beyond them, it should usually be split.

## Frontend Standards

- Keep pages thin and route-focused.
- Move reusable UI into components.
- Move stateful or workflow-specific logic into hooks.
- Move API interaction into dedicated client helpers or feature API modules.
- Avoid putting validation, fetch logic, rendering, and state transitions into one file.
- Prefer feature folders for larger flows.

Preferred direction:

```text
features/resume-editor/
  components/
  hooks/
  api/
  types.ts
  utils.ts
```

## Backend Standards

- Routers should coordinate HTTP only.
- Services should contain business logic.
- Repositories should contain persistence logic.
- Schemas should define validation and contracts.
- Models should represent persisted entities.
- Long-running work should move to workers rather than staying in request handlers.

Preferred direction:

```text
app/modules/resumes/
  router.py
  service.py
  repository.py
  schemas.py
  models.py
```

## Testing Standards

- New behavior should come with tests that match the level of risk.
- Shared or stateful logic should be tested before UI polish is expanded.
- Critical user journeys need end-to-end or integration coverage over time.

## Documentation Standards

- Docs are part of the product system, not optional cleanup.
- Any important decision should land in docs during the same session in which it is made.
- If implementation diverges from a doc, update the doc immediately.

## Anti-Patterns

- Giant page components.
- Routers with business logic.
- Shared `utils` files turning into dumping grounds.
- Silent architecture changes with no doc update.
- Agent-generated code that passes checks but is hard to extend safely.
