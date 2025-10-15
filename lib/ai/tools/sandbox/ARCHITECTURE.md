# Sandbox Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Code                              │
│                    (AI Model using runCode)                      │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      run-code.ts                                 │
│                   (Tool Definition)                              │
│  • Zod schema validation                                         │
│  • Delegates to executor                                         │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    sandbox/executor.ts                           │
│                  (Main Orchestrator)                             │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ 1. Validate input                                          │ │
│  │ 2. Setup QuickJS runtime with limits                      │ │
│  │ 3. Install API bridges                                    │ │
│  │ 4. Execute scripts (bootstrap → api → user code)         │ │
│  │ 5. Collect and return results                            │ │
│  └────────────────────────────────────────────────────────────┘ │
└───┬─────────────┬──────────────┬──────────────┬─────────────┬──┘
    │             │              │              │             │
    ▼             ▼              ▼              ▼             ▼
┌────────┐  ┌──────────┐  ┌───────────┐  ┌──────────┐  ┌─────────┐
│config  │  │ errors   │  │  logger   │  │  types   │  │quickjs- │
│        │  │          │  │           │  │          │  │ utils   │
│Constants│ │Custom    │  │Structured │  │Type      │  │Runtime  │
│& Limits│  │Error     │  │Logging    │  │Definitions│ │Helpers  │
│        │  │Hierarchy │  │           │  │          │  │         │
└────────┘  └──────────┘  └───────────┘  └──────────┘  └─────────┘
    │             │              │              │             │
    └─────────────┴──────────────┴──────────────┴─────────────┘
                             │
                             ▼
            ┌────────────────────────────────┐
            │     sandbox/scripts.ts         │
            │   (Script Generators)          │
            │ ┌────────────────────────────┐ │
            │ │ createBootstrapScript()   │ │
            │ │ createApiScript()         │ │
            │ │ createExecutionScript()   │ │
            │ │ createSummaryScript()     │ │
            │ └────────────────────────────┘ │
            └────────────────────────────────┘
                             │
                             ▼
            ┌────────────────────────────────┐
            │    sandbox/api-bridge.ts       │
            │   (API Bridge System)          │
            │ ┌────────────────────────────┐ │
            │ │ createWeatherBridge()     │ │
            │ │ installApiBridges()       │ │
            │ │ getApiMetadata()          │ │
            │ └────────────────────────────┘ │
            └───────────┬────────────────────┘
                        │
                        ▼
            ┌────────────────────────────────┐
            │  sandbox/external-apis.ts      │
            │  (External Services)           │
            │ ┌────────────────────────────┐ │
            │ │ fetchWeather()            │ │
            │ │ (future: fetchHttp, etc.) │ │
            │ └────────────────────────────┘ │
            └────────────────────────────────┘
                        │
                        ▼
            ┌────────────────────────────────┐
            │    External Services           │
            │  • Open-Meteo Weather API      │
            │  • (Future HTTP endpoints)     │
            └────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                   QuickJS Sandbox Environment                    │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Global Scope                                              │ │
│  │  ├── console (captured)                                    │ │
│  │  ├── api                                                   │ │
│  │  │   ├── fetch() → __virid_host_fetch__ (future)         │ │
│  │  │   └── getWeather() → __virid_host_get_weather__      │ │
│  │  └── User Code                                            │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  Resource Limits:                                                │
│  • Memory: 16 MB                                                 │
│  • Stack: 512 KB                                                 │
│  • Timeout: 250ms - 5000ms                                      │
│  • Code Size: 12,000 chars                                      │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                  tool-prompts/run-code.ts                        │
│              (Auto-Generated Documentation)                      │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ • Reads metadata from api-bridge.ts                       │ │
│  │ • Generates TypeScript interfaces                         │ │
│  │ • Creates model prompt with latest API info               │ │
│  │ • Documentation always in sync with code                  │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘

Data Flow:
──────────
1. AI Model calls runCode tool
2. run-code.ts validates schema
3. executor.ts orchestrates execution
4. QuickJS runtime is created with limits
5. API bridges are installed
6. Scripts are executed in sequence
7. User code runs in sandbox
8. Results are collected and sanitized
9. Response returned to AI Model

Extension Flow:
───────────────
1. Create service function (external-apis.ts)
2. Create bridge handler (api-bridge.ts)
3. Add metadata entry (api-bridge.ts)
4. Update API script (scripts.ts)
5. Install bridge (executor.ts)
6. Documentation auto-updates! ✨
```

## Key Design Principles

### 1. **Separation of Concerns**

Each module has a single, clear responsibility:

- Config = Constants only
- Errors = Error types only
- Logger = Logging only
- etc.

### 2. **Dependency Flow**

```
executor → api-bridge → external-apis
    ↓          ↓
  scripts   quickjs-utils
    ↓          ↓
  config    errors, logger, types
```

No circular dependencies!

### 3. **Type Safety**

- Every function has explicit types
- No `any` types anywhere
- Runtime validation with type guards
- Compile-time safety with TypeScript

### 4. **Extensibility**

- New APIs added without modifying core
- Bridge system is pluggable
- Metadata drives documentation
- Scripts are generated, not hardcoded

### 5. **Security**

- Multiple layers of validation
- Resource limits enforced
- Sandboxed execution
- No access to host environment
- Controlled external API access
