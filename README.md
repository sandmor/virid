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

Provider integration is via OpenRouter. Config lives in `lib/ai/providers.ts`.

Default model: `GPT-5` (`openai/gpt-5`).

Guest users (unauthenticated) are restricted to free-tier models only:

- Grok 4 Fast (Free)
- Kimi K2 (Free)

Signed-in users (Clerk) gain access to all configured models including GPT‑5, Gemini 2.5 Flash Image Preview, and Grok 4.

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

## Updating Model Entitlements

1. Edit `lib/ai/entitlements.ts` for per-user-type model IDs and quota.
2. Ensure any newly added model has a corresponding entry in `lib/ai/models.ts` and provider mapping in `lib/ai/providers.ts`.
3. (Optional) Adjust UI copy if adding/removing major capabilities.

Both the client selector and server API use the same entitlement source, preventing privilege escalation via crafted requests.

## License

MIT
