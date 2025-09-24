<h1 align="center">Virid Chat</h1>

Multimodal AI chat application built with Next.js (App Router), the AI SDK, Clerk authentication, and Postgres persistence. This fork removes public deployment calls-to-action and restricts non-free models to authenticated users.

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#models"><strong>Models</strong></a> ·
  <a href="#auth"><strong>Auth</strong></a> ·
  <a href="#running-locally"><strong>Running locally</strong></a>
</p>
<br />

## Features

- [Next.js](https://nextjs.org) App Router
  - Advanced routing for seamless navigation and performance
  - React Server Components (RSCs) and Server Actions for server-side rendering and increased performance
- [AI SDK](https://ai-sdk.dev/docs/introduction)
  - Unified API for generating text, structured objects, and tool calls with LLMs
  - Hooks for building dynamic chat and generative user interfaces
  - Supports OpenRouter (default), OpenAI-compatible providers, Fireworks, and others
- [shadcn/ui](https://ui.shadcn.com)
  - Styling with [Tailwind CSS](https://tailwindcss.com)
  - Component primitives from [Radix UI](https://radix-ui.com) for accessibility and flexibility
- Data Persistence
  - [Neon Serverless Postgres](https://vercel.com/marketplace/neon) for saving chat history and user data
  - [Vercel Blob](https://vercel.com/storage/blob) for efficient file storage
- Authentication
  - Clerk as IdP with custom minimal forms (email/password) + guest fallback

## Models

Provider integration now uses a lightweight registry (OpenRouter + direct Google Gemini) in `lib/ai/providers.ts`.

Default model: `GPT-5` (`openai/gpt-5`).

Guest users (unauthenticated) are restricted to free-tier models only:

- Grok 4 Fast (Free)
- Kimi K2 (Free)

Signed-in users (Clerk) gain access to all configured models including:

- GPT‑5
- Gemini 2.5 Flash Image Preview
- Gemini 2.5 Flash
- Gemini 2.5 Pro
- Grok 4

Add/remove models by editing:

1. `lib/ai/models.ts` (metadata: name + description)
2. `lib/ai/providers.ts` (registry mapping model id → provider model string)
3. `lib/ai/entitlements.ts` (which user types can see each model)

Changing availability involves editing `lib/ai/entitlements.ts` (server + UI respect the same source of truth) and optionally updating `lib/ai/models.ts`.

## Auth

The app uses Clerk. If Clerk env vars are absent (local / CI), a guest session cookie is used. Server routes enforce model entitlements; attempts by guests to use non-free models return `unauthorized:chat`.

## Running locally

Copy `.env.example` to `.env.local` and populate required keys (Clerk, database, OpenRouter API key, etc.). Do NOT commit the populated file.

```bash
bun install
bun run dev
```

Navigate to http://localhost:3000.

If you don't configure Clerk keys you'll operate in guest mode; only free models will appear.

### Environment Variables

Essential (minimum to enable full auth + models):

| Variable | Purpose |
|----------|---------|
| `AUTH_SECRET` | Session secret for Next.js / edge crypto helpers. |
| `NEXT_PUBLIC_APP_BASE_URL` | Absolute base URL used for metadata + OAuth redirects. |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY` | Clerk authentication (publishable + backend). |
| `OPENROUTER_API_KEY` | LLM provider key for OpenRouter. |
| `POSTGRES_URL` | Primary Postgres connection string (pooled). |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob storage token (RW). |
| `REDIS_URL` | Upstash / Redis for transient data & rate limiting (optional but recommended). |

Optional:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_DISABLE_SOCIAL_AUTH` | Set to `1` to hide Google/social buttons. |
| `POSTGRES_URL_NON_POOLING`, `POSTGRES_PRISMA_URL` | Alternate DSNs if needed. |
| `VERCEL_OIDC_TOKEN` | Provided automatically in Vercel build environment. |
| `AI_GATEWAY_API_KEY` | If routing via a custom AI gateway instead of direct OpenRouter. |

### Social Authentication (Google)

Google OAuth is enabled automatically when Clerk is configured and `NEXT_PUBLIC_DISABLE_SOCIAL_AUTH` is not set to `1`.

1. In Clerk Dashboard → OAuth Providers → Enable Google.
2. Add an authorized redirect URL: `http://localhost:3000/sso-callback` (and production equivalent).
3. Deploy with the same base URL in `NEXT_PUBLIC_APP_BASE_URL`.

The unified component `SocialAuthButtons` lives in `components/social-auth-buttons.tsx` and can be extended with additional providers (GitHub, etc.) by adding strategy constants and rendering more buttons.

Playwright tests retain existing email/password flows; a helper exists to trigger Google sign-in (`loginWithGoogle`) but real OAuth is typically mocked or skipped in CI.

In CI (detected via `PLAYWRIGHT` / `CI_PLAYWRIGHT`) social auth buttons are suppressed automatically to prevent flaky external redirects.

## Updating Model Entitlements

1. Edit `lib/ai/entitlements.ts` for per-user-type model IDs and quota.
2. Ensure any newly added model has a corresponding entry in `lib/ai/models.ts` and provider mapping in `lib/ai/providers.ts` (both OpenRouter aliases and direct providers like Google are supported).
3. (Optional) Adjust UI copy if adding/removing major capabilities.

Both the client selector and server API use the same entitlement source, preventing privilege escalation via crafted requests.

## License

MIT
