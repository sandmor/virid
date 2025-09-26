<h1 align="center">Virid Chat</h1>

Advanced multimodal AI chat application built with Next.js 15, React 19, and the AI SDK. Features a sophisticated artifact system, persistent memory archive, and comprehensive admin controls.

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#artifacts"><strong>Artifacts</strong></a> ·
  <a href="#archive"><strong>Archive</strong></a> ·
  <a href="#models"><strong>Models</strong></a> ·
  <a href="#auth"><strong>Auth</strong></a> ·
  <a href="#admin"><strong>Admin</strong></a> ·
  <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#running-locally"><strong>Running locally</strong></a>
</p>
<br />

## Features

### Core Chat Experience

- **Multimodal Conversations**: Support for text, images, and file attachments
- **Real-time Streaming**: Live response streaming with AI SDK
- **Chat Management**: Fork conversations, track message lineage, vote on responses
- **Auto-resume**: Continue conversations seamlessly across sessions
- **Rate Limiting**: Token bucket system with configurable refill rates

### Advanced AI Integration

- **Unified Provider API**: Single interface for multiple AI providers (OpenRouter, OpenAI, Google Gemini)
- **Dynamic Model Selection**: Choose from various models based on user tier
- **Tool Calling**: AI can use specialized tools for enhanced capabilities
- **Context Preservation**: Maintains conversation context and user preferences

### Artifacts System

AI-generated collaborative documents that enhance conversations:

- **Text Artifacts**: Rich text documents with editing and suggestions
- **Code Artifacts**: Syntax-highlighted code with live editing and execution
- **Image Artifacts**: AI-generated images with editing capabilities
- **Sheet Artifacts**: CSV data with interactive data grid visualization

### Archive Memory System

Persistent, searchable knowledge base for long-term memory:

- **Knowledge Entries**: Store facts, preferences, and relationships
- **Semantic Linking**: Connect related concepts with bidirectional relationships
- **AI Integration**: Archive tools allow AI to remember and retrieve information
- **Search & Discovery**: Full-text search with tag-based filtering

### Authentication & Security

- **Clerk Integration**: Enterprise-grade authentication with SSO support
- **Guest Mode**: Anonymous access with limited model availability
- **Session Management**: Secure cookie-based sessions for guests
- **Model Entitlements**: Tier-based access control for AI models

### Admin Dashboard

Comprehensive administrative controls:

- **Provider Management**: Override API keys per provider
- **Tier Configuration**: Manage user tiers, rate limits, and model access
- **Usage Monitoring**: Track API usage and system performance
- **Model Catalog**: Curate available models and their capabilities

## Artifacts

The artifact system enables AI to create and manipulate structured content during conversations:

### Text Artifacts

- Rich text editing with ProseMirror
- AI-powered suggestions for improvements
- Version history and diff viewing
- Collaborative editing capabilities

### Code Artifacts

- Syntax highlighting with CodeMirror
- Multiple language support
- Live code execution and validation
- Code completion and refactoring suggestions

### Image Artifacts

- AI-generated images from text prompts
- Image editing and manipulation tools
- Multiple format support (PNG, JPEG, WebP)
- Integration with multimodal conversations

### Sheet Artifacts

- CSV data generation and editing
- Interactive data grid with React Data Grid
- Data visualization and analysis
- Export capabilities

## Archive

The archive serves as a persistent memory system for both users and AI:

### Core Concepts

- **Entries**: Individual knowledge units with titles, content, and tags
- **Links**: Semantic relationships between entries (related, parent/child, etc.)
- **Search**: Full-text search across all entries with tag filtering
- **Ownership**: Per-user isolation with secure access controls

### AI Integration

The archive provides tools for AI assistants to:

- Create new memories from conversations
- Retrieve relevant information for context
- Link related concepts automatically
- Update existing knowledge as new information emerges

### User Interface

- **Explorer View**: Browse and search archive entries
- **Detail View**: Read and edit individual entries
- **Link Visualization**: See relationships between entries
- **Bulk Operations**: Import/export and batch management

## Models

Provider-agnostic model registry supporting multiple AI providers:

### Supported Models

- **GPT-5**: OpenAI's latest flagship model
- **Gemini 2.5 Pro/Flash**: Google's advanced multimodal models
- **Grok 4**: xAI's reasoning-focused model
- **Kimi K2**: Moonshot's multilingual model

### Provider Integration

- **OpenRouter**: Primary provider with model aggregation
- **Direct OpenAI**: Native OpenAI API integration
- **Google Gemini**: Direct Google AI API access
- **Configurable Registry**: Easy addition of new providers

### Entitlement System

- **Guest Tier**: Free models only (Grok 4 Fast, Kimi K2)
- **Authenticated Tier**: Full model access with rate limiting
- **Admin Override**: Custom tier configurations per user type

## Auth

Flexible authentication system with enterprise and guest support:

### Clerk Integration

- **SSO Support**: Google, GitHub, and enterprise providers
- **User Management**: Profile management and session handling
- **Admin Controls**: User administration and access management
- **Webhook Integration**: Real-time user event processing

### Guest Mode

- **Cookie Sessions**: Secure anonymous access
- **Fallback Authentication**: Seamless upgrade to full accounts
- **Limited Access**: Free-tier models and basic features
- **Data Isolation**: Separate handling for guest data

## Admin

Administrative interface for system management:

### Provider Management

- **API Key Overrides**: Database-stored keys override environment variables
- **Provider Status**: Monitor provider health and usage
- **Key Rotation**: Secure key management and rotation

### Tier Management

- **User Tiers**: Configure model access and rate limits
- **Rate Limiting**: Token bucket configuration per tier
- **Model Lists**: Curate available models per user type
- **Usage Tracking**: Monitor and analyze system usage

## Tech Stack

### Frontend

- **Next.js 15**: App Router with React 19
- **TypeScript**: Full type safety and developer experience
- **Tailwind CSS v4**: Utility-first styling with modern features
- **shadcn/ui**: High-quality component library
- **Radix UI**: Accessible, unstyled UI primitives
- **Framer Motion**: Smooth animations and transitions

### Backend & Data

- **AI SDK**: Unified interface for AI providers
- **Prisma**: Type-safe database ORM
- **PostgreSQL**: Primary data store (Neon Serverless)
- **Redis**: Caching and rate limiting (Upstash)
- **Vercel Blob**: File storage and CDN

### Development & Deployment

- **Bun**: Fast package manager and runtime
- **Biome**: Lightning-fast linter and formatter
- **Playwright**: End-to-end testing
- **Vercel**: Deployment platform with edge functions
- **OpenTelemetry**: Observability and monitoring

### Key Libraries

- **@ai-sdk/react**: React hooks for AI conversations
- **@clerk/nextjs**: Authentication and user management
- **@tanstack/react-query**: Data fetching and caching
- **react-hook-form**: Form management with validation
- **zod**: Runtime type validation
- **date-fns**: Date manipulation utilities

## Running locally

### Prerequisites

- Node.js 18+ or Bun
- PostgreSQL database
- Redis (optional, for rate limiting)

### Setup

```bash
# Install dependencies
bun install

# Set up database
bun run db:migrate

# Generate Prisma client
bun run db:generate

# Start development server
bun run dev
```

Navigate to http://localhost:3000.

### Environment Variables

Create `.env.local` with required configuration:

#### Essential

| Variable                   | Purpose                             |
| -------------------------- | ----------------------------------- |
| `AUTH_SECRET`              | Session encryption key              |
| `NEXT_PUBLIC_APP_BASE_URL` | Base URL for metadata and redirects |
| `DATABASE_URL`             | PostgreSQL connection string        |
| `OPENROUTER_API_KEY`       | OpenRouter API key for AI models    |

#### Authentication (Clerk)

| Variable                            | Purpose          |
| ----------------------------------- | ---------------- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk client key |
| `CLERK_SECRET_KEY`                  | Clerk server key |

#### Optional

| Variable                       | Purpose                            |
| ------------------------------ | ---------------------------------- |
| `REDIS_URL`                    | Redis connection for rate limiting |
| `BLOB_READ_WRITE_TOKEN`        | Vercel Blob storage token          |
| `OPENAI_API_KEY`               | Direct OpenAI API access           |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Direct Gemini API access           |
| `ADMIN_USER_ID`                | Admin user ID for dashboard access |
| `ADMIN_EMAIL`                  | Admin email fallback               |

### Database Setup

```bash
# Create database and run migrations
bun run db:push

# (Optional) Seed with initial data
bun run db:seed
```

### Testing

```bash
# Run Playwright tests
bun run test:e2e

# Run linting
bun run lint

# Run type checking
bun run type-check
```

## Deployment

### Vercel (Recommended)

1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Enable Vercel integrations:
   - Neon for PostgreSQL
   - Upstash for Redis
   - Vercel Blob for file storage
4. Deploy automatically on push

### Manual Deployment

The application is designed to run on any platform supporting Node.js:

```bash
# Build for production
bun run build

# Start production server
bun run start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes with proper TypeScript types
4. Add tests for new functionality
5. Submit a pull request

## License

MIT
