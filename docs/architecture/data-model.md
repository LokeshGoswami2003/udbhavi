# Udbhavi Data Model Requirements

## Core Principle

Structured resume JSON is the source of truth. PDF, DOCX, LaTeX, previews, and AI suggestions are derived from validated structured data.

## Core Entities

### users

Stores account identity.

Fields:

- id.
- email.
- password_hash.
- plan.
- status.
- created_at.
- updated_at.

### refresh_tokens

Stores refresh session state.

Fields:

- id.
- user_id.
- token_hash or token_family_id.
- revoked_at.
- expires_at.
- created_at.
- rotated_at.

### profiles

Stores progressive onboarding and career context.

Fields:

- id.
- user_id.
- target_roles.
- experience_level.
- preferred_country.
- industry.
- primary_skills.
- career_goal.
- onboarding_status.
- created_at.
- updated_at.

### resume_sources

Stores uploaded or manually entered source context.

Fields:

- id.
- user_id.
- source_type.
- original_filename.
- file_format.
- upload_s3_key.
- extracted_text.
- extraction_status.
- extraction_error.
- created_at.

### resumes

Stores resume metadata.

Fields:

- id.
- user_id.
- title.
- target_role.
- status.
- current_version_id.
- created_at.
- updated_at.

### resume_versions

Stores versioned resume content and generated outputs.

Fields:

- id.
- resume_id.
- version_number.
- source_id.
- structured_json.
- template_id.
- target_job_id.
- latex_source_s3_key.
- pdf_s3_key.
- docx_s3_key.
- change_summary.
- created_by.
- created_at.

### templates

Stores template metadata.

Fields:

- id.
- name.
- category.
- industry.
- output_support.
- latex_template_s3_key.
- docx_template_s3_key.
- preview_image_s3_key.
- is_active.
- created_at.

### target_jobs

Stores job descriptions used for targeting.

Fields:

- id.
- user_id.
- resume_id.
- company.
- job_title.
- job_description.
- extracted_keywords.
- created_at.

### ai_jobs

Stores AI workflow status and cost metadata.

Fields:

- id.
- user_id.
- resume_id.
- resume_version_id.
- job_type.
- status.
- input_payload.
- output_payload.
- model_provider.
- model_id.
- token_input.
- token_output.
- cost_estimate.
- error_code.
- error_message.
- created_at.
- updated_at.

### export_jobs

Stores PDF/DOCX generation status.

Fields:

- id.
- resume_version_id.
- export_type.
- status.
- output_s3_key.
- page_count.
- log.
- error_code.
- error_message.
- created_at.
- updated_at.

### usage_events

Stores monetization-ready usage data.

Fields:

- id.
- user_id.
- event_type.
- quantity.
- metadata.
- created_at.

## Structured Resume JSON

Minimum MVP shape:

```json
{
  "target_role": "Backend Engineer",
  "contact": {
    "name": "Example User",
    "email": "user@example.com",
    "phone": "",
    "location": "",
    "links": []
  },
  "summary": "",
  "skills": {
    "languages": [],
    "frameworks": [],
    "tools": [],
    "cloud": [],
    "databases": []
  },
  "experience": [],
  "projects": [],
  "education": [],
  "certifications": [],
  "metadata": {
    "industry": "software",
    "experience_level": "",
    "preferred_country": "",
    "one_page_preference": true
  }
}
```

Each experience item should support:

- company.
- role.
- location.
- start_date.
- end_date.
- is_current.
- bullets.
- technologies.

Each project item should support:

- name.
- description.
- links.
- technologies.
- bullets.

## Versioning Rules

- A resume must have one current version.
- AI edits that are accepted by the user create a new version.
- Job-targeted resumes create new versions.
- Exports are tied to a specific resume version.
- Failed AI/export jobs must not replace the current version.
- Prior versions must remain recoverable.

## Data Boundaries

- Resume source text is context, not the canonical resume.
- Structured JSON is canonical.
- LaTeX source is generated output.
- PDF and DOCX are generated artifacts.
- AI suggestions are proposals until accepted.
