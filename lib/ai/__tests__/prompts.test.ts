import { describe, expect, it } from 'bun:test';
import { systemPrompt, getRequestPromptFromHints } from '../prompts';
import type { RequestHints } from '../prompts';

const baseRequestHints: RequestHints = {
  latitude: '48.8566',
  longitude: '2.3522',
  city: 'Paris',
  country: 'France',
};

describe('systemPrompt', () => {
  it('includes artifacts guidance when artifact tools are enabled', () => {
    const prompt = systemPrompt({
      requestHints: baseRequestHints,
      allowedTools: ['createDocument', 'updateDocument'],
    });

    expect(prompt).toContain(
      'Artifacts workspace (side-by-side document view)'
    );
  });

  it('omits artifacts guidance when artifact tools are disabled', () => {
    const prompt = systemPrompt({
      requestHints: baseRequestHints,
      allowedTools: [],
    });

    expect(prompt).not.toContain(
      'Artifacts workspace (side-by-side document view)'
    );
  });

  it('includes archive guidance only when archive tools are allowed', () => {
    const withoutArchive = systemPrompt({
      requestHints: baseRequestHints,
      allowedTools: [],
    });

    const withArchive = systemPrompt({
      requestHints: baseRequestHints,
      allowedTools: ['archiveReadEntry'],
    });

    expect(withoutArchive).not.toContain(
      'Archive tools (long-form knowledge base)'
    );
    expect(withArchive).toContain('Archive tools (long-form knowledge base)');
  });

  it('always includes formatting guidance', () => {
    const prompt = systemPrompt({
      requestHints: baseRequestHints,
      allowedTools: [],
    });

    expect(prompt).toContain('Render math with KaTeX syntax');
    expect(prompt).toContain('```mermaid');
  });

  it('adds pinned entries respecting size guard', () => {
    const longBody = 'a'.repeat(21_000);
    const prompt = systemPrompt({
      requestHints: baseRequestHints,
      allowedTools: [],
      pinnedEntries: [
        {
          slug: 'alpha',
          entity: 'Project Alpha',
          body: longBody,
        },
      ],
    });

    expect(prompt).toContain('=== alpha — Project Alpha ===');
    expect(prompt).toContain('a'.repeat(20_000));
    expect(prompt).not.toContain('a'.repeat(20_001));
  });
});

describe('getRequestPromptFromHints', () => {
  it('renders location hints with fallback', () => {
    const prompt = getRequestPromptFromHints({
      latitude: undefined,
      longitude: undefined,
      city: 'Madrid',
      country: undefined,
    });

    expect(prompt).toContain('- lat: undefined');
    expect(prompt).toContain('- lon: undefined');
    expect(prompt).toContain('- city: Madrid');
    expect(prompt).toContain('- country: undefined');
  });
});
