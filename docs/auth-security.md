# Udbhavi Auth And Security Requirements

## MVP Auth Scope

MVP authentication uses custom email/password auth.

Required flows:

- Sign up.
- Sign in.
- Access token issuance.
- Refresh token issuance.
- Refresh token rotation.
- Logout/revoke.
- Protected API routes.

Future auth options:

- Google OAuth.
- Email OTP.
- Two-factor authentication.

## Signup And Onboarding

Signup should require only:

- Email.
- Password.

After signup, the product should start progressive onboarding. Initial onboarding should collect only high-value context:

- Target role.
- Experience level.
- Country or job market.
- Primary skills.
- Career goal.

More details should be requested only when needed during resume creation, AI edits, and job targeting.

## Token Requirements

Access tokens:

- Short-lived.
- Bearer token format.
- Include user ID and token expiry.
- Must not include sensitive profile or resume data.

Refresh tokens:

- Longer-lived.
- Stored server-side as hashed tokens or token identifiers.
- Rotated on use.
- Revocable on logout.
- Invalidated when reuse is detected.

## Password Requirements

- Passwords must be hashed with a strong password hashing algorithm.
- Plaintext passwords must never be logged or stored.
- Login failures should use generic error messages.
- Rate limiting should be planned for auth routes.

## Authorization Requirements

- Users can access only their own profiles, resumes, resume versions, uploads, jobs, and generated files.
- All resume/job/file APIs require authentication unless explicitly marked public.
- Admin-only APIs should not be added in MVP unless needed for internal diagnostics.

## File Security

- Uploaded resumes are private by default.
- Generated PDF/DOCX files are private by default.
- Downloads should use short-lived presigned URLs or authenticated streaming.
- File type and size must be validated before processing.
- Uploaded content should be treated as untrusted.

## LaTeX Compiler Security

- Compiler runs outside the API process.
- Shell escape disabled.
- Compile timeout enforced.
- Temporary directories isolated.
- Worker runs as non-root.
- Custom packages restricted.
- Logs captured without exposing secrets.

## Operational Security

- Secrets must come from environment variables or AWS Secrets Manager.
- No secrets in Git.
- Production logs must avoid passwords, tokens, and full resume text where possible.
- AI prompts and responses may contain personal data, so access should be limited.

## Admin Scope

MVP has no admin panel.

MVP operations rely on:

- API logs.
- Worker logs.
- AI job records.
- Compile/export job records.
- Usage events.

Post-MVP can add an admin panel for support, templates, users, jobs, billing, and operations.
