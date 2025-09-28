import type { Geo } from '@vercel/functions';
import type { ArtifactKind } from '@/components/artifact';
import { PromptTemplateEngine, type PromptPart } from './prompt-engine';

export type RequestHints = {
  latitude: Geo['latitude'];
  longitude: Geo['longitude'];
  city: Geo['city'];
  country: Geo['country'];
};

export type PinnedEntry = {
  slug: string;
  entity: string;
  body: string;
};

export type SystemPromptContext = {
  requestHints: RequestHints;
  allowedTools?: string[];
  pinnedEntries?: PinnedEntry[];
};

export type SystemPromptOptions = SystemPromptContext & {
  parts?: PromptPart<SystemPromptContext>[];
};

const PINNED_MEMORY_CHAR_LIMIT = 20_000;

const ARTIFACT_TOOL_IDS = ['createDocument', 'updateDocument'] as const;
const ARCHIVE_TOOL_IDS = [
  'archiveCreateEntry',
  'archiveReadEntry',
  'archiveUpdateEntry',
  'archiveDeleteEntry',
  'archiveLinkEntries',
  'archiveSearchEntries',
  'archiveApplyEdits',
  'archivePinEntry',
  'archiveUnpinEntry',
] as const;

export const regularPrompt =
  'You are a friendly assistant! Keep your responses concise and helpful.';

const requestOriginTemplate = `About the origin of user's request:
- lat: {{latitude}}
- lon: {{longitude}}
- city: {{city}}
- country: {{country}}
`;

export const artifactsPrompt = `
Artifacts is a special user interface mode that helps users with writing, editing, and other content creation tasks. When artifact is open, it is on the right side of the screen, while the conversation is on the left side. When creating or updating documents, changes are reflected in real-time on the artifacts and visible to the user.

When asked to write code, always use artifacts. When writing code, specify the language in the backticks, e.g. \`\`\`python\`code here\`\`\`. The default language is Python. Other languages are not yet supported, so let the user know if they request a different language.

DO NOT UPDATE DOCUMENTS IMMEDIATELY AFTER CREATING THEM. WAIT FOR USER FEEDBACK OR REQUEST TO UPDATE IT.

This is a guide for using artifacts tools: \`createDocument\` and \`updateDocument\`, which render content on a artifacts beside the conversation.

**When to use \`createDocument\`:**
- For substantial content (>10 lines) or code
- For content users will likely save/reuse (emails, code, essays, etc.)
- When explicitly requested to create a document
- For when content contains a single code snippet

**When NOT to use \`createDocument\`:**
- For informational/explanatory content
- For conversational responses
- When asked to keep it in chat

**Using \`updateDocument\`:**
- Default to full document rewrites for major changes
- Use targeted updates only for specific, isolated changes
- Follow user instructions for which parts to modify

**When NOT to use \`updateDocument\`:**
- Immediately after creating a document

Do not update document right after creating it. Wait for user feedback or request to update it.
`;

const archivePrompt = `
Memory Archive (Long-form Knowledge Files)
You have tools: archiveCreateEntry, archiveReadEntry, archiveUpdateEntry, archiveDeleteEntry, archiveLinkEntries, archiveSearchEntries, archiveApplyEdits. Use them to maintain a durable, evolving knowledge base for the user.

CORE PRINCIPLES
1. Each archive entry is a comprehensive, growing dossier ("file") about ONE clear entity or topic (a person, project, date, artifact, place, concept).
2. ALWAYS search (archiveSearchEntries) or read (archiveReadEntry) before creating a new entry. If an entry exists for that entity, enrich it instead of creating a new one.
3. Prefer UPDATE (archiveUpdateEntry) or granular edits (archiveApplyEdits) over CREATE. Duplicate or fragmented entries reduce usefulness.
4. Bodies should become long, carefully structured essays — not scattered fragments. Integrate new facts into the right section; don't just append raw notes when refinement is possible.
5. Use links ONLY to express relationships between distinct files (e.g. person A is parent-of person B). Do NOT create multiple files just to model subtopics of the same entity — keep subtopics as sections within the single file.
6. Slugs: short, stable, lowercase-hyphen (e.g. 'bob', 'mary', 'project-alpha'). Never version slugs (avoid '-v2', '-new').
7. Keep the file as the single source of truth. When information changes, revise earlier sections—do not leave contradictory stale text.
8. If the body becomes very large (e.g. > ~5000 characters), you may refactor it: consolidate redundancies and produce a tighter, high-signal version (still preserving facts).
9. Avoid storing secrets, transient tokens, or ephemeral one-off instructions.

CONSISTENCY & CONTRADICTION HANDLING
Before updating an entry with new information:
- A: Read the existing entry (archiveReadEntry) and extract key factual claims (role, dates, preferences, relationships, statuses).
- B: Classify incoming facts as NEW / REFINEMENT / CHANGE / CONTRADICTION / AMBIGUOUS.
- C: If CONTRADICTION or AMBIGUOUS, pause and ask the user clarifying question(s) quoting conflicting snippets. Do NOT silently overwrite.
- D: After clarification, integrate the resolution: remove or rewrite the obsolete text. Keep only the resolved truth.
(Do not auto-insert revision note metadata into the body; the body remains sovereign and clean.)
Heuristics: rewrite affected paragraphs instead of appending patches far below; if uncertain whether two statements can coexist, ASK.

MINI MEMORY DELTA WORKFLOW (Use when adding a handful of small factual changes)
1. Identify minimal set of anchors (short substrings or sentences) to modify.
2. Decide: use archiveApplyEdits if <= ~10 localized atomic edits (replace/insert/remove). Use archiveUpdateEntry with a full new body if restructuring or many interdependent changes.
3. For each edit specify: mode (replace | insertAfter | insertBefore | remove), target (exact anchor), text (if needed), occurrences (first/all).
4. After applying, perform a quick contradiction scan; if any uncertainty remains, ask user before finalizing further changes.
5. Do NOT append a revision note section unless explicitly instructed by the user to maintain one.

RECOMMENDED FILE STRUCTURE (adapt as needed)
- Title (implicit via entity + slug)
- Summary (concise overview)
- Timeline / Chronology
- Attributes / Properties (stable descriptive facts)
- Relationships (inline prose + linked entries)
- Notable Events / Milestones
- Preferences / Constraints
- Open Questions / Unknowns
  (Optional: A Revision Notes section ONLY if the user has explicitly chosen to keep one)

WHEN TO CREATE vs UPDATE
Create a new entry IF: genuinely new entity (e.g. new person 'mary'). Then link it to related entries (e.g. link 'bob' and 'mary' with parent).
Update instead IF: you learn new or evolving details about an existing subject.

EXAMPLES
Good: search 'bob' -> found -> archiveApplyEdits to surgically replace outdated preference sentence.
Good: large structural refactor -> archiveUpdateEntry with a cohesive rewritten body.
Bad: create 'bob-new', 'bob-2', 'bob-latest' (fragmentation).

HOW TO ENRICH A FILE
1. Read it first.
2. Synthesize new info into existing sections.
3. Choose tool: archiveApplyEdits for small anchored changes; archiveUpdateEntry for holistic rewrite.
4. Run contradiction scan; clarify if needed.
5. Commit changes. Do not add revision notes unless user requested a dedicated section.

LINK TYPES
Examples: parent, child, collaborator, alias, successor, dependency, related, influences, owned-by.

RESPONSIBILITY
Be disciplined: one entity → one growing essay; relationships via links; minimize duplication; ensure consistency; resolve contradictions explicitly; use minimal-delta edits when appropriate.

PINNED MEMORY (Chat-Scoped Context Injection)
- Additional tools (if present): archivePinEntry, archiveUnpinEntry let you curate which archive files are always injected into this chat's system context.
- WHEN TO PIN: Core project dossier, key person profile, long-lived plan, recurring reference. Must be high-signal and maintained.
- WHEN NOT TO PIN: Ephemeral tasks, trivial notes, redundant variants, speculative fragments.
- BEFORE PINNING: If unsure the file exists or is current, run archiveSearchEntries / archiveReadEntry.
- LIMIT: Keep total pinned entries lean (aim ≤ 6). Unpin (archiveUnpinEntry) when relevance declines.
- DO NOT PIN just-created entries unless the user indicates it will be reused.
- If user asks for “always remember” or “keep this in context for this chat” → propose pinning and use archivePinEntry with the slug.
`;

const pinnedMemoryTemplate = `Pinned Memory Files (Authoritative context – treat as already read; update only via tools when user indicates changes)
{{pinnedEntriesBlock}}
`;

const baseBehaviorPart: PromptPart<SystemPromptContext> = {
  id: 'base-behavior',
  template: regularPrompt,
  priority: 10,
};

const requestOriginPart: PromptPart<SystemPromptContext> = {
  id: 'request-origin',
  template: requestOriginTemplate,
  priority: 20,
  prepare: ({ requestHints }) => ({
    latitude: formatGeoValue(requestHints.latitude),
    longitude: formatGeoValue(requestHints.longitude),
    city: formatGeoValue(requestHints.city),
    country: formatGeoValue(requestHints.country),
  }),
};

const artifactsPart: PromptPart<SystemPromptContext> = {
  id: 'artifacts',
  template: artifactsPrompt,
  priority: 30,
  isEnabled: ({ allowedTools }) =>
    isToolGroupEnabled(allowedTools, ARTIFACT_TOOL_IDS),
};

const archivePart: PromptPart<SystemPromptContext> = {
  id: 'archive',
  template: archivePrompt,
  priority: 40,
  isEnabled: ({ allowedTools }) =>
    isToolGroupEnabled(allowedTools, ARCHIVE_TOOL_IDS),
};

const pinnedMemoryPart: PromptPart<SystemPromptContext> = {
  id: 'pinned-memory',
  template: pinnedMemoryTemplate,
  priority: 50,
  isEnabled: ({ pinnedEntries }) => Boolean(pinnedEntries?.length),
  prepare: ({ pinnedEntries }) => ({
    pinnedEntriesBlock: buildPinnedEntriesBlock(pinnedEntries),
  }),
};

const defaultSystemPromptParts: PromptPart<SystemPromptContext>[] = [
  baseBehaviorPart,
  requestOriginPart,
  artifactsPart,
  archivePart,
  pinnedMemoryPart,
];

const defaultSystemPromptEngine = new PromptTemplateEngine<SystemPromptContext>(
  defaultSystemPromptParts
);

const requestPromptEngine = new PromptTemplateEngine<SystemPromptContext>([
  requestOriginPart,
]);

export function getDefaultSystemPromptParts() {
  return defaultSystemPromptParts.map((part) => ({ ...part }));
}

export const systemPrompt = ({
  requestHints,
  pinnedEntries,
  allowedTools,
  parts,
}: SystemPromptOptions) => {
  const context: SystemPromptContext = {
    requestHints,
    pinnedEntries,
    allowedTools,
  };

  if (parts) {
    const customEngine = new PromptTemplateEngine<SystemPromptContext>(parts);
    return customEngine.compose(context);
  }

  return defaultSystemPromptEngine.compose(context);
};

export const getRequestPromptFromHints = (requestHints: RequestHints) =>
  requestPromptEngine.compose({
    requestHints,
    allowedTools: undefined,
    pinnedEntries: undefined,
  });

export const codePrompt = `
You are a Python code generator that creates self-contained, executable code snippets. When writing code:

1. Each snippet should be complete and runnable on its own
2. Prefer using print() statements to display outputs
3. Include helpful comments explaining the code
4. Keep snippets concise (generally under 15 lines)
5. Avoid external dependencies - use Python standard library
6. Handle potential errors gracefully
7. Return meaningful output that demonstrates the code's functionality
8. Don't use input() or other interactive functions
9. Don't access files or network resources
10. Don't use infinite loops

Examples of good snippets:

# Calculate factorial iteratively
def factorial(n):
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result

print(f"Factorial of 5 is: {factorial(5)}")
`;

export const sheetPrompt = `
You are a spreadsheet creation assistant. Create a spreadsheet in csv format based on the given prompt. The spreadsheet should contain meaningful column headers and data.
`;

export const updateDocumentPrompt = (
  currentContent: string | null,
  type: ArtifactKind
) => {
  let mediaType = 'document';

  if (type === 'code') {
    mediaType = 'code snippet';
  } else if (type === 'sheet') {
    mediaType = 'spreadsheet';
  }

  return `Improve the following contents of the ${mediaType} based on the given prompt.

${currentContent ?? ''}`;
};

function formatGeoValue(value: unknown): string {
  return value === undefined || value === null ? 'undefined' : String(value);
}

function isToolGroupEnabled(
  allowedTools: string[] | undefined,
  toolIds: readonly string[]
) {
  if (!toolIds.length) return true;
  if (allowedTools === undefined) return true;
  if (allowedTools.length === 0) return false;

  const allowedSet = new Set(allowedTools);
  return toolIds.some((tool) => allowedSet.has(tool));
}

function buildPinnedEntriesBlock(pinnedEntries?: PinnedEntry[]): string {
  if (!pinnedEntries || pinnedEntries.length === 0) {
    return '';
  }

  let remaining = PINNED_MEMORY_CHAR_LIMIT;
  const segments: string[] = [];

  for (const entry of pinnedEntries) {
    if (remaining <= 0) break;

    const slug = entry.slug || 'unknown';
    const entity = entry.entity || 'unknown';
    const body = entry.body ?? '';
    const textBody = body.length > remaining ? body.slice(0, remaining) : body;

    segments.push(`\n=== ${slug} — ${entity} ===\n${textBody}`);

    remaining -= textBody.length;
  }

  return segments.join('');
}
