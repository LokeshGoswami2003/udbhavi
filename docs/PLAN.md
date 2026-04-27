# Udbhavi Phase 0 Documentation Index

Phase 0 turns the raw idea in `docs/readdoc.md` into implementation-ready product and architecture documents. This phase is documentation-only: no app scaffold, backend code, AWS resources, or feature implementation.

## Current Product Direction

Udbhavi is an AWS-first AI resume-building SaaS for IT/software professionals, including freshers and experienced users.

The MVP must support two creation paths:

- Upload an existing resume as PDF or DOCX.
- Start from one of three software-focused templates.

The MVP output experience must support:

- Resume analysis and improvement suggestions.
- Structured resume editing.
- Chat-based AI edits.
- Job-description targeting.
- ATS-style guidance score and keyword/readability feedback.
- Preview and download for generated PDF and generated DOCX.
- Resume versions from day one.

The most important technical rule is:

> Structured resume JSON is the source of truth. AI may analyze, rewrite, and suggest, but final PDF/DOCX rendering must come from validated structured data and deterministic backend workflows.

## Planning Docs

- [Product Requirements](./planning/product-requirements.md)
- [Phase Roadmap](./planning/phase-roadmap.md)
- [Logic Review](./planning/logic-review.md)

## Architecture Docs

- [Architecture](./architecture/architecture.md)
- [Auth & Security](./architecture/auth-security.md)
- [Data Model](./architecture/data-model.md)
- [AI Workflows](./architecture/ai-workflows.md)
- [Export & Rendering](./architecture/export-rendering.md)
- [Testing Strategy](./architecture/testing-strategy.md)

## Setup Docs

- [Phase 1 Setup](./setup/phase-1-setup.md)
- [Current Setup Flow](./setup/current-setup-flow.md)

## Journey Docs

- [Journey Index](./journey/README.md)
- [Project Kickoff Entry](./journey/2026-04-27-kickoff.md)
- [LinkedIn Launch Post](./journey/linkedin-launch-post.md)

## Source References

- [Raw requirements and earlier architecture notes](./readdoc.md)
- [Phase 0 execution plan](./PLAN0.md)

## Locked Decisions

- Audience: IT/software professionals, including freshers and experienced candidates.
- Upload formats: PDF and DOCX.
- Export formats: generated PDF and generated DOCX.
- Templates: 3 MVP templates: Software Engineer, Fresher/Internship, Modern ATS.
- Editing: structured editor plus chat-based AI edits in MVP.
- Job targeting: full MVP requirement.
- ATS feedback: guidance score and suggestions, not a guaranteed pass/fail claim.
- Onboarding: progressive, with basics first and missing details requested later.
- Auth: custom email/password auth first; Google OAuth, OTP, and 2FA later.
- Monetization: usage tracking and tier/rate-limit readiness from day one; payment integration later.
- Admin: no admin panel in MVP; rely on logs and job records. Admin panel is post-MVP.
- Infrastructure: AWS-first for Bedrock, RDS PostgreSQL, S3, SQS, ECS Fargate, CloudWatch, and Secrets Manager.
- Frontend hosting: AWS by default for now; Vercel may be researched later.

## Phase 0 Definition Of Done

- The docs listed above exist under `docs/`.
- Requirements clearly separate MVP, post-MVP, and future ideas.
- Major architecture decisions have a recorded reason and known risk.
- Future implementation can start with Phase 1 without needing product-scope decisions.
- No implementation code has been added in Phase 0.
