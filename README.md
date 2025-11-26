# Viral Video Automator

Automates trend discovery (Google Trends, TikTok, YouTube), script generation (OpenAI), video planning/render handoff (LovoArt stub), optional clipping (Cloudinary), logging to Google Sheets, and upload stubs for TikTok & YouTube Shorts. Includes a minimal dashboard and Vercel Cron to run twice daily.

## Quickstart

1) Install

```bash
npm install
```

2) Run dev

```bash
npm run dev
```

Open http://localhost:3000

3) Trigger a run from the UI or via API:

```bash
curl -X POST http://localhost:3000/api/run -H 'content-type: application/json' -d '{"region":"US"}'
```

## Environment Variables

Set these in `.env.local` (and on Vercel project settings):

- OPENAI_API_KEY: for script generation (optional; mocked if absent)
- YOUTUBE_API_KEY: to fetch popular videos (optional; mocked if absent)
- GOOGLE_APPLICATION_CREDENTIALS_JSON: service account JSON (stringified) for Google Sheets (optional)
- GOOGLE_SHEETS_SHEET_ID: target sheet id (optional)
- CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET: enable video clipping via remote fetch + trimming (optional)
- LOVOART_API_KEY: render via LovoArt API (stub; optional)
- TIKTOK_CLIENT_KEY, TIKTOK_CLIENT_SECRET: for future direct uploads (stub; optional)
- VERCEL_CRON_SECRET: not required here, but available if you want to guard cron calls

Create `.env.local` example:

```bash
OPENAI_API_KEY=sk-...
YOUTUBE_API_KEY=AIza...
GOOGLE_APPLICATION_CREDENTIALS_JSON='{"type":"service_account","project_id":"...","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n","client_email":"svc@project.iam.gserviceaccount.com","client_id":"...","token_uri":"https://oauth2.googleapis.com/token"}'
GOOGLE_SHEETS_SHEET_ID=1abcDEF...
CLOUDINARY_CLOUD_NAME=demo
CLOUDINARY_API_KEY=123
CLOUDINARY_API_SECRET=abc
```

## Vercel Cron

Configured in `vercel.json` to invoke twice daily (UTC 02:00 and 14:00):

```json
{
  "crons": [
    { "path": "/api/run?region=US", "schedule": "0 14,2 * * *" }
  ]
}
```

## Notes

- TikTok and YouTube uploaders are stubs. Provide credentials and complete implementations as needed.
- Clipping uses Cloudinary remote fetch + trimming transform; for YouTube sources, ensure you have rights and use compliant sources.
- This repo focuses on orchestrating the flow and deployability to Vercel.
