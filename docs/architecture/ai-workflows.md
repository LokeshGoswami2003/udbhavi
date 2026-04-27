# Udbhavi AI Workflow Requirements

## AI Principle

AI helps analyze, rewrite, and structure resume content. It must not be the uncontrolled source of final documents.

Required rule:

- AI outputs structured JSON or structured suggestions.
- Backend validates the output.
- Backend saves accepted structured data.
- Renderers generate PDF/DOCX deterministically.

## Default Model

Default provider:

- Amazon Bedrock.

Default model:

- Claude Sonnet 4.6.

The model must be configured through settings, not hardcoded across the codebase. The implementation should allow changing model ID, region, inference profile, and fallback model without changing workflow logic.

Official AWS documentation currently lists Claude Sonnet 4.6 as active and documents the model ID `anthropic.claude-sonnet-4-6`.

References:

- https://docs.aws.amazon.com/bedrock/latest/userguide/model-card-anthropic-claude-sonnet-4-6.html
- https://docs.aws.amazon.com/bedrock/latest/userguide/model-cards-anthropic.html

## Workflow: extract_resume_context

Purpose:

- Convert uploaded PDF/DOCX text into reusable resume context.

Input:

- Extracted text.
- File metadata.
- User profile context.

Output:

- Candidate contact info.
- Candidate skills.
- Candidate education.
- Candidate experience.
- Candidate projects.
- Missing or ambiguous fields.

## Workflow: analyze_resume

Purpose:

- Evaluate resume quality before rewriting.

Input:

- Resume source text or structured resume JSON.
- Target role.
- Experience level.
- Country/job market.

Output:

- Strengths.
- Weaknesses.
- Missing details.
- ATS guidance.
- Content clarity issues.
- Suggested next actions.

## Workflow: generate_resume_json

Purpose:

- Create clean structured resume JSON from source context, onboarding, and template target.

Input:

- User profile.
- Resume source context.
- Selected template.
- Target role.

Output:

- Valid structured resume JSON.
- Assumptions made.
- Missing questions for the user.

## Workflow: rewrite_section

Purpose:

- Improve one selected resume section.

Input:

- Current structured resume JSON.
- Section path.
- User instruction.
- Target role.

Output:

- Updated section JSON.
- Explanation of the change.

## Workflow: chat_edit

Purpose:

- Apply natural-language resume edits through chat.

Example commands:

- Make this resume more backend-focused.
- Rewrite this project bullet.
- Add AWS and Docker naturally.
- Make this suitable for SDE-1 roles.
- Shorten the resume.

Output:

- Proposed JSON patch or replacement section.
- Explanation.
- Confidence.
- Any required user follow-up questions.

The user must be able to review or recover from accepted changes through versioning.

## Workflow: target_to_job

Purpose:

- Tailor a resume to a pasted job description.

Input:

- Current structured resume JSON.
- Job description.
- User profile.

Output:

- Tailored resume JSON.
- Keyword additions.
- Keyword gaps.
- Relevance improvements.
- Change explanation.

## Workflow: ats_guidance

Purpose:

- Provide honest ATS-style feedback.

Output:

- Guidance score.
- Keyword match summary.
- Missing keywords.
- Overused or weak phrasing.
- Readability feedback.
- Formatting risks.

The score must be framed as guidance, not a guaranteed ATS pass/fail result.

## Workflow: compress_to_one_page

Purpose:

- Help fit content into a one-page resume when requested.

Input:

- Structured resume JSON.
- Current page count.
- Template constraints.

Output:

- Shortened bullets.
- Lower-priority content suggestions.
- Explanation of removed or compressed content.

This workflow should be combined with deterministic layout controls.

## Workflow Safety

All workflows must have:

- Input schema.
- Output schema.
- Prompt template.
- Validation step.
- Retry policy.
- Error code.
- Usage tracking.
- Cost estimate.

AI failures must never corrupt the current resume version.
