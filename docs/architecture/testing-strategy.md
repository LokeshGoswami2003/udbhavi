# Udbhavi Testing Strategy

## Testing Principle

Each phase must end with working tests for the behavior introduced in that phase. Tests should cover product-critical flows, validation, and failure handling before visual polish or extra features.

## Backend Tests

Required coverage:

- Health endpoint.
- Auth signup/login/refresh/logout.
- Protected route access.
- Password hashing behavior.
- Refresh token rotation and reuse rejection.
- Resume CRUD.
- Resume version creation.
- Resume JSON validation.
- Upload file validation.
- Extraction success/failure states.
- AI job creation and status transitions.
- Export job creation and status transitions.
- Usage event recording.
- Structured error responses.

## AI Workflow Tests

Required coverage:

- Mocked successful Bedrock response.
- Invalid JSON response.
- Schema validation failure.
- Retryable model/API failure.
- Non-retryable validation failure.
- Cost and token tracking.
- AI output does not replace current version until accepted.

## Rendering Tests

PDF/LaTeX:

- JSON-to-LaTeX golden output.
- LaTeX escaping for special characters.
- Successful compile.
- Failed compile.
- Compile timeout.
- Page count detection.

DOCX:

- JSON-to-DOCX generation.
- Required sections render.
- Empty optional sections are omitted cleanly.
- Generated file is associated with the correct resume version.

## Frontend Tests

Required coverage:

- Auth forms.
- Progressive onboarding.
- Resume upload UI.
- Template selection.
- Structured resume editor.
- Chat edit panel states.
- Job description input.
- ATS guidance display.
- PDF preview states.
- Download actions.
- Error and loading states.

## End-To-End MVP Flow

Critical path:

1. User signs up.
2. User completes progressive onboarding basics.
3. User uploads PDF or DOCX resume.
4. System extracts and analyzes resume.
5. User applies AI improvement.
6. User pastes job description.
7. System creates targeted version.
8. User previews generated PDF.
9. User downloads PDF and DOCX.

Template path:

1. User starts from template.
2. User enters missing details.
3. User edits structured fields.
4. User generates PDF and DOCX.

## Phase Definition Of Done

A phase is not complete until:

- Tests for new behavior exist.
- Tests pass locally.
- Lint/typecheck checks pass for touched code.
- Known limitations are documented.
- No unrelated files are rewritten.

## Manual Verification

Before MVP release, manually verify:

- Generated PDF quality for all three templates.
- Generated DOCX quality for all three templates.
- ATS guidance wording does not imply guaranteed pass/fail.
- AI edits are understandable and reversible.
- Failed exports produce useful user-facing errors.
