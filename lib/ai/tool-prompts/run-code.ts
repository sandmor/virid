type TsDocBlock =
  | {
      kind: 'interface';
      name: string;
      description?: string;
      extends?: string[];
      members: TsInterfaceMember[];
    }
  | {
      kind: 'type';
      name: string;
      description?: string;
      type: string;
    };
type TsInterfaceMember = {
  kind: 'property' | 'method';
  name: string;
  type?: string;
  signature?: string;
  optional?: boolean;
  description?: string;
};

function renderDocBlock(block: TsDocBlock): string {
  const header = block.description
    ? `/**\n * ${block.description.replace(/\n/g, '\n * ')}\n */\n`
    : '';

  if (block.kind === 'type') {
    return `${header}type ${block.name} = ${block.type};`;
  }

  const extendsClause = block.extends?.length
    ? ` extends ${block.extends.join(', ')}`
    : '';

  const members = block.members
    .map((member) => {
      const lines: string[] = [];
      if (member.description) {
        lines.push('  /**');
        member.description.split('\n').forEach((line) => {
          lines.push(`   * ${line}`);
        });
        lines.push('   */');
      }
      if (member.kind === 'method') {
        lines.push(`  ${member.name}${member.signature ?? '(): void'};`);
      } else {
        lines.push(
          `  ${member.name}${member.optional ? '?' : ''}: ${member.type ?? 'unknown'};`
        );
      }
      return lines.join('\n');
    })
    .join('\n');

  return `${header}interface ${block.name}${extendsClause} {\n${members}\n}`;
}
const RUN_CODE_TS_DOCS: TsDocBlock[] = [
  {
    kind: 'type',
    name: 'RunCodeLanguage',
    description: 'Supported language for runCode.',
    type: "'javascript'",
  },
  {
    kind: 'interface',
    name: 'RunCodeInvocation',
    description:
      'Input payload when invoking runCode. Execution awaits any returned Promise.',
    members: [
      {
        kind: 'property',
        name: 'language',
        optional: true,
        type: 'RunCodeLanguage',
        description: 'Defaults to `javascript`. Other values are rejected.',
      },
      {
        kind: 'property',
        name: 'code',
        type: 'string',
        description: 'QuickJS-compatible JavaScript source.',
      },
      {
        kind: 'property',
        name: 'timeoutMs',
        optional: true,
        type: 'number',
        description:
          'Optional execution limit (250 ms to 5000 ms). Defaults to 1500 ms.',
      },
    ],
  },
  {
    kind: 'interface',
    name: 'RunCodeEstimatedLocation',
    description:
      'Approximate request location derived from platform hints. Values may be null when unavailable.',
    members: [
      { kind: 'property', name: 'latitude', type: 'number | null' },
      { kind: 'property', name: 'longitude', type: 'number | null' },
      { kind: 'property', name: 'city', type: 'string | null' },
      { kind: 'property', name: 'country', type: 'string | null' },
    ],
  },
  {
    kind: 'interface',
    name: 'RunCodeApi',
    description: 'Bridge exposed as global `api` inside runCode.',
    members: [
      {
        kind: 'method',
        name: 'getEstimatedLocation',
        signature: '(): RunCodeEstimatedLocation',
        description: 'Returns location data or throws if unavailable.',
      },
      {
        kind: 'method',
        name: 'getWeather',
        signature:
          '(options?: { latitude?: number; longitude?: number }): Promise<unknown>',
        description:
          'Fetches Open-Meteo weather JSON for the provided or estimated coordinates.',
      },
    ],
  },
  {
    kind: 'interface',
    name: 'RunCodeExecutionEnvironment',
    description: 'Metadata attached to every runCode response.',
    members: [
      { kind: 'property', name: 'language', type: 'RunCodeLanguage' },
      { kind: 'property', name: 'runtime', type: '"quickjs-emscripten"' },
      { kind: 'property', name: 'timeoutMs', type: 'number' },
      {
        kind: 'property',
        name: 'limits',
        type: '{ maxCodeLength: number; maxLogLines: number; maxCollectionItems: number }',
      },
      {
        kind: 'property',
        name: 'locationHints',
        type: 'RunCodeEstimatedLocation | null',
      },
      { kind: 'property', name: 'warnings', type: 'string[]' },
    ],
  },
  {
    kind: 'type',
    name: 'RunCodeToolError',
    description: 'Structured error payload when execution fails.',
    type: '{ name: string; message: string; stack?: string | null; [key: string]: unknown }',
  },
  {
    kind: 'interface',
    name: 'RunCodeToolResultBase',
    description: 'Fields shared by successful and failed executions.',
    members: [
      { kind: 'property', name: 'stdout', type: 'string[]' },
      { kind: 'property', name: 'stderr', type: 'string[]' },
      { kind: 'property', name: 'truncatedStdout', type: 'number' },
      { kind: 'property', name: 'truncatedStderr', type: 'number' },
      { kind: 'property', name: 'runtimeMs', type: 'number' },
      { kind: 'property', name: 'codeSize', type: 'number' },
      {
        kind: 'property',
        name: 'environment',
        type: 'RunCodeExecutionEnvironment',
      },
    ],
  },
  {
    kind: 'interface',
    name: 'RunCodeSuccessResult',
    extends: ['RunCodeToolResultBase'],
    description: 'Response payload when the script completes without throwing.',
    members: [
      { kind: 'property', name: 'status', type: '"ok"' },
      { kind: 'property', name: 'result', type: 'unknown' },
      { kind: 'property', name: 'error', type: 'null' },
    ],
  },
  {
    kind: 'interface',
    name: 'RunCodeErrorResult',
    extends: ['RunCodeToolResultBase'],
    description: 'Response payload when the script throws or times out.',
    members: [
      { kind: 'property', name: 'status', type: '"error"' },
      { kind: 'property', name: 'result', type: 'null' },
      { kind: 'property', name: 'error', type: 'RunCodeToolError' },
    ],
  },
  {
    kind: 'type',
    name: 'RunCodeToolResult',
    description: 'Union of possible runCode outcomes.',
    type: 'RunCodeSuccessResult | RunCodeErrorResult',
  },
];

const RUN_CODE_API_TS = RUN_CODE_TS_DOCS.map(renderDocBlock).join('\n\n');

export const RUN_CODE_TOOL_PROMPT = [
  'runCode sandbox (default tool)',
  '- Reach for runCode before other tools. Write JavaScript (Promises supported) and return the result.',
  '- Use the `api` bridge for external data; console output is surfaced back to the user.',
  '',
  'TypeScript API:',
  '```ts',
  RUN_CODE_API_TS,
  '```',
].join('\n');
