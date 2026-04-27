# Udbhavi Export And Rendering Requirements

## Export Principle

PDF and DOCX must be generated from validated structured resume JSON. They should not be manually maintained as separate sources of truth.

## MVP Output Formats

MVP supports:

- Preview of the generated resume version.
- PDF download.
- DOCX download.

DOCX upload is also supported as an input format.

The preview should reflect the same structured resume version used for both exports. Native DOCX preview is optional for MVP; generated DOCX download is required.

## PDF Rendering

PDF generation flow:

```text
Structured resume JSON
  -> Backend LaTeX renderer
  -> LaTeX source
  -> Export worker
  -> XeLaTeX/TeX Live compile
  -> PDF
  -> S3
  -> Preview/download
```

Rules:

- AI must not generate final LaTeX for normal resume generation.
- Backend renderer must escape unsafe LaTeX characters.
- Compile logs must be stored.
- Page count must be recorded.
- Generated PDF must be tied to a resume version.

## DOCX Rendering

DOCX generation flow:

```text
Structured resume JSON
  -> DOCX renderer
  -> DOCX file
  -> S3
  -> Download
```

Rules:

- DOCX should be generated directly from structured JSON.
- Do not convert PDF to DOCX for MVP.
- DOCX output should preserve clean resume formatting and be editable by users.
- Generated DOCX must be tied to a resume version.

## MVP Templates

Required templates:

- Software Engineer.
- Fresher/Internship.
- Modern ATS.

Each template should define:

- Supported sections.
- Ordering rules.
- Font and spacing settings.
- One-page fitting controls.
- PDF rendering rules.
- DOCX rendering rules where applicable.

## One-Page Fitting

One-page fitting should combine deterministic layout controls and AI compression.

Suggested flow:

1. Compile PDF.
2. Check page count.
3. Apply spacing/font/margin controls if over one page.
4. Ask AI to compress lower-priority content only if layout controls are insufficient.
5. Recompile.
6. Store what changed.

The system must not silently delete important content.

## Compiler Security

The LaTeX compiler worker must:

- Run outside the API process.
- Disable shell escape.
- Enforce compile timeouts.
- Run in isolated temp directories.
- Run as non-root.
- Restrict custom packages.
- Delete temp files after completion.

## Future Exports

Post-MVP may add:

- In-app LaTeX editor.
- LaTeX download.
- More template families.
- Custom sections.
- Public resume links.
