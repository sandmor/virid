function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== 'object') {
    return false;
  }

  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

export type TemplateData = Record<string, unknown>;

const PLACEHOLDER_REGEX = /\{\{\s*([a-zA-Z0-9_.-]+)\s*\}\}/g;

const EACH_BLOCK_REGEX = /\{\{#each\s+([a-zA-Z0-9_.-]+)\s*\}\}([\s\S]*?)\{\{\/each\}\}/g;

function resolvePath(source: TemplateData, path: string): unknown {
  const segments = path.split('.');
  let current: unknown = source;

  for (const segment of segments) {
    if (current == null) {
      return undefined;
    }

    if (typeof current !== 'object') {
      return undefined;
    }

    if (!(segment in (current as Record<string, unknown>))) {
      return undefined;
    }

    current = (current as Record<string, unknown>)[segment];
  }

  return current;
}

function mergeData(target: TemplateData, additions: TemplateData): TemplateData {
  return Object.assign({}, target, additions);
}

function normaliseValue(value: unknown): string {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  return JSON.stringify(value);
}

function cloneContext<Context>(context: Context): TemplateData {
  if (context == null || typeof context !== 'object') {
    return {};
  }

  if (isPlainObject(context)) {
    return { ...(context as TemplateData) };
  }

  // Fall back to shallow copy if it's an instance of a class
  return Object.assign({}, context as TemplateData);
}

function renderEachBlocks(template: string, data: TemplateData): string {
  return template.replace(EACH_BLOCK_REGEX, (_, key: string, block: string) => {
    const value = resolvePath(data, key);

    if (!Array.isArray(value) || value.length === 0) {
      return '';
    }

    return value
      .map((item, index) => {
        const iterationData: TemplateData = {
          ...data,
          this: item,
          index,
        };
        return renderTemplate(block, iterationData);
      })
      .join('');
  });
}

export function renderTemplate(template: string, data: TemplateData): string {
  const withEachBlocks = renderEachBlocks(template, data);

  return withEachBlocks.replace(
    PLACEHOLDER_REGEX,
    (_match: string, rawKey: string) => {
      const value = resolvePath(data, rawKey);
      return normaliseValue(value);
    }
  );
}

export interface PromptPart<Context> {
  id: string;
  template: string;
  priority?: number;
  isEnabled?: (context: Context) => boolean;
  prepare?: (context: Context) => TemplateData;
  separator?: string;
}

export interface PromptTemplateEngineOptions {
  joiner?: string;
}

export class PromptTemplateEngine<Context> {
  private readonly joiner: string;

  constructor(
    private readonly parts: PromptPart<Context>[],
    options: PromptTemplateEngineOptions = {}
  ) {
    this.joiner = options.joiner ?? '\n\n';
  }

  compose(context: Context): string {
    const baseData: TemplateData = cloneContext(context);
    const dataWithContext = mergeData(baseData, { context } as TemplateData);

    const renderedParts = this.parts
      .filter((part) => (part.isEnabled ? part.isEnabled(context) : true))
      .sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0))
      .map((part) => {
        const prepared = part.prepare ? part.prepare(context) : undefined;
        const templateData = prepared
          ? mergeData(dataWithContext, prepared)
          : dataWithContext;
        const rendered = renderTemplate(part.template, templateData).trim();
        return { rendered, separator: part.separator };
      })
      .filter(({ rendered }) => rendered.length > 0);

    if (renderedParts.length === 0) {
      return '';
    }

    return renderedParts
      .map(({ rendered, separator }, index) => {
        const suffix = separator ?? (index === renderedParts.length - 1 ? '' : this.joiner);
        return `${rendered}${suffix}`;
      })
      .join('')
      .trim();
  }
}
