/**
 * Client
 **/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types; // general types
import $Public = runtime.Types.Public;
import $Utils = runtime.Types.Utils;
import $Extensions = runtime.Types.Extensions;
import $Result = runtime.Types.Result;

export type PrismaPromise<T> = $Public.PrismaPromise<T>;

/**
 * Model Provider
 *
 */
export type Provider = $Result.DefaultSelection<Prisma.$ProviderPayload>;
/**
 * Model Tier
 *
 */
export type Tier = $Result.DefaultSelection<Prisma.$TierPayload>;
/**
 * Model User
 *
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>;
/**
 * Model UserRateLimit
 *
 */
export type UserRateLimit =
  $Result.DefaultSelection<Prisma.$UserRateLimitPayload>;
/**
 * Model Agent
 *
 */
export type Agent = $Result.DefaultSelection<Prisma.$AgentPayload>;
/**
 * Model Chat
 *
 */
export type Chat = $Result.DefaultSelection<Prisma.$ChatPayload>;
/**
 * Model Message
 *
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>;
/**
 * Model Vote
 *
 */
export type Vote = $Result.DefaultSelection<Prisma.$VotePayload>;
/**
 * Model Document
 *
 */
export type Document = $Result.DefaultSelection<Prisma.$DocumentPayload>;
/**
 * Model Suggestion
 *
 */
export type Suggestion = $Result.DefaultSelection<Prisma.$SuggestionPayload>;
/**
 * Model Stream
 *
 */
export type Stream = $Result.DefaultSelection<Prisma.$StreamPayload>;
/**
 * Model ArchiveEntry
 *
 */
export type ArchiveEntry =
  $Result.DefaultSelection<Prisma.$ArchiveEntryPayload>;
/**
 * Model ChatPinnedArchiveEntry
 *
 */
export type ChatPinnedArchiveEntry =
  $Result.DefaultSelection<Prisma.$ChatPinnedArchiveEntryPayload>;
/**
 * Model ArchiveLink
 *
 */
export type ArchiveLink = $Result.DefaultSelection<Prisma.$ArchiveLinkPayload>;

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Providers
 * const providers = await prisma.provider.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions
    ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<ClientOptions['log']>
      : never
    : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] };

  /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Providers
   * const providers = await prisma.provider.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(
    optionsArg?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>
  );
  $on<V extends U>(
    eventType: V,
    callback: (
      event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent
    ) => void
  ): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(
    arg: [...P],
    options?: { isolationLevel?: Prisma.TransactionIsolationLevel }
  ): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;

  $transaction<R>(
    fn: (
      prisma: Omit<PrismaClient, runtime.ITXClientDenyList>
    ) => $Utils.JsPromise<R>,
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    }
  ): $Utils.JsPromise<R>;

  $extends: $Extensions.ExtendsHook<
    'extends',
    Prisma.TypeMapCb<ClientOptions>,
    ExtArgs,
    $Utils.Call<
      Prisma.TypeMapCb<ClientOptions>,
      {
        extArgs: ExtArgs;
      }
    >
  >;

  /**
   * `prisma.provider`: Exposes CRUD operations for the **Provider** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Providers
   * const providers = await prisma.provider.findMany()
   * ```
   */
  get provider(): Prisma.ProviderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tier`: Exposes CRUD operations for the **Tier** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Tiers
   * const tiers = await prisma.tier.findMany()
   * ```
   */
  get tier(): Prisma.TierDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userRateLimit`: Exposes CRUD operations for the **UserRateLimit** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more UserRateLimits
   * const userRateLimits = await prisma.userRateLimit.findMany()
   * ```
   */
  get userRateLimit(): Prisma.UserRateLimitDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.agent`: Exposes CRUD operations for the **Agent** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Agents
   * const agents = await prisma.agent.findMany()
   * ```
   */
  get agent(): Prisma.AgentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chat`: Exposes CRUD operations for the **Chat** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Chats
   * const chats = await prisma.chat.findMany()
   * ```
   */
  get chat(): Prisma.ChatDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Messages
   * const messages = await prisma.message.findMany()
   * ```
   */
  get message(): Prisma.MessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vote`: Exposes CRUD operations for the **Vote** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Votes
   * const votes = await prisma.vote.findMany()
   * ```
   */
  get vote(): Prisma.VoteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.document`: Exposes CRUD operations for the **Document** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Documents
   * const documents = await prisma.document.findMany()
   * ```
   */
  get document(): Prisma.DocumentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.suggestion`: Exposes CRUD operations for the **Suggestion** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Suggestions
   * const suggestions = await prisma.suggestion.findMany()
   * ```
   */
  get suggestion(): Prisma.SuggestionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.stream`: Exposes CRUD operations for the **Stream** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Streams
   * const streams = await prisma.stream.findMany()
   * ```
   */
  get stream(): Prisma.StreamDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.archiveEntry`: Exposes CRUD operations for the **ArchiveEntry** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more ArchiveEntries
   * const archiveEntries = await prisma.archiveEntry.findMany()
   * ```
   */
  get archiveEntry(): Prisma.ArchiveEntryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chatPinnedArchiveEntry`: Exposes CRUD operations for the **ChatPinnedArchiveEntry** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more ChatPinnedArchiveEntries
   * const chatPinnedArchiveEntries = await prisma.chatPinnedArchiveEntry.findMany()
   * ```
   */
  get chatPinnedArchiveEntry(): Prisma.ChatPinnedArchiveEntryDelegate<
    ExtArgs,
    ClientOptions
  >;

  /**
   * `prisma.archiveLink`: Exposes CRUD operations for the **ArchiveLink** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more ArchiveLinks
   * const archiveLinks = await prisma.archiveLink.findMany()
   * ```
   */
  get archiveLink(): Prisma.ArchiveLinkDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF;

  export type PrismaPromise<T> = $Public.PrismaPromise<T>;

  /**
   * Validator
   */
  export import validator = runtime.Public.validator;

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError;
  export import PrismaClientValidationError = runtime.PrismaClientValidationError;

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag;
  export import empty = runtime.empty;
  export import join = runtime.join;
  export import raw = runtime.raw;
  export import Sql = runtime.Sql;

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal;

  export type DecimalJsLike = runtime.DecimalJsLike;

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics;
  export type Metric<T> = runtime.Metric<T>;
  export type MetricHistogram = runtime.MetricHistogram;
  export type MetricHistogramBucket = runtime.MetricHistogramBucket;

  /**
   * Extensions
   */
  export import Extension = $Extensions.UserArgs;
  export import getExtensionContext = runtime.Extensions.getExtensionContext;
  export import Args = $Public.Args;
  export import Payload = $Public.Payload;
  export import Result = $Public.Result;
  export import Exact = $Public.Exact;

  /**
   * Prisma Client JS version: 6.16.2
   * Query Engine version: 1c57fdcd7e44b29b9313256c76699e91c3ac3c43
   */
  export type PrismaVersion = {
    client: string;
  };

  export const prismaVersion: PrismaVersion;

  /**
   * Utility Types
   */

  export import JsonObject = runtime.JsonObject;
  export import JsonArray = runtime.JsonArray;
  export import JsonValue = runtime.JsonValue;
  export import InputJsonObject = runtime.InputJsonObject;
  export import InputJsonArray = runtime.InputJsonArray;
  export import InputJsonValue = runtime.InputJsonValue;

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
     * Type of `Prisma.DbNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class DbNull {
      private DbNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.JsonNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class JsonNull {
      private JsonNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.AnyNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class AnyNull {
      private AnyNull: never;
      private constructor();
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull;

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull;

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull;

  type SelectAndInclude = {
    select: any;
    include: any;
  };

  type SelectAndOmit = {
    select: any;
    omit: any;
  };

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> =
    T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<
    T extends (...args: any) => $Utils.JsPromise<any>,
  > = PromiseType<ReturnType<T>>;

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K;
  }[keyof T];

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K;
  };

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & (T extends SelectAndInclude
    ? 'Please either choose `select` or `include`.'
    : T extends SelectAndOmit
      ? 'Please either choose `select` or `omit`.'
      : {});

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & K;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = T extends object
    ? U extends object
      ? (Without<T, U> & U) | (Without<U, T> & T)
      : U
    : T;

  /**
   * Is T a Record?
   */
  type IsObject<T extends any> =
    T extends Array<any>
      ? False
      : T extends Date
        ? False
        : T extends Uint8Array
          ? False
          : T extends BigInt
            ? False
            : T extends object
              ? True
              : False;

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O>; // With K possibilities
    }[K];

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<
    __Either<O, K>
  >;

  type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
  }[strict];

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1,
  > = O extends unknown ? _Either<O, K, strict> : never;

  export type Union = any;

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
  } & {};

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never;

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<
    Overwrite<
      U,
      {
        [K in keyof U]-?: At<U, K>;
      }
    >
  >;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O
    ? O[K]
    : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown
    ? AtStrict<O, K>
    : never;
  export type At<
    O extends object,
    K extends Key,
    strict extends Boolean = 1,
  > = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function
    ? A
    : {
        [K in keyof A]: A[K];
      } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
      ?
          | (K extends keyof O ? { [P in K]: O[P] } & O : O)
          | ({ [P in keyof O as P extends K ? P : never]-?: O[P] } & O)
      : never
  >;

  type _Strict<U, _U = U> = U extends unknown
    ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
    : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False;

  // /**
  // 1
  // */
  export type True = 1;

  /**
  0
  */
  export type False = 0;

  export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
  }[B];

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
      ? 1
      : 0;

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >;

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0;
      1: 1;
    };
    1: {
      0: 1;
      1: 1;
    };
  }[B1][B2];

  export type Keys<U extends Union> = U extends unknown ? keyof U : never;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object
    ? {
        [P in keyof T]: P extends keyof O ? O[P] : never;
      }
    : never;

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>,
  > = IsObject<T> extends True ? U : T;

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<
            UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never
          >
        : never
      : {} extends FieldPaths<T[K]>
        ? never
        : K;
  }[keyof T];

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<
    T,
    K extends Enumerable<keyof T> | keyof T,
  > = Prisma__Pick<T, MaybeTupleToUnion<K>>;

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}`
    ? never
    : T;

  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;

  type FieldRefInputType<Model, FieldType> = Model extends never
    ? never
    : FieldRef<Model, FieldType>;

  export const ModelName: {
    Provider: 'Provider';
    Tier: 'Tier';
    User: 'User';
    UserRateLimit: 'UserRateLimit';
    Agent: 'Agent';
    Chat: 'Chat';
    Message: 'Message';
    Vote: 'Vote';
    Document: 'Document';
    Suggestion: 'Suggestion';
    Stream: 'Stream';
    ArchiveEntry: 'ArchiveEntry';
    ChatPinnedArchiveEntry: 'ChatPinnedArchiveEntry';
    ArchiveLink: 'ArchiveLink';
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName];

  export type Datasources = {
    db?: Datasource;
  };

  interface TypeMapCb<ClientOptions = {}>
    extends $Utils.Fn<
      { extArgs: $Extensions.InternalArgs },
      $Utils.Record<string, any>
    > {
    returns: Prisma.TypeMap<
      this['params']['extArgs'],
      ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}
    >;
  }

  export type TypeMap<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > = {
    globalOmitOptions: {
      omit: GlobalOmitOptions;
    };
    meta: {
      modelProps:
        | 'provider'
        | 'tier'
        | 'user'
        | 'userRateLimit'
        | 'agent'
        | 'chat'
        | 'message'
        | 'vote'
        | 'document'
        | 'suggestion'
        | 'stream'
        | 'archiveEntry'
        | 'chatPinnedArchiveEntry'
        | 'archiveLink';
      txIsolationLevel: Prisma.TransactionIsolationLevel;
    };
    model: {
      Provider: {
        payload: Prisma.$ProviderPayload<ExtArgs>;
        fields: Prisma.ProviderFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ProviderFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ProviderFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload>;
          };
          findFirst: {
            args: Prisma.ProviderFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ProviderFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload>;
          };
          findMany: {
            args: Prisma.ProviderFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload>[];
          };
          create: {
            args: Prisma.ProviderCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload>;
          };
          createMany: {
            args: Prisma.ProviderCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ProviderCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload>[];
          };
          delete: {
            args: Prisma.ProviderDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload>;
          };
          update: {
            args: Prisma.ProviderUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload>;
          };
          deleteMany: {
            args: Prisma.ProviderDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ProviderUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.ProviderUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload>[];
          };
          upsert: {
            args: Prisma.ProviderUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload>;
          };
          aggregate: {
            args: Prisma.ProviderAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateProvider>;
          };
          groupBy: {
            args: Prisma.ProviderGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ProviderGroupByOutputType>[];
          };
          count: {
            args: Prisma.ProviderCountArgs<ExtArgs>;
            result: $Utils.Optional<ProviderCountAggregateOutputType> | number;
          };
        };
      };
      Tier: {
        payload: Prisma.$TierPayload<ExtArgs>;
        fields: Prisma.TierFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.TierFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TierPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.TierFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TierPayload>;
          };
          findFirst: {
            args: Prisma.TierFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TierPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.TierFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TierPayload>;
          };
          findMany: {
            args: Prisma.TierFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TierPayload>[];
          };
          create: {
            args: Prisma.TierCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TierPayload>;
          };
          createMany: {
            args: Prisma.TierCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.TierCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TierPayload>[];
          };
          delete: {
            args: Prisma.TierDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TierPayload>;
          };
          update: {
            args: Prisma.TierUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TierPayload>;
          };
          deleteMany: {
            args: Prisma.TierDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.TierUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.TierUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TierPayload>[];
          };
          upsert: {
            args: Prisma.TierUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TierPayload>;
          };
          aggregate: {
            args: Prisma.TierAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateTier>;
          };
          groupBy: {
            args: Prisma.TierGroupByArgs<ExtArgs>;
            result: $Utils.Optional<TierGroupByOutputType>[];
          };
          count: {
            args: Prisma.TierCountArgs<ExtArgs>;
            result: $Utils.Optional<TierCountAggregateOutputType> | number;
          };
        };
      };
      User: {
        payload: Prisma.$UserPayload<ExtArgs>;
        fields: Prisma.UserFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateUser>;
          };
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>;
            result: $Utils.Optional<UserGroupByOutputType>[];
          };
          count: {
            args: Prisma.UserCountArgs<ExtArgs>;
            result: $Utils.Optional<UserCountAggregateOutputType> | number;
          };
        };
      };
      UserRateLimit: {
        payload: Prisma.$UserRateLimitPayload<ExtArgs>;
        fields: Prisma.UserRateLimitFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.UserRateLimitFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserRateLimitPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.UserRateLimitFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserRateLimitPayload>;
          };
          findFirst: {
            args: Prisma.UserRateLimitFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserRateLimitPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.UserRateLimitFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserRateLimitPayload>;
          };
          findMany: {
            args: Prisma.UserRateLimitFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserRateLimitPayload>[];
          };
          create: {
            args: Prisma.UserRateLimitCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserRateLimitPayload>;
          };
          createMany: {
            args: Prisma.UserRateLimitCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.UserRateLimitCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserRateLimitPayload>[];
          };
          delete: {
            args: Prisma.UserRateLimitDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserRateLimitPayload>;
          };
          update: {
            args: Prisma.UserRateLimitUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserRateLimitPayload>;
          };
          deleteMany: {
            args: Prisma.UserRateLimitDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.UserRateLimitUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.UserRateLimitUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserRateLimitPayload>[];
          };
          upsert: {
            args: Prisma.UserRateLimitUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserRateLimitPayload>;
          };
          aggregate: {
            args: Prisma.UserRateLimitAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateUserRateLimit>;
          };
          groupBy: {
            args: Prisma.UserRateLimitGroupByArgs<ExtArgs>;
            result: $Utils.Optional<UserRateLimitGroupByOutputType>[];
          };
          count: {
            args: Prisma.UserRateLimitCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<UserRateLimitCountAggregateOutputType>
              | number;
          };
        };
      };
      Agent: {
        payload: Prisma.$AgentPayload<ExtArgs>;
        fields: Prisma.AgentFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.AgentFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AgentPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.AgentFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>;
          };
          findFirst: {
            args: Prisma.AgentFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AgentPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.AgentFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>;
          };
          findMany: {
            args: Prisma.AgentFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>[];
          };
          create: {
            args: Prisma.AgentCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>;
          };
          createMany: {
            args: Prisma.AgentCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.AgentCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>[];
          };
          delete: {
            args: Prisma.AgentDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>;
          };
          update: {
            args: Prisma.AgentUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>;
          };
          deleteMany: {
            args: Prisma.AgentDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.AgentUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.AgentUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>[];
          };
          upsert: {
            args: Prisma.AgentUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>;
          };
          aggregate: {
            args: Prisma.AgentAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateAgent>;
          };
          groupBy: {
            args: Prisma.AgentGroupByArgs<ExtArgs>;
            result: $Utils.Optional<AgentGroupByOutputType>[];
          };
          count: {
            args: Prisma.AgentCountArgs<ExtArgs>;
            result: $Utils.Optional<AgentCountAggregateOutputType> | number;
          };
        };
      };
      Chat: {
        payload: Prisma.$ChatPayload<ExtArgs>;
        fields: Prisma.ChatFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ChatFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChatPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ChatFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChatPayload>;
          };
          findFirst: {
            args: Prisma.ChatFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChatPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ChatFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChatPayload>;
          };
          findMany: {
            args: Prisma.ChatFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChatPayload>[];
          };
          create: {
            args: Prisma.ChatCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChatPayload>;
          };
          createMany: {
            args: Prisma.ChatCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ChatCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChatPayload>[];
          };
          delete: {
            args: Prisma.ChatDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChatPayload>;
          };
          update: {
            args: Prisma.ChatUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChatPayload>;
          };
          deleteMany: {
            args: Prisma.ChatDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ChatUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.ChatUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChatPayload>[];
          };
          upsert: {
            args: Prisma.ChatUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChatPayload>;
          };
          aggregate: {
            args: Prisma.ChatAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateChat>;
          };
          groupBy: {
            args: Prisma.ChatGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ChatGroupByOutputType>[];
          };
          count: {
            args: Prisma.ChatCountArgs<ExtArgs>;
            result: $Utils.Optional<ChatCountAggregateOutputType> | number;
          };
        };
      };
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>;
        fields: Prisma.MessageFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>;
          };
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>;
          };
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[];
          };
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>;
          };
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[];
          };
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>;
          };
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>;
          };
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.MessageUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[];
          };
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>;
          };
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateMessage>;
          };
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>;
            result: $Utils.Optional<MessageGroupByOutputType>[];
          };
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>;
            result: $Utils.Optional<MessageCountAggregateOutputType> | number;
          };
        };
      };
      Vote: {
        payload: Prisma.$VotePayload<ExtArgs>;
        fields: Prisma.VoteFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.VoteFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VotePayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.VoteFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VotePayload>;
          };
          findFirst: {
            args: Prisma.VoteFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VotePayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.VoteFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VotePayload>;
          };
          findMany: {
            args: Prisma.VoteFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VotePayload>[];
          };
          create: {
            args: Prisma.VoteCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VotePayload>;
          };
          createMany: {
            args: Prisma.VoteCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.VoteCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VotePayload>[];
          };
          delete: {
            args: Prisma.VoteDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VotePayload>;
          };
          update: {
            args: Prisma.VoteUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VotePayload>;
          };
          deleteMany: {
            args: Prisma.VoteDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.VoteUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.VoteUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VotePayload>[];
          };
          upsert: {
            args: Prisma.VoteUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VotePayload>;
          };
          aggregate: {
            args: Prisma.VoteAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateVote>;
          };
          groupBy: {
            args: Prisma.VoteGroupByArgs<ExtArgs>;
            result: $Utils.Optional<VoteGroupByOutputType>[];
          };
          count: {
            args: Prisma.VoteCountArgs<ExtArgs>;
            result: $Utils.Optional<VoteCountAggregateOutputType> | number;
          };
        };
      };
      Document: {
        payload: Prisma.$DocumentPayload<ExtArgs>;
        fields: Prisma.DocumentFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.DocumentFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.DocumentFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>;
          };
          findFirst: {
            args: Prisma.DocumentFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.DocumentFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>;
          };
          findMany: {
            args: Prisma.DocumentFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[];
          };
          create: {
            args: Prisma.DocumentCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>;
          };
          createMany: {
            args: Prisma.DocumentCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.DocumentCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[];
          };
          delete: {
            args: Prisma.DocumentDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>;
          };
          update: {
            args: Prisma.DocumentUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>;
          };
          deleteMany: {
            args: Prisma.DocumentDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.DocumentUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.DocumentUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[];
          };
          upsert: {
            args: Prisma.DocumentUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>;
          };
          aggregate: {
            args: Prisma.DocumentAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateDocument>;
          };
          groupBy: {
            args: Prisma.DocumentGroupByArgs<ExtArgs>;
            result: $Utils.Optional<DocumentGroupByOutputType>[];
          };
          count: {
            args: Prisma.DocumentCountArgs<ExtArgs>;
            result: $Utils.Optional<DocumentCountAggregateOutputType> | number;
          };
        };
      };
      Suggestion: {
        payload: Prisma.$SuggestionPayload<ExtArgs>;
        fields: Prisma.SuggestionFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.SuggestionFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.SuggestionFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload>;
          };
          findFirst: {
            args: Prisma.SuggestionFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.SuggestionFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload>;
          };
          findMany: {
            args: Prisma.SuggestionFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload>[];
          };
          create: {
            args: Prisma.SuggestionCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload>;
          };
          createMany: {
            args: Prisma.SuggestionCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.SuggestionCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload>[];
          };
          delete: {
            args: Prisma.SuggestionDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload>;
          };
          update: {
            args: Prisma.SuggestionUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload>;
          };
          deleteMany: {
            args: Prisma.SuggestionDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.SuggestionUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.SuggestionUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload>[];
          };
          upsert: {
            args: Prisma.SuggestionUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload>;
          };
          aggregate: {
            args: Prisma.SuggestionAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateSuggestion>;
          };
          groupBy: {
            args: Prisma.SuggestionGroupByArgs<ExtArgs>;
            result: $Utils.Optional<SuggestionGroupByOutputType>[];
          };
          count: {
            args: Prisma.SuggestionCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<SuggestionCountAggregateOutputType>
              | number;
          };
        };
      };
      Stream: {
        payload: Prisma.$StreamPayload<ExtArgs>;
        fields: Prisma.StreamFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.StreamFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$StreamPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.StreamFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>;
          };
          findFirst: {
            args: Prisma.StreamFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$StreamPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.StreamFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>;
          };
          findMany: {
            args: Prisma.StreamFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>[];
          };
          create: {
            args: Prisma.StreamCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>;
          };
          createMany: {
            args: Prisma.StreamCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.StreamCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>[];
          };
          delete: {
            args: Prisma.StreamDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>;
          };
          update: {
            args: Prisma.StreamUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>;
          };
          deleteMany: {
            args: Prisma.StreamDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.StreamUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.StreamUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>[];
          };
          upsert: {
            args: Prisma.StreamUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>;
          };
          aggregate: {
            args: Prisma.StreamAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateStream>;
          };
          groupBy: {
            args: Prisma.StreamGroupByArgs<ExtArgs>;
            result: $Utils.Optional<StreamGroupByOutputType>[];
          };
          count: {
            args: Prisma.StreamCountArgs<ExtArgs>;
            result: $Utils.Optional<StreamCountAggregateOutputType> | number;
          };
        };
      };
      ArchiveEntry: {
        payload: Prisma.$ArchiveEntryPayload<ExtArgs>;
        fields: Prisma.ArchiveEntryFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ArchiveEntryFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ArchiveEntryPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ArchiveEntryFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ArchiveEntryPayload>;
          };
          findFirst: {
            args: Prisma.ArchiveEntryFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ArchiveEntryPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ArchiveEntryFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ArchiveEntryPayload>;
          };
          findMany: {
            args: Prisma.ArchiveEntryFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ArchiveEntryPayload>[];
          };
          create: {
            args: Prisma.ArchiveEntryCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ArchiveEntryPayload>;
          };
          createMany: {
            args: Prisma.ArchiveEntryCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ArchiveEntryCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ArchiveEntryPayload>[];
          };
          delete: {
            args: Prisma.ArchiveEntryDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ArchiveEntryPayload>;
          };
          update: {
            args: Prisma.ArchiveEntryUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ArchiveEntryPayload>;
          };
          deleteMany: {
            args: Prisma.ArchiveEntryDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ArchiveEntryUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.ArchiveEntryUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ArchiveEntryPayload>[];
          };
          upsert: {
            args: Prisma.ArchiveEntryUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ArchiveEntryPayload>;
          };
          aggregate: {
            args: Prisma.ArchiveEntryAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateArchiveEntry>;
          };
          groupBy: {
            args: Prisma.ArchiveEntryGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ArchiveEntryGroupByOutputType>[];
          };
          count: {
            args: Prisma.ArchiveEntryCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<ArchiveEntryCountAggregateOutputType>
              | number;
          };
        };
      };
      ChatPinnedArchiveEntry: {
        payload: Prisma.$ChatPinnedArchiveEntryPayload<ExtArgs>;
        fields: Prisma.ChatPinnedArchiveEntryFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ChatPinnedArchiveEntryFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChatPinnedArchiveEntryPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ChatPinnedArchiveEntryFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChatPinnedArchiveEntryPayload>;
          };
          findFirst: {
            args: Prisma.ChatPinnedArchiveEntryFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChatPinnedArchiveEntryPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ChatPinnedArchiveEntryFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChatPinnedArchiveEntryPayload>;
          };
          findMany: {
            args: Prisma.ChatPinnedArchiveEntryFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChatPinnedArchiveEntryPayload>[];
          };
          create: {
            args: Prisma.ChatPinnedArchiveEntryCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChatPinnedArchiveEntryPayload>;
          };
          createMany: {
            args: Prisma.ChatPinnedArchiveEntryCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ChatPinnedArchiveEntryCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChatPinnedArchiveEntryPayload>[];
          };
          delete: {
            args: Prisma.ChatPinnedArchiveEntryDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChatPinnedArchiveEntryPayload>;
          };
          update: {
            args: Prisma.ChatPinnedArchiveEntryUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChatPinnedArchiveEntryPayload>;
          };
          deleteMany: {
            args: Prisma.ChatPinnedArchiveEntryDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ChatPinnedArchiveEntryUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.ChatPinnedArchiveEntryUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChatPinnedArchiveEntryPayload>[];
          };
          upsert: {
            args: Prisma.ChatPinnedArchiveEntryUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ChatPinnedArchiveEntryPayload>;
          };
          aggregate: {
            args: Prisma.ChatPinnedArchiveEntryAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateChatPinnedArchiveEntry>;
          };
          groupBy: {
            args: Prisma.ChatPinnedArchiveEntryGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ChatPinnedArchiveEntryGroupByOutputType>[];
          };
          count: {
            args: Prisma.ChatPinnedArchiveEntryCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<ChatPinnedArchiveEntryCountAggregateOutputType>
              | number;
          };
        };
      };
      ArchiveLink: {
        payload: Prisma.$ArchiveLinkPayload<ExtArgs>;
        fields: Prisma.ArchiveLinkFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ArchiveLinkFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ArchiveLinkPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ArchiveLinkFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ArchiveLinkPayload>;
          };
          findFirst: {
            args: Prisma.ArchiveLinkFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ArchiveLinkPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ArchiveLinkFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ArchiveLinkPayload>;
          };
          findMany: {
            args: Prisma.ArchiveLinkFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ArchiveLinkPayload>[];
          };
          create: {
            args: Prisma.ArchiveLinkCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ArchiveLinkPayload>;
          };
          createMany: {
            args: Prisma.ArchiveLinkCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ArchiveLinkCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ArchiveLinkPayload>[];
          };
          delete: {
            args: Prisma.ArchiveLinkDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ArchiveLinkPayload>;
          };
          update: {
            args: Prisma.ArchiveLinkUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ArchiveLinkPayload>;
          };
          deleteMany: {
            args: Prisma.ArchiveLinkDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ArchiveLinkUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.ArchiveLinkUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ArchiveLinkPayload>[];
          };
          upsert: {
            args: Prisma.ArchiveLinkUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ArchiveLinkPayload>;
          };
          aggregate: {
            args: Prisma.ArchiveLinkAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateArchiveLink>;
          };
          groupBy: {
            args: Prisma.ArchiveLinkGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ArchiveLinkGroupByOutputType>[];
          };
          count: {
            args: Prisma.ArchiveLinkCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<ArchiveLinkCountAggregateOutputType>
              | number;
          };
        };
      };
    };
  } & {
    other: {
      payload: any;
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
      };
    };
  };
  export const defineExtension: $Extensions.ExtendsHook<
    'define',
    Prisma.TypeMapCb,
    $Extensions.DefaultArgs
  >;
  export type DefaultPrismaClient = PrismaClient;
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources;
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string;
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     *
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     *
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    };
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null;
    /**
     * Global configuration for omitting model fields by default.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig;
  }
  export type GlobalOmitConfig = {
    provider?: ProviderOmit;
    tier?: TierOmit;
    user?: UserOmit;
    userRateLimit?: UserRateLimitOmit;
    agent?: AgentOmit;
    chat?: ChatOmit;
    message?: MessageOmit;
    vote?: VoteOmit;
    document?: DocumentOmit;
    suggestion?: SuggestionOmit;
    stream?: StreamOmit;
    archiveEntry?: ArchiveEntryOmit;
    chatPinnedArchiveEntry?: ChatPinnedArchiveEntryOmit;
    archiveLink?: ArchiveLinkOmit;
  };

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error';
  export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
  };

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> =
    T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;

  export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
  };

  export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
  };
  /* End Types for Logging */

  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy';

  // tested in getLogLevel.test.ts
  export function getLogLevel(
    log: Array<LogLevel | LogDefinition>
  ): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<
    Prisma.DefaultPrismaClient,
    runtime.ITXClientDenyList
  >;

  export type Datasource = {
    url?: string;
  };

  /**
   * Count Types
   */

  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    chats: number;
    documents: number;
    suggestions: number;
    archiveEntries: number;
    pinnedArchiveEntries: number;
    agents: number;
  };

  export type UserCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    chats?: boolean | UserCountOutputTypeCountChatsArgs;
    documents?: boolean | UserCountOutputTypeCountDocumentsArgs;
    suggestions?: boolean | UserCountOutputTypeCountSuggestionsArgs;
    archiveEntries?: boolean | UserCountOutputTypeCountArchiveEntriesArgs;
    pinnedArchiveEntries?:
      | boolean
      | UserCountOutputTypeCountPinnedArchiveEntriesArgs;
    agents?: boolean | UserCountOutputTypeCountAgentsArgs;
  };

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountChatsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ChatWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDocumentsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: DocumentWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSuggestionsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: SuggestionWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountArchiveEntriesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ArchiveEntryWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPinnedArchiveEntriesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ChatPinnedArchiveEntryWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAgentsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: AgentWhereInput;
  };

  /**
   * Count Type ChatCountOutputType
   */

  export type ChatCountOutputType = {
    messages: number;
    votes: number;
    streams: number;
    pinnedArchiveEntries: number;
  };

  export type ChatCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    messages?: boolean | ChatCountOutputTypeCountMessagesArgs;
    votes?: boolean | ChatCountOutputTypeCountVotesArgs;
    streams?: boolean | ChatCountOutputTypeCountStreamsArgs;
    pinnedArchiveEntries?:
      | boolean
      | ChatCountOutputTypeCountPinnedArchiveEntriesArgs;
  };

  // Custom InputTypes
  /**
   * ChatCountOutputType without action
   */
  export type ChatCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChatCountOutputType
     */
    select?: ChatCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * ChatCountOutputType without action
   */
  export type ChatCountOutputTypeCountMessagesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: MessageWhereInput;
  };

  /**
   * ChatCountOutputType without action
   */
  export type ChatCountOutputTypeCountVotesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: VoteWhereInput;
  };

  /**
   * ChatCountOutputType without action
   */
  export type ChatCountOutputTypeCountStreamsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: StreamWhereInput;
  };

  /**
   * ChatCountOutputType without action
   */
  export type ChatCountOutputTypeCountPinnedArchiveEntriesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ChatPinnedArchiveEntryWhereInput;
  };

  /**
   * Count Type MessageCountOutputType
   */

  export type MessageCountOutputType = {
    votes: number;
  };

  export type MessageCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    votes?: boolean | MessageCountOutputTypeCountVotesArgs;
  };

  // Custom InputTypes
  /**
   * MessageCountOutputType without action
   */
  export type MessageCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the MessageCountOutputType
     */
    select?: MessageCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * MessageCountOutputType without action
   */
  export type MessageCountOutputTypeCountVotesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: VoteWhereInput;
  };

  /**
   * Count Type DocumentCountOutputType
   */

  export type DocumentCountOutputType = {
    suggestions: number;
  };

  export type DocumentCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    suggestions?: boolean | DocumentCountOutputTypeCountSuggestionsArgs;
  };

  // Custom InputTypes
  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the DocumentCountOutputType
     */
    select?: DocumentCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeCountSuggestionsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: SuggestionWhereInput;
  };

  /**
   * Count Type ArchiveEntryCountOutputType
   */

  export type ArchiveEntryCountOutputType = {
    outgoingLinks: number;
    incomingLinks: number;
    pinnedInChats: number;
  };

  export type ArchiveEntryCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    outgoingLinks?: boolean | ArchiveEntryCountOutputTypeCountOutgoingLinksArgs;
    incomingLinks?: boolean | ArchiveEntryCountOutputTypeCountIncomingLinksArgs;
    pinnedInChats?: boolean | ArchiveEntryCountOutputTypeCountPinnedInChatsArgs;
  };

  // Custom InputTypes
  /**
   * ArchiveEntryCountOutputType without action
   */
  export type ArchiveEntryCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ArchiveEntryCountOutputType
     */
    select?: ArchiveEntryCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * ArchiveEntryCountOutputType without action
   */
  export type ArchiveEntryCountOutputTypeCountOutgoingLinksArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ArchiveLinkWhereInput;
  };

  /**
   * ArchiveEntryCountOutputType without action
   */
  export type ArchiveEntryCountOutputTypeCountIncomingLinksArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ArchiveLinkWhereInput;
  };

  /**
   * ArchiveEntryCountOutputType without action
   */
  export type ArchiveEntryCountOutputTypeCountPinnedInChatsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ChatPinnedArchiveEntryWhereInput;
  };

  /**
   * Models
   */

  /**
   * Model Provider
   */

  export type AggregateProvider = {
    _count: ProviderCountAggregateOutputType | null;
    _min: ProviderMinAggregateOutputType | null;
    _max: ProviderMaxAggregateOutputType | null;
  };

  export type ProviderMinAggregateOutputType = {
    id: string | null;
    apiKey: string | null;
  };

  export type ProviderMaxAggregateOutputType = {
    id: string | null;
    apiKey: string | null;
  };

  export type ProviderCountAggregateOutputType = {
    id: number;
    apiKey: number;
    _all: number;
  };

  export type ProviderMinAggregateInputType = {
    id?: true;
    apiKey?: true;
  };

  export type ProviderMaxAggregateInputType = {
    id?: true;
    apiKey?: true;
  };

  export type ProviderCountAggregateInputType = {
    id?: true;
    apiKey?: true;
    _all?: true;
  };

  export type ProviderAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Provider to aggregate.
     */
    where?: ProviderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Providers to fetch.
     */
    orderBy?:
      | ProviderOrderByWithRelationInput
      | ProviderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ProviderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Providers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Providers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Providers
     **/
    _count?: true | ProviderCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ProviderMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ProviderMaxAggregateInputType;
  };

  export type GetProviderAggregateType<T extends ProviderAggregateArgs> = {
    [P in keyof T & keyof AggregateProvider]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProvider[P]>
      : GetScalarType<T[P], AggregateProvider[P]>;
  };

  export type ProviderGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ProviderWhereInput;
    orderBy?:
      | ProviderOrderByWithAggregationInput
      | ProviderOrderByWithAggregationInput[];
    by: ProviderScalarFieldEnum[] | ProviderScalarFieldEnum;
    having?: ProviderScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProviderCountAggregateInputType | true;
    _min?: ProviderMinAggregateInputType;
    _max?: ProviderMaxAggregateInputType;
  };

  export type ProviderGroupByOutputType = {
    id: string;
    apiKey: string;
    _count: ProviderCountAggregateOutputType | null;
    _min: ProviderMinAggregateOutputType | null;
    _max: ProviderMaxAggregateOutputType | null;
  };

  type GetProviderGroupByPayload<T extends ProviderGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<ProviderGroupByOutputType, T['by']> & {
          [P in keyof T & keyof ProviderGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProviderGroupByOutputType[P]>
            : GetScalarType<T[P], ProviderGroupByOutputType[P]>;
        }
      >
    >;

  export type ProviderSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      apiKey?: boolean;
    },
    ExtArgs['result']['provider']
  >;

  export type ProviderSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      apiKey?: boolean;
    },
    ExtArgs['result']['provider']
  >;

  export type ProviderSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      apiKey?: boolean;
    },
    ExtArgs['result']['provider']
  >;

  export type ProviderSelectScalar = {
    id?: boolean;
    apiKey?: boolean;
  };

  export type ProviderOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<'id' | 'apiKey', ExtArgs['result']['provider']>;

  export type $ProviderPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'Provider';
    objects: {};
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        apiKey: string;
      },
      ExtArgs['result']['provider']
    >;
    composites: {};
  };

  type ProviderGetPayload<
    S extends boolean | null | undefined | ProviderDefaultArgs,
  > = $Result.GetResult<Prisma.$ProviderPayload, S>;

  type ProviderCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<ProviderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProviderCountAggregateInputType | true;
  };

  export interface ProviderDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Provider'];
      meta: { name: 'Provider' };
    };
    /**
     * Find zero or one Provider that matches the filter.
     * @param {ProviderFindUniqueArgs} args - Arguments to find a Provider
     * @example
     * // Get one Provider
     * const provider = await prisma.provider.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProviderFindUniqueArgs>(
      args: SelectSubset<T, ProviderFindUniqueArgs<ExtArgs>>
    ): Prisma__ProviderClient<
      $Result.GetResult<
        Prisma.$ProviderPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Provider that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProviderFindUniqueOrThrowArgs} args - Arguments to find a Provider
     * @example
     * // Get one Provider
     * const provider = await prisma.provider.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProviderFindUniqueOrThrowArgs>(
      args: SelectSubset<T, ProviderFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ProviderClient<
      $Result.GetResult<
        Prisma.$ProviderPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Provider that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderFindFirstArgs} args - Arguments to find a Provider
     * @example
     * // Get one Provider
     * const provider = await prisma.provider.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProviderFindFirstArgs>(
      args?: SelectSubset<T, ProviderFindFirstArgs<ExtArgs>>
    ): Prisma__ProviderClient<
      $Result.GetResult<
        Prisma.$ProviderPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Provider that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderFindFirstOrThrowArgs} args - Arguments to find a Provider
     * @example
     * // Get one Provider
     * const provider = await prisma.provider.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProviderFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ProviderFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ProviderClient<
      $Result.GetResult<
        Prisma.$ProviderPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Providers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Providers
     * const providers = await prisma.provider.findMany()
     *
     * // Get first 10 Providers
     * const providers = await prisma.provider.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const providerWithIdOnly = await prisma.provider.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ProviderFindManyArgs>(
      args?: SelectSubset<T, ProviderFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ProviderPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Provider.
     * @param {ProviderCreateArgs} args - Arguments to create a Provider.
     * @example
     * // Create one Provider
     * const Provider = await prisma.provider.create({
     *   data: {
     *     // ... data to create a Provider
     *   }
     * })
     *
     */
    create<T extends ProviderCreateArgs>(
      args: SelectSubset<T, ProviderCreateArgs<ExtArgs>>
    ): Prisma__ProviderClient<
      $Result.GetResult<
        Prisma.$ProviderPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Providers.
     * @param {ProviderCreateManyArgs} args - Arguments to create many Providers.
     * @example
     * // Create many Providers
     * const provider = await prisma.provider.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ProviderCreateManyArgs>(
      args?: SelectSubset<T, ProviderCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Providers and returns the data saved in the database.
     * @param {ProviderCreateManyAndReturnArgs} args - Arguments to create many Providers.
     * @example
     * // Create many Providers
     * const provider = await prisma.provider.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Providers and only return the `id`
     * const providerWithIdOnly = await prisma.provider.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ProviderCreateManyAndReturnArgs>(
      args?: SelectSubset<T, ProviderCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ProviderPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Provider.
     * @param {ProviderDeleteArgs} args - Arguments to delete one Provider.
     * @example
     * // Delete one Provider
     * const Provider = await prisma.provider.delete({
     *   where: {
     *     // ... filter to delete one Provider
     *   }
     * })
     *
     */
    delete<T extends ProviderDeleteArgs>(
      args: SelectSubset<T, ProviderDeleteArgs<ExtArgs>>
    ): Prisma__ProviderClient<
      $Result.GetResult<
        Prisma.$ProviderPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Provider.
     * @param {ProviderUpdateArgs} args - Arguments to update one Provider.
     * @example
     * // Update one Provider
     * const provider = await prisma.provider.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ProviderUpdateArgs>(
      args: SelectSubset<T, ProviderUpdateArgs<ExtArgs>>
    ): Prisma__ProviderClient<
      $Result.GetResult<
        Prisma.$ProviderPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Providers.
     * @param {ProviderDeleteManyArgs} args - Arguments to filter Providers to delete.
     * @example
     * // Delete a few Providers
     * const { count } = await prisma.provider.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ProviderDeleteManyArgs>(
      args?: SelectSubset<T, ProviderDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Providers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Providers
     * const provider = await prisma.provider.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ProviderUpdateManyArgs>(
      args: SelectSubset<T, ProviderUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Providers and returns the data updated in the database.
     * @param {ProviderUpdateManyAndReturnArgs} args - Arguments to update many Providers.
     * @example
     * // Update many Providers
     * const provider = await prisma.provider.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Providers and only return the `id`
     * const providerWithIdOnly = await prisma.provider.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends ProviderUpdateManyAndReturnArgs>(
      args: SelectSubset<T, ProviderUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ProviderPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Provider.
     * @param {ProviderUpsertArgs} args - Arguments to update or create a Provider.
     * @example
     * // Update or create a Provider
     * const provider = await prisma.provider.upsert({
     *   create: {
     *     // ... data to create a Provider
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Provider we want to update
     *   }
     * })
     */
    upsert<T extends ProviderUpsertArgs>(
      args: SelectSubset<T, ProviderUpsertArgs<ExtArgs>>
    ): Prisma__ProviderClient<
      $Result.GetResult<
        Prisma.$ProviderPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Providers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderCountArgs} args - Arguments to filter Providers to count.
     * @example
     * // Count the number of Providers
     * const count = await prisma.provider.count({
     *   where: {
     *     // ... the filter for the Providers we want to count
     *   }
     * })
     **/
    count<T extends ProviderCountArgs>(
      args?: Subset<T, ProviderCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProviderCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Provider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ProviderAggregateArgs>(
      args: Subset<T, ProviderAggregateArgs>
    ): Prisma.PrismaPromise<GetProviderAggregateType<T>>;

    /**
     * Group by Provider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ProviderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProviderGroupByArgs['orderBy'] }
        : { orderBy?: ProviderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, ProviderGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetProviderGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Provider model
     */
    readonly fields: ProviderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Provider.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProviderClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Provider model
   */
  interface ProviderFieldRefs {
    readonly id: FieldRef<'Provider', 'String'>;
    readonly apiKey: FieldRef<'Provider', 'String'>;
  }

  // Custom InputTypes
  /**
   * Provider findUnique
   */
  export type ProviderFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Provider
     */
    omit?: ProviderOmit<ExtArgs> | null;
    /**
     * Filter, which Provider to fetch.
     */
    where: ProviderWhereUniqueInput;
  };

  /**
   * Provider findUniqueOrThrow
   */
  export type ProviderFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Provider
     */
    omit?: ProviderOmit<ExtArgs> | null;
    /**
     * Filter, which Provider to fetch.
     */
    where: ProviderWhereUniqueInput;
  };

  /**
   * Provider findFirst
   */
  export type ProviderFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Provider
     */
    omit?: ProviderOmit<ExtArgs> | null;
    /**
     * Filter, which Provider to fetch.
     */
    where?: ProviderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Providers to fetch.
     */
    orderBy?:
      | ProviderOrderByWithRelationInput
      | ProviderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Providers.
     */
    cursor?: ProviderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Providers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Providers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Providers.
     */
    distinct?: ProviderScalarFieldEnum | ProviderScalarFieldEnum[];
  };

  /**
   * Provider findFirstOrThrow
   */
  export type ProviderFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Provider
     */
    omit?: ProviderOmit<ExtArgs> | null;
    /**
     * Filter, which Provider to fetch.
     */
    where?: ProviderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Providers to fetch.
     */
    orderBy?:
      | ProviderOrderByWithRelationInput
      | ProviderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Providers.
     */
    cursor?: ProviderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Providers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Providers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Providers.
     */
    distinct?: ProviderScalarFieldEnum | ProviderScalarFieldEnum[];
  };

  /**
   * Provider findMany
   */
  export type ProviderFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Provider
     */
    omit?: ProviderOmit<ExtArgs> | null;
    /**
     * Filter, which Providers to fetch.
     */
    where?: ProviderWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Providers to fetch.
     */
    orderBy?:
      | ProviderOrderByWithRelationInput
      | ProviderOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Providers.
     */
    cursor?: ProviderWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Providers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Providers.
     */
    skip?: number;
    distinct?: ProviderScalarFieldEnum | ProviderScalarFieldEnum[];
  };

  /**
   * Provider create
   */
  export type ProviderCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Provider
     */
    omit?: ProviderOmit<ExtArgs> | null;
    /**
     * The data needed to create a Provider.
     */
    data: XOR<ProviderCreateInput, ProviderUncheckedCreateInput>;
  };

  /**
   * Provider createMany
   */
  export type ProviderCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Providers.
     */
    data: ProviderCreateManyInput | ProviderCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Provider createManyAndReturn
   */
  export type ProviderCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Provider
     */
    omit?: ProviderOmit<ExtArgs> | null;
    /**
     * The data used to create many Providers.
     */
    data: ProviderCreateManyInput | ProviderCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Provider update
   */
  export type ProviderUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Provider
     */
    omit?: ProviderOmit<ExtArgs> | null;
    /**
     * The data needed to update a Provider.
     */
    data: XOR<ProviderUpdateInput, ProviderUncheckedUpdateInput>;
    /**
     * Choose, which Provider to update.
     */
    where: ProviderWhereUniqueInput;
  };

  /**
   * Provider updateMany
   */
  export type ProviderUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Providers.
     */
    data: XOR<
      ProviderUpdateManyMutationInput,
      ProviderUncheckedUpdateManyInput
    >;
    /**
     * Filter which Providers to update
     */
    where?: ProviderWhereInput;
    /**
     * Limit how many Providers to update.
     */
    limit?: number;
  };

  /**
   * Provider updateManyAndReturn
   */
  export type ProviderUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Provider
     */
    omit?: ProviderOmit<ExtArgs> | null;
    /**
     * The data used to update Providers.
     */
    data: XOR<
      ProviderUpdateManyMutationInput,
      ProviderUncheckedUpdateManyInput
    >;
    /**
     * Filter which Providers to update
     */
    where?: ProviderWhereInput;
    /**
     * Limit how many Providers to update.
     */
    limit?: number;
  };

  /**
   * Provider upsert
   */
  export type ProviderUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Provider
     */
    omit?: ProviderOmit<ExtArgs> | null;
    /**
     * The filter to search for the Provider to update in case it exists.
     */
    where: ProviderWhereUniqueInput;
    /**
     * In case the Provider found by the `where` argument doesn't exist, create a new Provider with this data.
     */
    create: XOR<ProviderCreateInput, ProviderUncheckedCreateInput>;
    /**
     * In case the Provider was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProviderUpdateInput, ProviderUncheckedUpdateInput>;
  };

  /**
   * Provider delete
   */
  export type ProviderDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Provider
     */
    omit?: ProviderOmit<ExtArgs> | null;
    /**
     * Filter which Provider to delete.
     */
    where: ProviderWhereUniqueInput;
  };

  /**
   * Provider deleteMany
   */
  export type ProviderDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Providers to delete
     */
    where?: ProviderWhereInput;
    /**
     * Limit how many Providers to delete.
     */
    limit?: number;
  };

  /**
   * Provider without action
   */
  export type ProviderDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Provider
     */
    omit?: ProviderOmit<ExtArgs> | null;
  };

  /**
   * Model Tier
   */

  export type AggregateTier = {
    _count: TierCountAggregateOutputType | null;
    _avg: TierAvgAggregateOutputType | null;
    _sum: TierSumAggregateOutputType | null;
    _min: TierMinAggregateOutputType | null;
    _max: TierMaxAggregateOutputType | null;
  };

  export type TierAvgAggregateOutputType = {
    bucketCapacity: number | null;
    bucketRefillAmount: number | null;
    bucketRefillIntervalSeconds: number | null;
  };

  export type TierSumAggregateOutputType = {
    bucketCapacity: number | null;
    bucketRefillAmount: number | null;
    bucketRefillIntervalSeconds: number | null;
  };

  export type TierMinAggregateOutputType = {
    id: string | null;
    bucketCapacity: number | null;
    bucketRefillAmount: number | null;
    bucketRefillIntervalSeconds: number | null;
  };

  export type TierMaxAggregateOutputType = {
    id: string | null;
    bucketCapacity: number | null;
    bucketRefillAmount: number | null;
    bucketRefillIntervalSeconds: number | null;
  };

  export type TierCountAggregateOutputType = {
    id: number;
    modelIds: number;
    bucketCapacity: number;
    bucketRefillAmount: number;
    bucketRefillIntervalSeconds: number;
    _all: number;
  };

  export type TierAvgAggregateInputType = {
    bucketCapacity?: true;
    bucketRefillAmount?: true;
    bucketRefillIntervalSeconds?: true;
  };

  export type TierSumAggregateInputType = {
    bucketCapacity?: true;
    bucketRefillAmount?: true;
    bucketRefillIntervalSeconds?: true;
  };

  export type TierMinAggregateInputType = {
    id?: true;
    bucketCapacity?: true;
    bucketRefillAmount?: true;
    bucketRefillIntervalSeconds?: true;
  };

  export type TierMaxAggregateInputType = {
    id?: true;
    bucketCapacity?: true;
    bucketRefillAmount?: true;
    bucketRefillIntervalSeconds?: true;
  };

  export type TierCountAggregateInputType = {
    id?: true;
    modelIds?: true;
    bucketCapacity?: true;
    bucketRefillAmount?: true;
    bucketRefillIntervalSeconds?: true;
    _all?: true;
  };

  export type TierAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Tier to aggregate.
     */
    where?: TierWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Tiers to fetch.
     */
    orderBy?: TierOrderByWithRelationInput | TierOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: TierWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Tiers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Tiers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Tiers
     **/
    _count?: true | TierCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: TierAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: TierSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: TierMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: TierMaxAggregateInputType;
  };

  export type GetTierAggregateType<T extends TierAggregateArgs> = {
    [P in keyof T & keyof AggregateTier]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTier[P]>
      : GetScalarType<T[P], AggregateTier[P]>;
  };

  export type TierGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: TierWhereInput;
    orderBy?:
      | TierOrderByWithAggregationInput
      | TierOrderByWithAggregationInput[];
    by: TierScalarFieldEnum[] | TierScalarFieldEnum;
    having?: TierScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TierCountAggregateInputType | true;
    _avg?: TierAvgAggregateInputType;
    _sum?: TierSumAggregateInputType;
    _min?: TierMinAggregateInputType;
    _max?: TierMaxAggregateInputType;
  };

  export type TierGroupByOutputType = {
    id: string;
    modelIds: string[];
    bucketCapacity: number;
    bucketRefillAmount: number;
    bucketRefillIntervalSeconds: number;
    _count: TierCountAggregateOutputType | null;
    _avg: TierAvgAggregateOutputType | null;
    _sum: TierSumAggregateOutputType | null;
    _min: TierMinAggregateOutputType | null;
    _max: TierMaxAggregateOutputType | null;
  };

  type GetTierGroupByPayload<T extends TierGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TierGroupByOutputType, T['by']> & {
        [P in keyof T & keyof TierGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], TierGroupByOutputType[P]>
          : GetScalarType<T[P], TierGroupByOutputType[P]>;
      }
    >
  >;

  export type TierSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      modelIds?: boolean;
      bucketCapacity?: boolean;
      bucketRefillAmount?: boolean;
      bucketRefillIntervalSeconds?: boolean;
    },
    ExtArgs['result']['tier']
  >;

  export type TierSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      modelIds?: boolean;
      bucketCapacity?: boolean;
      bucketRefillAmount?: boolean;
      bucketRefillIntervalSeconds?: boolean;
    },
    ExtArgs['result']['tier']
  >;

  export type TierSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      modelIds?: boolean;
      bucketCapacity?: boolean;
      bucketRefillAmount?: boolean;
      bucketRefillIntervalSeconds?: boolean;
    },
    ExtArgs['result']['tier']
  >;

  export type TierSelectScalar = {
    id?: boolean;
    modelIds?: boolean;
    bucketCapacity?: boolean;
    bucketRefillAmount?: boolean;
    bucketRefillIntervalSeconds?: boolean;
  };

  export type TierOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | 'id'
    | 'modelIds'
    | 'bucketCapacity'
    | 'bucketRefillAmount'
    | 'bucketRefillIntervalSeconds',
    ExtArgs['result']['tier']
  >;

  export type $TierPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'Tier';
    objects: {};
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        modelIds: string[];
        bucketCapacity: number;
        bucketRefillAmount: number;
        bucketRefillIntervalSeconds: number;
      },
      ExtArgs['result']['tier']
    >;
    composites: {};
  };

  type TierGetPayload<S extends boolean | null | undefined | TierDefaultArgs> =
    $Result.GetResult<Prisma.$TierPayload, S>;

  type TierCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<TierFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TierCountAggregateInputType | true;
  };

  export interface TierDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Tier'];
      meta: { name: 'Tier' };
    };
    /**
     * Find zero or one Tier that matches the filter.
     * @param {TierFindUniqueArgs} args - Arguments to find a Tier
     * @example
     * // Get one Tier
     * const tier = await prisma.tier.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TierFindUniqueArgs>(
      args: SelectSubset<T, TierFindUniqueArgs<ExtArgs>>
    ): Prisma__TierClient<
      $Result.GetResult<
        Prisma.$TierPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Tier that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TierFindUniqueOrThrowArgs} args - Arguments to find a Tier
     * @example
     * // Get one Tier
     * const tier = await prisma.tier.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TierFindUniqueOrThrowArgs>(
      args: SelectSubset<T, TierFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__TierClient<
      $Result.GetResult<
        Prisma.$TierPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Tier that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TierFindFirstArgs} args - Arguments to find a Tier
     * @example
     * // Get one Tier
     * const tier = await prisma.tier.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TierFindFirstArgs>(
      args?: SelectSubset<T, TierFindFirstArgs<ExtArgs>>
    ): Prisma__TierClient<
      $Result.GetResult<
        Prisma.$TierPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Tier that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TierFindFirstOrThrowArgs} args - Arguments to find a Tier
     * @example
     * // Get one Tier
     * const tier = await prisma.tier.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TierFindFirstOrThrowArgs>(
      args?: SelectSubset<T, TierFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__TierClient<
      $Result.GetResult<
        Prisma.$TierPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Tiers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TierFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tiers
     * const tiers = await prisma.tier.findMany()
     *
     * // Get first 10 Tiers
     * const tiers = await prisma.tier.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const tierWithIdOnly = await prisma.tier.findMany({ select: { id: true } })
     *
     */
    findMany<T extends TierFindManyArgs>(
      args?: SelectSubset<T, TierFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$TierPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Tier.
     * @param {TierCreateArgs} args - Arguments to create a Tier.
     * @example
     * // Create one Tier
     * const Tier = await prisma.tier.create({
     *   data: {
     *     // ... data to create a Tier
     *   }
     * })
     *
     */
    create<T extends TierCreateArgs>(
      args: SelectSubset<T, TierCreateArgs<ExtArgs>>
    ): Prisma__TierClient<
      $Result.GetResult<
        Prisma.$TierPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Tiers.
     * @param {TierCreateManyArgs} args - Arguments to create many Tiers.
     * @example
     * // Create many Tiers
     * const tier = await prisma.tier.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends TierCreateManyArgs>(
      args?: SelectSubset<T, TierCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Tiers and returns the data saved in the database.
     * @param {TierCreateManyAndReturnArgs} args - Arguments to create many Tiers.
     * @example
     * // Create many Tiers
     * const tier = await prisma.tier.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Tiers and only return the `id`
     * const tierWithIdOnly = await prisma.tier.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends TierCreateManyAndReturnArgs>(
      args?: SelectSubset<T, TierCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$TierPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Tier.
     * @param {TierDeleteArgs} args - Arguments to delete one Tier.
     * @example
     * // Delete one Tier
     * const Tier = await prisma.tier.delete({
     *   where: {
     *     // ... filter to delete one Tier
     *   }
     * })
     *
     */
    delete<T extends TierDeleteArgs>(
      args: SelectSubset<T, TierDeleteArgs<ExtArgs>>
    ): Prisma__TierClient<
      $Result.GetResult<
        Prisma.$TierPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Tier.
     * @param {TierUpdateArgs} args - Arguments to update one Tier.
     * @example
     * // Update one Tier
     * const tier = await prisma.tier.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends TierUpdateArgs>(
      args: SelectSubset<T, TierUpdateArgs<ExtArgs>>
    ): Prisma__TierClient<
      $Result.GetResult<
        Prisma.$TierPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Tiers.
     * @param {TierDeleteManyArgs} args - Arguments to filter Tiers to delete.
     * @example
     * // Delete a few Tiers
     * const { count } = await prisma.tier.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends TierDeleteManyArgs>(
      args?: SelectSubset<T, TierDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Tiers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TierUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tiers
     * const tier = await prisma.tier.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends TierUpdateManyArgs>(
      args: SelectSubset<T, TierUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Tiers and returns the data updated in the database.
     * @param {TierUpdateManyAndReturnArgs} args - Arguments to update many Tiers.
     * @example
     * // Update many Tiers
     * const tier = await prisma.tier.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Tiers and only return the `id`
     * const tierWithIdOnly = await prisma.tier.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends TierUpdateManyAndReturnArgs>(
      args: SelectSubset<T, TierUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$TierPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Tier.
     * @param {TierUpsertArgs} args - Arguments to update or create a Tier.
     * @example
     * // Update or create a Tier
     * const tier = await prisma.tier.upsert({
     *   create: {
     *     // ... data to create a Tier
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tier we want to update
     *   }
     * })
     */
    upsert<T extends TierUpsertArgs>(
      args: SelectSubset<T, TierUpsertArgs<ExtArgs>>
    ): Prisma__TierClient<
      $Result.GetResult<
        Prisma.$TierPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Tiers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TierCountArgs} args - Arguments to filter Tiers to count.
     * @example
     * // Count the number of Tiers
     * const count = await prisma.tier.count({
     *   where: {
     *     // ... the filter for the Tiers we want to count
     *   }
     * })
     **/
    count<T extends TierCountArgs>(
      args?: Subset<T, TierCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TierCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Tier.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TierAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends TierAggregateArgs>(
      args: Subset<T, TierAggregateArgs>
    ): Prisma.PrismaPromise<GetTierAggregateType<T>>;

    /**
     * Group by Tier.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TierGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends TierGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TierGroupByArgs['orderBy'] }
        : { orderBy?: TierGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, TierGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetTierGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Tier model
     */
    readonly fields: TierFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tier.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TierClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Tier model
   */
  interface TierFieldRefs {
    readonly id: FieldRef<'Tier', 'String'>;
    readonly modelIds: FieldRef<'Tier', 'String[]'>;
    readonly bucketCapacity: FieldRef<'Tier', 'Int'>;
    readonly bucketRefillAmount: FieldRef<'Tier', 'Int'>;
    readonly bucketRefillIntervalSeconds: FieldRef<'Tier', 'Int'>;
  }

  // Custom InputTypes
  /**
   * Tier findUnique
   */
  export type TierFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Tier
     */
    select?: TierSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Tier
     */
    omit?: TierOmit<ExtArgs> | null;
    /**
     * Filter, which Tier to fetch.
     */
    where: TierWhereUniqueInput;
  };

  /**
   * Tier findUniqueOrThrow
   */
  export type TierFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Tier
     */
    select?: TierSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Tier
     */
    omit?: TierOmit<ExtArgs> | null;
    /**
     * Filter, which Tier to fetch.
     */
    where: TierWhereUniqueInput;
  };

  /**
   * Tier findFirst
   */
  export type TierFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Tier
     */
    select?: TierSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Tier
     */
    omit?: TierOmit<ExtArgs> | null;
    /**
     * Filter, which Tier to fetch.
     */
    where?: TierWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Tiers to fetch.
     */
    orderBy?: TierOrderByWithRelationInput | TierOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Tiers.
     */
    cursor?: TierWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Tiers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Tiers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Tiers.
     */
    distinct?: TierScalarFieldEnum | TierScalarFieldEnum[];
  };

  /**
   * Tier findFirstOrThrow
   */
  export type TierFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Tier
     */
    select?: TierSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Tier
     */
    omit?: TierOmit<ExtArgs> | null;
    /**
     * Filter, which Tier to fetch.
     */
    where?: TierWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Tiers to fetch.
     */
    orderBy?: TierOrderByWithRelationInput | TierOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Tiers.
     */
    cursor?: TierWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Tiers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Tiers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Tiers.
     */
    distinct?: TierScalarFieldEnum | TierScalarFieldEnum[];
  };

  /**
   * Tier findMany
   */
  export type TierFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Tier
     */
    select?: TierSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Tier
     */
    omit?: TierOmit<ExtArgs> | null;
    /**
     * Filter, which Tiers to fetch.
     */
    where?: TierWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Tiers to fetch.
     */
    orderBy?: TierOrderByWithRelationInput | TierOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Tiers.
     */
    cursor?: TierWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Tiers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Tiers.
     */
    skip?: number;
    distinct?: TierScalarFieldEnum | TierScalarFieldEnum[];
  };

  /**
   * Tier create
   */
  export type TierCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Tier
     */
    select?: TierSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Tier
     */
    omit?: TierOmit<ExtArgs> | null;
    /**
     * The data needed to create a Tier.
     */
    data: XOR<TierCreateInput, TierUncheckedCreateInput>;
  };

  /**
   * Tier createMany
   */
  export type TierCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Tiers.
     */
    data: TierCreateManyInput | TierCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Tier createManyAndReturn
   */
  export type TierCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Tier
     */
    select?: TierSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Tier
     */
    omit?: TierOmit<ExtArgs> | null;
    /**
     * The data used to create many Tiers.
     */
    data: TierCreateManyInput | TierCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Tier update
   */
  export type TierUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Tier
     */
    select?: TierSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Tier
     */
    omit?: TierOmit<ExtArgs> | null;
    /**
     * The data needed to update a Tier.
     */
    data: XOR<TierUpdateInput, TierUncheckedUpdateInput>;
    /**
     * Choose, which Tier to update.
     */
    where: TierWhereUniqueInput;
  };

  /**
   * Tier updateMany
   */
  export type TierUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Tiers.
     */
    data: XOR<TierUpdateManyMutationInput, TierUncheckedUpdateManyInput>;
    /**
     * Filter which Tiers to update
     */
    where?: TierWhereInput;
    /**
     * Limit how many Tiers to update.
     */
    limit?: number;
  };

  /**
   * Tier updateManyAndReturn
   */
  export type TierUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Tier
     */
    select?: TierSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Tier
     */
    omit?: TierOmit<ExtArgs> | null;
    /**
     * The data used to update Tiers.
     */
    data: XOR<TierUpdateManyMutationInput, TierUncheckedUpdateManyInput>;
    /**
     * Filter which Tiers to update
     */
    where?: TierWhereInput;
    /**
     * Limit how many Tiers to update.
     */
    limit?: number;
  };

  /**
   * Tier upsert
   */
  export type TierUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Tier
     */
    select?: TierSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Tier
     */
    omit?: TierOmit<ExtArgs> | null;
    /**
     * The filter to search for the Tier to update in case it exists.
     */
    where: TierWhereUniqueInput;
    /**
     * In case the Tier found by the `where` argument doesn't exist, create a new Tier with this data.
     */
    create: XOR<TierCreateInput, TierUncheckedCreateInput>;
    /**
     * In case the Tier was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TierUpdateInput, TierUncheckedUpdateInput>;
  };

  /**
   * Tier delete
   */
  export type TierDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Tier
     */
    select?: TierSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Tier
     */
    omit?: TierOmit<ExtArgs> | null;
    /**
     * Filter which Tier to delete.
     */
    where: TierWhereUniqueInput;
  };

  /**
   * Tier deleteMany
   */
  export type TierDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Tiers to delete
     */
    where?: TierWhereInput;
    /**
     * Limit how many Tiers to delete.
     */
    limit?: number;
  };

  /**
   * Tier without action
   */
  export type TierDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Tier
     */
    select?: TierSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Tier
     */
    omit?: TierOmit<ExtArgs> | null;
  };

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  export type UserMinAggregateOutputType = {
    id: string | null;
    email: string | null;
  };

  export type UserMaxAggregateOutputType = {
    id: string | null;
    email: string | null;
  };

  export type UserCountAggregateOutputType = {
    id: number;
    email: number;
    _all: number;
  };

  export type UserMinAggregateInputType = {
    id?: true;
    email?: true;
  };

  export type UserMaxAggregateInputType = {
    id?: true;
    email?: true;
  };

  export type UserCountAggregateInputType = {
    id?: true;
    email?: true;
    _all?: true;
  };

  export type UserAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Users
     **/
    _count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: UserMaxAggregateInputType;
  };

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>;
  };

  export type UserGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: UserWhereInput;
    orderBy?:
      | UserOrderByWithAggregationInput
      | UserOrderByWithAggregationInput[];
    by: UserScalarFieldEnum[] | UserScalarFieldEnum;
    having?: UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
  };

  export type UserGroupByOutputType = {
    id: string;
    email: string;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> & {
        [P in keyof T & keyof UserGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], UserGroupByOutputType[P]>
          : GetScalarType<T[P], UserGroupByOutputType[P]>;
      }
    >
  >;

  export type UserSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      email?: boolean;
      chats?: boolean | User$chatsArgs<ExtArgs>;
      documents?: boolean | User$documentsArgs<ExtArgs>;
      suggestions?: boolean | User$suggestionsArgs<ExtArgs>;
      archiveEntries?: boolean | User$archiveEntriesArgs<ExtArgs>;
      pinnedArchiveEntries?: boolean | User$pinnedArchiveEntriesArgs<ExtArgs>;
      rateLimit?: boolean | User$rateLimitArgs<ExtArgs>;
      agents?: boolean | User$agentsArgs<ExtArgs>;
      _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['user']
  >;

  export type UserSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      email?: boolean;
    },
    ExtArgs['result']['user']
  >;

  export type UserSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      email?: boolean;
    },
    ExtArgs['result']['user']
  >;

  export type UserSelectScalar = {
    id?: boolean;
    email?: boolean;
  };

  export type UserOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<'id' | 'email', ExtArgs['result']['user']>;
  export type UserInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    chats?: boolean | User$chatsArgs<ExtArgs>;
    documents?: boolean | User$documentsArgs<ExtArgs>;
    suggestions?: boolean | User$suggestionsArgs<ExtArgs>;
    archiveEntries?: boolean | User$archiveEntriesArgs<ExtArgs>;
    pinnedArchiveEntries?: boolean | User$pinnedArchiveEntriesArgs<ExtArgs>;
    rateLimit?: boolean | User$rateLimitArgs<ExtArgs>;
    agents?: boolean | User$agentsArgs<ExtArgs>;
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type UserIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};
  export type UserIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $UserPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'User';
    objects: {
      chats: Prisma.$ChatPayload<ExtArgs>[];
      documents: Prisma.$DocumentPayload<ExtArgs>[];
      suggestions: Prisma.$SuggestionPayload<ExtArgs>[];
      archiveEntries: Prisma.$ArchiveEntryPayload<ExtArgs>[];
      pinnedArchiveEntries: Prisma.$ChatPinnedArchiveEntryPayload<ExtArgs>[];
      rateLimit: Prisma.$UserRateLimitPayload<ExtArgs> | null;
      agents: Prisma.$AgentPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        email: string;
      },
      ExtArgs['result']['user']
    >;
    composites: {};
  };

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> =
    $Result.GetResult<Prisma.$UserPayload, S>;

  type UserCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserCountAggregateInputType | true;
  };

  export interface UserDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['User'];
      meta: { name: 'User' };
    };
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
     */
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(
      args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
     */
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(
      args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
     **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends UserAggregateArgs>(
      args: Subset<T, UserAggregateArgs>
    ): Prisma.PrismaPromise<GetUserAggregateType<T>>;

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetUserGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the User model
     */
    readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    chats<T extends User$chatsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$chatsArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$ChatPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    documents<T extends User$documentsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$documentsArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$DocumentPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    suggestions<T extends User$suggestionsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$suggestionsArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$SuggestionPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    archiveEntries<T extends User$archiveEntriesArgs<ExtArgs> = {}>(
      args?: Subset<T, User$archiveEntriesArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$ArchiveEntryPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    pinnedArchiveEntries<T extends User$pinnedArchiveEntriesArgs<ExtArgs> = {}>(
      args?: Subset<T, User$pinnedArchiveEntriesArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$ChatPinnedArchiveEntryPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    rateLimit<T extends User$rateLimitArgs<ExtArgs> = {}>(
      args?: Subset<T, User$rateLimitArgs<ExtArgs>>
    ): Prisma__UserRateLimitClient<
      $Result.GetResult<
        Prisma.$UserRateLimitPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;
    agents<T extends User$agentsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$agentsArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$AgentPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<'User', 'String'>;
    readonly email: FieldRef<'User', 'String'>;
  }

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findMany
   */
  export type UserFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User create
   */
  export type UserCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>;
  };

  /**
   * User createMany
   */
  export type UserCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User update
   */
  export type UserUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
  };

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
  };

  /**
   * User upsert
   */
  export type UserUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput;
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>;
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
  };

  /**
   * User delete
   */
  export type UserDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to delete.
     */
    limit?: number;
  };

  /**
   * User.chats
   */
  export type User$chatsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null;
    where?: ChatWhereInput;
    orderBy?: ChatOrderByWithRelationInput | ChatOrderByWithRelationInput[];
    cursor?: ChatWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ChatScalarFieldEnum | ChatScalarFieldEnum[];
  };

  /**
   * User.documents
   */
  export type User$documentsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null;
    where?: DocumentWhereInput;
    orderBy?:
      | DocumentOrderByWithRelationInput
      | DocumentOrderByWithRelationInput[];
    cursor?: DocumentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[];
  };

  /**
   * User.suggestions
   */
  export type User$suggestionsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Suggestion
     */
    omit?: SuggestionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuggestionInclude<ExtArgs> | null;
    where?: SuggestionWhereInput;
    orderBy?:
      | SuggestionOrderByWithRelationInput
      | SuggestionOrderByWithRelationInput[];
    cursor?: SuggestionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: SuggestionScalarFieldEnum | SuggestionScalarFieldEnum[];
  };

  /**
   * User.archiveEntries
   */
  export type User$archiveEntriesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ArchiveEntry
     */
    select?: ArchiveEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ArchiveEntry
     */
    omit?: ArchiveEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArchiveEntryInclude<ExtArgs> | null;
    where?: ArchiveEntryWhereInput;
    orderBy?:
      | ArchiveEntryOrderByWithRelationInput
      | ArchiveEntryOrderByWithRelationInput[];
    cursor?: ArchiveEntryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ArchiveEntryScalarFieldEnum | ArchiveEntryScalarFieldEnum[];
  };

  /**
   * User.pinnedArchiveEntries
   */
  export type User$pinnedArchiveEntriesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChatPinnedArchiveEntry
     */
    select?: ChatPinnedArchiveEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ChatPinnedArchiveEntry
     */
    omit?: ChatPinnedArchiveEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatPinnedArchiveEntryInclude<ExtArgs> | null;
    where?: ChatPinnedArchiveEntryWhereInput;
    orderBy?:
      | ChatPinnedArchiveEntryOrderByWithRelationInput
      | ChatPinnedArchiveEntryOrderByWithRelationInput[];
    cursor?: ChatPinnedArchiveEntryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?:
      | ChatPinnedArchiveEntryScalarFieldEnum
      | ChatPinnedArchiveEntryScalarFieldEnum[];
  };

  /**
   * User.rateLimit
   */
  export type User$rateLimitArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserRateLimit
     */
    select?: UserRateLimitSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserRateLimit
     */
    omit?: UserRateLimitOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRateLimitInclude<ExtArgs> | null;
    where?: UserRateLimitWhereInput;
  };

  /**
   * User.agents
   */
  export type User$agentsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null;
    where?: AgentWhereInput;
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[];
    cursor?: AgentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[];
  };

  /**
   * User without action
   */
  export type UserDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
  };

  /**
   * Model UserRateLimit
   */

  export type AggregateUserRateLimit = {
    _count: UserRateLimitCountAggregateOutputType | null;
    _avg: UserRateLimitAvgAggregateOutputType | null;
    _sum: UserRateLimitSumAggregateOutputType | null;
    _min: UserRateLimitMinAggregateOutputType | null;
    _max: UserRateLimitMaxAggregateOutputType | null;
  };

  export type UserRateLimitAvgAggregateOutputType = {
    tokens: number | null;
  };

  export type UserRateLimitSumAggregateOutputType = {
    tokens: number | null;
  };

  export type UserRateLimitMinAggregateOutputType = {
    userId: string | null;
    tokens: number | null;
    lastRefill: Date | null;
  };

  export type UserRateLimitMaxAggregateOutputType = {
    userId: string | null;
    tokens: number | null;
    lastRefill: Date | null;
  };

  export type UserRateLimitCountAggregateOutputType = {
    userId: number;
    tokens: number;
    lastRefill: number;
    _all: number;
  };

  export type UserRateLimitAvgAggregateInputType = {
    tokens?: true;
  };

  export type UserRateLimitSumAggregateInputType = {
    tokens?: true;
  };

  export type UserRateLimitMinAggregateInputType = {
    userId?: true;
    tokens?: true;
    lastRefill?: true;
  };

  export type UserRateLimitMaxAggregateInputType = {
    userId?: true;
    tokens?: true;
    lastRefill?: true;
  };

  export type UserRateLimitCountAggregateInputType = {
    userId?: true;
    tokens?: true;
    lastRefill?: true;
    _all?: true;
  };

  export type UserRateLimitAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which UserRateLimit to aggregate.
     */
    where?: UserRateLimitWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UserRateLimits to fetch.
     */
    orderBy?:
      | UserRateLimitOrderByWithRelationInput
      | UserRateLimitOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: UserRateLimitWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UserRateLimits from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UserRateLimits.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned UserRateLimits
     **/
    _count?: true | UserRateLimitCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: UserRateLimitAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: UserRateLimitSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: UserRateLimitMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: UserRateLimitMaxAggregateInputType;
  };

  export type GetUserRateLimitAggregateType<
    T extends UserRateLimitAggregateArgs,
  > = {
    [P in keyof T & keyof AggregateUserRateLimit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserRateLimit[P]>
      : GetScalarType<T[P], AggregateUserRateLimit[P]>;
  };

  export type UserRateLimitGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: UserRateLimitWhereInput;
    orderBy?:
      | UserRateLimitOrderByWithAggregationInput
      | UserRateLimitOrderByWithAggregationInput[];
    by: UserRateLimitScalarFieldEnum[] | UserRateLimitScalarFieldEnum;
    having?: UserRateLimitScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserRateLimitCountAggregateInputType | true;
    _avg?: UserRateLimitAvgAggregateInputType;
    _sum?: UserRateLimitSumAggregateInputType;
    _min?: UserRateLimitMinAggregateInputType;
    _max?: UserRateLimitMaxAggregateInputType;
  };

  export type UserRateLimitGroupByOutputType = {
    userId: string;
    tokens: number;
    lastRefill: Date;
    _count: UserRateLimitCountAggregateOutputType | null;
    _avg: UserRateLimitAvgAggregateOutputType | null;
    _sum: UserRateLimitSumAggregateOutputType | null;
    _min: UserRateLimitMinAggregateOutputType | null;
    _max: UserRateLimitMaxAggregateOutputType | null;
  };

  type GetUserRateLimitGroupByPayload<T extends UserRateLimitGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<UserRateLimitGroupByOutputType, T['by']> & {
          [P in keyof T &
            keyof UserRateLimitGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserRateLimitGroupByOutputType[P]>
            : GetScalarType<T[P], UserRateLimitGroupByOutputType[P]>;
        }
      >
    >;

  export type UserRateLimitSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      userId?: boolean;
      tokens?: boolean;
      lastRefill?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['userRateLimit']
  >;

  export type UserRateLimitSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      userId?: boolean;
      tokens?: boolean;
      lastRefill?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['userRateLimit']
  >;

  export type UserRateLimitSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      userId?: boolean;
      tokens?: boolean;
      lastRefill?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['userRateLimit']
  >;

  export type UserRateLimitSelectScalar = {
    userId?: boolean;
    tokens?: boolean;
    lastRefill?: boolean;
  };

  export type UserRateLimitOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    'userId' | 'tokens' | 'lastRefill',
    ExtArgs['result']['userRateLimit']
  >;
  export type UserRateLimitInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type UserRateLimitIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type UserRateLimitIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $UserRateLimitPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'UserRateLimit';
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        userId: string;
        tokens: number;
        lastRefill: Date;
      },
      ExtArgs['result']['userRateLimit']
    >;
    composites: {};
  };

  type UserRateLimitGetPayload<
    S extends boolean | null | undefined | UserRateLimitDefaultArgs,
  > = $Result.GetResult<Prisma.$UserRateLimitPayload, S>;

  type UserRateLimitCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    UserRateLimitFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: UserRateLimitCountAggregateInputType | true;
  };

  export interface UserRateLimitDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['UserRateLimit'];
      meta: { name: 'UserRateLimit' };
    };
    /**
     * Find zero or one UserRateLimit that matches the filter.
     * @param {UserRateLimitFindUniqueArgs} args - Arguments to find a UserRateLimit
     * @example
     * // Get one UserRateLimit
     * const userRateLimit = await prisma.userRateLimit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserRateLimitFindUniqueArgs>(
      args: SelectSubset<T, UserRateLimitFindUniqueArgs<ExtArgs>>
    ): Prisma__UserRateLimitClient<
      $Result.GetResult<
        Prisma.$UserRateLimitPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one UserRateLimit that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserRateLimitFindUniqueOrThrowArgs} args - Arguments to find a UserRateLimit
     * @example
     * // Get one UserRateLimit
     * const userRateLimit = await prisma.userRateLimit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserRateLimitFindUniqueOrThrowArgs>(
      args: SelectSubset<T, UserRateLimitFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserRateLimitClient<
      $Result.GetResult<
        Prisma.$UserRateLimitPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first UserRateLimit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRateLimitFindFirstArgs} args - Arguments to find a UserRateLimit
     * @example
     * // Get one UserRateLimit
     * const userRateLimit = await prisma.userRateLimit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserRateLimitFindFirstArgs>(
      args?: SelectSubset<T, UserRateLimitFindFirstArgs<ExtArgs>>
    ): Prisma__UserRateLimitClient<
      $Result.GetResult<
        Prisma.$UserRateLimitPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first UserRateLimit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRateLimitFindFirstOrThrowArgs} args - Arguments to find a UserRateLimit
     * @example
     * // Get one UserRateLimit
     * const userRateLimit = await prisma.userRateLimit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserRateLimitFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserRateLimitFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserRateLimitClient<
      $Result.GetResult<
        Prisma.$UserRateLimitPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more UserRateLimits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRateLimitFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserRateLimits
     * const userRateLimits = await prisma.userRateLimit.findMany()
     *
     * // Get first 10 UserRateLimits
     * const userRateLimits = await prisma.userRateLimit.findMany({ take: 10 })
     *
     * // Only select the `userId`
     * const userRateLimitWithUserIdOnly = await prisma.userRateLimit.findMany({ select: { userId: true } })
     *
     */
    findMany<T extends UserRateLimitFindManyArgs>(
      args?: SelectSubset<T, UserRateLimitFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserRateLimitPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a UserRateLimit.
     * @param {UserRateLimitCreateArgs} args - Arguments to create a UserRateLimit.
     * @example
     * // Create one UserRateLimit
     * const UserRateLimit = await prisma.userRateLimit.create({
     *   data: {
     *     // ... data to create a UserRateLimit
     *   }
     * })
     *
     */
    create<T extends UserRateLimitCreateArgs>(
      args: SelectSubset<T, UserRateLimitCreateArgs<ExtArgs>>
    ): Prisma__UserRateLimitClient<
      $Result.GetResult<
        Prisma.$UserRateLimitPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many UserRateLimits.
     * @param {UserRateLimitCreateManyArgs} args - Arguments to create many UserRateLimits.
     * @example
     * // Create many UserRateLimits
     * const userRateLimit = await prisma.userRateLimit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserRateLimitCreateManyArgs>(
      args?: SelectSubset<T, UserRateLimitCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many UserRateLimits and returns the data saved in the database.
     * @param {UserRateLimitCreateManyAndReturnArgs} args - Arguments to create many UserRateLimits.
     * @example
     * // Create many UserRateLimits
     * const userRateLimit = await prisma.userRateLimit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many UserRateLimits and only return the `userId`
     * const userRateLimitWithUserIdOnly = await prisma.userRateLimit.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserRateLimitCreateManyAndReturnArgs>(
      args?: SelectSubset<T, UserRateLimitCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserRateLimitPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a UserRateLimit.
     * @param {UserRateLimitDeleteArgs} args - Arguments to delete one UserRateLimit.
     * @example
     * // Delete one UserRateLimit
     * const UserRateLimit = await prisma.userRateLimit.delete({
     *   where: {
     *     // ... filter to delete one UserRateLimit
     *   }
     * })
     *
     */
    delete<T extends UserRateLimitDeleteArgs>(
      args: SelectSubset<T, UserRateLimitDeleteArgs<ExtArgs>>
    ): Prisma__UserRateLimitClient<
      $Result.GetResult<
        Prisma.$UserRateLimitPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one UserRateLimit.
     * @param {UserRateLimitUpdateArgs} args - Arguments to update one UserRateLimit.
     * @example
     * // Update one UserRateLimit
     * const userRateLimit = await prisma.userRateLimit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserRateLimitUpdateArgs>(
      args: SelectSubset<T, UserRateLimitUpdateArgs<ExtArgs>>
    ): Prisma__UserRateLimitClient<
      $Result.GetResult<
        Prisma.$UserRateLimitPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more UserRateLimits.
     * @param {UserRateLimitDeleteManyArgs} args - Arguments to filter UserRateLimits to delete.
     * @example
     * // Delete a few UserRateLimits
     * const { count } = await prisma.userRateLimit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserRateLimitDeleteManyArgs>(
      args?: SelectSubset<T, UserRateLimitDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more UserRateLimits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRateLimitUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserRateLimits
     * const userRateLimit = await prisma.userRateLimit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserRateLimitUpdateManyArgs>(
      args: SelectSubset<T, UserRateLimitUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more UserRateLimits and returns the data updated in the database.
     * @param {UserRateLimitUpdateManyAndReturnArgs} args - Arguments to update many UserRateLimits.
     * @example
     * // Update many UserRateLimits
     * const userRateLimit = await prisma.userRateLimit.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more UserRateLimits and only return the `userId`
     * const userRateLimitWithUserIdOnly = await prisma.userRateLimit.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends UserRateLimitUpdateManyAndReturnArgs>(
      args: SelectSubset<T, UserRateLimitUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserRateLimitPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one UserRateLimit.
     * @param {UserRateLimitUpsertArgs} args - Arguments to update or create a UserRateLimit.
     * @example
     * // Update or create a UserRateLimit
     * const userRateLimit = await prisma.userRateLimit.upsert({
     *   create: {
     *     // ... data to create a UserRateLimit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserRateLimit we want to update
     *   }
     * })
     */
    upsert<T extends UserRateLimitUpsertArgs>(
      args: SelectSubset<T, UserRateLimitUpsertArgs<ExtArgs>>
    ): Prisma__UserRateLimitClient<
      $Result.GetResult<
        Prisma.$UserRateLimitPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of UserRateLimits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRateLimitCountArgs} args - Arguments to filter UserRateLimits to count.
     * @example
     * // Count the number of UserRateLimits
     * const count = await prisma.userRateLimit.count({
     *   where: {
     *     // ... the filter for the UserRateLimits we want to count
     *   }
     * })
     **/
    count<T extends UserRateLimitCountArgs>(
      args?: Subset<T, UserRateLimitCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserRateLimitCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a UserRateLimit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRateLimitAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends UserRateLimitAggregateArgs>(
      args: Subset<T, UserRateLimitAggregateArgs>
    ): Prisma.PrismaPromise<GetUserRateLimitAggregateType<T>>;

    /**
     * Group by UserRateLimit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRateLimitGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends UserRateLimitGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserRateLimitGroupByArgs['orderBy'] }
        : { orderBy?: UserRateLimitGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, UserRateLimitGroupByArgs, OrderByArg> &
        InputErrors
    ): {} extends InputErrors
      ? GetUserRateLimitGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the UserRateLimit model
     */
    readonly fields: UserRateLimitFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserRateLimit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserRateLimitClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the UserRateLimit model
   */
  interface UserRateLimitFieldRefs {
    readonly userId: FieldRef<'UserRateLimit', 'String'>;
    readonly tokens: FieldRef<'UserRateLimit', 'Int'>;
    readonly lastRefill: FieldRef<'UserRateLimit', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * UserRateLimit findUnique
   */
  export type UserRateLimitFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserRateLimit
     */
    select?: UserRateLimitSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserRateLimit
     */
    omit?: UserRateLimitOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRateLimitInclude<ExtArgs> | null;
    /**
     * Filter, which UserRateLimit to fetch.
     */
    where: UserRateLimitWhereUniqueInput;
  };

  /**
   * UserRateLimit findUniqueOrThrow
   */
  export type UserRateLimitFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserRateLimit
     */
    select?: UserRateLimitSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserRateLimit
     */
    omit?: UserRateLimitOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRateLimitInclude<ExtArgs> | null;
    /**
     * Filter, which UserRateLimit to fetch.
     */
    where: UserRateLimitWhereUniqueInput;
  };

  /**
   * UserRateLimit findFirst
   */
  export type UserRateLimitFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserRateLimit
     */
    select?: UserRateLimitSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserRateLimit
     */
    omit?: UserRateLimitOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRateLimitInclude<ExtArgs> | null;
    /**
     * Filter, which UserRateLimit to fetch.
     */
    where?: UserRateLimitWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UserRateLimits to fetch.
     */
    orderBy?:
      | UserRateLimitOrderByWithRelationInput
      | UserRateLimitOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for UserRateLimits.
     */
    cursor?: UserRateLimitWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UserRateLimits from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UserRateLimits.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of UserRateLimits.
     */
    distinct?: UserRateLimitScalarFieldEnum | UserRateLimitScalarFieldEnum[];
  };

  /**
   * UserRateLimit findFirstOrThrow
   */
  export type UserRateLimitFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserRateLimit
     */
    select?: UserRateLimitSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserRateLimit
     */
    omit?: UserRateLimitOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRateLimitInclude<ExtArgs> | null;
    /**
     * Filter, which UserRateLimit to fetch.
     */
    where?: UserRateLimitWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UserRateLimits to fetch.
     */
    orderBy?:
      | UserRateLimitOrderByWithRelationInput
      | UserRateLimitOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for UserRateLimits.
     */
    cursor?: UserRateLimitWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UserRateLimits from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UserRateLimits.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of UserRateLimits.
     */
    distinct?: UserRateLimitScalarFieldEnum | UserRateLimitScalarFieldEnum[];
  };

  /**
   * UserRateLimit findMany
   */
  export type UserRateLimitFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserRateLimit
     */
    select?: UserRateLimitSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserRateLimit
     */
    omit?: UserRateLimitOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRateLimitInclude<ExtArgs> | null;
    /**
     * Filter, which UserRateLimits to fetch.
     */
    where?: UserRateLimitWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UserRateLimits to fetch.
     */
    orderBy?:
      | UserRateLimitOrderByWithRelationInput
      | UserRateLimitOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing UserRateLimits.
     */
    cursor?: UserRateLimitWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UserRateLimits from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UserRateLimits.
     */
    skip?: number;
    distinct?: UserRateLimitScalarFieldEnum | UserRateLimitScalarFieldEnum[];
  };

  /**
   * UserRateLimit create
   */
  export type UserRateLimitCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserRateLimit
     */
    select?: UserRateLimitSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserRateLimit
     */
    omit?: UserRateLimitOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRateLimitInclude<ExtArgs> | null;
    /**
     * The data needed to create a UserRateLimit.
     */
    data: XOR<UserRateLimitCreateInput, UserRateLimitUncheckedCreateInput>;
  };

  /**
   * UserRateLimit createMany
   */
  export type UserRateLimitCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many UserRateLimits.
     */
    data: UserRateLimitCreateManyInput | UserRateLimitCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * UserRateLimit createManyAndReturn
   */
  export type UserRateLimitCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserRateLimit
     */
    select?: UserRateLimitSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the UserRateLimit
     */
    omit?: UserRateLimitOmit<ExtArgs> | null;
    /**
     * The data used to create many UserRateLimits.
     */
    data: UserRateLimitCreateManyInput | UserRateLimitCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRateLimitIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * UserRateLimit update
   */
  export type UserRateLimitUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserRateLimit
     */
    select?: UserRateLimitSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserRateLimit
     */
    omit?: UserRateLimitOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRateLimitInclude<ExtArgs> | null;
    /**
     * The data needed to update a UserRateLimit.
     */
    data: XOR<UserRateLimitUpdateInput, UserRateLimitUncheckedUpdateInput>;
    /**
     * Choose, which UserRateLimit to update.
     */
    where: UserRateLimitWhereUniqueInput;
  };

  /**
   * UserRateLimit updateMany
   */
  export type UserRateLimitUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update UserRateLimits.
     */
    data: XOR<
      UserRateLimitUpdateManyMutationInput,
      UserRateLimitUncheckedUpdateManyInput
    >;
    /**
     * Filter which UserRateLimits to update
     */
    where?: UserRateLimitWhereInput;
    /**
     * Limit how many UserRateLimits to update.
     */
    limit?: number;
  };

  /**
   * UserRateLimit updateManyAndReturn
   */
  export type UserRateLimitUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserRateLimit
     */
    select?: UserRateLimitSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the UserRateLimit
     */
    omit?: UserRateLimitOmit<ExtArgs> | null;
    /**
     * The data used to update UserRateLimits.
     */
    data: XOR<
      UserRateLimitUpdateManyMutationInput,
      UserRateLimitUncheckedUpdateManyInput
    >;
    /**
     * Filter which UserRateLimits to update
     */
    where?: UserRateLimitWhereInput;
    /**
     * Limit how many UserRateLimits to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRateLimitIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * UserRateLimit upsert
   */
  export type UserRateLimitUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserRateLimit
     */
    select?: UserRateLimitSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserRateLimit
     */
    omit?: UserRateLimitOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRateLimitInclude<ExtArgs> | null;
    /**
     * The filter to search for the UserRateLimit to update in case it exists.
     */
    where: UserRateLimitWhereUniqueInput;
    /**
     * In case the UserRateLimit found by the `where` argument doesn't exist, create a new UserRateLimit with this data.
     */
    create: XOR<UserRateLimitCreateInput, UserRateLimitUncheckedCreateInput>;
    /**
     * In case the UserRateLimit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserRateLimitUpdateInput, UserRateLimitUncheckedUpdateInput>;
  };

  /**
   * UserRateLimit delete
   */
  export type UserRateLimitDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserRateLimit
     */
    select?: UserRateLimitSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserRateLimit
     */
    omit?: UserRateLimitOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRateLimitInclude<ExtArgs> | null;
    /**
     * Filter which UserRateLimit to delete.
     */
    where: UserRateLimitWhereUniqueInput;
  };

  /**
   * UserRateLimit deleteMany
   */
  export type UserRateLimitDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which UserRateLimits to delete
     */
    where?: UserRateLimitWhereInput;
    /**
     * Limit how many UserRateLimits to delete.
     */
    limit?: number;
  };

  /**
   * UserRateLimit without action
   */
  export type UserRateLimitDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserRateLimit
     */
    select?: UserRateLimitSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserRateLimit
     */
    omit?: UserRateLimitOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRateLimitInclude<ExtArgs> | null;
  };

  /**
   * Model Agent
   */

  export type AggregateAgent = {
    _count: AgentCountAggregateOutputType | null;
    _min: AgentMinAggregateOutputType | null;
    _max: AgentMaxAggregateOutputType | null;
  };

  export type AgentMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    name: string | null;
    description: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type AgentMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    name: string | null;
    description: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type AgentCountAggregateOutputType = {
    id: number;
    userId: number;
    name: number;
    description: number;
    settings: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type AgentMinAggregateInputType = {
    id?: true;
    userId?: true;
    name?: true;
    description?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type AgentMaxAggregateInputType = {
    id?: true;
    userId?: true;
    name?: true;
    description?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type AgentCountAggregateInputType = {
    id?: true;
    userId?: true;
    name?: true;
    description?: true;
    settings?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type AgentAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Agent to aggregate.
     */
    where?: AgentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: AgentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Agents.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Agents
     **/
    _count?: true | AgentCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: AgentMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: AgentMaxAggregateInputType;
  };

  export type GetAgentAggregateType<T extends AgentAggregateArgs> = {
    [P in keyof T & keyof AggregateAgent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgent[P]>
      : GetScalarType<T[P], AggregateAgent[P]>;
  };

  export type AgentGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: AgentWhereInput;
    orderBy?:
      | AgentOrderByWithAggregationInput
      | AgentOrderByWithAggregationInput[];
    by: AgentScalarFieldEnum[] | AgentScalarFieldEnum;
    having?: AgentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AgentCountAggregateInputType | true;
    _min?: AgentMinAggregateInputType;
    _max?: AgentMaxAggregateInputType;
  };

  export type AgentGroupByOutputType = {
    id: string;
    userId: string;
    name: string;
    description: string | null;
    settings: JsonValue | null;
    createdAt: Date;
    updatedAt: Date;
    _count: AgentCountAggregateOutputType | null;
    _min: AgentMinAggregateOutputType | null;
    _max: AgentMaxAggregateOutputType | null;
  };

  type GetAgentGroupByPayload<T extends AgentGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<AgentGroupByOutputType, T['by']> & {
          [P in keyof T & keyof AgentGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgentGroupByOutputType[P]>
            : GetScalarType<T[P], AgentGroupByOutputType[P]>;
        }
      >
    >;

  export type AgentSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      name?: boolean;
      description?: boolean;
      settings?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['agent']
  >;

  export type AgentSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      name?: boolean;
      description?: boolean;
      settings?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['agent']
  >;

  export type AgentSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      name?: boolean;
      description?: boolean;
      settings?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['agent']
  >;

  export type AgentSelectScalar = {
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    description?: boolean;
    settings?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type AgentOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | 'id'
    | 'userId'
    | 'name'
    | 'description'
    | 'settings'
    | 'createdAt'
    | 'updatedAt',
    ExtArgs['result']['agent']
  >;
  export type AgentInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type AgentIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type AgentIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $AgentPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'Agent';
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        userId: string;
        name: string;
        description: string | null;
        settings: Prisma.JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['agent']
    >;
    composites: {};
  };

  type AgentGetPayload<
    S extends boolean | null | undefined | AgentDefaultArgs,
  > = $Result.GetResult<Prisma.$AgentPayload, S>;

  type AgentCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<AgentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AgentCountAggregateInputType | true;
  };

  export interface AgentDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Agent'];
      meta: { name: 'Agent' };
    };
    /**
     * Find zero or one Agent that matches the filter.
     * @param {AgentFindUniqueArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgentFindUniqueArgs>(
      args: SelectSubset<T, AgentFindUniqueArgs<ExtArgs>>
    ): Prisma__AgentClient<
      $Result.GetResult<
        Prisma.$AgentPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Agent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AgentFindUniqueOrThrowArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgentFindUniqueOrThrowArgs>(
      args: SelectSubset<T, AgentFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__AgentClient<
      $Result.GetResult<
        Prisma.$AgentPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Agent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentFindFirstArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgentFindFirstArgs>(
      args?: SelectSubset<T, AgentFindFirstArgs<ExtArgs>>
    ): Prisma__AgentClient<
      $Result.GetResult<
        Prisma.$AgentPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Agent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentFindFirstOrThrowArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgentFindFirstOrThrowArgs>(
      args?: SelectSubset<T, AgentFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__AgentClient<
      $Result.GetResult<
        Prisma.$AgentPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Agents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Agents
     * const agents = await prisma.agent.findMany()
     *
     * // Get first 10 Agents
     * const agents = await prisma.agent.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const agentWithIdOnly = await prisma.agent.findMany({ select: { id: true } })
     *
     */
    findMany<T extends AgentFindManyArgs>(
      args?: SelectSubset<T, AgentFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$AgentPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Agent.
     * @param {AgentCreateArgs} args - Arguments to create a Agent.
     * @example
     * // Create one Agent
     * const Agent = await prisma.agent.create({
     *   data: {
     *     // ... data to create a Agent
     *   }
     * })
     *
     */
    create<T extends AgentCreateArgs>(
      args: SelectSubset<T, AgentCreateArgs<ExtArgs>>
    ): Prisma__AgentClient<
      $Result.GetResult<
        Prisma.$AgentPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Agents.
     * @param {AgentCreateManyArgs} args - Arguments to create many Agents.
     * @example
     * // Create many Agents
     * const agent = await prisma.agent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends AgentCreateManyArgs>(
      args?: SelectSubset<T, AgentCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Agents and returns the data saved in the database.
     * @param {AgentCreateManyAndReturnArgs} args - Arguments to create many Agents.
     * @example
     * // Create many Agents
     * const agent = await prisma.agent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Agents and only return the `id`
     * const agentWithIdOnly = await prisma.agent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends AgentCreateManyAndReturnArgs>(
      args?: SelectSubset<T, AgentCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$AgentPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Agent.
     * @param {AgentDeleteArgs} args - Arguments to delete one Agent.
     * @example
     * // Delete one Agent
     * const Agent = await prisma.agent.delete({
     *   where: {
     *     // ... filter to delete one Agent
     *   }
     * })
     *
     */
    delete<T extends AgentDeleteArgs>(
      args: SelectSubset<T, AgentDeleteArgs<ExtArgs>>
    ): Prisma__AgentClient<
      $Result.GetResult<
        Prisma.$AgentPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Agent.
     * @param {AgentUpdateArgs} args - Arguments to update one Agent.
     * @example
     * // Update one Agent
     * const agent = await prisma.agent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends AgentUpdateArgs>(
      args: SelectSubset<T, AgentUpdateArgs<ExtArgs>>
    ): Prisma__AgentClient<
      $Result.GetResult<
        Prisma.$AgentPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Agents.
     * @param {AgentDeleteManyArgs} args - Arguments to filter Agents to delete.
     * @example
     * // Delete a few Agents
     * const { count } = await prisma.agent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends AgentDeleteManyArgs>(
      args?: SelectSubset<T, AgentDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Agents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Agents
     * const agent = await prisma.agent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends AgentUpdateManyArgs>(
      args: SelectSubset<T, AgentUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Agents and returns the data updated in the database.
     * @param {AgentUpdateManyAndReturnArgs} args - Arguments to update many Agents.
     * @example
     * // Update many Agents
     * const agent = await prisma.agent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Agents and only return the `id`
     * const agentWithIdOnly = await prisma.agent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends AgentUpdateManyAndReturnArgs>(
      args: SelectSubset<T, AgentUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$AgentPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Agent.
     * @param {AgentUpsertArgs} args - Arguments to update or create a Agent.
     * @example
     * // Update or create a Agent
     * const agent = await prisma.agent.upsert({
     *   create: {
     *     // ... data to create a Agent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Agent we want to update
     *   }
     * })
     */
    upsert<T extends AgentUpsertArgs>(
      args: SelectSubset<T, AgentUpsertArgs<ExtArgs>>
    ): Prisma__AgentClient<
      $Result.GetResult<
        Prisma.$AgentPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Agents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentCountArgs} args - Arguments to filter Agents to count.
     * @example
     * // Count the number of Agents
     * const count = await prisma.agent.count({
     *   where: {
     *     // ... the filter for the Agents we want to count
     *   }
     * })
     **/
    count<T extends AgentCountArgs>(
      args?: Subset<T, AgentCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgentCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Agent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends AgentAggregateArgs>(
      args: Subset<T, AgentAggregateArgs>
    ): Prisma.PrismaPromise<GetAgentAggregateType<T>>;

    /**
     * Group by Agent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends AgentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgentGroupByArgs['orderBy'] }
        : { orderBy?: AgentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, AgentGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetAgentGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Agent model
     */
    readonly fields: AgentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Agent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgentClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Agent model
   */
  interface AgentFieldRefs {
    readonly id: FieldRef<'Agent', 'String'>;
    readonly userId: FieldRef<'Agent', 'String'>;
    readonly name: FieldRef<'Agent', 'String'>;
    readonly description: FieldRef<'Agent', 'String'>;
    readonly settings: FieldRef<'Agent', 'Json'>;
    readonly createdAt: FieldRef<'Agent', 'DateTime'>;
    readonly updatedAt: FieldRef<'Agent', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Agent findUnique
   */
  export type AgentFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null;
    /**
     * Filter, which Agent to fetch.
     */
    where: AgentWhereUniqueInput;
  };

  /**
   * Agent findUniqueOrThrow
   */
  export type AgentFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null;
    /**
     * Filter, which Agent to fetch.
     */
    where: AgentWhereUniqueInput;
  };

  /**
   * Agent findFirst
   */
  export type AgentFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null;
    /**
     * Filter, which Agent to fetch.
     */
    where?: AgentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Agents.
     */
    cursor?: AgentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Agents.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Agents.
     */
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[];
  };

  /**
   * Agent findFirstOrThrow
   */
  export type AgentFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null;
    /**
     * Filter, which Agent to fetch.
     */
    where?: AgentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Agents.
     */
    cursor?: AgentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Agents.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Agents.
     */
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[];
  };

  /**
   * Agent findMany
   */
  export type AgentFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null;
    /**
     * Filter, which Agents to fetch.
     */
    where?: AgentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Agents.
     */
    cursor?: AgentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Agents.
     */
    skip?: number;
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[];
  };

  /**
   * Agent create
   */
  export type AgentCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null;
    /**
     * The data needed to create a Agent.
     */
    data: XOR<AgentCreateInput, AgentUncheckedCreateInput>;
  };

  /**
   * Agent createMany
   */
  export type AgentCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Agents.
     */
    data: AgentCreateManyInput | AgentCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Agent createManyAndReturn
   */
  export type AgentCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null;
    /**
     * The data used to create many Agents.
     */
    data: AgentCreateManyInput | AgentCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Agent update
   */
  export type AgentUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null;
    /**
     * The data needed to update a Agent.
     */
    data: XOR<AgentUpdateInput, AgentUncheckedUpdateInput>;
    /**
     * Choose, which Agent to update.
     */
    where: AgentWhereUniqueInput;
  };

  /**
   * Agent updateMany
   */
  export type AgentUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Agents.
     */
    data: XOR<AgentUpdateManyMutationInput, AgentUncheckedUpdateManyInput>;
    /**
     * Filter which Agents to update
     */
    where?: AgentWhereInput;
    /**
     * Limit how many Agents to update.
     */
    limit?: number;
  };

  /**
   * Agent updateManyAndReturn
   */
  export type AgentUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null;
    /**
     * The data used to update Agents.
     */
    data: XOR<AgentUpdateManyMutationInput, AgentUncheckedUpdateManyInput>;
    /**
     * Filter which Agents to update
     */
    where?: AgentWhereInput;
    /**
     * Limit how many Agents to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Agent upsert
   */
  export type AgentUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null;
    /**
     * The filter to search for the Agent to update in case it exists.
     */
    where: AgentWhereUniqueInput;
    /**
     * In case the Agent found by the `where` argument doesn't exist, create a new Agent with this data.
     */
    create: XOR<AgentCreateInput, AgentUncheckedCreateInput>;
    /**
     * In case the Agent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgentUpdateInput, AgentUncheckedUpdateInput>;
  };

  /**
   * Agent delete
   */
  export type AgentDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null;
    /**
     * Filter which Agent to delete.
     */
    where: AgentWhereUniqueInput;
  };

  /**
   * Agent deleteMany
   */
  export type AgentDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Agents to delete
     */
    where?: AgentWhereInput;
    /**
     * Limit how many Agents to delete.
     */
    limit?: number;
  };

  /**
   * Agent without action
   */
  export type AgentDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null;
  };

  /**
   * Model Chat
   */

  export type AggregateChat = {
    _count: ChatCountAggregateOutputType | null;
    _avg: ChatAvgAggregateOutputType | null;
    _sum: ChatSumAggregateOutputType | null;
    _min: ChatMinAggregateOutputType | null;
    _max: ChatMaxAggregateOutputType | null;
  };

  export type ChatAvgAggregateOutputType = {
    forkDepth: number | null;
  };

  export type ChatSumAggregateOutputType = {
    forkDepth: number | null;
  };

  export type ChatMinAggregateOutputType = {
    id: string | null;
    createdAt: Date | null;
    title: string | null;
    userId: string | null;
    visibility: string | null;
    parentChatId: string | null;
    forkedFromMessageId: string | null;
    forkDepth: number | null;
  };

  export type ChatMaxAggregateOutputType = {
    id: string | null;
    createdAt: Date | null;
    title: string | null;
    userId: string | null;
    visibility: string | null;
    parentChatId: string | null;
    forkedFromMessageId: string | null;
    forkDepth: number | null;
  };

  export type ChatCountAggregateOutputType = {
    id: number;
    createdAt: number;
    title: number;
    userId: number;
    visibility: number;
    lastContext: number;
    settings: number;
    parentChatId: number;
    forkedFromMessageId: number;
    forkDepth: number;
    _all: number;
  };

  export type ChatAvgAggregateInputType = {
    forkDepth?: true;
  };

  export type ChatSumAggregateInputType = {
    forkDepth?: true;
  };

  export type ChatMinAggregateInputType = {
    id?: true;
    createdAt?: true;
    title?: true;
    userId?: true;
    visibility?: true;
    parentChatId?: true;
    forkedFromMessageId?: true;
    forkDepth?: true;
  };

  export type ChatMaxAggregateInputType = {
    id?: true;
    createdAt?: true;
    title?: true;
    userId?: true;
    visibility?: true;
    parentChatId?: true;
    forkedFromMessageId?: true;
    forkDepth?: true;
  };

  export type ChatCountAggregateInputType = {
    id?: true;
    createdAt?: true;
    title?: true;
    userId?: true;
    visibility?: true;
    lastContext?: true;
    settings?: true;
    parentChatId?: true;
    forkedFromMessageId?: true;
    forkDepth?: true;
    _all?: true;
  };

  export type ChatAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Chat to aggregate.
     */
    where?: ChatWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Chats to fetch.
     */
    orderBy?: ChatOrderByWithRelationInput | ChatOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ChatWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Chats from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Chats.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Chats
     **/
    _count?: true | ChatCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: ChatAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: ChatSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ChatMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ChatMaxAggregateInputType;
  };

  export type GetChatAggregateType<T extends ChatAggregateArgs> = {
    [P in keyof T & keyof AggregateChat]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChat[P]>
      : GetScalarType<T[P], AggregateChat[P]>;
  };

  export type ChatGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ChatWhereInput;
    orderBy?:
      | ChatOrderByWithAggregationInput
      | ChatOrderByWithAggregationInput[];
    by: ChatScalarFieldEnum[] | ChatScalarFieldEnum;
    having?: ChatScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ChatCountAggregateInputType | true;
    _avg?: ChatAvgAggregateInputType;
    _sum?: ChatSumAggregateInputType;
    _min?: ChatMinAggregateInputType;
    _max?: ChatMaxAggregateInputType;
  };

  export type ChatGroupByOutputType = {
    id: string;
    createdAt: Date;
    title: string;
    userId: string;
    visibility: string;
    lastContext: JsonValue | null;
    settings: JsonValue | null;
    parentChatId: string | null;
    forkedFromMessageId: string | null;
    forkDepth: number;
    _count: ChatCountAggregateOutputType | null;
    _avg: ChatAvgAggregateOutputType | null;
    _sum: ChatSumAggregateOutputType | null;
    _min: ChatMinAggregateOutputType | null;
    _max: ChatMaxAggregateOutputType | null;
  };

  type GetChatGroupByPayload<T extends ChatGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatGroupByOutputType, T['by']> & {
        [P in keyof T & keyof ChatGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], ChatGroupByOutputType[P]>
          : GetScalarType<T[P], ChatGroupByOutputType[P]>;
      }
    >
  >;

  export type ChatSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      createdAt?: boolean;
      title?: boolean;
      userId?: boolean;
      visibility?: boolean;
      lastContext?: boolean;
      settings?: boolean;
      parentChatId?: boolean;
      forkedFromMessageId?: boolean;
      forkDepth?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      messages?: boolean | Chat$messagesArgs<ExtArgs>;
      votes?: boolean | Chat$votesArgs<ExtArgs>;
      streams?: boolean | Chat$streamsArgs<ExtArgs>;
      pinnedArchiveEntries?: boolean | Chat$pinnedArchiveEntriesArgs<ExtArgs>;
      _count?: boolean | ChatCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['chat']
  >;

  export type ChatSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      createdAt?: boolean;
      title?: boolean;
      userId?: boolean;
      visibility?: boolean;
      lastContext?: boolean;
      settings?: boolean;
      parentChatId?: boolean;
      forkedFromMessageId?: boolean;
      forkDepth?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['chat']
  >;

  export type ChatSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      createdAt?: boolean;
      title?: boolean;
      userId?: boolean;
      visibility?: boolean;
      lastContext?: boolean;
      settings?: boolean;
      parentChatId?: boolean;
      forkedFromMessageId?: boolean;
      forkDepth?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['chat']
  >;

  export type ChatSelectScalar = {
    id?: boolean;
    createdAt?: boolean;
    title?: boolean;
    userId?: boolean;
    visibility?: boolean;
    lastContext?: boolean;
    settings?: boolean;
    parentChatId?: boolean;
    forkedFromMessageId?: boolean;
    forkDepth?: boolean;
  };

  export type ChatOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | 'id'
    | 'createdAt'
    | 'title'
    | 'userId'
    | 'visibility'
    | 'lastContext'
    | 'settings'
    | 'parentChatId'
    | 'forkedFromMessageId'
    | 'forkDepth',
    ExtArgs['result']['chat']
  >;
  export type ChatInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    messages?: boolean | Chat$messagesArgs<ExtArgs>;
    votes?: boolean | Chat$votesArgs<ExtArgs>;
    streams?: boolean | Chat$streamsArgs<ExtArgs>;
    pinnedArchiveEntries?: boolean | Chat$pinnedArchiveEntriesArgs<ExtArgs>;
    _count?: boolean | ChatCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type ChatIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type ChatIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $ChatPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'Chat';
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
      messages: Prisma.$MessagePayload<ExtArgs>[];
      votes: Prisma.$VotePayload<ExtArgs>[];
      streams: Prisma.$StreamPayload<ExtArgs>[];
      pinnedArchiveEntries: Prisma.$ChatPinnedArchiveEntryPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        createdAt: Date;
        title: string;
        userId: string;
        visibility: string;
        lastContext: Prisma.JsonValue | null;
        settings: Prisma.JsonValue | null;
        parentChatId: string | null;
        forkedFromMessageId: string | null;
        forkDepth: number;
      },
      ExtArgs['result']['chat']
    >;
    composites: {};
  };

  type ChatGetPayload<S extends boolean | null | undefined | ChatDefaultArgs> =
    $Result.GetResult<Prisma.$ChatPayload, S>;

  type ChatCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<ChatFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ChatCountAggregateInputType | true;
  };

  export interface ChatDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Chat'];
      meta: { name: 'Chat' };
    };
    /**
     * Find zero or one Chat that matches the filter.
     * @param {ChatFindUniqueArgs} args - Arguments to find a Chat
     * @example
     * // Get one Chat
     * const chat = await prisma.chat.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChatFindUniqueArgs>(
      args: SelectSubset<T, ChatFindUniqueArgs<ExtArgs>>
    ): Prisma__ChatClient<
      $Result.GetResult<
        Prisma.$ChatPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Chat that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChatFindUniqueOrThrowArgs} args - Arguments to find a Chat
     * @example
     * // Get one Chat
     * const chat = await prisma.chat.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChatFindUniqueOrThrowArgs>(
      args: SelectSubset<T, ChatFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ChatClient<
      $Result.GetResult<
        Prisma.$ChatPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Chat that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatFindFirstArgs} args - Arguments to find a Chat
     * @example
     * // Get one Chat
     * const chat = await prisma.chat.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChatFindFirstArgs>(
      args?: SelectSubset<T, ChatFindFirstArgs<ExtArgs>>
    ): Prisma__ChatClient<
      $Result.GetResult<
        Prisma.$ChatPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Chat that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatFindFirstOrThrowArgs} args - Arguments to find a Chat
     * @example
     * // Get one Chat
     * const chat = await prisma.chat.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChatFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ChatFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ChatClient<
      $Result.GetResult<
        Prisma.$ChatPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Chats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Chats
     * const chats = await prisma.chat.findMany()
     *
     * // Get first 10 Chats
     * const chats = await prisma.chat.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const chatWithIdOnly = await prisma.chat.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ChatFindManyArgs>(
      args?: SelectSubset<T, ChatFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ChatPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Chat.
     * @param {ChatCreateArgs} args - Arguments to create a Chat.
     * @example
     * // Create one Chat
     * const Chat = await prisma.chat.create({
     *   data: {
     *     // ... data to create a Chat
     *   }
     * })
     *
     */
    create<T extends ChatCreateArgs>(
      args: SelectSubset<T, ChatCreateArgs<ExtArgs>>
    ): Prisma__ChatClient<
      $Result.GetResult<
        Prisma.$ChatPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Chats.
     * @param {ChatCreateManyArgs} args - Arguments to create many Chats.
     * @example
     * // Create many Chats
     * const chat = await prisma.chat.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ChatCreateManyArgs>(
      args?: SelectSubset<T, ChatCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Chats and returns the data saved in the database.
     * @param {ChatCreateManyAndReturnArgs} args - Arguments to create many Chats.
     * @example
     * // Create many Chats
     * const chat = await prisma.chat.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Chats and only return the `id`
     * const chatWithIdOnly = await prisma.chat.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ChatCreateManyAndReturnArgs>(
      args?: SelectSubset<T, ChatCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ChatPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Chat.
     * @param {ChatDeleteArgs} args - Arguments to delete one Chat.
     * @example
     * // Delete one Chat
     * const Chat = await prisma.chat.delete({
     *   where: {
     *     // ... filter to delete one Chat
     *   }
     * })
     *
     */
    delete<T extends ChatDeleteArgs>(
      args: SelectSubset<T, ChatDeleteArgs<ExtArgs>>
    ): Prisma__ChatClient<
      $Result.GetResult<
        Prisma.$ChatPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Chat.
     * @param {ChatUpdateArgs} args - Arguments to update one Chat.
     * @example
     * // Update one Chat
     * const chat = await prisma.chat.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ChatUpdateArgs>(
      args: SelectSubset<T, ChatUpdateArgs<ExtArgs>>
    ): Prisma__ChatClient<
      $Result.GetResult<
        Prisma.$ChatPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Chats.
     * @param {ChatDeleteManyArgs} args - Arguments to filter Chats to delete.
     * @example
     * // Delete a few Chats
     * const { count } = await prisma.chat.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ChatDeleteManyArgs>(
      args?: SelectSubset<T, ChatDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Chats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Chats
     * const chat = await prisma.chat.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ChatUpdateManyArgs>(
      args: SelectSubset<T, ChatUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Chats and returns the data updated in the database.
     * @param {ChatUpdateManyAndReturnArgs} args - Arguments to update many Chats.
     * @example
     * // Update many Chats
     * const chat = await prisma.chat.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Chats and only return the `id`
     * const chatWithIdOnly = await prisma.chat.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends ChatUpdateManyAndReturnArgs>(
      args: SelectSubset<T, ChatUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ChatPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Chat.
     * @param {ChatUpsertArgs} args - Arguments to update or create a Chat.
     * @example
     * // Update or create a Chat
     * const chat = await prisma.chat.upsert({
     *   create: {
     *     // ... data to create a Chat
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Chat we want to update
     *   }
     * })
     */
    upsert<T extends ChatUpsertArgs>(
      args: SelectSubset<T, ChatUpsertArgs<ExtArgs>>
    ): Prisma__ChatClient<
      $Result.GetResult<
        Prisma.$ChatPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Chats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatCountArgs} args - Arguments to filter Chats to count.
     * @example
     * // Count the number of Chats
     * const count = await prisma.chat.count({
     *   where: {
     *     // ... the filter for the Chats we want to count
     *   }
     * })
     **/
    count<T extends ChatCountArgs>(
      args?: Subset<T, ChatCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Chat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ChatAggregateArgs>(
      args: Subset<T, ChatAggregateArgs>
    ): Prisma.PrismaPromise<GetChatAggregateType<T>>;

    /**
     * Group by Chat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ChatGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChatGroupByArgs['orderBy'] }
        : { orderBy?: ChatGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, ChatGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetChatGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Chat model
     */
    readonly fields: ChatFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Chat.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChatClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    messages<T extends Chat$messagesArgs<ExtArgs> = {}>(
      args?: Subset<T, Chat$messagesArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$MessagePayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    votes<T extends Chat$votesArgs<ExtArgs> = {}>(
      args?: Subset<T, Chat$votesArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$VotePayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    streams<T extends Chat$streamsArgs<ExtArgs> = {}>(
      args?: Subset<T, Chat$streamsArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$StreamPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    pinnedArchiveEntries<T extends Chat$pinnedArchiveEntriesArgs<ExtArgs> = {}>(
      args?: Subset<T, Chat$pinnedArchiveEntriesArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$ChatPinnedArchiveEntryPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Chat model
   */
  interface ChatFieldRefs {
    readonly id: FieldRef<'Chat', 'String'>;
    readonly createdAt: FieldRef<'Chat', 'DateTime'>;
    readonly title: FieldRef<'Chat', 'String'>;
    readonly userId: FieldRef<'Chat', 'String'>;
    readonly visibility: FieldRef<'Chat', 'String'>;
    readonly lastContext: FieldRef<'Chat', 'Json'>;
    readonly settings: FieldRef<'Chat', 'Json'>;
    readonly parentChatId: FieldRef<'Chat', 'String'>;
    readonly forkedFromMessageId: FieldRef<'Chat', 'String'>;
    readonly forkDepth: FieldRef<'Chat', 'Int'>;
  }

  // Custom InputTypes
  /**
   * Chat findUnique
   */
  export type ChatFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null;
    /**
     * Filter, which Chat to fetch.
     */
    where: ChatWhereUniqueInput;
  };

  /**
   * Chat findUniqueOrThrow
   */
  export type ChatFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null;
    /**
     * Filter, which Chat to fetch.
     */
    where: ChatWhereUniqueInput;
  };

  /**
   * Chat findFirst
   */
  export type ChatFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null;
    /**
     * Filter, which Chat to fetch.
     */
    where?: ChatWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Chats to fetch.
     */
    orderBy?: ChatOrderByWithRelationInput | ChatOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Chats.
     */
    cursor?: ChatWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Chats from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Chats.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Chats.
     */
    distinct?: ChatScalarFieldEnum | ChatScalarFieldEnum[];
  };

  /**
   * Chat findFirstOrThrow
   */
  export type ChatFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null;
    /**
     * Filter, which Chat to fetch.
     */
    where?: ChatWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Chats to fetch.
     */
    orderBy?: ChatOrderByWithRelationInput | ChatOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Chats.
     */
    cursor?: ChatWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Chats from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Chats.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Chats.
     */
    distinct?: ChatScalarFieldEnum | ChatScalarFieldEnum[];
  };

  /**
   * Chat findMany
   */
  export type ChatFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null;
    /**
     * Filter, which Chats to fetch.
     */
    where?: ChatWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Chats to fetch.
     */
    orderBy?: ChatOrderByWithRelationInput | ChatOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Chats.
     */
    cursor?: ChatWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Chats from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Chats.
     */
    skip?: number;
    distinct?: ChatScalarFieldEnum | ChatScalarFieldEnum[];
  };

  /**
   * Chat create
   */
  export type ChatCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null;
    /**
     * The data needed to create a Chat.
     */
    data: XOR<ChatCreateInput, ChatUncheckedCreateInput>;
  };

  /**
   * Chat createMany
   */
  export type ChatCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Chats.
     */
    data: ChatCreateManyInput | ChatCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Chat createManyAndReturn
   */
  export type ChatCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null;
    /**
     * The data used to create many Chats.
     */
    data: ChatCreateManyInput | ChatCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Chat update
   */
  export type ChatUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null;
    /**
     * The data needed to update a Chat.
     */
    data: XOR<ChatUpdateInput, ChatUncheckedUpdateInput>;
    /**
     * Choose, which Chat to update.
     */
    where: ChatWhereUniqueInput;
  };

  /**
   * Chat updateMany
   */
  export type ChatUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Chats.
     */
    data: XOR<ChatUpdateManyMutationInput, ChatUncheckedUpdateManyInput>;
    /**
     * Filter which Chats to update
     */
    where?: ChatWhereInput;
    /**
     * Limit how many Chats to update.
     */
    limit?: number;
  };

  /**
   * Chat updateManyAndReturn
   */
  export type ChatUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null;
    /**
     * The data used to update Chats.
     */
    data: XOR<ChatUpdateManyMutationInput, ChatUncheckedUpdateManyInput>;
    /**
     * Filter which Chats to update
     */
    where?: ChatWhereInput;
    /**
     * Limit how many Chats to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Chat upsert
   */
  export type ChatUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null;
    /**
     * The filter to search for the Chat to update in case it exists.
     */
    where: ChatWhereUniqueInput;
    /**
     * In case the Chat found by the `where` argument doesn't exist, create a new Chat with this data.
     */
    create: XOR<ChatCreateInput, ChatUncheckedCreateInput>;
    /**
     * In case the Chat was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChatUpdateInput, ChatUncheckedUpdateInput>;
  };

  /**
   * Chat delete
   */
  export type ChatDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null;
    /**
     * Filter which Chat to delete.
     */
    where: ChatWhereUniqueInput;
  };

  /**
   * Chat deleteMany
   */
  export type ChatDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Chats to delete
     */
    where?: ChatWhereInput;
    /**
     * Limit how many Chats to delete.
     */
    limit?: number;
  };

  /**
   * Chat.messages
   */
  export type Chat$messagesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    where?: MessageWhereInput;
    orderBy?:
      | MessageOrderByWithRelationInput
      | MessageOrderByWithRelationInput[];
    cursor?: MessageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[];
  };

  /**
   * Chat.votes
   */
  export type Chat$votesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null;
    where?: VoteWhereInput;
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[];
    cursor?: VoteWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: VoteScalarFieldEnum | VoteScalarFieldEnum[];
  };

  /**
   * Chat.streams
   */
  export type Chat$streamsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null;
    where?: StreamWhereInput;
    orderBy?: StreamOrderByWithRelationInput | StreamOrderByWithRelationInput[];
    cursor?: StreamWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: StreamScalarFieldEnum | StreamScalarFieldEnum[];
  };

  /**
   * Chat.pinnedArchiveEntries
   */
  export type Chat$pinnedArchiveEntriesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChatPinnedArchiveEntry
     */
    select?: ChatPinnedArchiveEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ChatPinnedArchiveEntry
     */
    omit?: ChatPinnedArchiveEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatPinnedArchiveEntryInclude<ExtArgs> | null;
    where?: ChatPinnedArchiveEntryWhereInput;
    orderBy?:
      | ChatPinnedArchiveEntryOrderByWithRelationInput
      | ChatPinnedArchiveEntryOrderByWithRelationInput[];
    cursor?: ChatPinnedArchiveEntryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?:
      | ChatPinnedArchiveEntryScalarFieldEnum
      | ChatPinnedArchiveEntryScalarFieldEnum[];
  };

  /**
   * Chat without action
   */
  export type ChatDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null;
  };

  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null;
    _min: MessageMinAggregateOutputType | null;
    _max: MessageMaxAggregateOutputType | null;
  };

  export type MessageMinAggregateOutputType = {
    id: string | null;
    chatId: string | null;
    role: string | null;
    createdAt: Date | null;
  };

  export type MessageMaxAggregateOutputType = {
    id: string | null;
    chatId: string | null;
    role: string | null;
    createdAt: Date | null;
  };

  export type MessageCountAggregateOutputType = {
    id: number;
    chatId: number;
    role: number;
    parts: number;
    attachments: number;
    createdAt: number;
    _all: number;
  };

  export type MessageMinAggregateInputType = {
    id?: true;
    chatId?: true;
    role?: true;
    createdAt?: true;
  };

  export type MessageMaxAggregateInputType = {
    id?: true;
    chatId?: true;
    role?: true;
    createdAt?: true;
  };

  export type MessageCountAggregateInputType = {
    id?: true;
    chatId?: true;
    role?: true;
    parts?: true;
    attachments?: true;
    createdAt?: true;
    _all?: true;
  };

  export type MessageAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Messages to fetch.
     */
    orderBy?:
      | MessageOrderByWithRelationInput
      | MessageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Messages.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Messages
     **/
    _count?: true | MessageCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: MessageMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: MessageMaxAggregateInputType;
  };

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
    [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>;
  };

  export type MessageGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: MessageWhereInput;
    orderBy?:
      | MessageOrderByWithAggregationInput
      | MessageOrderByWithAggregationInput[];
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum;
    having?: MessageScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MessageCountAggregateInputType | true;
    _min?: MessageMinAggregateInputType;
    _max?: MessageMaxAggregateInputType;
  };

  export type MessageGroupByOutputType = {
    id: string;
    chatId: string;
    role: string;
    parts: JsonValue;
    attachments: JsonValue;
    createdAt: Date;
    _count: MessageCountAggregateOutputType | null;
    _min: MessageMinAggregateOutputType | null;
    _max: MessageMaxAggregateOutputType | null;
  };

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<MessageGroupByOutputType, T['by']> & {
          [P in keyof T & keyof MessageGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>;
        }
      >
    >;

  export type MessageSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      chatId?: boolean;
      role?: boolean;
      parts?: boolean;
      attachments?: boolean;
      createdAt?: boolean;
      chat?: boolean | ChatDefaultArgs<ExtArgs>;
      votes?: boolean | Message$votesArgs<ExtArgs>;
      _count?: boolean | MessageCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['message']
  >;

  export type MessageSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      chatId?: boolean;
      role?: boolean;
      parts?: boolean;
      attachments?: boolean;
      createdAt?: boolean;
      chat?: boolean | ChatDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['message']
  >;

  export type MessageSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      chatId?: boolean;
      role?: boolean;
      parts?: boolean;
      attachments?: boolean;
      createdAt?: boolean;
      chat?: boolean | ChatDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['message']
  >;

  export type MessageSelectScalar = {
    id?: boolean;
    chatId?: boolean;
    role?: boolean;
    parts?: boolean;
    attachments?: boolean;
    createdAt?: boolean;
  };

  export type MessageOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    'id' | 'chatId' | 'role' | 'parts' | 'attachments' | 'createdAt',
    ExtArgs['result']['message']
  >;
  export type MessageInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    chat?: boolean | ChatDefaultArgs<ExtArgs>;
    votes?: boolean | Message$votesArgs<ExtArgs>;
    _count?: boolean | MessageCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type MessageIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    chat?: boolean | ChatDefaultArgs<ExtArgs>;
  };
  export type MessageIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    chat?: boolean | ChatDefaultArgs<ExtArgs>;
  };

  export type $MessagePayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'Message';
    objects: {
      chat: Prisma.$ChatPayload<ExtArgs>;
      votes: Prisma.$VotePayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        chatId: string;
        role: string;
        parts: Prisma.JsonValue;
        attachments: Prisma.JsonValue;
        createdAt: Date;
      },
      ExtArgs['result']['message']
    >;
    composites: {};
  };

  type MessageGetPayload<
    S extends boolean | null | undefined | MessageDefaultArgs,
  > = $Result.GetResult<Prisma.$MessagePayload, S>;

  type MessageCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MessageCountAggregateInputType | true;
  };

  export interface MessageDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Message'];
      meta: { name: 'Message' };
    };
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(
      args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>
    ): Prisma__MessageClient<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(
      args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__MessageClient<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(
      args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>
    ): Prisma__MessageClient<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(
      args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__MessageClient<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     *
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     *
     */
    findMany<T extends MessageFindManyArgs>(
      args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     *
     */
    create<T extends MessageCreateArgs>(
      args: SelectSubset<T, MessageCreateArgs<ExtArgs>>
    ): Prisma__MessageClient<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends MessageCreateManyArgs>(
      args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(
      args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     *
     */
    delete<T extends MessageDeleteArgs>(
      args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>
    ): Prisma__MessageClient<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends MessageUpdateArgs>(
      args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>
    ): Prisma__MessageClient<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends MessageDeleteManyArgs>(
      args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends MessageUpdateManyArgs>(
      args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Messages and returns the data updated in the database.
     * @param {MessageUpdateManyAndReturnArgs} args - Arguments to update many Messages.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends MessageUpdateManyAndReturnArgs>(
      args: SelectSubset<T, MessageUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(
      args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>
    ): Prisma__MessageClient<
      $Result.GetResult<
        Prisma.$MessagePayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
     **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends MessageAggregateArgs>(
      args: Subset<T, MessageAggregateArgs>
    ): Prisma.PrismaPromise<GetMessageAggregateType<T>>;

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetMessageGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Message model
     */
    readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    chat<T extends ChatDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, ChatDefaultArgs<ExtArgs>>
    ): Prisma__ChatClient<
      | $Result.GetResult<
          Prisma.$ChatPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    votes<T extends Message$votesArgs<ExtArgs> = {}>(
      args?: Subset<T, Message$votesArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$VotePayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Message model
   */
  interface MessageFieldRefs {
    readonly id: FieldRef<'Message', 'String'>;
    readonly chatId: FieldRef<'Message', 'String'>;
    readonly role: FieldRef<'Message', 'String'>;
    readonly parts: FieldRef<'Message', 'Json'>;
    readonly attachments: FieldRef<'Message', 'Json'>;
    readonly createdAt: FieldRef<'Message', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput;
  };

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput;
  };

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Messages to fetch.
     */
    orderBy?:
      | MessageOrderByWithRelationInput
      | MessageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Messages.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[];
  };

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Messages to fetch.
     */
    orderBy?:
      | MessageOrderByWithRelationInput
      | MessageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Messages.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[];
  };

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Messages to fetch.
     */
    orderBy?:
      | MessageOrderByWithRelationInput
      | MessageOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Messages.
     */
    skip?: number;
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[];
  };

  /**
   * Message create
   */
  export type MessageCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>;
  };

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Message createManyAndReturn
   */
  export type MessageCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Message update
   */
  export type MessageUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>;
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput;
  };

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>;
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput;
    /**
     * Limit how many Messages to update.
     */
    limit?: number;
  };

  /**
   * Message updateManyAndReturn
   */
  export type MessageUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>;
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput;
    /**
     * Limit how many Messages to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput;
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>;
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>;
  };

  /**
   * Message delete
   */
  export type MessageDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput;
  };

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput;
    /**
     * Limit how many Messages to delete.
     */
    limit?: number;
  };

  /**
   * Message.votes
   */
  export type Message$votesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null;
    where?: VoteWhereInput;
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[];
    cursor?: VoteWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: VoteScalarFieldEnum | VoteScalarFieldEnum[];
  };

  /**
   * Message without action
   */
  export type MessageDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null;
  };

  /**
   * Model Vote
   */

  export type AggregateVote = {
    _count: VoteCountAggregateOutputType | null;
    _min: VoteMinAggregateOutputType | null;
    _max: VoteMaxAggregateOutputType | null;
  };

  export type VoteMinAggregateOutputType = {
    chatId: string | null;
    messageId: string | null;
    isUpvoted: boolean | null;
  };

  export type VoteMaxAggregateOutputType = {
    chatId: string | null;
    messageId: string | null;
    isUpvoted: boolean | null;
  };

  export type VoteCountAggregateOutputType = {
    chatId: number;
    messageId: number;
    isUpvoted: number;
    _all: number;
  };

  export type VoteMinAggregateInputType = {
    chatId?: true;
    messageId?: true;
    isUpvoted?: true;
  };

  export type VoteMaxAggregateInputType = {
    chatId?: true;
    messageId?: true;
    isUpvoted?: true;
  };

  export type VoteCountAggregateInputType = {
    chatId?: true;
    messageId?: true;
    isUpvoted?: true;
    _all?: true;
  };

  export type VoteAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Vote to aggregate.
     */
    where?: VoteWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Votes to fetch.
     */
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: VoteWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Votes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Votes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Votes
     **/
    _count?: true | VoteCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: VoteMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: VoteMaxAggregateInputType;
  };

  export type GetVoteAggregateType<T extends VoteAggregateArgs> = {
    [P in keyof T & keyof AggregateVote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVote[P]>
      : GetScalarType<T[P], AggregateVote[P]>;
  };

  export type VoteGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: VoteWhereInput;
    orderBy?:
      | VoteOrderByWithAggregationInput
      | VoteOrderByWithAggregationInput[];
    by: VoteScalarFieldEnum[] | VoteScalarFieldEnum;
    having?: VoteScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: VoteCountAggregateInputType | true;
    _min?: VoteMinAggregateInputType;
    _max?: VoteMaxAggregateInputType;
  };

  export type VoteGroupByOutputType = {
    chatId: string;
    messageId: string;
    isUpvoted: boolean;
    _count: VoteCountAggregateOutputType | null;
    _min: VoteMinAggregateOutputType | null;
    _max: VoteMaxAggregateOutputType | null;
  };

  type GetVoteGroupByPayload<T extends VoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VoteGroupByOutputType, T['by']> & {
        [P in keyof T & keyof VoteGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], VoteGroupByOutputType[P]>
          : GetScalarType<T[P], VoteGroupByOutputType[P]>;
      }
    >
  >;

  export type VoteSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      chatId?: boolean;
      messageId?: boolean;
      isUpvoted?: boolean;
      message?: boolean | MessageDefaultArgs<ExtArgs>;
      chat?: boolean | ChatDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['vote']
  >;

  export type VoteSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      chatId?: boolean;
      messageId?: boolean;
      isUpvoted?: boolean;
      message?: boolean | MessageDefaultArgs<ExtArgs>;
      chat?: boolean | ChatDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['vote']
  >;

  export type VoteSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      chatId?: boolean;
      messageId?: boolean;
      isUpvoted?: boolean;
      message?: boolean | MessageDefaultArgs<ExtArgs>;
      chat?: boolean | ChatDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['vote']
  >;

  export type VoteSelectScalar = {
    chatId?: boolean;
    messageId?: boolean;
    isUpvoted?: boolean;
  };

  export type VoteOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    'chatId' | 'messageId' | 'isUpvoted',
    ExtArgs['result']['vote']
  >;
  export type VoteInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    message?: boolean | MessageDefaultArgs<ExtArgs>;
    chat?: boolean | ChatDefaultArgs<ExtArgs>;
  };
  export type VoteIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    message?: boolean | MessageDefaultArgs<ExtArgs>;
    chat?: boolean | ChatDefaultArgs<ExtArgs>;
  };
  export type VoteIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    message?: boolean | MessageDefaultArgs<ExtArgs>;
    chat?: boolean | ChatDefaultArgs<ExtArgs>;
  };

  export type $VotePayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'Vote';
    objects: {
      message: Prisma.$MessagePayload<ExtArgs>;
      chat: Prisma.$ChatPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        chatId: string;
        messageId: string;
        isUpvoted: boolean;
      },
      ExtArgs['result']['vote']
    >;
    composites: {};
  };

  type VoteGetPayload<S extends boolean | null | undefined | VoteDefaultArgs> =
    $Result.GetResult<Prisma.$VotePayload, S>;

  type VoteCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<VoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: VoteCountAggregateInputType | true;
  };

  export interface VoteDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Vote'];
      meta: { name: 'Vote' };
    };
    /**
     * Find zero or one Vote that matches the filter.
     * @param {VoteFindUniqueArgs} args - Arguments to find a Vote
     * @example
     * // Get one Vote
     * const vote = await prisma.vote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VoteFindUniqueArgs>(
      args: SelectSubset<T, VoteFindUniqueArgs<ExtArgs>>
    ): Prisma__VoteClient<
      $Result.GetResult<
        Prisma.$VotePayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Vote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VoteFindUniqueOrThrowArgs} args - Arguments to find a Vote
     * @example
     * // Get one Vote
     * const vote = await prisma.vote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VoteFindUniqueOrThrowArgs>(
      args: SelectSubset<T, VoteFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__VoteClient<
      $Result.GetResult<
        Prisma.$VotePayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Vote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteFindFirstArgs} args - Arguments to find a Vote
     * @example
     * // Get one Vote
     * const vote = await prisma.vote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VoteFindFirstArgs>(
      args?: SelectSubset<T, VoteFindFirstArgs<ExtArgs>>
    ): Prisma__VoteClient<
      $Result.GetResult<
        Prisma.$VotePayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Vote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteFindFirstOrThrowArgs} args - Arguments to find a Vote
     * @example
     * // Get one Vote
     * const vote = await prisma.vote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VoteFindFirstOrThrowArgs>(
      args?: SelectSubset<T, VoteFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__VoteClient<
      $Result.GetResult<
        Prisma.$VotePayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Votes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Votes
     * const votes = await prisma.vote.findMany()
     *
     * // Get first 10 Votes
     * const votes = await prisma.vote.findMany({ take: 10 })
     *
     * // Only select the `chatId`
     * const voteWithChatIdOnly = await prisma.vote.findMany({ select: { chatId: true } })
     *
     */
    findMany<T extends VoteFindManyArgs>(
      args?: SelectSubset<T, VoteFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$VotePayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Vote.
     * @param {VoteCreateArgs} args - Arguments to create a Vote.
     * @example
     * // Create one Vote
     * const Vote = await prisma.vote.create({
     *   data: {
     *     // ... data to create a Vote
     *   }
     * })
     *
     */
    create<T extends VoteCreateArgs>(
      args: SelectSubset<T, VoteCreateArgs<ExtArgs>>
    ): Prisma__VoteClient<
      $Result.GetResult<
        Prisma.$VotePayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Votes.
     * @param {VoteCreateManyArgs} args - Arguments to create many Votes.
     * @example
     * // Create many Votes
     * const vote = await prisma.vote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends VoteCreateManyArgs>(
      args?: SelectSubset<T, VoteCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Votes and returns the data saved in the database.
     * @param {VoteCreateManyAndReturnArgs} args - Arguments to create many Votes.
     * @example
     * // Create many Votes
     * const vote = await prisma.vote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Votes and only return the `chatId`
     * const voteWithChatIdOnly = await prisma.vote.createManyAndReturn({
     *   select: { chatId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends VoteCreateManyAndReturnArgs>(
      args?: SelectSubset<T, VoteCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$VotePayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Vote.
     * @param {VoteDeleteArgs} args - Arguments to delete one Vote.
     * @example
     * // Delete one Vote
     * const Vote = await prisma.vote.delete({
     *   where: {
     *     // ... filter to delete one Vote
     *   }
     * })
     *
     */
    delete<T extends VoteDeleteArgs>(
      args: SelectSubset<T, VoteDeleteArgs<ExtArgs>>
    ): Prisma__VoteClient<
      $Result.GetResult<
        Prisma.$VotePayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Vote.
     * @param {VoteUpdateArgs} args - Arguments to update one Vote.
     * @example
     * // Update one Vote
     * const vote = await prisma.vote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends VoteUpdateArgs>(
      args: SelectSubset<T, VoteUpdateArgs<ExtArgs>>
    ): Prisma__VoteClient<
      $Result.GetResult<
        Prisma.$VotePayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Votes.
     * @param {VoteDeleteManyArgs} args - Arguments to filter Votes to delete.
     * @example
     * // Delete a few Votes
     * const { count } = await prisma.vote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends VoteDeleteManyArgs>(
      args?: SelectSubset<T, VoteDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Votes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Votes
     * const vote = await prisma.vote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends VoteUpdateManyArgs>(
      args: SelectSubset<T, VoteUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Votes and returns the data updated in the database.
     * @param {VoteUpdateManyAndReturnArgs} args - Arguments to update many Votes.
     * @example
     * // Update many Votes
     * const vote = await prisma.vote.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Votes and only return the `chatId`
     * const voteWithChatIdOnly = await prisma.vote.updateManyAndReturn({
     *   select: { chatId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends VoteUpdateManyAndReturnArgs>(
      args: SelectSubset<T, VoteUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$VotePayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Vote.
     * @param {VoteUpsertArgs} args - Arguments to update or create a Vote.
     * @example
     * // Update or create a Vote
     * const vote = await prisma.vote.upsert({
     *   create: {
     *     // ... data to create a Vote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vote we want to update
     *   }
     * })
     */
    upsert<T extends VoteUpsertArgs>(
      args: SelectSubset<T, VoteUpsertArgs<ExtArgs>>
    ): Prisma__VoteClient<
      $Result.GetResult<
        Prisma.$VotePayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Votes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteCountArgs} args - Arguments to filter Votes to count.
     * @example
     * // Count the number of Votes
     * const count = await prisma.vote.count({
     *   where: {
     *     // ... the filter for the Votes we want to count
     *   }
     * })
     **/
    count<T extends VoteCountArgs>(
      args?: Subset<T, VoteCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VoteCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Vote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends VoteAggregateArgs>(
      args: Subset<T, VoteAggregateArgs>
    ): Prisma.PrismaPromise<GetVoteAggregateType<T>>;

    /**
     * Group by Vote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends VoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VoteGroupByArgs['orderBy'] }
        : { orderBy?: VoteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, VoteGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetVoteGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Vote model
     */
    readonly fields: VoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Vote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VoteClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    message<T extends MessageDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, MessageDefaultArgs<ExtArgs>>
    ): Prisma__MessageClient<
      | $Result.GetResult<
          Prisma.$MessagePayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    chat<T extends ChatDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, ChatDefaultArgs<ExtArgs>>
    ): Prisma__ChatClient<
      | $Result.GetResult<
          Prisma.$ChatPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Vote model
   */
  interface VoteFieldRefs {
    readonly chatId: FieldRef<'Vote', 'String'>;
    readonly messageId: FieldRef<'Vote', 'String'>;
    readonly isUpvoted: FieldRef<'Vote', 'Boolean'>;
  }

  // Custom InputTypes
  /**
   * Vote findUnique
   */
  export type VoteFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null;
    /**
     * Filter, which Vote to fetch.
     */
    where: VoteWhereUniqueInput;
  };

  /**
   * Vote findUniqueOrThrow
   */
  export type VoteFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null;
    /**
     * Filter, which Vote to fetch.
     */
    where: VoteWhereUniqueInput;
  };

  /**
   * Vote findFirst
   */
  export type VoteFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null;
    /**
     * Filter, which Vote to fetch.
     */
    where?: VoteWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Votes to fetch.
     */
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Votes.
     */
    cursor?: VoteWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Votes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Votes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Votes.
     */
    distinct?: VoteScalarFieldEnum | VoteScalarFieldEnum[];
  };

  /**
   * Vote findFirstOrThrow
   */
  export type VoteFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null;
    /**
     * Filter, which Vote to fetch.
     */
    where?: VoteWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Votes to fetch.
     */
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Votes.
     */
    cursor?: VoteWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Votes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Votes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Votes.
     */
    distinct?: VoteScalarFieldEnum | VoteScalarFieldEnum[];
  };

  /**
   * Vote findMany
   */
  export type VoteFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null;
    /**
     * Filter, which Votes to fetch.
     */
    where?: VoteWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Votes to fetch.
     */
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Votes.
     */
    cursor?: VoteWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Votes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Votes.
     */
    skip?: number;
    distinct?: VoteScalarFieldEnum | VoteScalarFieldEnum[];
  };

  /**
   * Vote create
   */
  export type VoteCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null;
    /**
     * The data needed to create a Vote.
     */
    data: XOR<VoteCreateInput, VoteUncheckedCreateInput>;
  };

  /**
   * Vote createMany
   */
  export type VoteCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Votes.
     */
    data: VoteCreateManyInput | VoteCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Vote createManyAndReturn
   */
  export type VoteCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null;
    /**
     * The data used to create many Votes.
     */
    data: VoteCreateManyInput | VoteCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Vote update
   */
  export type VoteUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null;
    /**
     * The data needed to update a Vote.
     */
    data: XOR<VoteUpdateInput, VoteUncheckedUpdateInput>;
    /**
     * Choose, which Vote to update.
     */
    where: VoteWhereUniqueInput;
  };

  /**
   * Vote updateMany
   */
  export type VoteUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Votes.
     */
    data: XOR<VoteUpdateManyMutationInput, VoteUncheckedUpdateManyInput>;
    /**
     * Filter which Votes to update
     */
    where?: VoteWhereInput;
    /**
     * Limit how many Votes to update.
     */
    limit?: number;
  };

  /**
   * Vote updateManyAndReturn
   */
  export type VoteUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null;
    /**
     * The data used to update Votes.
     */
    data: XOR<VoteUpdateManyMutationInput, VoteUncheckedUpdateManyInput>;
    /**
     * Filter which Votes to update
     */
    where?: VoteWhereInput;
    /**
     * Limit how many Votes to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Vote upsert
   */
  export type VoteUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null;
    /**
     * The filter to search for the Vote to update in case it exists.
     */
    where: VoteWhereUniqueInput;
    /**
     * In case the Vote found by the `where` argument doesn't exist, create a new Vote with this data.
     */
    create: XOR<VoteCreateInput, VoteUncheckedCreateInput>;
    /**
     * In case the Vote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VoteUpdateInput, VoteUncheckedUpdateInput>;
  };

  /**
   * Vote delete
   */
  export type VoteDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null;
    /**
     * Filter which Vote to delete.
     */
    where: VoteWhereUniqueInput;
  };

  /**
   * Vote deleteMany
   */
  export type VoteDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Votes to delete
     */
    where?: VoteWhereInput;
    /**
     * Limit how many Votes to delete.
     */
    limit?: number;
  };

  /**
   * Vote without action
   */
  export type VoteDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null;
  };

  /**
   * Model Document
   */

  export type AggregateDocument = {
    _count: DocumentCountAggregateOutputType | null;
    _min: DocumentMinAggregateOutputType | null;
    _max: DocumentMaxAggregateOutputType | null;
  };

  export type DocumentMinAggregateOutputType = {
    id: string | null;
    createdAt: Date | null;
    title: string | null;
    content: string | null;
    kind: string | null;
    userId: string | null;
  };

  export type DocumentMaxAggregateOutputType = {
    id: string | null;
    createdAt: Date | null;
    title: string | null;
    content: string | null;
    kind: string | null;
    userId: string | null;
  };

  export type DocumentCountAggregateOutputType = {
    id: number;
    createdAt: number;
    title: number;
    content: number;
    kind: number;
    userId: number;
    _all: number;
  };

  export type DocumentMinAggregateInputType = {
    id?: true;
    createdAt?: true;
    title?: true;
    content?: true;
    kind?: true;
    userId?: true;
  };

  export type DocumentMaxAggregateInputType = {
    id?: true;
    createdAt?: true;
    title?: true;
    content?: true;
    kind?: true;
    userId?: true;
  };

  export type DocumentCountAggregateInputType = {
    id?: true;
    createdAt?: true;
    title?: true;
    content?: true;
    kind?: true;
    userId?: true;
    _all?: true;
  };

  export type DocumentAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Document to aggregate.
     */
    where?: DocumentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Documents to fetch.
     */
    orderBy?:
      | DocumentOrderByWithRelationInput
      | DocumentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: DocumentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Documents.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Documents
     **/
    _count?: true | DocumentCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: DocumentMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: DocumentMaxAggregateInputType;
  };

  export type GetDocumentAggregateType<T extends DocumentAggregateArgs> = {
    [P in keyof T & keyof AggregateDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocument[P]>
      : GetScalarType<T[P], AggregateDocument[P]>;
  };

  export type DocumentGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: DocumentWhereInput;
    orderBy?:
      | DocumentOrderByWithAggregationInput
      | DocumentOrderByWithAggregationInput[];
    by: DocumentScalarFieldEnum[] | DocumentScalarFieldEnum;
    having?: DocumentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DocumentCountAggregateInputType | true;
    _min?: DocumentMinAggregateInputType;
    _max?: DocumentMaxAggregateInputType;
  };

  export type DocumentGroupByOutputType = {
    id: string;
    createdAt: Date;
    title: string;
    content: string | null;
    kind: string;
    userId: string;
    _count: DocumentCountAggregateOutputType | null;
    _min: DocumentMinAggregateOutputType | null;
    _max: DocumentMaxAggregateOutputType | null;
  };

  type GetDocumentGroupByPayload<T extends DocumentGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<DocumentGroupByOutputType, T['by']> & {
          [P in keyof T & keyof DocumentGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentGroupByOutputType[P]>;
        }
      >
    >;

  export type DocumentSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      createdAt?: boolean;
      title?: boolean;
      content?: boolean;
      kind?: boolean;
      userId?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      suggestions?: boolean | Document$suggestionsArgs<ExtArgs>;
      _count?: boolean | DocumentCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['document']
  >;

  export type DocumentSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      createdAt?: boolean;
      title?: boolean;
      content?: boolean;
      kind?: boolean;
      userId?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['document']
  >;

  export type DocumentSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      createdAt?: boolean;
      title?: boolean;
      content?: boolean;
      kind?: boolean;
      userId?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['document']
  >;

  export type DocumentSelectScalar = {
    id?: boolean;
    createdAt?: boolean;
    title?: boolean;
    content?: boolean;
    kind?: boolean;
    userId?: boolean;
  };

  export type DocumentOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    'id' | 'createdAt' | 'title' | 'content' | 'kind' | 'userId',
    ExtArgs['result']['document']
  >;
  export type DocumentInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    suggestions?: boolean | Document$suggestionsArgs<ExtArgs>;
    _count?: boolean | DocumentCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type DocumentIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type DocumentIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $DocumentPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'Document';
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
      suggestions: Prisma.$SuggestionPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        createdAt: Date;
        title: string;
        content: string | null;
        kind: string;
        userId: string;
      },
      ExtArgs['result']['document']
    >;
    composites: {};
  };

  type DocumentGetPayload<
    S extends boolean | null | undefined | DocumentDefaultArgs,
  > = $Result.GetResult<Prisma.$DocumentPayload, S>;

  type DocumentCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<DocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DocumentCountAggregateInputType | true;
  };

  export interface DocumentDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Document'];
      meta: { name: 'Document' };
    };
    /**
     * Find zero or one Document that matches the filter.
     * @param {DocumentFindUniqueArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentFindUniqueArgs>(
      args: SelectSubset<T, DocumentFindUniqueArgs<ExtArgs>>
    ): Prisma__DocumentClient<
      $Result.GetResult<
        Prisma.$DocumentPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Document that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DocumentFindUniqueOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentFindUniqueOrThrowArgs>(
      args: SelectSubset<T, DocumentFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__DocumentClient<
      $Result.GetResult<
        Prisma.$DocumentPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Document that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentFindFirstArgs>(
      args?: SelectSubset<T, DocumentFindFirstArgs<ExtArgs>>
    ): Prisma__DocumentClient<
      $Result.GetResult<
        Prisma.$DocumentPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Document that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentFindFirstOrThrowArgs>(
      args?: SelectSubset<T, DocumentFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__DocumentClient<
      $Result.GetResult<
        Prisma.$DocumentPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Documents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Documents
     * const documents = await prisma.document.findMany()
     *
     * // Get first 10 Documents
     * const documents = await prisma.document.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const documentWithIdOnly = await prisma.document.findMany({ select: { id: true } })
     *
     */
    findMany<T extends DocumentFindManyArgs>(
      args?: SelectSubset<T, DocumentFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$DocumentPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Document.
     * @param {DocumentCreateArgs} args - Arguments to create a Document.
     * @example
     * // Create one Document
     * const Document = await prisma.document.create({
     *   data: {
     *     // ... data to create a Document
     *   }
     * })
     *
     */
    create<T extends DocumentCreateArgs>(
      args: SelectSubset<T, DocumentCreateArgs<ExtArgs>>
    ): Prisma__DocumentClient<
      $Result.GetResult<
        Prisma.$DocumentPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Documents.
     * @param {DocumentCreateManyArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends DocumentCreateManyArgs>(
      args?: SelectSubset<T, DocumentCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Documents and returns the data saved in the database.
     * @param {DocumentCreateManyAndReturnArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends DocumentCreateManyAndReturnArgs>(
      args?: SelectSubset<T, DocumentCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$DocumentPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Document.
     * @param {DocumentDeleteArgs} args - Arguments to delete one Document.
     * @example
     * // Delete one Document
     * const Document = await prisma.document.delete({
     *   where: {
     *     // ... filter to delete one Document
     *   }
     * })
     *
     */
    delete<T extends DocumentDeleteArgs>(
      args: SelectSubset<T, DocumentDeleteArgs<ExtArgs>>
    ): Prisma__DocumentClient<
      $Result.GetResult<
        Prisma.$DocumentPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Document.
     * @param {DocumentUpdateArgs} args - Arguments to update one Document.
     * @example
     * // Update one Document
     * const document = await prisma.document.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends DocumentUpdateArgs>(
      args: SelectSubset<T, DocumentUpdateArgs<ExtArgs>>
    ): Prisma__DocumentClient<
      $Result.GetResult<
        Prisma.$DocumentPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Documents.
     * @param {DocumentDeleteManyArgs} args - Arguments to filter Documents to delete.
     * @example
     * // Delete a few Documents
     * const { count } = await prisma.document.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends DocumentDeleteManyArgs>(
      args?: SelectSubset<T, DocumentDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends DocumentUpdateManyArgs>(
      args: SelectSubset<T, DocumentUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Documents and returns the data updated in the database.
     * @param {DocumentUpdateManyAndReturnArgs} args - Arguments to update many Documents.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends DocumentUpdateManyAndReturnArgs>(
      args: SelectSubset<T, DocumentUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$DocumentPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Document.
     * @param {DocumentUpsertArgs} args - Arguments to update or create a Document.
     * @example
     * // Update or create a Document
     * const document = await prisma.document.upsert({
     *   create: {
     *     // ... data to create a Document
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Document we want to update
     *   }
     * })
     */
    upsert<T extends DocumentUpsertArgs>(
      args: SelectSubset<T, DocumentUpsertArgs<ExtArgs>>
    ): Prisma__DocumentClient<
      $Result.GetResult<
        Prisma.$DocumentPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentCountArgs} args - Arguments to filter Documents to count.
     * @example
     * // Count the number of Documents
     * const count = await prisma.document.count({
     *   where: {
     *     // ... the filter for the Documents we want to count
     *   }
     * })
     **/
    count<T extends DocumentCountArgs>(
      args?: Subset<T, DocumentCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends DocumentAggregateArgs>(
      args: Subset<T, DocumentAggregateArgs>
    ): Prisma.PrismaPromise<GetDocumentAggregateType<T>>;

    /**
     * Group by Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends DocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentGroupByArgs['orderBy'] }
        : { orderBy?: DocumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, DocumentGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetDocumentGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Document model
     */
    readonly fields: DocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Document.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    suggestions<T extends Document$suggestionsArgs<ExtArgs> = {}>(
      args?: Subset<T, Document$suggestionsArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$SuggestionPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Document model
   */
  interface DocumentFieldRefs {
    readonly id: FieldRef<'Document', 'String'>;
    readonly createdAt: FieldRef<'Document', 'DateTime'>;
    readonly title: FieldRef<'Document', 'String'>;
    readonly content: FieldRef<'Document', 'String'>;
    readonly kind: FieldRef<'Document', 'String'>;
    readonly userId: FieldRef<'Document', 'String'>;
  }

  // Custom InputTypes
  /**
   * Document findUnique
   */
  export type DocumentFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null;
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput;
  };

  /**
   * Document findUniqueOrThrow
   */
  export type DocumentFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null;
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput;
  };

  /**
   * Document findFirst
   */
  export type DocumentFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null;
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Documents to fetch.
     */
    orderBy?:
      | DocumentOrderByWithRelationInput
      | DocumentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Documents.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[];
  };

  /**
   * Document findFirstOrThrow
   */
  export type DocumentFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null;
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Documents to fetch.
     */
    orderBy?:
      | DocumentOrderByWithRelationInput
      | DocumentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Documents.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[];
  };

  /**
   * Document findMany
   */
  export type DocumentFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null;
    /**
     * Filter, which Documents to fetch.
     */
    where?: DocumentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Documents to fetch.
     */
    orderBy?:
      | DocumentOrderByWithRelationInput
      | DocumentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Documents.
     */
    cursor?: DocumentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Documents.
     */
    skip?: number;
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[];
  };

  /**
   * Document create
   */
  export type DocumentCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null;
    /**
     * The data needed to create a Document.
     */
    data: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>;
  };

  /**
   * Document createMany
   */
  export type DocumentCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Document createManyAndReturn
   */
  export type DocumentCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null;
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Document update
   */
  export type DocumentUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null;
    /**
     * The data needed to update a Document.
     */
    data: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>;
    /**
     * Choose, which Document to update.
     */
    where: DocumentWhereUniqueInput;
  };

  /**
   * Document updateMany
   */
  export type DocumentUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Documents.
     */
    data: XOR<
      DocumentUpdateManyMutationInput,
      DocumentUncheckedUpdateManyInput
    >;
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput;
    /**
     * Limit how many Documents to update.
     */
    limit?: number;
  };

  /**
   * Document updateManyAndReturn
   */
  export type DocumentUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null;
    /**
     * The data used to update Documents.
     */
    data: XOR<
      DocumentUpdateManyMutationInput,
      DocumentUncheckedUpdateManyInput
    >;
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput;
    /**
     * Limit how many Documents to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Document upsert
   */
  export type DocumentUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null;
    /**
     * The filter to search for the Document to update in case it exists.
     */
    where: DocumentWhereUniqueInput;
    /**
     * In case the Document found by the `where` argument doesn't exist, create a new Document with this data.
     */
    create: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>;
    /**
     * In case the Document was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>;
  };

  /**
   * Document delete
   */
  export type DocumentDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null;
    /**
     * Filter which Document to delete.
     */
    where: DocumentWhereUniqueInput;
  };

  /**
   * Document deleteMany
   */
  export type DocumentDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Documents to delete
     */
    where?: DocumentWhereInput;
    /**
     * Limit how many Documents to delete.
     */
    limit?: number;
  };

  /**
   * Document.suggestions
   */
  export type Document$suggestionsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Suggestion
     */
    omit?: SuggestionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuggestionInclude<ExtArgs> | null;
    where?: SuggestionWhereInput;
    orderBy?:
      | SuggestionOrderByWithRelationInput
      | SuggestionOrderByWithRelationInput[];
    cursor?: SuggestionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: SuggestionScalarFieldEnum | SuggestionScalarFieldEnum[];
  };

  /**
   * Document without action
   */
  export type DocumentDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null;
  };

  /**
   * Model Suggestion
   */

  export type AggregateSuggestion = {
    _count: SuggestionCountAggregateOutputType | null;
    _min: SuggestionMinAggregateOutputType | null;
    _max: SuggestionMaxAggregateOutputType | null;
  };

  export type SuggestionMinAggregateOutputType = {
    id: string | null;
    documentId: string | null;
    documentCreatedAt: Date | null;
    originalText: string | null;
    suggestedText: string | null;
    description: string | null;
    isResolved: boolean | null;
    userId: string | null;
    createdAt: Date | null;
  };

  export type SuggestionMaxAggregateOutputType = {
    id: string | null;
    documentId: string | null;
    documentCreatedAt: Date | null;
    originalText: string | null;
    suggestedText: string | null;
    description: string | null;
    isResolved: boolean | null;
    userId: string | null;
    createdAt: Date | null;
  };

  export type SuggestionCountAggregateOutputType = {
    id: number;
    documentId: number;
    documentCreatedAt: number;
    originalText: number;
    suggestedText: number;
    description: number;
    isResolved: number;
    userId: number;
    createdAt: number;
    _all: number;
  };

  export type SuggestionMinAggregateInputType = {
    id?: true;
    documentId?: true;
    documentCreatedAt?: true;
    originalText?: true;
    suggestedText?: true;
    description?: true;
    isResolved?: true;
    userId?: true;
    createdAt?: true;
  };

  export type SuggestionMaxAggregateInputType = {
    id?: true;
    documentId?: true;
    documentCreatedAt?: true;
    originalText?: true;
    suggestedText?: true;
    description?: true;
    isResolved?: true;
    userId?: true;
    createdAt?: true;
  };

  export type SuggestionCountAggregateInputType = {
    id?: true;
    documentId?: true;
    documentCreatedAt?: true;
    originalText?: true;
    suggestedText?: true;
    description?: true;
    isResolved?: true;
    userId?: true;
    createdAt?: true;
    _all?: true;
  };

  export type SuggestionAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Suggestion to aggregate.
     */
    where?: SuggestionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Suggestions to fetch.
     */
    orderBy?:
      | SuggestionOrderByWithRelationInput
      | SuggestionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: SuggestionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Suggestions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Suggestions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Suggestions
     **/
    _count?: true | SuggestionCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: SuggestionMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: SuggestionMaxAggregateInputType;
  };

  export type GetSuggestionAggregateType<T extends SuggestionAggregateArgs> = {
    [P in keyof T & keyof AggregateSuggestion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSuggestion[P]>
      : GetScalarType<T[P], AggregateSuggestion[P]>;
  };

  export type SuggestionGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: SuggestionWhereInput;
    orderBy?:
      | SuggestionOrderByWithAggregationInput
      | SuggestionOrderByWithAggregationInput[];
    by: SuggestionScalarFieldEnum[] | SuggestionScalarFieldEnum;
    having?: SuggestionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SuggestionCountAggregateInputType | true;
    _min?: SuggestionMinAggregateInputType;
    _max?: SuggestionMaxAggregateInputType;
  };

  export type SuggestionGroupByOutputType = {
    id: string;
    documentId: string;
    documentCreatedAt: Date;
    originalText: string;
    suggestedText: string;
    description: string | null;
    isResolved: boolean;
    userId: string;
    createdAt: Date;
    _count: SuggestionCountAggregateOutputType | null;
    _min: SuggestionMinAggregateOutputType | null;
    _max: SuggestionMaxAggregateOutputType | null;
  };

  type GetSuggestionGroupByPayload<T extends SuggestionGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<SuggestionGroupByOutputType, T['by']> & {
          [P in keyof T & keyof SuggestionGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SuggestionGroupByOutputType[P]>
            : GetScalarType<T[P], SuggestionGroupByOutputType[P]>;
        }
      >
    >;

  export type SuggestionSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      documentId?: boolean;
      documentCreatedAt?: boolean;
      originalText?: boolean;
      suggestedText?: boolean;
      description?: boolean;
      isResolved?: boolean;
      userId?: boolean;
      createdAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      document?: boolean | DocumentDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['suggestion']
  >;

  export type SuggestionSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      documentId?: boolean;
      documentCreatedAt?: boolean;
      originalText?: boolean;
      suggestedText?: boolean;
      description?: boolean;
      isResolved?: boolean;
      userId?: boolean;
      createdAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      document?: boolean | DocumentDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['suggestion']
  >;

  export type SuggestionSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      documentId?: boolean;
      documentCreatedAt?: boolean;
      originalText?: boolean;
      suggestedText?: boolean;
      description?: boolean;
      isResolved?: boolean;
      userId?: boolean;
      createdAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      document?: boolean | DocumentDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['suggestion']
  >;

  export type SuggestionSelectScalar = {
    id?: boolean;
    documentId?: boolean;
    documentCreatedAt?: boolean;
    originalText?: boolean;
    suggestedText?: boolean;
    description?: boolean;
    isResolved?: boolean;
    userId?: boolean;
    createdAt?: boolean;
  };

  export type SuggestionOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | 'id'
    | 'documentId'
    | 'documentCreatedAt'
    | 'originalText'
    | 'suggestedText'
    | 'description'
    | 'isResolved'
    | 'userId'
    | 'createdAt',
    ExtArgs['result']['suggestion']
  >;
  export type SuggestionInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    document?: boolean | DocumentDefaultArgs<ExtArgs>;
  };
  export type SuggestionIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    document?: boolean | DocumentDefaultArgs<ExtArgs>;
  };
  export type SuggestionIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    document?: boolean | DocumentDefaultArgs<ExtArgs>;
  };

  export type $SuggestionPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'Suggestion';
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
      document: Prisma.$DocumentPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        documentId: string;
        documentCreatedAt: Date;
        originalText: string;
        suggestedText: string;
        description: string | null;
        isResolved: boolean;
        userId: string;
        createdAt: Date;
      },
      ExtArgs['result']['suggestion']
    >;
    composites: {};
  };

  type SuggestionGetPayload<
    S extends boolean | null | undefined | SuggestionDefaultArgs,
  > = $Result.GetResult<Prisma.$SuggestionPayload, S>;

  type SuggestionCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    SuggestionFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: SuggestionCountAggregateInputType | true;
  };

  export interface SuggestionDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Suggestion'];
      meta: { name: 'Suggestion' };
    };
    /**
     * Find zero or one Suggestion that matches the filter.
     * @param {SuggestionFindUniqueArgs} args - Arguments to find a Suggestion
     * @example
     * // Get one Suggestion
     * const suggestion = await prisma.suggestion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SuggestionFindUniqueArgs>(
      args: SelectSubset<T, SuggestionFindUniqueArgs<ExtArgs>>
    ): Prisma__SuggestionClient<
      $Result.GetResult<
        Prisma.$SuggestionPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Suggestion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SuggestionFindUniqueOrThrowArgs} args - Arguments to find a Suggestion
     * @example
     * // Get one Suggestion
     * const suggestion = await prisma.suggestion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SuggestionFindUniqueOrThrowArgs>(
      args: SelectSubset<T, SuggestionFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__SuggestionClient<
      $Result.GetResult<
        Prisma.$SuggestionPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Suggestion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuggestionFindFirstArgs} args - Arguments to find a Suggestion
     * @example
     * // Get one Suggestion
     * const suggestion = await prisma.suggestion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SuggestionFindFirstArgs>(
      args?: SelectSubset<T, SuggestionFindFirstArgs<ExtArgs>>
    ): Prisma__SuggestionClient<
      $Result.GetResult<
        Prisma.$SuggestionPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Suggestion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuggestionFindFirstOrThrowArgs} args - Arguments to find a Suggestion
     * @example
     * // Get one Suggestion
     * const suggestion = await prisma.suggestion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SuggestionFindFirstOrThrowArgs>(
      args?: SelectSubset<T, SuggestionFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__SuggestionClient<
      $Result.GetResult<
        Prisma.$SuggestionPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Suggestions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuggestionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Suggestions
     * const suggestions = await prisma.suggestion.findMany()
     *
     * // Get first 10 Suggestions
     * const suggestions = await prisma.suggestion.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const suggestionWithIdOnly = await prisma.suggestion.findMany({ select: { id: true } })
     *
     */
    findMany<T extends SuggestionFindManyArgs>(
      args?: SelectSubset<T, SuggestionFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$SuggestionPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Suggestion.
     * @param {SuggestionCreateArgs} args - Arguments to create a Suggestion.
     * @example
     * // Create one Suggestion
     * const Suggestion = await prisma.suggestion.create({
     *   data: {
     *     // ... data to create a Suggestion
     *   }
     * })
     *
     */
    create<T extends SuggestionCreateArgs>(
      args: SelectSubset<T, SuggestionCreateArgs<ExtArgs>>
    ): Prisma__SuggestionClient<
      $Result.GetResult<
        Prisma.$SuggestionPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Suggestions.
     * @param {SuggestionCreateManyArgs} args - Arguments to create many Suggestions.
     * @example
     * // Create many Suggestions
     * const suggestion = await prisma.suggestion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends SuggestionCreateManyArgs>(
      args?: SelectSubset<T, SuggestionCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Suggestions and returns the data saved in the database.
     * @param {SuggestionCreateManyAndReturnArgs} args - Arguments to create many Suggestions.
     * @example
     * // Create many Suggestions
     * const suggestion = await prisma.suggestion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Suggestions and only return the `id`
     * const suggestionWithIdOnly = await prisma.suggestion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends SuggestionCreateManyAndReturnArgs>(
      args?: SelectSubset<T, SuggestionCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$SuggestionPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Suggestion.
     * @param {SuggestionDeleteArgs} args - Arguments to delete one Suggestion.
     * @example
     * // Delete one Suggestion
     * const Suggestion = await prisma.suggestion.delete({
     *   where: {
     *     // ... filter to delete one Suggestion
     *   }
     * })
     *
     */
    delete<T extends SuggestionDeleteArgs>(
      args: SelectSubset<T, SuggestionDeleteArgs<ExtArgs>>
    ): Prisma__SuggestionClient<
      $Result.GetResult<
        Prisma.$SuggestionPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Suggestion.
     * @param {SuggestionUpdateArgs} args - Arguments to update one Suggestion.
     * @example
     * // Update one Suggestion
     * const suggestion = await prisma.suggestion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends SuggestionUpdateArgs>(
      args: SelectSubset<T, SuggestionUpdateArgs<ExtArgs>>
    ): Prisma__SuggestionClient<
      $Result.GetResult<
        Prisma.$SuggestionPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Suggestions.
     * @param {SuggestionDeleteManyArgs} args - Arguments to filter Suggestions to delete.
     * @example
     * // Delete a few Suggestions
     * const { count } = await prisma.suggestion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends SuggestionDeleteManyArgs>(
      args?: SelectSubset<T, SuggestionDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Suggestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuggestionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Suggestions
     * const suggestion = await prisma.suggestion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends SuggestionUpdateManyArgs>(
      args: SelectSubset<T, SuggestionUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Suggestions and returns the data updated in the database.
     * @param {SuggestionUpdateManyAndReturnArgs} args - Arguments to update many Suggestions.
     * @example
     * // Update many Suggestions
     * const suggestion = await prisma.suggestion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Suggestions and only return the `id`
     * const suggestionWithIdOnly = await prisma.suggestion.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends SuggestionUpdateManyAndReturnArgs>(
      args: SelectSubset<T, SuggestionUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$SuggestionPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Suggestion.
     * @param {SuggestionUpsertArgs} args - Arguments to update or create a Suggestion.
     * @example
     * // Update or create a Suggestion
     * const suggestion = await prisma.suggestion.upsert({
     *   create: {
     *     // ... data to create a Suggestion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Suggestion we want to update
     *   }
     * })
     */
    upsert<T extends SuggestionUpsertArgs>(
      args: SelectSubset<T, SuggestionUpsertArgs<ExtArgs>>
    ): Prisma__SuggestionClient<
      $Result.GetResult<
        Prisma.$SuggestionPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Suggestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuggestionCountArgs} args - Arguments to filter Suggestions to count.
     * @example
     * // Count the number of Suggestions
     * const count = await prisma.suggestion.count({
     *   where: {
     *     // ... the filter for the Suggestions we want to count
     *   }
     * })
     **/
    count<T extends SuggestionCountArgs>(
      args?: Subset<T, SuggestionCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SuggestionCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Suggestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuggestionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends SuggestionAggregateArgs>(
      args: Subset<T, SuggestionAggregateArgs>
    ): Prisma.PrismaPromise<GetSuggestionAggregateType<T>>;

    /**
     * Group by Suggestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuggestionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends SuggestionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SuggestionGroupByArgs['orderBy'] }
        : { orderBy?: SuggestionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, SuggestionGroupByArgs, OrderByArg> &
        InputErrors
    ): {} extends InputErrors
      ? GetSuggestionGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Suggestion model
     */
    readonly fields: SuggestionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Suggestion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SuggestionClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    document<T extends DocumentDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, DocumentDefaultArgs<ExtArgs>>
    ): Prisma__DocumentClient<
      | $Result.GetResult<
          Prisma.$DocumentPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Suggestion model
   */
  interface SuggestionFieldRefs {
    readonly id: FieldRef<'Suggestion', 'String'>;
    readonly documentId: FieldRef<'Suggestion', 'String'>;
    readonly documentCreatedAt: FieldRef<'Suggestion', 'DateTime'>;
    readonly originalText: FieldRef<'Suggestion', 'String'>;
    readonly suggestedText: FieldRef<'Suggestion', 'String'>;
    readonly description: FieldRef<'Suggestion', 'String'>;
    readonly isResolved: FieldRef<'Suggestion', 'Boolean'>;
    readonly userId: FieldRef<'Suggestion', 'String'>;
    readonly createdAt: FieldRef<'Suggestion', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Suggestion findUnique
   */
  export type SuggestionFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Suggestion
     */
    omit?: SuggestionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuggestionInclude<ExtArgs> | null;
    /**
     * Filter, which Suggestion to fetch.
     */
    where: SuggestionWhereUniqueInput;
  };

  /**
   * Suggestion findUniqueOrThrow
   */
  export type SuggestionFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Suggestion
     */
    omit?: SuggestionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuggestionInclude<ExtArgs> | null;
    /**
     * Filter, which Suggestion to fetch.
     */
    where: SuggestionWhereUniqueInput;
  };

  /**
   * Suggestion findFirst
   */
  export type SuggestionFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Suggestion
     */
    omit?: SuggestionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuggestionInclude<ExtArgs> | null;
    /**
     * Filter, which Suggestion to fetch.
     */
    where?: SuggestionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Suggestions to fetch.
     */
    orderBy?:
      | SuggestionOrderByWithRelationInput
      | SuggestionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Suggestions.
     */
    cursor?: SuggestionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Suggestions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Suggestions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Suggestions.
     */
    distinct?: SuggestionScalarFieldEnum | SuggestionScalarFieldEnum[];
  };

  /**
   * Suggestion findFirstOrThrow
   */
  export type SuggestionFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Suggestion
     */
    omit?: SuggestionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuggestionInclude<ExtArgs> | null;
    /**
     * Filter, which Suggestion to fetch.
     */
    where?: SuggestionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Suggestions to fetch.
     */
    orderBy?:
      | SuggestionOrderByWithRelationInput
      | SuggestionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Suggestions.
     */
    cursor?: SuggestionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Suggestions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Suggestions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Suggestions.
     */
    distinct?: SuggestionScalarFieldEnum | SuggestionScalarFieldEnum[];
  };

  /**
   * Suggestion findMany
   */
  export type SuggestionFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Suggestion
     */
    omit?: SuggestionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuggestionInclude<ExtArgs> | null;
    /**
     * Filter, which Suggestions to fetch.
     */
    where?: SuggestionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Suggestions to fetch.
     */
    orderBy?:
      | SuggestionOrderByWithRelationInput
      | SuggestionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Suggestions.
     */
    cursor?: SuggestionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Suggestions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Suggestions.
     */
    skip?: number;
    distinct?: SuggestionScalarFieldEnum | SuggestionScalarFieldEnum[];
  };

  /**
   * Suggestion create
   */
  export type SuggestionCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Suggestion
     */
    omit?: SuggestionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuggestionInclude<ExtArgs> | null;
    /**
     * The data needed to create a Suggestion.
     */
    data: XOR<SuggestionCreateInput, SuggestionUncheckedCreateInput>;
  };

  /**
   * Suggestion createMany
   */
  export type SuggestionCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Suggestions.
     */
    data: SuggestionCreateManyInput | SuggestionCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Suggestion createManyAndReturn
   */
  export type SuggestionCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Suggestion
     */
    omit?: SuggestionOmit<ExtArgs> | null;
    /**
     * The data used to create many Suggestions.
     */
    data: SuggestionCreateManyInput | SuggestionCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuggestionIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Suggestion update
   */
  export type SuggestionUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Suggestion
     */
    omit?: SuggestionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuggestionInclude<ExtArgs> | null;
    /**
     * The data needed to update a Suggestion.
     */
    data: XOR<SuggestionUpdateInput, SuggestionUncheckedUpdateInput>;
    /**
     * Choose, which Suggestion to update.
     */
    where: SuggestionWhereUniqueInput;
  };

  /**
   * Suggestion updateMany
   */
  export type SuggestionUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Suggestions.
     */
    data: XOR<
      SuggestionUpdateManyMutationInput,
      SuggestionUncheckedUpdateManyInput
    >;
    /**
     * Filter which Suggestions to update
     */
    where?: SuggestionWhereInput;
    /**
     * Limit how many Suggestions to update.
     */
    limit?: number;
  };

  /**
   * Suggestion updateManyAndReturn
   */
  export type SuggestionUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Suggestion
     */
    omit?: SuggestionOmit<ExtArgs> | null;
    /**
     * The data used to update Suggestions.
     */
    data: XOR<
      SuggestionUpdateManyMutationInput,
      SuggestionUncheckedUpdateManyInput
    >;
    /**
     * Filter which Suggestions to update
     */
    where?: SuggestionWhereInput;
    /**
     * Limit how many Suggestions to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuggestionIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Suggestion upsert
   */
  export type SuggestionUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Suggestion
     */
    omit?: SuggestionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuggestionInclude<ExtArgs> | null;
    /**
     * The filter to search for the Suggestion to update in case it exists.
     */
    where: SuggestionWhereUniqueInput;
    /**
     * In case the Suggestion found by the `where` argument doesn't exist, create a new Suggestion with this data.
     */
    create: XOR<SuggestionCreateInput, SuggestionUncheckedCreateInput>;
    /**
     * In case the Suggestion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SuggestionUpdateInput, SuggestionUncheckedUpdateInput>;
  };

  /**
   * Suggestion delete
   */
  export type SuggestionDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Suggestion
     */
    omit?: SuggestionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuggestionInclude<ExtArgs> | null;
    /**
     * Filter which Suggestion to delete.
     */
    where: SuggestionWhereUniqueInput;
  };

  /**
   * Suggestion deleteMany
   */
  export type SuggestionDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Suggestions to delete
     */
    where?: SuggestionWhereInput;
    /**
     * Limit how many Suggestions to delete.
     */
    limit?: number;
  };

  /**
   * Suggestion without action
   */
  export type SuggestionDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Suggestion
     */
    omit?: SuggestionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuggestionInclude<ExtArgs> | null;
  };

  /**
   * Model Stream
   */

  export type AggregateStream = {
    _count: StreamCountAggregateOutputType | null;
    _min: StreamMinAggregateOutputType | null;
    _max: StreamMaxAggregateOutputType | null;
  };

  export type StreamMinAggregateOutputType = {
    id: string | null;
    chatId: string | null;
    createdAt: Date | null;
  };

  export type StreamMaxAggregateOutputType = {
    id: string | null;
    chatId: string | null;
    createdAt: Date | null;
  };

  export type StreamCountAggregateOutputType = {
    id: number;
    chatId: number;
    createdAt: number;
    _all: number;
  };

  export type StreamMinAggregateInputType = {
    id?: true;
    chatId?: true;
    createdAt?: true;
  };

  export type StreamMaxAggregateInputType = {
    id?: true;
    chatId?: true;
    createdAt?: true;
  };

  export type StreamCountAggregateInputType = {
    id?: true;
    chatId?: true;
    createdAt?: true;
    _all?: true;
  };

  export type StreamAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Stream to aggregate.
     */
    where?: StreamWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Streams to fetch.
     */
    orderBy?: StreamOrderByWithRelationInput | StreamOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: StreamWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Streams from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Streams.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Streams
     **/
    _count?: true | StreamCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: StreamMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: StreamMaxAggregateInputType;
  };

  export type GetStreamAggregateType<T extends StreamAggregateArgs> = {
    [P in keyof T & keyof AggregateStream]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStream[P]>
      : GetScalarType<T[P], AggregateStream[P]>;
  };

  export type StreamGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: StreamWhereInput;
    orderBy?:
      | StreamOrderByWithAggregationInput
      | StreamOrderByWithAggregationInput[];
    by: StreamScalarFieldEnum[] | StreamScalarFieldEnum;
    having?: StreamScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: StreamCountAggregateInputType | true;
    _min?: StreamMinAggregateInputType;
    _max?: StreamMaxAggregateInputType;
  };

  export type StreamGroupByOutputType = {
    id: string;
    chatId: string;
    createdAt: Date;
    _count: StreamCountAggregateOutputType | null;
    _min: StreamMinAggregateOutputType | null;
    _max: StreamMaxAggregateOutputType | null;
  };

  type GetStreamGroupByPayload<T extends StreamGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<StreamGroupByOutputType, T['by']> & {
          [P in keyof T & keyof StreamGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StreamGroupByOutputType[P]>
            : GetScalarType<T[P], StreamGroupByOutputType[P]>;
        }
      >
    >;

  export type StreamSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      chatId?: boolean;
      createdAt?: boolean;
      chat?: boolean | ChatDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['stream']
  >;

  export type StreamSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      chatId?: boolean;
      createdAt?: boolean;
      chat?: boolean | ChatDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['stream']
  >;

  export type StreamSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      chatId?: boolean;
      createdAt?: boolean;
      chat?: boolean | ChatDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['stream']
  >;

  export type StreamSelectScalar = {
    id?: boolean;
    chatId?: boolean;
    createdAt?: boolean;
  };

  export type StreamOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    'id' | 'chatId' | 'createdAt',
    ExtArgs['result']['stream']
  >;
  export type StreamInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    chat?: boolean | ChatDefaultArgs<ExtArgs>;
  };
  export type StreamIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    chat?: boolean | ChatDefaultArgs<ExtArgs>;
  };
  export type StreamIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    chat?: boolean | ChatDefaultArgs<ExtArgs>;
  };

  export type $StreamPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'Stream';
    objects: {
      chat: Prisma.$ChatPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        chatId: string;
        createdAt: Date;
      },
      ExtArgs['result']['stream']
    >;
    composites: {};
  };

  type StreamGetPayload<
    S extends boolean | null | undefined | StreamDefaultArgs,
  > = $Result.GetResult<Prisma.$StreamPayload, S>;

  type StreamCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<StreamFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: StreamCountAggregateInputType | true;
  };

  export interface StreamDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Stream'];
      meta: { name: 'Stream' };
    };
    /**
     * Find zero or one Stream that matches the filter.
     * @param {StreamFindUniqueArgs} args - Arguments to find a Stream
     * @example
     * // Get one Stream
     * const stream = await prisma.stream.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StreamFindUniqueArgs>(
      args: SelectSubset<T, StreamFindUniqueArgs<ExtArgs>>
    ): Prisma__StreamClient<
      $Result.GetResult<
        Prisma.$StreamPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Stream that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StreamFindUniqueOrThrowArgs} args - Arguments to find a Stream
     * @example
     * // Get one Stream
     * const stream = await prisma.stream.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StreamFindUniqueOrThrowArgs>(
      args: SelectSubset<T, StreamFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__StreamClient<
      $Result.GetResult<
        Prisma.$StreamPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Stream that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamFindFirstArgs} args - Arguments to find a Stream
     * @example
     * // Get one Stream
     * const stream = await prisma.stream.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StreamFindFirstArgs>(
      args?: SelectSubset<T, StreamFindFirstArgs<ExtArgs>>
    ): Prisma__StreamClient<
      $Result.GetResult<
        Prisma.$StreamPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Stream that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamFindFirstOrThrowArgs} args - Arguments to find a Stream
     * @example
     * // Get one Stream
     * const stream = await prisma.stream.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StreamFindFirstOrThrowArgs>(
      args?: SelectSubset<T, StreamFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__StreamClient<
      $Result.GetResult<
        Prisma.$StreamPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Streams that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Streams
     * const streams = await prisma.stream.findMany()
     *
     * // Get first 10 Streams
     * const streams = await prisma.stream.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const streamWithIdOnly = await prisma.stream.findMany({ select: { id: true } })
     *
     */
    findMany<T extends StreamFindManyArgs>(
      args?: SelectSubset<T, StreamFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$StreamPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Stream.
     * @param {StreamCreateArgs} args - Arguments to create a Stream.
     * @example
     * // Create one Stream
     * const Stream = await prisma.stream.create({
     *   data: {
     *     // ... data to create a Stream
     *   }
     * })
     *
     */
    create<T extends StreamCreateArgs>(
      args: SelectSubset<T, StreamCreateArgs<ExtArgs>>
    ): Prisma__StreamClient<
      $Result.GetResult<
        Prisma.$StreamPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Streams.
     * @param {StreamCreateManyArgs} args - Arguments to create many Streams.
     * @example
     * // Create many Streams
     * const stream = await prisma.stream.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends StreamCreateManyArgs>(
      args?: SelectSubset<T, StreamCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Streams and returns the data saved in the database.
     * @param {StreamCreateManyAndReturnArgs} args - Arguments to create many Streams.
     * @example
     * // Create many Streams
     * const stream = await prisma.stream.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Streams and only return the `id`
     * const streamWithIdOnly = await prisma.stream.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends StreamCreateManyAndReturnArgs>(
      args?: SelectSubset<T, StreamCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$StreamPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Stream.
     * @param {StreamDeleteArgs} args - Arguments to delete one Stream.
     * @example
     * // Delete one Stream
     * const Stream = await prisma.stream.delete({
     *   where: {
     *     // ... filter to delete one Stream
     *   }
     * })
     *
     */
    delete<T extends StreamDeleteArgs>(
      args: SelectSubset<T, StreamDeleteArgs<ExtArgs>>
    ): Prisma__StreamClient<
      $Result.GetResult<
        Prisma.$StreamPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Stream.
     * @param {StreamUpdateArgs} args - Arguments to update one Stream.
     * @example
     * // Update one Stream
     * const stream = await prisma.stream.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends StreamUpdateArgs>(
      args: SelectSubset<T, StreamUpdateArgs<ExtArgs>>
    ): Prisma__StreamClient<
      $Result.GetResult<
        Prisma.$StreamPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Streams.
     * @param {StreamDeleteManyArgs} args - Arguments to filter Streams to delete.
     * @example
     * // Delete a few Streams
     * const { count } = await prisma.stream.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends StreamDeleteManyArgs>(
      args?: SelectSubset<T, StreamDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Streams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Streams
     * const stream = await prisma.stream.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends StreamUpdateManyArgs>(
      args: SelectSubset<T, StreamUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Streams and returns the data updated in the database.
     * @param {StreamUpdateManyAndReturnArgs} args - Arguments to update many Streams.
     * @example
     * // Update many Streams
     * const stream = await prisma.stream.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Streams and only return the `id`
     * const streamWithIdOnly = await prisma.stream.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends StreamUpdateManyAndReturnArgs>(
      args: SelectSubset<T, StreamUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$StreamPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Stream.
     * @param {StreamUpsertArgs} args - Arguments to update or create a Stream.
     * @example
     * // Update or create a Stream
     * const stream = await prisma.stream.upsert({
     *   create: {
     *     // ... data to create a Stream
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Stream we want to update
     *   }
     * })
     */
    upsert<T extends StreamUpsertArgs>(
      args: SelectSubset<T, StreamUpsertArgs<ExtArgs>>
    ): Prisma__StreamClient<
      $Result.GetResult<
        Prisma.$StreamPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Streams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamCountArgs} args - Arguments to filter Streams to count.
     * @example
     * // Count the number of Streams
     * const count = await prisma.stream.count({
     *   where: {
     *     // ... the filter for the Streams we want to count
     *   }
     * })
     **/
    count<T extends StreamCountArgs>(
      args?: Subset<T, StreamCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StreamCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Stream.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends StreamAggregateArgs>(
      args: Subset<T, StreamAggregateArgs>
    ): Prisma.PrismaPromise<GetStreamAggregateType<T>>;

    /**
     * Group by Stream.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends StreamGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StreamGroupByArgs['orderBy'] }
        : { orderBy?: StreamGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, StreamGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetStreamGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Stream model
     */
    readonly fields: StreamFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Stream.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StreamClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    chat<T extends ChatDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, ChatDefaultArgs<ExtArgs>>
    ): Prisma__ChatClient<
      | $Result.GetResult<
          Prisma.$ChatPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Stream model
   */
  interface StreamFieldRefs {
    readonly id: FieldRef<'Stream', 'String'>;
    readonly chatId: FieldRef<'Stream', 'String'>;
    readonly createdAt: FieldRef<'Stream', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Stream findUnique
   */
  export type StreamFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null;
    /**
     * Filter, which Stream to fetch.
     */
    where: StreamWhereUniqueInput;
  };

  /**
   * Stream findUniqueOrThrow
   */
  export type StreamFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null;
    /**
     * Filter, which Stream to fetch.
     */
    where: StreamWhereUniqueInput;
  };

  /**
   * Stream findFirst
   */
  export type StreamFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null;
    /**
     * Filter, which Stream to fetch.
     */
    where?: StreamWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Streams to fetch.
     */
    orderBy?: StreamOrderByWithRelationInput | StreamOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Streams.
     */
    cursor?: StreamWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Streams from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Streams.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Streams.
     */
    distinct?: StreamScalarFieldEnum | StreamScalarFieldEnum[];
  };

  /**
   * Stream findFirstOrThrow
   */
  export type StreamFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null;
    /**
     * Filter, which Stream to fetch.
     */
    where?: StreamWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Streams to fetch.
     */
    orderBy?: StreamOrderByWithRelationInput | StreamOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Streams.
     */
    cursor?: StreamWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Streams from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Streams.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Streams.
     */
    distinct?: StreamScalarFieldEnum | StreamScalarFieldEnum[];
  };

  /**
   * Stream findMany
   */
  export type StreamFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null;
    /**
     * Filter, which Streams to fetch.
     */
    where?: StreamWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Streams to fetch.
     */
    orderBy?: StreamOrderByWithRelationInput | StreamOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Streams.
     */
    cursor?: StreamWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Streams from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Streams.
     */
    skip?: number;
    distinct?: StreamScalarFieldEnum | StreamScalarFieldEnum[];
  };

  /**
   * Stream create
   */
  export type StreamCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null;
    /**
     * The data needed to create a Stream.
     */
    data: XOR<StreamCreateInput, StreamUncheckedCreateInput>;
  };

  /**
   * Stream createMany
   */
  export type StreamCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Streams.
     */
    data: StreamCreateManyInput | StreamCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Stream createManyAndReturn
   */
  export type StreamCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null;
    /**
     * The data used to create many Streams.
     */
    data: StreamCreateManyInput | StreamCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Stream update
   */
  export type StreamUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null;
    /**
     * The data needed to update a Stream.
     */
    data: XOR<StreamUpdateInput, StreamUncheckedUpdateInput>;
    /**
     * Choose, which Stream to update.
     */
    where: StreamWhereUniqueInput;
  };

  /**
   * Stream updateMany
   */
  export type StreamUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Streams.
     */
    data: XOR<StreamUpdateManyMutationInput, StreamUncheckedUpdateManyInput>;
    /**
     * Filter which Streams to update
     */
    where?: StreamWhereInput;
    /**
     * Limit how many Streams to update.
     */
    limit?: number;
  };

  /**
   * Stream updateManyAndReturn
   */
  export type StreamUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null;
    /**
     * The data used to update Streams.
     */
    data: XOR<StreamUpdateManyMutationInput, StreamUncheckedUpdateManyInput>;
    /**
     * Filter which Streams to update
     */
    where?: StreamWhereInput;
    /**
     * Limit how many Streams to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Stream upsert
   */
  export type StreamUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null;
    /**
     * The filter to search for the Stream to update in case it exists.
     */
    where: StreamWhereUniqueInput;
    /**
     * In case the Stream found by the `where` argument doesn't exist, create a new Stream with this data.
     */
    create: XOR<StreamCreateInput, StreamUncheckedCreateInput>;
    /**
     * In case the Stream was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StreamUpdateInput, StreamUncheckedUpdateInput>;
  };

  /**
   * Stream delete
   */
  export type StreamDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null;
    /**
     * Filter which Stream to delete.
     */
    where: StreamWhereUniqueInput;
  };

  /**
   * Stream deleteMany
   */
  export type StreamDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Streams to delete
     */
    where?: StreamWhereInput;
    /**
     * Limit how many Streams to delete.
     */
    limit?: number;
  };

  /**
   * Stream without action
   */
  export type StreamDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null;
  };

  /**
   * Model ArchiveEntry
   */

  export type AggregateArchiveEntry = {
    _count: ArchiveEntryCountAggregateOutputType | null;
    _min: ArchiveEntryMinAggregateOutputType | null;
    _max: ArchiveEntryMaxAggregateOutputType | null;
  };

  export type ArchiveEntryMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    slug: string | null;
    entity: string | null;
    body: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ArchiveEntryMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    slug: string | null;
    entity: string | null;
    body: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ArchiveEntryCountAggregateOutputType = {
    id: number;
    userId: number;
    slug: number;
    entity: number;
    tags: number;
    body: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type ArchiveEntryMinAggregateInputType = {
    id?: true;
    userId?: true;
    slug?: true;
    entity?: true;
    body?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ArchiveEntryMaxAggregateInputType = {
    id?: true;
    userId?: true;
    slug?: true;
    entity?: true;
    body?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ArchiveEntryCountAggregateInputType = {
    id?: true;
    userId?: true;
    slug?: true;
    entity?: true;
    tags?: true;
    body?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type ArchiveEntryAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which ArchiveEntry to aggregate.
     */
    where?: ArchiveEntryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ArchiveEntries to fetch.
     */
    orderBy?:
      | ArchiveEntryOrderByWithRelationInput
      | ArchiveEntryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ArchiveEntryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ArchiveEntries from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ArchiveEntries.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ArchiveEntries
     **/
    _count?: true | ArchiveEntryCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ArchiveEntryMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ArchiveEntryMaxAggregateInputType;
  };

  export type GetArchiveEntryAggregateType<
    T extends ArchiveEntryAggregateArgs,
  > = {
    [P in keyof T & keyof AggregateArchiveEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArchiveEntry[P]>
      : GetScalarType<T[P], AggregateArchiveEntry[P]>;
  };

  export type ArchiveEntryGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ArchiveEntryWhereInput;
    orderBy?:
      | ArchiveEntryOrderByWithAggregationInput
      | ArchiveEntryOrderByWithAggregationInput[];
    by: ArchiveEntryScalarFieldEnum[] | ArchiveEntryScalarFieldEnum;
    having?: ArchiveEntryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ArchiveEntryCountAggregateInputType | true;
    _min?: ArchiveEntryMinAggregateInputType;
    _max?: ArchiveEntryMaxAggregateInputType;
  };

  export type ArchiveEntryGroupByOutputType = {
    id: string;
    userId: string;
    slug: string;
    entity: string;
    tags: string[];
    body: string;
    createdAt: Date;
    updatedAt: Date;
    _count: ArchiveEntryCountAggregateOutputType | null;
    _min: ArchiveEntryMinAggregateOutputType | null;
    _max: ArchiveEntryMaxAggregateOutputType | null;
  };

  type GetArchiveEntryGroupByPayload<T extends ArchiveEntryGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<ArchiveEntryGroupByOutputType, T['by']> & {
          [P in keyof T &
            keyof ArchiveEntryGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArchiveEntryGroupByOutputType[P]>
            : GetScalarType<T[P], ArchiveEntryGroupByOutputType[P]>;
        }
      >
    >;

  export type ArchiveEntrySelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      slug?: boolean;
      entity?: boolean;
      tags?: boolean;
      body?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      outgoingLinks?: boolean | ArchiveEntry$outgoingLinksArgs<ExtArgs>;
      incomingLinks?: boolean | ArchiveEntry$incomingLinksArgs<ExtArgs>;
      pinnedInChats?: boolean | ArchiveEntry$pinnedInChatsArgs<ExtArgs>;
      _count?: boolean | ArchiveEntryCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['archiveEntry']
  >;

  export type ArchiveEntrySelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      slug?: boolean;
      entity?: boolean;
      tags?: boolean;
      body?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['archiveEntry']
  >;

  export type ArchiveEntrySelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      slug?: boolean;
      entity?: boolean;
      tags?: boolean;
      body?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['archiveEntry']
  >;

  export type ArchiveEntrySelectScalar = {
    id?: boolean;
    userId?: boolean;
    slug?: boolean;
    entity?: boolean;
    tags?: boolean;
    body?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type ArchiveEntryOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | 'id'
    | 'userId'
    | 'slug'
    | 'entity'
    | 'tags'
    | 'body'
    | 'createdAt'
    | 'updatedAt',
    ExtArgs['result']['archiveEntry']
  >;
  export type ArchiveEntryInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    outgoingLinks?: boolean | ArchiveEntry$outgoingLinksArgs<ExtArgs>;
    incomingLinks?: boolean | ArchiveEntry$incomingLinksArgs<ExtArgs>;
    pinnedInChats?: boolean | ArchiveEntry$pinnedInChatsArgs<ExtArgs>;
    _count?: boolean | ArchiveEntryCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type ArchiveEntryIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type ArchiveEntryIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $ArchiveEntryPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'ArchiveEntry';
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
      outgoingLinks: Prisma.$ArchiveLinkPayload<ExtArgs>[];
      incomingLinks: Prisma.$ArchiveLinkPayload<ExtArgs>[];
      pinnedInChats: Prisma.$ChatPinnedArchiveEntryPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        userId: string;
        slug: string;
        entity: string;
        tags: string[];
        body: string;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['archiveEntry']
    >;
    composites: {};
  };

  type ArchiveEntryGetPayload<
    S extends boolean | null | undefined | ArchiveEntryDefaultArgs,
  > = $Result.GetResult<Prisma.$ArchiveEntryPayload, S>;

  type ArchiveEntryCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    ArchiveEntryFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: ArchiveEntryCountAggregateInputType | true;
  };

  export interface ArchiveEntryDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['ArchiveEntry'];
      meta: { name: 'ArchiveEntry' };
    };
    /**
     * Find zero or one ArchiveEntry that matches the filter.
     * @param {ArchiveEntryFindUniqueArgs} args - Arguments to find a ArchiveEntry
     * @example
     * // Get one ArchiveEntry
     * const archiveEntry = await prisma.archiveEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArchiveEntryFindUniqueArgs>(
      args: SelectSubset<T, ArchiveEntryFindUniqueArgs<ExtArgs>>
    ): Prisma__ArchiveEntryClient<
      $Result.GetResult<
        Prisma.$ArchiveEntryPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one ArchiveEntry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ArchiveEntryFindUniqueOrThrowArgs} args - Arguments to find a ArchiveEntry
     * @example
     * // Get one ArchiveEntry
     * const archiveEntry = await prisma.archiveEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArchiveEntryFindUniqueOrThrowArgs>(
      args: SelectSubset<T, ArchiveEntryFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ArchiveEntryClient<
      $Result.GetResult<
        Prisma.$ArchiveEntryPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first ArchiveEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArchiveEntryFindFirstArgs} args - Arguments to find a ArchiveEntry
     * @example
     * // Get one ArchiveEntry
     * const archiveEntry = await prisma.archiveEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArchiveEntryFindFirstArgs>(
      args?: SelectSubset<T, ArchiveEntryFindFirstArgs<ExtArgs>>
    ): Prisma__ArchiveEntryClient<
      $Result.GetResult<
        Prisma.$ArchiveEntryPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first ArchiveEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArchiveEntryFindFirstOrThrowArgs} args - Arguments to find a ArchiveEntry
     * @example
     * // Get one ArchiveEntry
     * const archiveEntry = await prisma.archiveEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArchiveEntryFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ArchiveEntryFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ArchiveEntryClient<
      $Result.GetResult<
        Prisma.$ArchiveEntryPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more ArchiveEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArchiveEntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ArchiveEntries
     * const archiveEntries = await prisma.archiveEntry.findMany()
     *
     * // Get first 10 ArchiveEntries
     * const archiveEntries = await prisma.archiveEntry.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const archiveEntryWithIdOnly = await prisma.archiveEntry.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ArchiveEntryFindManyArgs>(
      args?: SelectSubset<T, ArchiveEntryFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ArchiveEntryPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a ArchiveEntry.
     * @param {ArchiveEntryCreateArgs} args - Arguments to create a ArchiveEntry.
     * @example
     * // Create one ArchiveEntry
     * const ArchiveEntry = await prisma.archiveEntry.create({
     *   data: {
     *     // ... data to create a ArchiveEntry
     *   }
     * })
     *
     */
    create<T extends ArchiveEntryCreateArgs>(
      args: SelectSubset<T, ArchiveEntryCreateArgs<ExtArgs>>
    ): Prisma__ArchiveEntryClient<
      $Result.GetResult<
        Prisma.$ArchiveEntryPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many ArchiveEntries.
     * @param {ArchiveEntryCreateManyArgs} args - Arguments to create many ArchiveEntries.
     * @example
     * // Create many ArchiveEntries
     * const archiveEntry = await prisma.archiveEntry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ArchiveEntryCreateManyArgs>(
      args?: SelectSubset<T, ArchiveEntryCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many ArchiveEntries and returns the data saved in the database.
     * @param {ArchiveEntryCreateManyAndReturnArgs} args - Arguments to create many ArchiveEntries.
     * @example
     * // Create many ArchiveEntries
     * const archiveEntry = await prisma.archiveEntry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ArchiveEntries and only return the `id`
     * const archiveEntryWithIdOnly = await prisma.archiveEntry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ArchiveEntryCreateManyAndReturnArgs>(
      args?: SelectSubset<T, ArchiveEntryCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ArchiveEntryPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a ArchiveEntry.
     * @param {ArchiveEntryDeleteArgs} args - Arguments to delete one ArchiveEntry.
     * @example
     * // Delete one ArchiveEntry
     * const ArchiveEntry = await prisma.archiveEntry.delete({
     *   where: {
     *     // ... filter to delete one ArchiveEntry
     *   }
     * })
     *
     */
    delete<T extends ArchiveEntryDeleteArgs>(
      args: SelectSubset<T, ArchiveEntryDeleteArgs<ExtArgs>>
    ): Prisma__ArchiveEntryClient<
      $Result.GetResult<
        Prisma.$ArchiveEntryPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one ArchiveEntry.
     * @param {ArchiveEntryUpdateArgs} args - Arguments to update one ArchiveEntry.
     * @example
     * // Update one ArchiveEntry
     * const archiveEntry = await prisma.archiveEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ArchiveEntryUpdateArgs>(
      args: SelectSubset<T, ArchiveEntryUpdateArgs<ExtArgs>>
    ): Prisma__ArchiveEntryClient<
      $Result.GetResult<
        Prisma.$ArchiveEntryPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more ArchiveEntries.
     * @param {ArchiveEntryDeleteManyArgs} args - Arguments to filter ArchiveEntries to delete.
     * @example
     * // Delete a few ArchiveEntries
     * const { count } = await prisma.archiveEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ArchiveEntryDeleteManyArgs>(
      args?: SelectSubset<T, ArchiveEntryDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more ArchiveEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArchiveEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ArchiveEntries
     * const archiveEntry = await prisma.archiveEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ArchiveEntryUpdateManyArgs>(
      args: SelectSubset<T, ArchiveEntryUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more ArchiveEntries and returns the data updated in the database.
     * @param {ArchiveEntryUpdateManyAndReturnArgs} args - Arguments to update many ArchiveEntries.
     * @example
     * // Update many ArchiveEntries
     * const archiveEntry = await prisma.archiveEntry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more ArchiveEntries and only return the `id`
     * const archiveEntryWithIdOnly = await prisma.archiveEntry.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends ArchiveEntryUpdateManyAndReturnArgs>(
      args: SelectSubset<T, ArchiveEntryUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ArchiveEntryPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one ArchiveEntry.
     * @param {ArchiveEntryUpsertArgs} args - Arguments to update or create a ArchiveEntry.
     * @example
     * // Update or create a ArchiveEntry
     * const archiveEntry = await prisma.archiveEntry.upsert({
     *   create: {
     *     // ... data to create a ArchiveEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ArchiveEntry we want to update
     *   }
     * })
     */
    upsert<T extends ArchiveEntryUpsertArgs>(
      args: SelectSubset<T, ArchiveEntryUpsertArgs<ExtArgs>>
    ): Prisma__ArchiveEntryClient<
      $Result.GetResult<
        Prisma.$ArchiveEntryPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of ArchiveEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArchiveEntryCountArgs} args - Arguments to filter ArchiveEntries to count.
     * @example
     * // Count the number of ArchiveEntries
     * const count = await prisma.archiveEntry.count({
     *   where: {
     *     // ... the filter for the ArchiveEntries we want to count
     *   }
     * })
     **/
    count<T extends ArchiveEntryCountArgs>(
      args?: Subset<T, ArchiveEntryCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArchiveEntryCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a ArchiveEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArchiveEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ArchiveEntryAggregateArgs>(
      args: Subset<T, ArchiveEntryAggregateArgs>
    ): Prisma.PrismaPromise<GetArchiveEntryAggregateType<T>>;

    /**
     * Group by ArchiveEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArchiveEntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ArchiveEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArchiveEntryGroupByArgs['orderBy'] }
        : { orderBy?: ArchiveEntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, ArchiveEntryGroupByArgs, OrderByArg> &
        InputErrors
    ): {} extends InputErrors
      ? GetArchiveEntryGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ArchiveEntry model
     */
    readonly fields: ArchiveEntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ArchiveEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArchiveEntryClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    outgoingLinks<T extends ArchiveEntry$outgoingLinksArgs<ExtArgs> = {}>(
      args?: Subset<T, ArchiveEntry$outgoingLinksArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$ArchiveLinkPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    incomingLinks<T extends ArchiveEntry$incomingLinksArgs<ExtArgs> = {}>(
      args?: Subset<T, ArchiveEntry$incomingLinksArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$ArchiveLinkPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    pinnedInChats<T extends ArchiveEntry$pinnedInChatsArgs<ExtArgs> = {}>(
      args?: Subset<T, ArchiveEntry$pinnedInChatsArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$ChatPinnedArchiveEntryPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the ArchiveEntry model
   */
  interface ArchiveEntryFieldRefs {
    readonly id: FieldRef<'ArchiveEntry', 'String'>;
    readonly userId: FieldRef<'ArchiveEntry', 'String'>;
    readonly slug: FieldRef<'ArchiveEntry', 'String'>;
    readonly entity: FieldRef<'ArchiveEntry', 'String'>;
    readonly tags: FieldRef<'ArchiveEntry', 'String[]'>;
    readonly body: FieldRef<'ArchiveEntry', 'String'>;
    readonly createdAt: FieldRef<'ArchiveEntry', 'DateTime'>;
    readonly updatedAt: FieldRef<'ArchiveEntry', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * ArchiveEntry findUnique
   */
  export type ArchiveEntryFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ArchiveEntry
     */
    select?: ArchiveEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ArchiveEntry
     */
    omit?: ArchiveEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArchiveEntryInclude<ExtArgs> | null;
    /**
     * Filter, which ArchiveEntry to fetch.
     */
    where: ArchiveEntryWhereUniqueInput;
  };

  /**
   * ArchiveEntry findUniqueOrThrow
   */
  export type ArchiveEntryFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ArchiveEntry
     */
    select?: ArchiveEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ArchiveEntry
     */
    omit?: ArchiveEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArchiveEntryInclude<ExtArgs> | null;
    /**
     * Filter, which ArchiveEntry to fetch.
     */
    where: ArchiveEntryWhereUniqueInput;
  };

  /**
   * ArchiveEntry findFirst
   */
  export type ArchiveEntryFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ArchiveEntry
     */
    select?: ArchiveEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ArchiveEntry
     */
    omit?: ArchiveEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArchiveEntryInclude<ExtArgs> | null;
    /**
     * Filter, which ArchiveEntry to fetch.
     */
    where?: ArchiveEntryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ArchiveEntries to fetch.
     */
    orderBy?:
      | ArchiveEntryOrderByWithRelationInput
      | ArchiveEntryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ArchiveEntries.
     */
    cursor?: ArchiveEntryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ArchiveEntries from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ArchiveEntries.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ArchiveEntries.
     */
    distinct?: ArchiveEntryScalarFieldEnum | ArchiveEntryScalarFieldEnum[];
  };

  /**
   * ArchiveEntry findFirstOrThrow
   */
  export type ArchiveEntryFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ArchiveEntry
     */
    select?: ArchiveEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ArchiveEntry
     */
    omit?: ArchiveEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArchiveEntryInclude<ExtArgs> | null;
    /**
     * Filter, which ArchiveEntry to fetch.
     */
    where?: ArchiveEntryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ArchiveEntries to fetch.
     */
    orderBy?:
      | ArchiveEntryOrderByWithRelationInput
      | ArchiveEntryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ArchiveEntries.
     */
    cursor?: ArchiveEntryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ArchiveEntries from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ArchiveEntries.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ArchiveEntries.
     */
    distinct?: ArchiveEntryScalarFieldEnum | ArchiveEntryScalarFieldEnum[];
  };

  /**
   * ArchiveEntry findMany
   */
  export type ArchiveEntryFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ArchiveEntry
     */
    select?: ArchiveEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ArchiveEntry
     */
    omit?: ArchiveEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArchiveEntryInclude<ExtArgs> | null;
    /**
     * Filter, which ArchiveEntries to fetch.
     */
    where?: ArchiveEntryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ArchiveEntries to fetch.
     */
    orderBy?:
      | ArchiveEntryOrderByWithRelationInput
      | ArchiveEntryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ArchiveEntries.
     */
    cursor?: ArchiveEntryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ArchiveEntries from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ArchiveEntries.
     */
    skip?: number;
    distinct?: ArchiveEntryScalarFieldEnum | ArchiveEntryScalarFieldEnum[];
  };

  /**
   * ArchiveEntry create
   */
  export type ArchiveEntryCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ArchiveEntry
     */
    select?: ArchiveEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ArchiveEntry
     */
    omit?: ArchiveEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArchiveEntryInclude<ExtArgs> | null;
    /**
     * The data needed to create a ArchiveEntry.
     */
    data: XOR<ArchiveEntryCreateInput, ArchiveEntryUncheckedCreateInput>;
  };

  /**
   * ArchiveEntry createMany
   */
  export type ArchiveEntryCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many ArchiveEntries.
     */
    data: ArchiveEntryCreateManyInput | ArchiveEntryCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * ArchiveEntry createManyAndReturn
   */
  export type ArchiveEntryCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ArchiveEntry
     */
    select?: ArchiveEntrySelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ArchiveEntry
     */
    omit?: ArchiveEntryOmit<ExtArgs> | null;
    /**
     * The data used to create many ArchiveEntries.
     */
    data: ArchiveEntryCreateManyInput | ArchiveEntryCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArchiveEntryIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * ArchiveEntry update
   */
  export type ArchiveEntryUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ArchiveEntry
     */
    select?: ArchiveEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ArchiveEntry
     */
    omit?: ArchiveEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArchiveEntryInclude<ExtArgs> | null;
    /**
     * The data needed to update a ArchiveEntry.
     */
    data: XOR<ArchiveEntryUpdateInput, ArchiveEntryUncheckedUpdateInput>;
    /**
     * Choose, which ArchiveEntry to update.
     */
    where: ArchiveEntryWhereUniqueInput;
  };

  /**
   * ArchiveEntry updateMany
   */
  export type ArchiveEntryUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update ArchiveEntries.
     */
    data: XOR<
      ArchiveEntryUpdateManyMutationInput,
      ArchiveEntryUncheckedUpdateManyInput
    >;
    /**
     * Filter which ArchiveEntries to update
     */
    where?: ArchiveEntryWhereInput;
    /**
     * Limit how many ArchiveEntries to update.
     */
    limit?: number;
  };

  /**
   * ArchiveEntry updateManyAndReturn
   */
  export type ArchiveEntryUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ArchiveEntry
     */
    select?: ArchiveEntrySelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ArchiveEntry
     */
    omit?: ArchiveEntryOmit<ExtArgs> | null;
    /**
     * The data used to update ArchiveEntries.
     */
    data: XOR<
      ArchiveEntryUpdateManyMutationInput,
      ArchiveEntryUncheckedUpdateManyInput
    >;
    /**
     * Filter which ArchiveEntries to update
     */
    where?: ArchiveEntryWhereInput;
    /**
     * Limit how many ArchiveEntries to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArchiveEntryIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * ArchiveEntry upsert
   */
  export type ArchiveEntryUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ArchiveEntry
     */
    select?: ArchiveEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ArchiveEntry
     */
    omit?: ArchiveEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArchiveEntryInclude<ExtArgs> | null;
    /**
     * The filter to search for the ArchiveEntry to update in case it exists.
     */
    where: ArchiveEntryWhereUniqueInput;
    /**
     * In case the ArchiveEntry found by the `where` argument doesn't exist, create a new ArchiveEntry with this data.
     */
    create: XOR<ArchiveEntryCreateInput, ArchiveEntryUncheckedCreateInput>;
    /**
     * In case the ArchiveEntry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArchiveEntryUpdateInput, ArchiveEntryUncheckedUpdateInput>;
  };

  /**
   * ArchiveEntry delete
   */
  export type ArchiveEntryDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ArchiveEntry
     */
    select?: ArchiveEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ArchiveEntry
     */
    omit?: ArchiveEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArchiveEntryInclude<ExtArgs> | null;
    /**
     * Filter which ArchiveEntry to delete.
     */
    where: ArchiveEntryWhereUniqueInput;
  };

  /**
   * ArchiveEntry deleteMany
   */
  export type ArchiveEntryDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which ArchiveEntries to delete
     */
    where?: ArchiveEntryWhereInput;
    /**
     * Limit how many ArchiveEntries to delete.
     */
    limit?: number;
  };

  /**
   * ArchiveEntry.outgoingLinks
   */
  export type ArchiveEntry$outgoingLinksArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ArchiveLink
     */
    select?: ArchiveLinkSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ArchiveLink
     */
    omit?: ArchiveLinkOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArchiveLinkInclude<ExtArgs> | null;
    where?: ArchiveLinkWhereInput;
    orderBy?:
      | ArchiveLinkOrderByWithRelationInput
      | ArchiveLinkOrderByWithRelationInput[];
    cursor?: ArchiveLinkWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ArchiveLinkScalarFieldEnum | ArchiveLinkScalarFieldEnum[];
  };

  /**
   * ArchiveEntry.incomingLinks
   */
  export type ArchiveEntry$incomingLinksArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ArchiveLink
     */
    select?: ArchiveLinkSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ArchiveLink
     */
    omit?: ArchiveLinkOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArchiveLinkInclude<ExtArgs> | null;
    where?: ArchiveLinkWhereInput;
    orderBy?:
      | ArchiveLinkOrderByWithRelationInput
      | ArchiveLinkOrderByWithRelationInput[];
    cursor?: ArchiveLinkWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: ArchiveLinkScalarFieldEnum | ArchiveLinkScalarFieldEnum[];
  };

  /**
   * ArchiveEntry.pinnedInChats
   */
  export type ArchiveEntry$pinnedInChatsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChatPinnedArchiveEntry
     */
    select?: ChatPinnedArchiveEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ChatPinnedArchiveEntry
     */
    omit?: ChatPinnedArchiveEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatPinnedArchiveEntryInclude<ExtArgs> | null;
    where?: ChatPinnedArchiveEntryWhereInput;
    orderBy?:
      | ChatPinnedArchiveEntryOrderByWithRelationInput
      | ChatPinnedArchiveEntryOrderByWithRelationInput[];
    cursor?: ChatPinnedArchiveEntryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?:
      | ChatPinnedArchiveEntryScalarFieldEnum
      | ChatPinnedArchiveEntryScalarFieldEnum[];
  };

  /**
   * ArchiveEntry without action
   */
  export type ArchiveEntryDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ArchiveEntry
     */
    select?: ArchiveEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ArchiveEntry
     */
    omit?: ArchiveEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArchiveEntryInclude<ExtArgs> | null;
  };

  /**
   * Model ChatPinnedArchiveEntry
   */

  export type AggregateChatPinnedArchiveEntry = {
    _count: ChatPinnedArchiveEntryCountAggregateOutputType | null;
    _min: ChatPinnedArchiveEntryMinAggregateOutputType | null;
    _max: ChatPinnedArchiveEntryMaxAggregateOutputType | null;
  };

  export type ChatPinnedArchiveEntryMinAggregateOutputType = {
    id: string | null;
    chatId: string | null;
    archiveEntryId: string | null;
    userId: string | null;
    pinnedAt: Date | null;
  };

  export type ChatPinnedArchiveEntryMaxAggregateOutputType = {
    id: string | null;
    chatId: string | null;
    archiveEntryId: string | null;
    userId: string | null;
    pinnedAt: Date | null;
  };

  export type ChatPinnedArchiveEntryCountAggregateOutputType = {
    id: number;
    chatId: number;
    archiveEntryId: number;
    userId: number;
    pinnedAt: number;
    _all: number;
  };

  export type ChatPinnedArchiveEntryMinAggregateInputType = {
    id?: true;
    chatId?: true;
    archiveEntryId?: true;
    userId?: true;
    pinnedAt?: true;
  };

  export type ChatPinnedArchiveEntryMaxAggregateInputType = {
    id?: true;
    chatId?: true;
    archiveEntryId?: true;
    userId?: true;
    pinnedAt?: true;
  };

  export type ChatPinnedArchiveEntryCountAggregateInputType = {
    id?: true;
    chatId?: true;
    archiveEntryId?: true;
    userId?: true;
    pinnedAt?: true;
    _all?: true;
  };

  export type ChatPinnedArchiveEntryAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which ChatPinnedArchiveEntry to aggregate.
     */
    where?: ChatPinnedArchiveEntryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ChatPinnedArchiveEntries to fetch.
     */
    orderBy?:
      | ChatPinnedArchiveEntryOrderByWithRelationInput
      | ChatPinnedArchiveEntryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ChatPinnedArchiveEntryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ChatPinnedArchiveEntries from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ChatPinnedArchiveEntries.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ChatPinnedArchiveEntries
     **/
    _count?: true | ChatPinnedArchiveEntryCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ChatPinnedArchiveEntryMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ChatPinnedArchiveEntryMaxAggregateInputType;
  };

  export type GetChatPinnedArchiveEntryAggregateType<
    T extends ChatPinnedArchiveEntryAggregateArgs,
  > = {
    [P in keyof T & keyof AggregateChatPinnedArchiveEntry]: P extends
      | '_count'
      | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChatPinnedArchiveEntry[P]>
      : GetScalarType<T[P], AggregateChatPinnedArchiveEntry[P]>;
  };

  export type ChatPinnedArchiveEntryGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ChatPinnedArchiveEntryWhereInput;
    orderBy?:
      | ChatPinnedArchiveEntryOrderByWithAggregationInput
      | ChatPinnedArchiveEntryOrderByWithAggregationInput[];
    by:
      | ChatPinnedArchiveEntryScalarFieldEnum[]
      | ChatPinnedArchiveEntryScalarFieldEnum;
    having?: ChatPinnedArchiveEntryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ChatPinnedArchiveEntryCountAggregateInputType | true;
    _min?: ChatPinnedArchiveEntryMinAggregateInputType;
    _max?: ChatPinnedArchiveEntryMaxAggregateInputType;
  };

  export type ChatPinnedArchiveEntryGroupByOutputType = {
    id: string;
    chatId: string;
    archiveEntryId: string;
    userId: string;
    pinnedAt: Date;
    _count: ChatPinnedArchiveEntryCountAggregateOutputType | null;
    _min: ChatPinnedArchiveEntryMinAggregateOutputType | null;
    _max: ChatPinnedArchiveEntryMaxAggregateOutputType | null;
  };

  type GetChatPinnedArchiveEntryGroupByPayload<
    T extends ChatPinnedArchiveEntryGroupByArgs,
  > = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatPinnedArchiveEntryGroupByOutputType, T['by']> & {
        [P in keyof T &
          keyof ChatPinnedArchiveEntryGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], ChatPinnedArchiveEntryGroupByOutputType[P]>
          : GetScalarType<T[P], ChatPinnedArchiveEntryGroupByOutputType[P]>;
      }
    >
  >;

  export type ChatPinnedArchiveEntrySelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      chatId?: boolean;
      archiveEntryId?: boolean;
      userId?: boolean;
      pinnedAt?: boolean;
      chat?: boolean | ChatDefaultArgs<ExtArgs>;
      archiveEntry?: boolean | ArchiveEntryDefaultArgs<ExtArgs>;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['chatPinnedArchiveEntry']
  >;

  export type ChatPinnedArchiveEntrySelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      chatId?: boolean;
      archiveEntryId?: boolean;
      userId?: boolean;
      pinnedAt?: boolean;
      chat?: boolean | ChatDefaultArgs<ExtArgs>;
      archiveEntry?: boolean | ArchiveEntryDefaultArgs<ExtArgs>;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['chatPinnedArchiveEntry']
  >;

  export type ChatPinnedArchiveEntrySelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      chatId?: boolean;
      archiveEntryId?: boolean;
      userId?: boolean;
      pinnedAt?: boolean;
      chat?: boolean | ChatDefaultArgs<ExtArgs>;
      archiveEntry?: boolean | ArchiveEntryDefaultArgs<ExtArgs>;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['chatPinnedArchiveEntry']
  >;

  export type ChatPinnedArchiveEntrySelectScalar = {
    id?: boolean;
    chatId?: boolean;
    archiveEntryId?: boolean;
    userId?: boolean;
    pinnedAt?: boolean;
  };

  export type ChatPinnedArchiveEntryOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    'id' | 'chatId' | 'archiveEntryId' | 'userId' | 'pinnedAt',
    ExtArgs['result']['chatPinnedArchiveEntry']
  >;
  export type ChatPinnedArchiveEntryInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    chat?: boolean | ChatDefaultArgs<ExtArgs>;
    archiveEntry?: boolean | ArchiveEntryDefaultArgs<ExtArgs>;
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type ChatPinnedArchiveEntryIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    chat?: boolean | ChatDefaultArgs<ExtArgs>;
    archiveEntry?: boolean | ArchiveEntryDefaultArgs<ExtArgs>;
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type ChatPinnedArchiveEntryIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    chat?: boolean | ChatDefaultArgs<ExtArgs>;
    archiveEntry?: boolean | ArchiveEntryDefaultArgs<ExtArgs>;
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $ChatPinnedArchiveEntryPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'ChatPinnedArchiveEntry';
    objects: {
      chat: Prisma.$ChatPayload<ExtArgs>;
      archiveEntry: Prisma.$ArchiveEntryPayload<ExtArgs>;
      user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        chatId: string;
        archiveEntryId: string;
        userId: string;
        pinnedAt: Date;
      },
      ExtArgs['result']['chatPinnedArchiveEntry']
    >;
    composites: {};
  };

  type ChatPinnedArchiveEntryGetPayload<
    S extends boolean | null | undefined | ChatPinnedArchiveEntryDefaultArgs,
  > = $Result.GetResult<Prisma.$ChatPinnedArchiveEntryPayload, S>;

  type ChatPinnedArchiveEntryCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    ChatPinnedArchiveEntryFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: ChatPinnedArchiveEntryCountAggregateInputType | true;
  };

  export interface ChatPinnedArchiveEntryDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['ChatPinnedArchiveEntry'];
      meta: { name: 'ChatPinnedArchiveEntry' };
    };
    /**
     * Find zero or one ChatPinnedArchiveEntry that matches the filter.
     * @param {ChatPinnedArchiveEntryFindUniqueArgs} args - Arguments to find a ChatPinnedArchiveEntry
     * @example
     * // Get one ChatPinnedArchiveEntry
     * const chatPinnedArchiveEntry = await prisma.chatPinnedArchiveEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChatPinnedArchiveEntryFindUniqueArgs>(
      args: SelectSubset<T, ChatPinnedArchiveEntryFindUniqueArgs<ExtArgs>>
    ): Prisma__ChatPinnedArchiveEntryClient<
      $Result.GetResult<
        Prisma.$ChatPinnedArchiveEntryPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one ChatPinnedArchiveEntry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChatPinnedArchiveEntryFindUniqueOrThrowArgs} args - Arguments to find a ChatPinnedArchiveEntry
     * @example
     * // Get one ChatPinnedArchiveEntry
     * const chatPinnedArchiveEntry = await prisma.chatPinnedArchiveEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChatPinnedArchiveEntryFindUniqueOrThrowArgs>(
      args: SelectSubset<
        T,
        ChatPinnedArchiveEntryFindUniqueOrThrowArgs<ExtArgs>
      >
    ): Prisma__ChatPinnedArchiveEntryClient<
      $Result.GetResult<
        Prisma.$ChatPinnedArchiveEntryPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first ChatPinnedArchiveEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatPinnedArchiveEntryFindFirstArgs} args - Arguments to find a ChatPinnedArchiveEntry
     * @example
     * // Get one ChatPinnedArchiveEntry
     * const chatPinnedArchiveEntry = await prisma.chatPinnedArchiveEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChatPinnedArchiveEntryFindFirstArgs>(
      args?: SelectSubset<T, ChatPinnedArchiveEntryFindFirstArgs<ExtArgs>>
    ): Prisma__ChatPinnedArchiveEntryClient<
      $Result.GetResult<
        Prisma.$ChatPinnedArchiveEntryPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first ChatPinnedArchiveEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatPinnedArchiveEntryFindFirstOrThrowArgs} args - Arguments to find a ChatPinnedArchiveEntry
     * @example
     * // Get one ChatPinnedArchiveEntry
     * const chatPinnedArchiveEntry = await prisma.chatPinnedArchiveEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChatPinnedArchiveEntryFindFirstOrThrowArgs>(
      args?: SelectSubset<
        T,
        ChatPinnedArchiveEntryFindFirstOrThrowArgs<ExtArgs>
      >
    ): Prisma__ChatPinnedArchiveEntryClient<
      $Result.GetResult<
        Prisma.$ChatPinnedArchiveEntryPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more ChatPinnedArchiveEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatPinnedArchiveEntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChatPinnedArchiveEntries
     * const chatPinnedArchiveEntries = await prisma.chatPinnedArchiveEntry.findMany()
     *
     * // Get first 10 ChatPinnedArchiveEntries
     * const chatPinnedArchiveEntries = await prisma.chatPinnedArchiveEntry.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const chatPinnedArchiveEntryWithIdOnly = await prisma.chatPinnedArchiveEntry.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ChatPinnedArchiveEntryFindManyArgs>(
      args?: SelectSubset<T, ChatPinnedArchiveEntryFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ChatPinnedArchiveEntryPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a ChatPinnedArchiveEntry.
     * @param {ChatPinnedArchiveEntryCreateArgs} args - Arguments to create a ChatPinnedArchiveEntry.
     * @example
     * // Create one ChatPinnedArchiveEntry
     * const ChatPinnedArchiveEntry = await prisma.chatPinnedArchiveEntry.create({
     *   data: {
     *     // ... data to create a ChatPinnedArchiveEntry
     *   }
     * })
     *
     */
    create<T extends ChatPinnedArchiveEntryCreateArgs>(
      args: SelectSubset<T, ChatPinnedArchiveEntryCreateArgs<ExtArgs>>
    ): Prisma__ChatPinnedArchiveEntryClient<
      $Result.GetResult<
        Prisma.$ChatPinnedArchiveEntryPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many ChatPinnedArchiveEntries.
     * @param {ChatPinnedArchiveEntryCreateManyArgs} args - Arguments to create many ChatPinnedArchiveEntries.
     * @example
     * // Create many ChatPinnedArchiveEntries
     * const chatPinnedArchiveEntry = await prisma.chatPinnedArchiveEntry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ChatPinnedArchiveEntryCreateManyArgs>(
      args?: SelectSubset<T, ChatPinnedArchiveEntryCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many ChatPinnedArchiveEntries and returns the data saved in the database.
     * @param {ChatPinnedArchiveEntryCreateManyAndReturnArgs} args - Arguments to create many ChatPinnedArchiveEntries.
     * @example
     * // Create many ChatPinnedArchiveEntries
     * const chatPinnedArchiveEntry = await prisma.chatPinnedArchiveEntry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ChatPinnedArchiveEntries and only return the `id`
     * const chatPinnedArchiveEntryWithIdOnly = await prisma.chatPinnedArchiveEntry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<
      T extends ChatPinnedArchiveEntryCreateManyAndReturnArgs,
    >(
      args?: SelectSubset<
        T,
        ChatPinnedArchiveEntryCreateManyAndReturnArgs<ExtArgs>
      >
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ChatPinnedArchiveEntryPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a ChatPinnedArchiveEntry.
     * @param {ChatPinnedArchiveEntryDeleteArgs} args - Arguments to delete one ChatPinnedArchiveEntry.
     * @example
     * // Delete one ChatPinnedArchiveEntry
     * const ChatPinnedArchiveEntry = await prisma.chatPinnedArchiveEntry.delete({
     *   where: {
     *     // ... filter to delete one ChatPinnedArchiveEntry
     *   }
     * })
     *
     */
    delete<T extends ChatPinnedArchiveEntryDeleteArgs>(
      args: SelectSubset<T, ChatPinnedArchiveEntryDeleteArgs<ExtArgs>>
    ): Prisma__ChatPinnedArchiveEntryClient<
      $Result.GetResult<
        Prisma.$ChatPinnedArchiveEntryPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one ChatPinnedArchiveEntry.
     * @param {ChatPinnedArchiveEntryUpdateArgs} args - Arguments to update one ChatPinnedArchiveEntry.
     * @example
     * // Update one ChatPinnedArchiveEntry
     * const chatPinnedArchiveEntry = await prisma.chatPinnedArchiveEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ChatPinnedArchiveEntryUpdateArgs>(
      args: SelectSubset<T, ChatPinnedArchiveEntryUpdateArgs<ExtArgs>>
    ): Prisma__ChatPinnedArchiveEntryClient<
      $Result.GetResult<
        Prisma.$ChatPinnedArchiveEntryPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more ChatPinnedArchiveEntries.
     * @param {ChatPinnedArchiveEntryDeleteManyArgs} args - Arguments to filter ChatPinnedArchiveEntries to delete.
     * @example
     * // Delete a few ChatPinnedArchiveEntries
     * const { count } = await prisma.chatPinnedArchiveEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ChatPinnedArchiveEntryDeleteManyArgs>(
      args?: SelectSubset<T, ChatPinnedArchiveEntryDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more ChatPinnedArchiveEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatPinnedArchiveEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChatPinnedArchiveEntries
     * const chatPinnedArchiveEntry = await prisma.chatPinnedArchiveEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ChatPinnedArchiveEntryUpdateManyArgs>(
      args: SelectSubset<T, ChatPinnedArchiveEntryUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more ChatPinnedArchiveEntries and returns the data updated in the database.
     * @param {ChatPinnedArchiveEntryUpdateManyAndReturnArgs} args - Arguments to update many ChatPinnedArchiveEntries.
     * @example
     * // Update many ChatPinnedArchiveEntries
     * const chatPinnedArchiveEntry = await prisma.chatPinnedArchiveEntry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more ChatPinnedArchiveEntries and only return the `id`
     * const chatPinnedArchiveEntryWithIdOnly = await prisma.chatPinnedArchiveEntry.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<
      T extends ChatPinnedArchiveEntryUpdateManyAndReturnArgs,
    >(
      args: SelectSubset<
        T,
        ChatPinnedArchiveEntryUpdateManyAndReturnArgs<ExtArgs>
      >
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ChatPinnedArchiveEntryPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one ChatPinnedArchiveEntry.
     * @param {ChatPinnedArchiveEntryUpsertArgs} args - Arguments to update or create a ChatPinnedArchiveEntry.
     * @example
     * // Update or create a ChatPinnedArchiveEntry
     * const chatPinnedArchiveEntry = await prisma.chatPinnedArchiveEntry.upsert({
     *   create: {
     *     // ... data to create a ChatPinnedArchiveEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChatPinnedArchiveEntry we want to update
     *   }
     * })
     */
    upsert<T extends ChatPinnedArchiveEntryUpsertArgs>(
      args: SelectSubset<T, ChatPinnedArchiveEntryUpsertArgs<ExtArgs>>
    ): Prisma__ChatPinnedArchiveEntryClient<
      $Result.GetResult<
        Prisma.$ChatPinnedArchiveEntryPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of ChatPinnedArchiveEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatPinnedArchiveEntryCountArgs} args - Arguments to filter ChatPinnedArchiveEntries to count.
     * @example
     * // Count the number of ChatPinnedArchiveEntries
     * const count = await prisma.chatPinnedArchiveEntry.count({
     *   where: {
     *     // ... the filter for the ChatPinnedArchiveEntries we want to count
     *   }
     * })
     **/
    count<T extends ChatPinnedArchiveEntryCountArgs>(
      args?: Subset<T, ChatPinnedArchiveEntryCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<
              T['select'],
              ChatPinnedArchiveEntryCountAggregateOutputType
            >
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a ChatPinnedArchiveEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatPinnedArchiveEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ChatPinnedArchiveEntryAggregateArgs>(
      args: Subset<T, ChatPinnedArchiveEntryAggregateArgs>
    ): Prisma.PrismaPromise<GetChatPinnedArchiveEntryAggregateType<T>>;

    /**
     * Group by ChatPinnedArchiveEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatPinnedArchiveEntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ChatPinnedArchiveEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChatPinnedArchiveEntryGroupByArgs['orderBy'] }
        : { orderBy?: ChatPinnedArchiveEntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<
        T,
        ChatPinnedArchiveEntryGroupByArgs,
        OrderByArg
      > &
        InputErrors
    ): {} extends InputErrors
      ? GetChatPinnedArchiveEntryGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ChatPinnedArchiveEntry model
     */
    readonly fields: ChatPinnedArchiveEntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChatPinnedArchiveEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChatPinnedArchiveEntryClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    chat<T extends ChatDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, ChatDefaultArgs<ExtArgs>>
    ): Prisma__ChatClient<
      | $Result.GetResult<
          Prisma.$ChatPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    archiveEntry<T extends ArchiveEntryDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, ArchiveEntryDefaultArgs<ExtArgs>>
    ): Prisma__ArchiveEntryClient<
      | $Result.GetResult<
          Prisma.$ArchiveEntryPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the ChatPinnedArchiveEntry model
   */
  interface ChatPinnedArchiveEntryFieldRefs {
    readonly id: FieldRef<'ChatPinnedArchiveEntry', 'String'>;
    readonly chatId: FieldRef<'ChatPinnedArchiveEntry', 'String'>;
    readonly archiveEntryId: FieldRef<'ChatPinnedArchiveEntry', 'String'>;
    readonly userId: FieldRef<'ChatPinnedArchiveEntry', 'String'>;
    readonly pinnedAt: FieldRef<'ChatPinnedArchiveEntry', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * ChatPinnedArchiveEntry findUnique
   */
  export type ChatPinnedArchiveEntryFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChatPinnedArchiveEntry
     */
    select?: ChatPinnedArchiveEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ChatPinnedArchiveEntry
     */
    omit?: ChatPinnedArchiveEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatPinnedArchiveEntryInclude<ExtArgs> | null;
    /**
     * Filter, which ChatPinnedArchiveEntry to fetch.
     */
    where: ChatPinnedArchiveEntryWhereUniqueInput;
  };

  /**
   * ChatPinnedArchiveEntry findUniqueOrThrow
   */
  export type ChatPinnedArchiveEntryFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChatPinnedArchiveEntry
     */
    select?: ChatPinnedArchiveEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ChatPinnedArchiveEntry
     */
    omit?: ChatPinnedArchiveEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatPinnedArchiveEntryInclude<ExtArgs> | null;
    /**
     * Filter, which ChatPinnedArchiveEntry to fetch.
     */
    where: ChatPinnedArchiveEntryWhereUniqueInput;
  };

  /**
   * ChatPinnedArchiveEntry findFirst
   */
  export type ChatPinnedArchiveEntryFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChatPinnedArchiveEntry
     */
    select?: ChatPinnedArchiveEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ChatPinnedArchiveEntry
     */
    omit?: ChatPinnedArchiveEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatPinnedArchiveEntryInclude<ExtArgs> | null;
    /**
     * Filter, which ChatPinnedArchiveEntry to fetch.
     */
    where?: ChatPinnedArchiveEntryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ChatPinnedArchiveEntries to fetch.
     */
    orderBy?:
      | ChatPinnedArchiveEntryOrderByWithRelationInput
      | ChatPinnedArchiveEntryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ChatPinnedArchiveEntries.
     */
    cursor?: ChatPinnedArchiveEntryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ChatPinnedArchiveEntries from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ChatPinnedArchiveEntries.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ChatPinnedArchiveEntries.
     */
    distinct?:
      | ChatPinnedArchiveEntryScalarFieldEnum
      | ChatPinnedArchiveEntryScalarFieldEnum[];
  };

  /**
   * ChatPinnedArchiveEntry findFirstOrThrow
   */
  export type ChatPinnedArchiveEntryFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChatPinnedArchiveEntry
     */
    select?: ChatPinnedArchiveEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ChatPinnedArchiveEntry
     */
    omit?: ChatPinnedArchiveEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatPinnedArchiveEntryInclude<ExtArgs> | null;
    /**
     * Filter, which ChatPinnedArchiveEntry to fetch.
     */
    where?: ChatPinnedArchiveEntryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ChatPinnedArchiveEntries to fetch.
     */
    orderBy?:
      | ChatPinnedArchiveEntryOrderByWithRelationInput
      | ChatPinnedArchiveEntryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ChatPinnedArchiveEntries.
     */
    cursor?: ChatPinnedArchiveEntryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ChatPinnedArchiveEntries from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ChatPinnedArchiveEntries.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ChatPinnedArchiveEntries.
     */
    distinct?:
      | ChatPinnedArchiveEntryScalarFieldEnum
      | ChatPinnedArchiveEntryScalarFieldEnum[];
  };

  /**
   * ChatPinnedArchiveEntry findMany
   */
  export type ChatPinnedArchiveEntryFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChatPinnedArchiveEntry
     */
    select?: ChatPinnedArchiveEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ChatPinnedArchiveEntry
     */
    omit?: ChatPinnedArchiveEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatPinnedArchiveEntryInclude<ExtArgs> | null;
    /**
     * Filter, which ChatPinnedArchiveEntries to fetch.
     */
    where?: ChatPinnedArchiveEntryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ChatPinnedArchiveEntries to fetch.
     */
    orderBy?:
      | ChatPinnedArchiveEntryOrderByWithRelationInput
      | ChatPinnedArchiveEntryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ChatPinnedArchiveEntries.
     */
    cursor?: ChatPinnedArchiveEntryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ChatPinnedArchiveEntries from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ChatPinnedArchiveEntries.
     */
    skip?: number;
    distinct?:
      | ChatPinnedArchiveEntryScalarFieldEnum
      | ChatPinnedArchiveEntryScalarFieldEnum[];
  };

  /**
   * ChatPinnedArchiveEntry create
   */
  export type ChatPinnedArchiveEntryCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChatPinnedArchiveEntry
     */
    select?: ChatPinnedArchiveEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ChatPinnedArchiveEntry
     */
    omit?: ChatPinnedArchiveEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatPinnedArchiveEntryInclude<ExtArgs> | null;
    /**
     * The data needed to create a ChatPinnedArchiveEntry.
     */
    data: XOR<
      ChatPinnedArchiveEntryCreateInput,
      ChatPinnedArchiveEntryUncheckedCreateInput
    >;
  };

  /**
   * ChatPinnedArchiveEntry createMany
   */
  export type ChatPinnedArchiveEntryCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many ChatPinnedArchiveEntries.
     */
    data:
      | ChatPinnedArchiveEntryCreateManyInput
      | ChatPinnedArchiveEntryCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * ChatPinnedArchiveEntry createManyAndReturn
   */
  export type ChatPinnedArchiveEntryCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChatPinnedArchiveEntry
     */
    select?: ChatPinnedArchiveEntrySelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ChatPinnedArchiveEntry
     */
    omit?: ChatPinnedArchiveEntryOmit<ExtArgs> | null;
    /**
     * The data used to create many ChatPinnedArchiveEntries.
     */
    data:
      | ChatPinnedArchiveEntryCreateManyInput
      | ChatPinnedArchiveEntryCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatPinnedArchiveEntryIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * ChatPinnedArchiveEntry update
   */
  export type ChatPinnedArchiveEntryUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChatPinnedArchiveEntry
     */
    select?: ChatPinnedArchiveEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ChatPinnedArchiveEntry
     */
    omit?: ChatPinnedArchiveEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatPinnedArchiveEntryInclude<ExtArgs> | null;
    /**
     * The data needed to update a ChatPinnedArchiveEntry.
     */
    data: XOR<
      ChatPinnedArchiveEntryUpdateInput,
      ChatPinnedArchiveEntryUncheckedUpdateInput
    >;
    /**
     * Choose, which ChatPinnedArchiveEntry to update.
     */
    where: ChatPinnedArchiveEntryWhereUniqueInput;
  };

  /**
   * ChatPinnedArchiveEntry updateMany
   */
  export type ChatPinnedArchiveEntryUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update ChatPinnedArchiveEntries.
     */
    data: XOR<
      ChatPinnedArchiveEntryUpdateManyMutationInput,
      ChatPinnedArchiveEntryUncheckedUpdateManyInput
    >;
    /**
     * Filter which ChatPinnedArchiveEntries to update
     */
    where?: ChatPinnedArchiveEntryWhereInput;
    /**
     * Limit how many ChatPinnedArchiveEntries to update.
     */
    limit?: number;
  };

  /**
   * ChatPinnedArchiveEntry updateManyAndReturn
   */
  export type ChatPinnedArchiveEntryUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChatPinnedArchiveEntry
     */
    select?: ChatPinnedArchiveEntrySelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ChatPinnedArchiveEntry
     */
    omit?: ChatPinnedArchiveEntryOmit<ExtArgs> | null;
    /**
     * The data used to update ChatPinnedArchiveEntries.
     */
    data: XOR<
      ChatPinnedArchiveEntryUpdateManyMutationInput,
      ChatPinnedArchiveEntryUncheckedUpdateManyInput
    >;
    /**
     * Filter which ChatPinnedArchiveEntries to update
     */
    where?: ChatPinnedArchiveEntryWhereInput;
    /**
     * Limit how many ChatPinnedArchiveEntries to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatPinnedArchiveEntryIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * ChatPinnedArchiveEntry upsert
   */
  export type ChatPinnedArchiveEntryUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChatPinnedArchiveEntry
     */
    select?: ChatPinnedArchiveEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ChatPinnedArchiveEntry
     */
    omit?: ChatPinnedArchiveEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatPinnedArchiveEntryInclude<ExtArgs> | null;
    /**
     * The filter to search for the ChatPinnedArchiveEntry to update in case it exists.
     */
    where: ChatPinnedArchiveEntryWhereUniqueInput;
    /**
     * In case the ChatPinnedArchiveEntry found by the `where` argument doesn't exist, create a new ChatPinnedArchiveEntry with this data.
     */
    create: XOR<
      ChatPinnedArchiveEntryCreateInput,
      ChatPinnedArchiveEntryUncheckedCreateInput
    >;
    /**
     * In case the ChatPinnedArchiveEntry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<
      ChatPinnedArchiveEntryUpdateInput,
      ChatPinnedArchiveEntryUncheckedUpdateInput
    >;
  };

  /**
   * ChatPinnedArchiveEntry delete
   */
  export type ChatPinnedArchiveEntryDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChatPinnedArchiveEntry
     */
    select?: ChatPinnedArchiveEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ChatPinnedArchiveEntry
     */
    omit?: ChatPinnedArchiveEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatPinnedArchiveEntryInclude<ExtArgs> | null;
    /**
     * Filter which ChatPinnedArchiveEntry to delete.
     */
    where: ChatPinnedArchiveEntryWhereUniqueInput;
  };

  /**
   * ChatPinnedArchiveEntry deleteMany
   */
  export type ChatPinnedArchiveEntryDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which ChatPinnedArchiveEntries to delete
     */
    where?: ChatPinnedArchiveEntryWhereInput;
    /**
     * Limit how many ChatPinnedArchiveEntries to delete.
     */
    limit?: number;
  };

  /**
   * ChatPinnedArchiveEntry without action
   */
  export type ChatPinnedArchiveEntryDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ChatPinnedArchiveEntry
     */
    select?: ChatPinnedArchiveEntrySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ChatPinnedArchiveEntry
     */
    omit?: ChatPinnedArchiveEntryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatPinnedArchiveEntryInclude<ExtArgs> | null;
  };

  /**
   * Model ArchiveLink
   */

  export type AggregateArchiveLink = {
    _count: ArchiveLinkCountAggregateOutputType | null;
    _min: ArchiveLinkMinAggregateOutputType | null;
    _max: ArchiveLinkMaxAggregateOutputType | null;
  };

  export type ArchiveLinkMinAggregateOutputType = {
    id: string | null;
    sourceId: string | null;
    targetId: string | null;
    type: string | null;
    bidirectional: boolean | null;
    createdAt: Date | null;
  };

  export type ArchiveLinkMaxAggregateOutputType = {
    id: string | null;
    sourceId: string | null;
    targetId: string | null;
    type: string | null;
    bidirectional: boolean | null;
    createdAt: Date | null;
  };

  export type ArchiveLinkCountAggregateOutputType = {
    id: number;
    sourceId: number;
    targetId: number;
    type: number;
    bidirectional: number;
    createdAt: number;
    _all: number;
  };

  export type ArchiveLinkMinAggregateInputType = {
    id?: true;
    sourceId?: true;
    targetId?: true;
    type?: true;
    bidirectional?: true;
    createdAt?: true;
  };

  export type ArchiveLinkMaxAggregateInputType = {
    id?: true;
    sourceId?: true;
    targetId?: true;
    type?: true;
    bidirectional?: true;
    createdAt?: true;
  };

  export type ArchiveLinkCountAggregateInputType = {
    id?: true;
    sourceId?: true;
    targetId?: true;
    type?: true;
    bidirectional?: true;
    createdAt?: true;
    _all?: true;
  };

  export type ArchiveLinkAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which ArchiveLink to aggregate.
     */
    where?: ArchiveLinkWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ArchiveLinks to fetch.
     */
    orderBy?:
      | ArchiveLinkOrderByWithRelationInput
      | ArchiveLinkOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ArchiveLinkWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ArchiveLinks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ArchiveLinks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ArchiveLinks
     **/
    _count?: true | ArchiveLinkCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ArchiveLinkMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ArchiveLinkMaxAggregateInputType;
  };

  export type GetArchiveLinkAggregateType<T extends ArchiveLinkAggregateArgs> =
    {
      [P in keyof T & keyof AggregateArchiveLink]: P extends '_count' | 'count'
        ? T[P] extends true
          ? number
          : GetScalarType<T[P], AggregateArchiveLink[P]>
        : GetScalarType<T[P], AggregateArchiveLink[P]>;
    };

  export type ArchiveLinkGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: ArchiveLinkWhereInput;
    orderBy?:
      | ArchiveLinkOrderByWithAggregationInput
      | ArchiveLinkOrderByWithAggregationInput[];
    by: ArchiveLinkScalarFieldEnum[] | ArchiveLinkScalarFieldEnum;
    having?: ArchiveLinkScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ArchiveLinkCountAggregateInputType | true;
    _min?: ArchiveLinkMinAggregateInputType;
    _max?: ArchiveLinkMaxAggregateInputType;
  };

  export type ArchiveLinkGroupByOutputType = {
    id: string;
    sourceId: string;
    targetId: string;
    type: string;
    bidirectional: boolean;
    createdAt: Date;
    _count: ArchiveLinkCountAggregateOutputType | null;
    _min: ArchiveLinkMinAggregateOutputType | null;
    _max: ArchiveLinkMaxAggregateOutputType | null;
  };

  type GetArchiveLinkGroupByPayload<T extends ArchiveLinkGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<ArchiveLinkGroupByOutputType, T['by']> & {
          [P in keyof T &
            keyof ArchiveLinkGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArchiveLinkGroupByOutputType[P]>
            : GetScalarType<T[P], ArchiveLinkGroupByOutputType[P]>;
        }
      >
    >;

  export type ArchiveLinkSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      sourceId?: boolean;
      targetId?: boolean;
      type?: boolean;
      bidirectional?: boolean;
      createdAt?: boolean;
      source?: boolean | ArchiveEntryDefaultArgs<ExtArgs>;
      target?: boolean | ArchiveEntryDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['archiveLink']
  >;

  export type ArchiveLinkSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      sourceId?: boolean;
      targetId?: boolean;
      type?: boolean;
      bidirectional?: boolean;
      createdAt?: boolean;
      source?: boolean | ArchiveEntryDefaultArgs<ExtArgs>;
      target?: boolean | ArchiveEntryDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['archiveLink']
  >;

  export type ArchiveLinkSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      sourceId?: boolean;
      targetId?: boolean;
      type?: boolean;
      bidirectional?: boolean;
      createdAt?: boolean;
      source?: boolean | ArchiveEntryDefaultArgs<ExtArgs>;
      target?: boolean | ArchiveEntryDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['archiveLink']
  >;

  export type ArchiveLinkSelectScalar = {
    id?: boolean;
    sourceId?: boolean;
    targetId?: boolean;
    type?: boolean;
    bidirectional?: boolean;
    createdAt?: boolean;
  };

  export type ArchiveLinkOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    'id' | 'sourceId' | 'targetId' | 'type' | 'bidirectional' | 'createdAt',
    ExtArgs['result']['archiveLink']
  >;
  export type ArchiveLinkInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    source?: boolean | ArchiveEntryDefaultArgs<ExtArgs>;
    target?: boolean | ArchiveEntryDefaultArgs<ExtArgs>;
  };
  export type ArchiveLinkIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    source?: boolean | ArchiveEntryDefaultArgs<ExtArgs>;
    target?: boolean | ArchiveEntryDefaultArgs<ExtArgs>;
  };
  export type ArchiveLinkIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    source?: boolean | ArchiveEntryDefaultArgs<ExtArgs>;
    target?: boolean | ArchiveEntryDefaultArgs<ExtArgs>;
  };

  export type $ArchiveLinkPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'ArchiveLink';
    objects: {
      source: Prisma.$ArchiveEntryPayload<ExtArgs>;
      target: Prisma.$ArchiveEntryPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        sourceId: string;
        targetId: string;
        type: string;
        bidirectional: boolean;
        createdAt: Date;
      },
      ExtArgs['result']['archiveLink']
    >;
    composites: {};
  };

  type ArchiveLinkGetPayload<
    S extends boolean | null | undefined | ArchiveLinkDefaultArgs,
  > = $Result.GetResult<Prisma.$ArchiveLinkPayload, S>;

  type ArchiveLinkCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    ArchiveLinkFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: ArchiveLinkCountAggregateInputType | true;
  };

  export interface ArchiveLinkDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['ArchiveLink'];
      meta: { name: 'ArchiveLink' };
    };
    /**
     * Find zero or one ArchiveLink that matches the filter.
     * @param {ArchiveLinkFindUniqueArgs} args - Arguments to find a ArchiveLink
     * @example
     * // Get one ArchiveLink
     * const archiveLink = await prisma.archiveLink.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArchiveLinkFindUniqueArgs>(
      args: SelectSubset<T, ArchiveLinkFindUniqueArgs<ExtArgs>>
    ): Prisma__ArchiveLinkClient<
      $Result.GetResult<
        Prisma.$ArchiveLinkPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one ArchiveLink that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ArchiveLinkFindUniqueOrThrowArgs} args - Arguments to find a ArchiveLink
     * @example
     * // Get one ArchiveLink
     * const archiveLink = await prisma.archiveLink.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArchiveLinkFindUniqueOrThrowArgs>(
      args: SelectSubset<T, ArchiveLinkFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ArchiveLinkClient<
      $Result.GetResult<
        Prisma.$ArchiveLinkPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first ArchiveLink that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArchiveLinkFindFirstArgs} args - Arguments to find a ArchiveLink
     * @example
     * // Get one ArchiveLink
     * const archiveLink = await prisma.archiveLink.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArchiveLinkFindFirstArgs>(
      args?: SelectSubset<T, ArchiveLinkFindFirstArgs<ExtArgs>>
    ): Prisma__ArchiveLinkClient<
      $Result.GetResult<
        Prisma.$ArchiveLinkPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first ArchiveLink that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArchiveLinkFindFirstOrThrowArgs} args - Arguments to find a ArchiveLink
     * @example
     * // Get one ArchiveLink
     * const archiveLink = await prisma.archiveLink.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArchiveLinkFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ArchiveLinkFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ArchiveLinkClient<
      $Result.GetResult<
        Prisma.$ArchiveLinkPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more ArchiveLinks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArchiveLinkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ArchiveLinks
     * const archiveLinks = await prisma.archiveLink.findMany()
     *
     * // Get first 10 ArchiveLinks
     * const archiveLinks = await prisma.archiveLink.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const archiveLinkWithIdOnly = await prisma.archiveLink.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ArchiveLinkFindManyArgs>(
      args?: SelectSubset<T, ArchiveLinkFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ArchiveLinkPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a ArchiveLink.
     * @param {ArchiveLinkCreateArgs} args - Arguments to create a ArchiveLink.
     * @example
     * // Create one ArchiveLink
     * const ArchiveLink = await prisma.archiveLink.create({
     *   data: {
     *     // ... data to create a ArchiveLink
     *   }
     * })
     *
     */
    create<T extends ArchiveLinkCreateArgs>(
      args: SelectSubset<T, ArchiveLinkCreateArgs<ExtArgs>>
    ): Prisma__ArchiveLinkClient<
      $Result.GetResult<
        Prisma.$ArchiveLinkPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many ArchiveLinks.
     * @param {ArchiveLinkCreateManyArgs} args - Arguments to create many ArchiveLinks.
     * @example
     * // Create many ArchiveLinks
     * const archiveLink = await prisma.archiveLink.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ArchiveLinkCreateManyArgs>(
      args?: SelectSubset<T, ArchiveLinkCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many ArchiveLinks and returns the data saved in the database.
     * @param {ArchiveLinkCreateManyAndReturnArgs} args - Arguments to create many ArchiveLinks.
     * @example
     * // Create many ArchiveLinks
     * const archiveLink = await prisma.archiveLink.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ArchiveLinks and only return the `id`
     * const archiveLinkWithIdOnly = await prisma.archiveLink.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ArchiveLinkCreateManyAndReturnArgs>(
      args?: SelectSubset<T, ArchiveLinkCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ArchiveLinkPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a ArchiveLink.
     * @param {ArchiveLinkDeleteArgs} args - Arguments to delete one ArchiveLink.
     * @example
     * // Delete one ArchiveLink
     * const ArchiveLink = await prisma.archiveLink.delete({
     *   where: {
     *     // ... filter to delete one ArchiveLink
     *   }
     * })
     *
     */
    delete<T extends ArchiveLinkDeleteArgs>(
      args: SelectSubset<T, ArchiveLinkDeleteArgs<ExtArgs>>
    ): Prisma__ArchiveLinkClient<
      $Result.GetResult<
        Prisma.$ArchiveLinkPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one ArchiveLink.
     * @param {ArchiveLinkUpdateArgs} args - Arguments to update one ArchiveLink.
     * @example
     * // Update one ArchiveLink
     * const archiveLink = await prisma.archiveLink.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ArchiveLinkUpdateArgs>(
      args: SelectSubset<T, ArchiveLinkUpdateArgs<ExtArgs>>
    ): Prisma__ArchiveLinkClient<
      $Result.GetResult<
        Prisma.$ArchiveLinkPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more ArchiveLinks.
     * @param {ArchiveLinkDeleteManyArgs} args - Arguments to filter ArchiveLinks to delete.
     * @example
     * // Delete a few ArchiveLinks
     * const { count } = await prisma.archiveLink.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ArchiveLinkDeleteManyArgs>(
      args?: SelectSubset<T, ArchiveLinkDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more ArchiveLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArchiveLinkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ArchiveLinks
     * const archiveLink = await prisma.archiveLink.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ArchiveLinkUpdateManyArgs>(
      args: SelectSubset<T, ArchiveLinkUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more ArchiveLinks and returns the data updated in the database.
     * @param {ArchiveLinkUpdateManyAndReturnArgs} args - Arguments to update many ArchiveLinks.
     * @example
     * // Update many ArchiveLinks
     * const archiveLink = await prisma.archiveLink.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more ArchiveLinks and only return the `id`
     * const archiveLinkWithIdOnly = await prisma.archiveLink.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends ArchiveLinkUpdateManyAndReturnArgs>(
      args: SelectSubset<T, ArchiveLinkUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ArchiveLinkPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one ArchiveLink.
     * @param {ArchiveLinkUpsertArgs} args - Arguments to update or create a ArchiveLink.
     * @example
     * // Update or create a ArchiveLink
     * const archiveLink = await prisma.archiveLink.upsert({
     *   create: {
     *     // ... data to create a ArchiveLink
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ArchiveLink we want to update
     *   }
     * })
     */
    upsert<T extends ArchiveLinkUpsertArgs>(
      args: SelectSubset<T, ArchiveLinkUpsertArgs<ExtArgs>>
    ): Prisma__ArchiveLinkClient<
      $Result.GetResult<
        Prisma.$ArchiveLinkPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of ArchiveLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArchiveLinkCountArgs} args - Arguments to filter ArchiveLinks to count.
     * @example
     * // Count the number of ArchiveLinks
     * const count = await prisma.archiveLink.count({
     *   where: {
     *     // ... the filter for the ArchiveLinks we want to count
     *   }
     * })
     **/
    count<T extends ArchiveLinkCountArgs>(
      args?: Subset<T, ArchiveLinkCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArchiveLinkCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a ArchiveLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArchiveLinkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ArchiveLinkAggregateArgs>(
      args: Subset<T, ArchiveLinkAggregateArgs>
    ): Prisma.PrismaPromise<GetArchiveLinkAggregateType<T>>;

    /**
     * Group by ArchiveLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArchiveLinkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ArchiveLinkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArchiveLinkGroupByArgs['orderBy'] }
        : { orderBy?: ArchiveLinkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, ArchiveLinkGroupByArgs, OrderByArg> &
        InputErrors
    ): {} extends InputErrors
      ? GetArchiveLinkGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ArchiveLink model
     */
    readonly fields: ArchiveLinkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ArchiveLink.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArchiveLinkClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    source<T extends ArchiveEntryDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, ArchiveEntryDefaultArgs<ExtArgs>>
    ): Prisma__ArchiveEntryClient<
      | $Result.GetResult<
          Prisma.$ArchiveEntryPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    target<T extends ArchiveEntryDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, ArchiveEntryDefaultArgs<ExtArgs>>
    ): Prisma__ArchiveEntryClient<
      | $Result.GetResult<
          Prisma.$ArchiveEntryPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the ArchiveLink model
   */
  interface ArchiveLinkFieldRefs {
    readonly id: FieldRef<'ArchiveLink', 'String'>;
    readonly sourceId: FieldRef<'ArchiveLink', 'String'>;
    readonly targetId: FieldRef<'ArchiveLink', 'String'>;
    readonly type: FieldRef<'ArchiveLink', 'String'>;
    readonly bidirectional: FieldRef<'ArchiveLink', 'Boolean'>;
    readonly createdAt: FieldRef<'ArchiveLink', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * ArchiveLink findUnique
   */
  export type ArchiveLinkFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ArchiveLink
     */
    select?: ArchiveLinkSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ArchiveLink
     */
    omit?: ArchiveLinkOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArchiveLinkInclude<ExtArgs> | null;
    /**
     * Filter, which ArchiveLink to fetch.
     */
    where: ArchiveLinkWhereUniqueInput;
  };

  /**
   * ArchiveLink findUniqueOrThrow
   */
  export type ArchiveLinkFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ArchiveLink
     */
    select?: ArchiveLinkSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ArchiveLink
     */
    omit?: ArchiveLinkOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArchiveLinkInclude<ExtArgs> | null;
    /**
     * Filter, which ArchiveLink to fetch.
     */
    where: ArchiveLinkWhereUniqueInput;
  };

  /**
   * ArchiveLink findFirst
   */
  export type ArchiveLinkFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ArchiveLink
     */
    select?: ArchiveLinkSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ArchiveLink
     */
    omit?: ArchiveLinkOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArchiveLinkInclude<ExtArgs> | null;
    /**
     * Filter, which ArchiveLink to fetch.
     */
    where?: ArchiveLinkWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ArchiveLinks to fetch.
     */
    orderBy?:
      | ArchiveLinkOrderByWithRelationInput
      | ArchiveLinkOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ArchiveLinks.
     */
    cursor?: ArchiveLinkWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ArchiveLinks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ArchiveLinks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ArchiveLinks.
     */
    distinct?: ArchiveLinkScalarFieldEnum | ArchiveLinkScalarFieldEnum[];
  };

  /**
   * ArchiveLink findFirstOrThrow
   */
  export type ArchiveLinkFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ArchiveLink
     */
    select?: ArchiveLinkSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ArchiveLink
     */
    omit?: ArchiveLinkOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArchiveLinkInclude<ExtArgs> | null;
    /**
     * Filter, which ArchiveLink to fetch.
     */
    where?: ArchiveLinkWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ArchiveLinks to fetch.
     */
    orderBy?:
      | ArchiveLinkOrderByWithRelationInput
      | ArchiveLinkOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ArchiveLinks.
     */
    cursor?: ArchiveLinkWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ArchiveLinks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ArchiveLinks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ArchiveLinks.
     */
    distinct?: ArchiveLinkScalarFieldEnum | ArchiveLinkScalarFieldEnum[];
  };

  /**
   * ArchiveLink findMany
   */
  export type ArchiveLinkFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ArchiveLink
     */
    select?: ArchiveLinkSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ArchiveLink
     */
    omit?: ArchiveLinkOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArchiveLinkInclude<ExtArgs> | null;
    /**
     * Filter, which ArchiveLinks to fetch.
     */
    where?: ArchiveLinkWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ArchiveLinks to fetch.
     */
    orderBy?:
      | ArchiveLinkOrderByWithRelationInput
      | ArchiveLinkOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ArchiveLinks.
     */
    cursor?: ArchiveLinkWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ArchiveLinks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ArchiveLinks.
     */
    skip?: number;
    distinct?: ArchiveLinkScalarFieldEnum | ArchiveLinkScalarFieldEnum[];
  };

  /**
   * ArchiveLink create
   */
  export type ArchiveLinkCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ArchiveLink
     */
    select?: ArchiveLinkSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ArchiveLink
     */
    omit?: ArchiveLinkOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArchiveLinkInclude<ExtArgs> | null;
    /**
     * The data needed to create a ArchiveLink.
     */
    data: XOR<ArchiveLinkCreateInput, ArchiveLinkUncheckedCreateInput>;
  };

  /**
   * ArchiveLink createMany
   */
  export type ArchiveLinkCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many ArchiveLinks.
     */
    data: ArchiveLinkCreateManyInput | ArchiveLinkCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * ArchiveLink createManyAndReturn
   */
  export type ArchiveLinkCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ArchiveLink
     */
    select?: ArchiveLinkSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ArchiveLink
     */
    omit?: ArchiveLinkOmit<ExtArgs> | null;
    /**
     * The data used to create many ArchiveLinks.
     */
    data: ArchiveLinkCreateManyInput | ArchiveLinkCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArchiveLinkIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * ArchiveLink update
   */
  export type ArchiveLinkUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ArchiveLink
     */
    select?: ArchiveLinkSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ArchiveLink
     */
    omit?: ArchiveLinkOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArchiveLinkInclude<ExtArgs> | null;
    /**
     * The data needed to update a ArchiveLink.
     */
    data: XOR<ArchiveLinkUpdateInput, ArchiveLinkUncheckedUpdateInput>;
    /**
     * Choose, which ArchiveLink to update.
     */
    where: ArchiveLinkWhereUniqueInput;
  };

  /**
   * ArchiveLink updateMany
   */
  export type ArchiveLinkUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update ArchiveLinks.
     */
    data: XOR<
      ArchiveLinkUpdateManyMutationInput,
      ArchiveLinkUncheckedUpdateManyInput
    >;
    /**
     * Filter which ArchiveLinks to update
     */
    where?: ArchiveLinkWhereInput;
    /**
     * Limit how many ArchiveLinks to update.
     */
    limit?: number;
  };

  /**
   * ArchiveLink updateManyAndReturn
   */
  export type ArchiveLinkUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ArchiveLink
     */
    select?: ArchiveLinkSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ArchiveLink
     */
    omit?: ArchiveLinkOmit<ExtArgs> | null;
    /**
     * The data used to update ArchiveLinks.
     */
    data: XOR<
      ArchiveLinkUpdateManyMutationInput,
      ArchiveLinkUncheckedUpdateManyInput
    >;
    /**
     * Filter which ArchiveLinks to update
     */
    where?: ArchiveLinkWhereInput;
    /**
     * Limit how many ArchiveLinks to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArchiveLinkIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * ArchiveLink upsert
   */
  export type ArchiveLinkUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ArchiveLink
     */
    select?: ArchiveLinkSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ArchiveLink
     */
    omit?: ArchiveLinkOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArchiveLinkInclude<ExtArgs> | null;
    /**
     * The filter to search for the ArchiveLink to update in case it exists.
     */
    where: ArchiveLinkWhereUniqueInput;
    /**
     * In case the ArchiveLink found by the `where` argument doesn't exist, create a new ArchiveLink with this data.
     */
    create: XOR<ArchiveLinkCreateInput, ArchiveLinkUncheckedCreateInput>;
    /**
     * In case the ArchiveLink was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArchiveLinkUpdateInput, ArchiveLinkUncheckedUpdateInput>;
  };

  /**
   * ArchiveLink delete
   */
  export type ArchiveLinkDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ArchiveLink
     */
    select?: ArchiveLinkSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ArchiveLink
     */
    omit?: ArchiveLinkOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArchiveLinkInclude<ExtArgs> | null;
    /**
     * Filter which ArchiveLink to delete.
     */
    where: ArchiveLinkWhereUniqueInput;
  };

  /**
   * ArchiveLink deleteMany
   */
  export type ArchiveLinkDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which ArchiveLinks to delete
     */
    where?: ArchiveLinkWhereInput;
    /**
     * Limit how many ArchiveLinks to delete.
     */
    limit?: number;
  };

  /**
   * ArchiveLink without action
   */
  export type ArchiveLinkDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the ArchiveLink
     */
    select?: ArchiveLinkSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ArchiveLink
     */
    omit?: ArchiveLinkOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArchiveLinkInclude<ExtArgs> | null;
  };

  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted';
    ReadCommitted: 'ReadCommitted';
    RepeatableRead: 'RepeatableRead';
    Serializable: 'Serializable';
  };

  export type TransactionIsolationLevel =
    (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];

  export const ProviderScalarFieldEnum: {
    id: 'id';
    apiKey: 'apiKey';
  };

  export type ProviderScalarFieldEnum =
    (typeof ProviderScalarFieldEnum)[keyof typeof ProviderScalarFieldEnum];

  export const TierScalarFieldEnum: {
    id: 'id';
    modelIds: 'modelIds';
    bucketCapacity: 'bucketCapacity';
    bucketRefillAmount: 'bucketRefillAmount';
    bucketRefillIntervalSeconds: 'bucketRefillIntervalSeconds';
  };

  export type TierScalarFieldEnum =
    (typeof TierScalarFieldEnum)[keyof typeof TierScalarFieldEnum];

  export const UserScalarFieldEnum: {
    id: 'id';
    email: 'email';
  };

  export type UserScalarFieldEnum =
    (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];

  export const UserRateLimitScalarFieldEnum: {
    userId: 'userId';
    tokens: 'tokens';
    lastRefill: 'lastRefill';
  };

  export type UserRateLimitScalarFieldEnum =
    (typeof UserRateLimitScalarFieldEnum)[keyof typeof UserRateLimitScalarFieldEnum];

  export const AgentScalarFieldEnum: {
    id: 'id';
    userId: 'userId';
    name: 'name';
    description: 'description';
    settings: 'settings';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type AgentScalarFieldEnum =
    (typeof AgentScalarFieldEnum)[keyof typeof AgentScalarFieldEnum];

  export const ChatScalarFieldEnum: {
    id: 'id';
    createdAt: 'createdAt';
    title: 'title';
    userId: 'userId';
    visibility: 'visibility';
    lastContext: 'lastContext';
    settings: 'settings';
    parentChatId: 'parentChatId';
    forkedFromMessageId: 'forkedFromMessageId';
    forkDepth: 'forkDepth';
  };

  export type ChatScalarFieldEnum =
    (typeof ChatScalarFieldEnum)[keyof typeof ChatScalarFieldEnum];

  export const MessageScalarFieldEnum: {
    id: 'id';
    chatId: 'chatId';
    role: 'role';
    parts: 'parts';
    attachments: 'attachments';
    createdAt: 'createdAt';
  };

  export type MessageScalarFieldEnum =
    (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum];

  export const VoteScalarFieldEnum: {
    chatId: 'chatId';
    messageId: 'messageId';
    isUpvoted: 'isUpvoted';
  };

  export type VoteScalarFieldEnum =
    (typeof VoteScalarFieldEnum)[keyof typeof VoteScalarFieldEnum];

  export const DocumentScalarFieldEnum: {
    id: 'id';
    createdAt: 'createdAt';
    title: 'title';
    content: 'content';
    kind: 'kind';
    userId: 'userId';
  };

  export type DocumentScalarFieldEnum =
    (typeof DocumentScalarFieldEnum)[keyof typeof DocumentScalarFieldEnum];

  export const SuggestionScalarFieldEnum: {
    id: 'id';
    documentId: 'documentId';
    documentCreatedAt: 'documentCreatedAt';
    originalText: 'originalText';
    suggestedText: 'suggestedText';
    description: 'description';
    isResolved: 'isResolved';
    userId: 'userId';
    createdAt: 'createdAt';
  };

  export type SuggestionScalarFieldEnum =
    (typeof SuggestionScalarFieldEnum)[keyof typeof SuggestionScalarFieldEnum];

  export const StreamScalarFieldEnum: {
    id: 'id';
    chatId: 'chatId';
    createdAt: 'createdAt';
  };

  export type StreamScalarFieldEnum =
    (typeof StreamScalarFieldEnum)[keyof typeof StreamScalarFieldEnum];

  export const ArchiveEntryScalarFieldEnum: {
    id: 'id';
    userId: 'userId';
    slug: 'slug';
    entity: 'entity';
    tags: 'tags';
    body: 'body';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type ArchiveEntryScalarFieldEnum =
    (typeof ArchiveEntryScalarFieldEnum)[keyof typeof ArchiveEntryScalarFieldEnum];

  export const ChatPinnedArchiveEntryScalarFieldEnum: {
    id: 'id';
    chatId: 'chatId';
    archiveEntryId: 'archiveEntryId';
    userId: 'userId';
    pinnedAt: 'pinnedAt';
  };

  export type ChatPinnedArchiveEntryScalarFieldEnum =
    (typeof ChatPinnedArchiveEntryScalarFieldEnum)[keyof typeof ChatPinnedArchiveEntryScalarFieldEnum];

  export const ArchiveLinkScalarFieldEnum: {
    id: 'id';
    sourceId: 'sourceId';
    targetId: 'targetId';
    type: 'type';
    bidirectional: 'bidirectional';
    createdAt: 'createdAt';
  };

  export type ArchiveLinkScalarFieldEnum =
    (typeof ArchiveLinkScalarFieldEnum)[keyof typeof ArchiveLinkScalarFieldEnum];

  export const SortOrder: {
    asc: 'asc';
    desc: 'desc';
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull;
    JsonNull: typeof JsonNull;
  };

  export type NullableJsonNullValueInput =
    (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];

  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull;
  };

  export type JsonNullValueInput =
    (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];

  export const QueryMode: {
    default: 'default';
    insensitive: 'insensitive';
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];

  export const JsonNullValueFilter: {
    DbNull: typeof DbNull;
    JsonNull: typeof JsonNull;
    AnyNull: typeof AnyNull;
  };

  export type JsonNullValueFilter =
    (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];

  export const NullsOrder: {
    first: 'first';
    last: 'last';
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];

  /**
   * Field references
   */

  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'String'
  >;

  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'String[]'
  >;

  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Int'
  >;

  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Int[]'
  >;

  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'DateTime'
  >;

  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'DateTime[]'
  >;

  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Json'
  >;

  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'QueryMode'
  >;

  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Boolean'
  >;

  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Float'
  >;

  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Float[]'
  >;

  /**
   * Deep Input Types
   */

  export type ProviderWhereInput = {
    AND?: ProviderWhereInput | ProviderWhereInput[];
    OR?: ProviderWhereInput[];
    NOT?: ProviderWhereInput | ProviderWhereInput[];
    id?: StringFilter<'Provider'> | string;
    apiKey?: StringFilter<'Provider'> | string;
  };

  export type ProviderOrderByWithRelationInput = {
    id?: SortOrder;
    apiKey?: SortOrder;
  };

  export type ProviderWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: ProviderWhereInput | ProviderWhereInput[];
      OR?: ProviderWhereInput[];
      NOT?: ProviderWhereInput | ProviderWhereInput[];
      apiKey?: StringFilter<'Provider'> | string;
    },
    'id'
  >;

  export type ProviderOrderByWithAggregationInput = {
    id?: SortOrder;
    apiKey?: SortOrder;
    _count?: ProviderCountOrderByAggregateInput;
    _max?: ProviderMaxOrderByAggregateInput;
    _min?: ProviderMinOrderByAggregateInput;
  };

  export type ProviderScalarWhereWithAggregatesInput = {
    AND?:
      | ProviderScalarWhereWithAggregatesInput
      | ProviderScalarWhereWithAggregatesInput[];
    OR?: ProviderScalarWhereWithAggregatesInput[];
    NOT?:
      | ProviderScalarWhereWithAggregatesInput
      | ProviderScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Provider'> | string;
    apiKey?: StringWithAggregatesFilter<'Provider'> | string;
  };

  export type TierWhereInput = {
    AND?: TierWhereInput | TierWhereInput[];
    OR?: TierWhereInput[];
    NOT?: TierWhereInput | TierWhereInput[];
    id?: StringFilter<'Tier'> | string;
    modelIds?: StringNullableListFilter<'Tier'>;
    bucketCapacity?: IntFilter<'Tier'> | number;
    bucketRefillAmount?: IntFilter<'Tier'> | number;
    bucketRefillIntervalSeconds?: IntFilter<'Tier'> | number;
  };

  export type TierOrderByWithRelationInput = {
    id?: SortOrder;
    modelIds?: SortOrder;
    bucketCapacity?: SortOrder;
    bucketRefillAmount?: SortOrder;
    bucketRefillIntervalSeconds?: SortOrder;
  };

  export type TierWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: TierWhereInput | TierWhereInput[];
      OR?: TierWhereInput[];
      NOT?: TierWhereInput | TierWhereInput[];
      modelIds?: StringNullableListFilter<'Tier'>;
      bucketCapacity?: IntFilter<'Tier'> | number;
      bucketRefillAmount?: IntFilter<'Tier'> | number;
      bucketRefillIntervalSeconds?: IntFilter<'Tier'> | number;
    },
    'id'
  >;

  export type TierOrderByWithAggregationInput = {
    id?: SortOrder;
    modelIds?: SortOrder;
    bucketCapacity?: SortOrder;
    bucketRefillAmount?: SortOrder;
    bucketRefillIntervalSeconds?: SortOrder;
    _count?: TierCountOrderByAggregateInput;
    _avg?: TierAvgOrderByAggregateInput;
    _max?: TierMaxOrderByAggregateInput;
    _min?: TierMinOrderByAggregateInput;
    _sum?: TierSumOrderByAggregateInput;
  };

  export type TierScalarWhereWithAggregatesInput = {
    AND?:
      | TierScalarWhereWithAggregatesInput
      | TierScalarWhereWithAggregatesInput[];
    OR?: TierScalarWhereWithAggregatesInput[];
    NOT?:
      | TierScalarWhereWithAggregatesInput
      | TierScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Tier'> | string;
    modelIds?: StringNullableListFilter<'Tier'>;
    bucketCapacity?: IntWithAggregatesFilter<'Tier'> | number;
    bucketRefillAmount?: IntWithAggregatesFilter<'Tier'> | number;
    bucketRefillIntervalSeconds?: IntWithAggregatesFilter<'Tier'> | number;
  };

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[];
    OR?: UserWhereInput[];
    NOT?: UserWhereInput | UserWhereInput[];
    id?: StringFilter<'User'> | string;
    email?: StringFilter<'User'> | string;
    chats?: ChatListRelationFilter;
    documents?: DocumentListRelationFilter;
    suggestions?: SuggestionListRelationFilter;
    archiveEntries?: ArchiveEntryListRelationFilter;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryListRelationFilter;
    rateLimit?: XOR<
      UserRateLimitNullableScalarRelationFilter,
      UserRateLimitWhereInput
    > | null;
    agents?: AgentListRelationFilter;
  };

  export type UserOrderByWithRelationInput = {
    id?: SortOrder;
    email?: SortOrder;
    chats?: ChatOrderByRelationAggregateInput;
    documents?: DocumentOrderByRelationAggregateInput;
    suggestions?: SuggestionOrderByRelationAggregateInput;
    archiveEntries?: ArchiveEntryOrderByRelationAggregateInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryOrderByRelationAggregateInput;
    rateLimit?: UserRateLimitOrderByWithRelationInput;
    agents?: AgentOrderByRelationAggregateInput;
  };

  export type UserWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: UserWhereInput | UserWhereInput[];
      OR?: UserWhereInput[];
      NOT?: UserWhereInput | UserWhereInput[];
      email?: StringFilter<'User'> | string;
      chats?: ChatListRelationFilter;
      documents?: DocumentListRelationFilter;
      suggestions?: SuggestionListRelationFilter;
      archiveEntries?: ArchiveEntryListRelationFilter;
      pinnedArchiveEntries?: ChatPinnedArchiveEntryListRelationFilter;
      rateLimit?: XOR<
        UserRateLimitNullableScalarRelationFilter,
        UserRateLimitWhereInput
      > | null;
      agents?: AgentListRelationFilter;
    },
    'id'
  >;

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder;
    email?: SortOrder;
    _count?: UserCountOrderByAggregateInput;
    _max?: UserMaxOrderByAggregateInput;
    _min?: UserMinOrderByAggregateInput;
  };

  export type UserScalarWhereWithAggregatesInput = {
    AND?:
      | UserScalarWhereWithAggregatesInput
      | UserScalarWhereWithAggregatesInput[];
    OR?: UserScalarWhereWithAggregatesInput[];
    NOT?:
      | UserScalarWhereWithAggregatesInput
      | UserScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'User'> | string;
    email?: StringWithAggregatesFilter<'User'> | string;
  };

  export type UserRateLimitWhereInput = {
    AND?: UserRateLimitWhereInput | UserRateLimitWhereInput[];
    OR?: UserRateLimitWhereInput[];
    NOT?: UserRateLimitWhereInput | UserRateLimitWhereInput[];
    userId?: StringFilter<'UserRateLimit'> | string;
    tokens?: IntFilter<'UserRateLimit'> | number;
    lastRefill?: DateTimeFilter<'UserRateLimit'> | Date | string;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
  };

  export type UserRateLimitOrderByWithRelationInput = {
    userId?: SortOrder;
    tokens?: SortOrder;
    lastRefill?: SortOrder;
    user?: UserOrderByWithRelationInput;
  };

  export type UserRateLimitWhereUniqueInput = Prisma.AtLeast<
    {
      userId?: string;
      AND?: UserRateLimitWhereInput | UserRateLimitWhereInput[];
      OR?: UserRateLimitWhereInput[];
      NOT?: UserRateLimitWhereInput | UserRateLimitWhereInput[];
      tokens?: IntFilter<'UserRateLimit'> | number;
      lastRefill?: DateTimeFilter<'UserRateLimit'> | Date | string;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    },
    'userId'
  >;

  export type UserRateLimitOrderByWithAggregationInput = {
    userId?: SortOrder;
    tokens?: SortOrder;
    lastRefill?: SortOrder;
    _count?: UserRateLimitCountOrderByAggregateInput;
    _avg?: UserRateLimitAvgOrderByAggregateInput;
    _max?: UserRateLimitMaxOrderByAggregateInput;
    _min?: UserRateLimitMinOrderByAggregateInput;
    _sum?: UserRateLimitSumOrderByAggregateInput;
  };

  export type UserRateLimitScalarWhereWithAggregatesInput = {
    AND?:
      | UserRateLimitScalarWhereWithAggregatesInput
      | UserRateLimitScalarWhereWithAggregatesInput[];
    OR?: UserRateLimitScalarWhereWithAggregatesInput[];
    NOT?:
      | UserRateLimitScalarWhereWithAggregatesInput
      | UserRateLimitScalarWhereWithAggregatesInput[];
    userId?: StringWithAggregatesFilter<'UserRateLimit'> | string;
    tokens?: IntWithAggregatesFilter<'UserRateLimit'> | number;
    lastRefill?: DateTimeWithAggregatesFilter<'UserRateLimit'> | Date | string;
  };

  export type AgentWhereInput = {
    AND?: AgentWhereInput | AgentWhereInput[];
    OR?: AgentWhereInput[];
    NOT?: AgentWhereInput | AgentWhereInput[];
    id?: UuidFilter<'Agent'> | string;
    userId?: StringFilter<'Agent'> | string;
    name?: StringFilter<'Agent'> | string;
    description?: StringNullableFilter<'Agent'> | string | null;
    settings?: JsonNullableFilter<'Agent'>;
    createdAt?: DateTimeFilter<'Agent'> | Date | string;
    updatedAt?: DateTimeFilter<'Agent'> | Date | string;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
  };

  export type AgentOrderByWithRelationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    name?: SortOrder;
    description?: SortOrderInput | SortOrder;
    settings?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    user?: UserOrderByWithRelationInput;
  };

  export type AgentWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: AgentWhereInput | AgentWhereInput[];
      OR?: AgentWhereInput[];
      NOT?: AgentWhereInput | AgentWhereInput[];
      userId?: StringFilter<'Agent'> | string;
      name?: StringFilter<'Agent'> | string;
      description?: StringNullableFilter<'Agent'> | string | null;
      settings?: JsonNullableFilter<'Agent'>;
      createdAt?: DateTimeFilter<'Agent'> | Date | string;
      updatedAt?: DateTimeFilter<'Agent'> | Date | string;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    },
    'id'
  >;

  export type AgentOrderByWithAggregationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    name?: SortOrder;
    description?: SortOrderInput | SortOrder;
    settings?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: AgentCountOrderByAggregateInput;
    _max?: AgentMaxOrderByAggregateInput;
    _min?: AgentMinOrderByAggregateInput;
  };

  export type AgentScalarWhereWithAggregatesInput = {
    AND?:
      | AgentScalarWhereWithAggregatesInput
      | AgentScalarWhereWithAggregatesInput[];
    OR?: AgentScalarWhereWithAggregatesInput[];
    NOT?:
      | AgentScalarWhereWithAggregatesInput
      | AgentScalarWhereWithAggregatesInput[];
    id?: UuidWithAggregatesFilter<'Agent'> | string;
    userId?: StringWithAggregatesFilter<'Agent'> | string;
    name?: StringWithAggregatesFilter<'Agent'> | string;
    description?: StringNullableWithAggregatesFilter<'Agent'> | string | null;
    settings?: JsonNullableWithAggregatesFilter<'Agent'>;
    createdAt?: DateTimeWithAggregatesFilter<'Agent'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'Agent'> | Date | string;
  };

  export type ChatWhereInput = {
    AND?: ChatWhereInput | ChatWhereInput[];
    OR?: ChatWhereInput[];
    NOT?: ChatWhereInput | ChatWhereInput[];
    id?: UuidFilter<'Chat'> | string;
    createdAt?: DateTimeFilter<'Chat'> | Date | string;
    title?: StringFilter<'Chat'> | string;
    userId?: StringFilter<'Chat'> | string;
    visibility?: StringFilter<'Chat'> | string;
    lastContext?: JsonNullableFilter<'Chat'>;
    settings?: JsonNullableFilter<'Chat'>;
    parentChatId?: UuidNullableFilter<'Chat'> | string | null;
    forkedFromMessageId?: UuidNullableFilter<'Chat'> | string | null;
    forkDepth?: IntFilter<'Chat'> | number;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    messages?: MessageListRelationFilter;
    votes?: VoteListRelationFilter;
    streams?: StreamListRelationFilter;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryListRelationFilter;
  };

  export type ChatOrderByWithRelationInput = {
    id?: SortOrder;
    createdAt?: SortOrder;
    title?: SortOrder;
    userId?: SortOrder;
    visibility?: SortOrder;
    lastContext?: SortOrderInput | SortOrder;
    settings?: SortOrderInput | SortOrder;
    parentChatId?: SortOrderInput | SortOrder;
    forkedFromMessageId?: SortOrderInput | SortOrder;
    forkDepth?: SortOrder;
    user?: UserOrderByWithRelationInput;
    messages?: MessageOrderByRelationAggregateInput;
    votes?: VoteOrderByRelationAggregateInput;
    streams?: StreamOrderByRelationAggregateInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryOrderByRelationAggregateInput;
  };

  export type ChatWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: ChatWhereInput | ChatWhereInput[];
      OR?: ChatWhereInput[];
      NOT?: ChatWhereInput | ChatWhereInput[];
      createdAt?: DateTimeFilter<'Chat'> | Date | string;
      title?: StringFilter<'Chat'> | string;
      userId?: StringFilter<'Chat'> | string;
      visibility?: StringFilter<'Chat'> | string;
      lastContext?: JsonNullableFilter<'Chat'>;
      settings?: JsonNullableFilter<'Chat'>;
      parentChatId?: UuidNullableFilter<'Chat'> | string | null;
      forkedFromMessageId?: UuidNullableFilter<'Chat'> | string | null;
      forkDepth?: IntFilter<'Chat'> | number;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
      messages?: MessageListRelationFilter;
      votes?: VoteListRelationFilter;
      streams?: StreamListRelationFilter;
      pinnedArchiveEntries?: ChatPinnedArchiveEntryListRelationFilter;
    },
    'id'
  >;

  export type ChatOrderByWithAggregationInput = {
    id?: SortOrder;
    createdAt?: SortOrder;
    title?: SortOrder;
    userId?: SortOrder;
    visibility?: SortOrder;
    lastContext?: SortOrderInput | SortOrder;
    settings?: SortOrderInput | SortOrder;
    parentChatId?: SortOrderInput | SortOrder;
    forkedFromMessageId?: SortOrderInput | SortOrder;
    forkDepth?: SortOrder;
    _count?: ChatCountOrderByAggregateInput;
    _avg?: ChatAvgOrderByAggregateInput;
    _max?: ChatMaxOrderByAggregateInput;
    _min?: ChatMinOrderByAggregateInput;
    _sum?: ChatSumOrderByAggregateInput;
  };

  export type ChatScalarWhereWithAggregatesInput = {
    AND?:
      | ChatScalarWhereWithAggregatesInput
      | ChatScalarWhereWithAggregatesInput[];
    OR?: ChatScalarWhereWithAggregatesInput[];
    NOT?:
      | ChatScalarWhereWithAggregatesInput
      | ChatScalarWhereWithAggregatesInput[];
    id?: UuidWithAggregatesFilter<'Chat'> | string;
    createdAt?: DateTimeWithAggregatesFilter<'Chat'> | Date | string;
    title?: StringWithAggregatesFilter<'Chat'> | string;
    userId?: StringWithAggregatesFilter<'Chat'> | string;
    visibility?: StringWithAggregatesFilter<'Chat'> | string;
    lastContext?: JsonNullableWithAggregatesFilter<'Chat'>;
    settings?: JsonNullableWithAggregatesFilter<'Chat'>;
    parentChatId?: UuidNullableWithAggregatesFilter<'Chat'> | string | null;
    forkedFromMessageId?:
      | UuidNullableWithAggregatesFilter<'Chat'>
      | string
      | null;
    forkDepth?: IntWithAggregatesFilter<'Chat'> | number;
  };

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[];
    OR?: MessageWhereInput[];
    NOT?: MessageWhereInput | MessageWhereInput[];
    id?: UuidFilter<'Message'> | string;
    chatId?: UuidFilter<'Message'> | string;
    role?: StringFilter<'Message'> | string;
    parts?: JsonFilter<'Message'>;
    attachments?: JsonFilter<'Message'>;
    createdAt?: DateTimeFilter<'Message'> | Date | string;
    chat?: XOR<ChatScalarRelationFilter, ChatWhereInput>;
    votes?: VoteListRelationFilter;
  };

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder;
    chatId?: SortOrder;
    role?: SortOrder;
    parts?: SortOrder;
    attachments?: SortOrder;
    createdAt?: SortOrder;
    chat?: ChatOrderByWithRelationInput;
    votes?: VoteOrderByRelationAggregateInput;
  };

  export type MessageWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: MessageWhereInput | MessageWhereInput[];
      OR?: MessageWhereInput[];
      NOT?: MessageWhereInput | MessageWhereInput[];
      chatId?: UuidFilter<'Message'> | string;
      role?: StringFilter<'Message'> | string;
      parts?: JsonFilter<'Message'>;
      attachments?: JsonFilter<'Message'>;
      createdAt?: DateTimeFilter<'Message'> | Date | string;
      chat?: XOR<ChatScalarRelationFilter, ChatWhereInput>;
      votes?: VoteListRelationFilter;
    },
    'id'
  >;

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder;
    chatId?: SortOrder;
    role?: SortOrder;
    parts?: SortOrder;
    attachments?: SortOrder;
    createdAt?: SortOrder;
    _count?: MessageCountOrderByAggregateInput;
    _max?: MessageMaxOrderByAggregateInput;
    _min?: MessageMinOrderByAggregateInput;
  };

  export type MessageScalarWhereWithAggregatesInput = {
    AND?:
      | MessageScalarWhereWithAggregatesInput
      | MessageScalarWhereWithAggregatesInput[];
    OR?: MessageScalarWhereWithAggregatesInput[];
    NOT?:
      | MessageScalarWhereWithAggregatesInput
      | MessageScalarWhereWithAggregatesInput[];
    id?: UuidWithAggregatesFilter<'Message'> | string;
    chatId?: UuidWithAggregatesFilter<'Message'> | string;
    role?: StringWithAggregatesFilter<'Message'> | string;
    parts?: JsonWithAggregatesFilter<'Message'>;
    attachments?: JsonWithAggregatesFilter<'Message'>;
    createdAt?: DateTimeWithAggregatesFilter<'Message'> | Date | string;
  };

  export type VoteWhereInput = {
    AND?: VoteWhereInput | VoteWhereInput[];
    OR?: VoteWhereInput[];
    NOT?: VoteWhereInput | VoteWhereInput[];
    chatId?: UuidFilter<'Vote'> | string;
    messageId?: UuidFilter<'Vote'> | string;
    isUpvoted?: BoolFilter<'Vote'> | boolean;
    message?: XOR<MessageScalarRelationFilter, MessageWhereInput>;
    chat?: XOR<ChatScalarRelationFilter, ChatWhereInput>;
  };

  export type VoteOrderByWithRelationInput = {
    chatId?: SortOrder;
    messageId?: SortOrder;
    isUpvoted?: SortOrder;
    message?: MessageOrderByWithRelationInput;
    chat?: ChatOrderByWithRelationInput;
  };

  export type VoteWhereUniqueInput = Prisma.AtLeast<
    {
      chatId_messageId?: VoteChatIdMessageIdCompoundUniqueInput;
      AND?: VoteWhereInput | VoteWhereInput[];
      OR?: VoteWhereInput[];
      NOT?: VoteWhereInput | VoteWhereInput[];
      chatId?: UuidFilter<'Vote'> | string;
      messageId?: UuidFilter<'Vote'> | string;
      isUpvoted?: BoolFilter<'Vote'> | boolean;
      message?: XOR<MessageScalarRelationFilter, MessageWhereInput>;
      chat?: XOR<ChatScalarRelationFilter, ChatWhereInput>;
    },
    'chatId_messageId'
  >;

  export type VoteOrderByWithAggregationInput = {
    chatId?: SortOrder;
    messageId?: SortOrder;
    isUpvoted?: SortOrder;
    _count?: VoteCountOrderByAggregateInput;
    _max?: VoteMaxOrderByAggregateInput;
    _min?: VoteMinOrderByAggregateInput;
  };

  export type VoteScalarWhereWithAggregatesInput = {
    AND?:
      | VoteScalarWhereWithAggregatesInput
      | VoteScalarWhereWithAggregatesInput[];
    OR?: VoteScalarWhereWithAggregatesInput[];
    NOT?:
      | VoteScalarWhereWithAggregatesInput
      | VoteScalarWhereWithAggregatesInput[];
    chatId?: UuidWithAggregatesFilter<'Vote'> | string;
    messageId?: UuidWithAggregatesFilter<'Vote'> | string;
    isUpvoted?: BoolWithAggregatesFilter<'Vote'> | boolean;
  };

  export type DocumentWhereInput = {
    AND?: DocumentWhereInput | DocumentWhereInput[];
    OR?: DocumentWhereInput[];
    NOT?: DocumentWhereInput | DocumentWhereInput[];
    id?: UuidFilter<'Document'> | string;
    createdAt?: DateTimeFilter<'Document'> | Date | string;
    title?: StringFilter<'Document'> | string;
    content?: StringNullableFilter<'Document'> | string | null;
    kind?: StringFilter<'Document'> | string;
    userId?: StringFilter<'Document'> | string;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    suggestions?: SuggestionListRelationFilter;
  };

  export type DocumentOrderByWithRelationInput = {
    id?: SortOrder;
    createdAt?: SortOrder;
    title?: SortOrder;
    content?: SortOrderInput | SortOrder;
    kind?: SortOrder;
    userId?: SortOrder;
    user?: UserOrderByWithRelationInput;
    suggestions?: SuggestionOrderByRelationAggregateInput;
  };

  export type DocumentWhereUniqueInput = Prisma.AtLeast<
    {
      id_createdAt?: DocumentIdCreatedAtCompoundUniqueInput;
      AND?: DocumentWhereInput | DocumentWhereInput[];
      OR?: DocumentWhereInput[];
      NOT?: DocumentWhereInput | DocumentWhereInput[];
      id?: UuidFilter<'Document'> | string;
      createdAt?: DateTimeFilter<'Document'> | Date | string;
      title?: StringFilter<'Document'> | string;
      content?: StringNullableFilter<'Document'> | string | null;
      kind?: StringFilter<'Document'> | string;
      userId?: StringFilter<'Document'> | string;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
      suggestions?: SuggestionListRelationFilter;
    },
    'id_createdAt'
  >;

  export type DocumentOrderByWithAggregationInput = {
    id?: SortOrder;
    createdAt?: SortOrder;
    title?: SortOrder;
    content?: SortOrderInput | SortOrder;
    kind?: SortOrder;
    userId?: SortOrder;
    _count?: DocumentCountOrderByAggregateInput;
    _max?: DocumentMaxOrderByAggregateInput;
    _min?: DocumentMinOrderByAggregateInput;
  };

  export type DocumentScalarWhereWithAggregatesInput = {
    AND?:
      | DocumentScalarWhereWithAggregatesInput
      | DocumentScalarWhereWithAggregatesInput[];
    OR?: DocumentScalarWhereWithAggregatesInput[];
    NOT?:
      | DocumentScalarWhereWithAggregatesInput
      | DocumentScalarWhereWithAggregatesInput[];
    id?: UuidWithAggregatesFilter<'Document'> | string;
    createdAt?: DateTimeWithAggregatesFilter<'Document'> | Date | string;
    title?: StringWithAggregatesFilter<'Document'> | string;
    content?: StringNullableWithAggregatesFilter<'Document'> | string | null;
    kind?: StringWithAggregatesFilter<'Document'> | string;
    userId?: StringWithAggregatesFilter<'Document'> | string;
  };

  export type SuggestionWhereInput = {
    AND?: SuggestionWhereInput | SuggestionWhereInput[];
    OR?: SuggestionWhereInput[];
    NOT?: SuggestionWhereInput | SuggestionWhereInput[];
    id?: UuidFilter<'Suggestion'> | string;
    documentId?: UuidFilter<'Suggestion'> | string;
    documentCreatedAt?: DateTimeFilter<'Suggestion'> | Date | string;
    originalText?: StringFilter<'Suggestion'> | string;
    suggestedText?: StringFilter<'Suggestion'> | string;
    description?: StringNullableFilter<'Suggestion'> | string | null;
    isResolved?: BoolFilter<'Suggestion'> | boolean;
    userId?: StringFilter<'Suggestion'> | string;
    createdAt?: DateTimeFilter<'Suggestion'> | Date | string;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>;
  };

  export type SuggestionOrderByWithRelationInput = {
    id?: SortOrder;
    documentId?: SortOrder;
    documentCreatedAt?: SortOrder;
    originalText?: SortOrder;
    suggestedText?: SortOrder;
    description?: SortOrderInput | SortOrder;
    isResolved?: SortOrder;
    userId?: SortOrder;
    createdAt?: SortOrder;
    user?: UserOrderByWithRelationInput;
    document?: DocumentOrderByWithRelationInput;
  };

  export type SuggestionWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: SuggestionWhereInput | SuggestionWhereInput[];
      OR?: SuggestionWhereInput[];
      NOT?: SuggestionWhereInput | SuggestionWhereInput[];
      documentId?: UuidFilter<'Suggestion'> | string;
      documentCreatedAt?: DateTimeFilter<'Suggestion'> | Date | string;
      originalText?: StringFilter<'Suggestion'> | string;
      suggestedText?: StringFilter<'Suggestion'> | string;
      description?: StringNullableFilter<'Suggestion'> | string | null;
      isResolved?: BoolFilter<'Suggestion'> | boolean;
      userId?: StringFilter<'Suggestion'> | string;
      createdAt?: DateTimeFilter<'Suggestion'> | Date | string;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
      document?: XOR<DocumentScalarRelationFilter, DocumentWhereInput>;
    },
    'id'
  >;

  export type SuggestionOrderByWithAggregationInput = {
    id?: SortOrder;
    documentId?: SortOrder;
    documentCreatedAt?: SortOrder;
    originalText?: SortOrder;
    suggestedText?: SortOrder;
    description?: SortOrderInput | SortOrder;
    isResolved?: SortOrder;
    userId?: SortOrder;
    createdAt?: SortOrder;
    _count?: SuggestionCountOrderByAggregateInput;
    _max?: SuggestionMaxOrderByAggregateInput;
    _min?: SuggestionMinOrderByAggregateInput;
  };

  export type SuggestionScalarWhereWithAggregatesInput = {
    AND?:
      | SuggestionScalarWhereWithAggregatesInput
      | SuggestionScalarWhereWithAggregatesInput[];
    OR?: SuggestionScalarWhereWithAggregatesInput[];
    NOT?:
      | SuggestionScalarWhereWithAggregatesInput
      | SuggestionScalarWhereWithAggregatesInput[];
    id?: UuidWithAggregatesFilter<'Suggestion'> | string;
    documentId?: UuidWithAggregatesFilter<'Suggestion'> | string;
    documentCreatedAt?:
      | DateTimeWithAggregatesFilter<'Suggestion'>
      | Date
      | string;
    originalText?: StringWithAggregatesFilter<'Suggestion'> | string;
    suggestedText?: StringWithAggregatesFilter<'Suggestion'> | string;
    description?:
      | StringNullableWithAggregatesFilter<'Suggestion'>
      | string
      | null;
    isResolved?: BoolWithAggregatesFilter<'Suggestion'> | boolean;
    userId?: StringWithAggregatesFilter<'Suggestion'> | string;
    createdAt?: DateTimeWithAggregatesFilter<'Suggestion'> | Date | string;
  };

  export type StreamWhereInput = {
    AND?: StreamWhereInput | StreamWhereInput[];
    OR?: StreamWhereInput[];
    NOT?: StreamWhereInput | StreamWhereInput[];
    id?: UuidFilter<'Stream'> | string;
    chatId?: UuidFilter<'Stream'> | string;
    createdAt?: DateTimeFilter<'Stream'> | Date | string;
    chat?: XOR<ChatScalarRelationFilter, ChatWhereInput>;
  };

  export type StreamOrderByWithRelationInput = {
    id?: SortOrder;
    chatId?: SortOrder;
    createdAt?: SortOrder;
    chat?: ChatOrderByWithRelationInput;
  };

  export type StreamWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: StreamWhereInput | StreamWhereInput[];
      OR?: StreamWhereInput[];
      NOT?: StreamWhereInput | StreamWhereInput[];
      chatId?: UuidFilter<'Stream'> | string;
      createdAt?: DateTimeFilter<'Stream'> | Date | string;
      chat?: XOR<ChatScalarRelationFilter, ChatWhereInput>;
    },
    'id'
  >;

  export type StreamOrderByWithAggregationInput = {
    id?: SortOrder;
    chatId?: SortOrder;
    createdAt?: SortOrder;
    _count?: StreamCountOrderByAggregateInput;
    _max?: StreamMaxOrderByAggregateInput;
    _min?: StreamMinOrderByAggregateInput;
  };

  export type StreamScalarWhereWithAggregatesInput = {
    AND?:
      | StreamScalarWhereWithAggregatesInput
      | StreamScalarWhereWithAggregatesInput[];
    OR?: StreamScalarWhereWithAggregatesInput[];
    NOT?:
      | StreamScalarWhereWithAggregatesInput
      | StreamScalarWhereWithAggregatesInput[];
    id?: UuidWithAggregatesFilter<'Stream'> | string;
    chatId?: UuidWithAggregatesFilter<'Stream'> | string;
    createdAt?: DateTimeWithAggregatesFilter<'Stream'> | Date | string;
  };

  export type ArchiveEntryWhereInput = {
    AND?: ArchiveEntryWhereInput | ArchiveEntryWhereInput[];
    OR?: ArchiveEntryWhereInput[];
    NOT?: ArchiveEntryWhereInput | ArchiveEntryWhereInput[];
    id?: UuidFilter<'ArchiveEntry'> | string;
    userId?: StringFilter<'ArchiveEntry'> | string;
    slug?: StringFilter<'ArchiveEntry'> | string;
    entity?: StringFilter<'ArchiveEntry'> | string;
    tags?: StringNullableListFilter<'ArchiveEntry'>;
    body?: StringFilter<'ArchiveEntry'> | string;
    createdAt?: DateTimeFilter<'ArchiveEntry'> | Date | string;
    updatedAt?: DateTimeFilter<'ArchiveEntry'> | Date | string;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    outgoingLinks?: ArchiveLinkListRelationFilter;
    incomingLinks?: ArchiveLinkListRelationFilter;
    pinnedInChats?: ChatPinnedArchiveEntryListRelationFilter;
  };

  export type ArchiveEntryOrderByWithRelationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    slug?: SortOrder;
    entity?: SortOrder;
    tags?: SortOrder;
    body?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    user?: UserOrderByWithRelationInput;
    outgoingLinks?: ArchiveLinkOrderByRelationAggregateInput;
    incomingLinks?: ArchiveLinkOrderByRelationAggregateInput;
    pinnedInChats?: ChatPinnedArchiveEntryOrderByRelationAggregateInput;
  };

  export type ArchiveEntryWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      userId_slug?: ArchiveEntryUserIdSlugCompoundUniqueInput;
      AND?: ArchiveEntryWhereInput | ArchiveEntryWhereInput[];
      OR?: ArchiveEntryWhereInput[];
      NOT?: ArchiveEntryWhereInput | ArchiveEntryWhereInput[];
      userId?: StringFilter<'ArchiveEntry'> | string;
      slug?: StringFilter<'ArchiveEntry'> | string;
      entity?: StringFilter<'ArchiveEntry'> | string;
      tags?: StringNullableListFilter<'ArchiveEntry'>;
      body?: StringFilter<'ArchiveEntry'> | string;
      createdAt?: DateTimeFilter<'ArchiveEntry'> | Date | string;
      updatedAt?: DateTimeFilter<'ArchiveEntry'> | Date | string;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
      outgoingLinks?: ArchiveLinkListRelationFilter;
      incomingLinks?: ArchiveLinkListRelationFilter;
      pinnedInChats?: ChatPinnedArchiveEntryListRelationFilter;
    },
    'id' | 'userId_slug'
  >;

  export type ArchiveEntryOrderByWithAggregationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    slug?: SortOrder;
    entity?: SortOrder;
    tags?: SortOrder;
    body?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: ArchiveEntryCountOrderByAggregateInput;
    _max?: ArchiveEntryMaxOrderByAggregateInput;
    _min?: ArchiveEntryMinOrderByAggregateInput;
  };

  export type ArchiveEntryScalarWhereWithAggregatesInput = {
    AND?:
      | ArchiveEntryScalarWhereWithAggregatesInput
      | ArchiveEntryScalarWhereWithAggregatesInput[];
    OR?: ArchiveEntryScalarWhereWithAggregatesInput[];
    NOT?:
      | ArchiveEntryScalarWhereWithAggregatesInput
      | ArchiveEntryScalarWhereWithAggregatesInput[];
    id?: UuidWithAggregatesFilter<'ArchiveEntry'> | string;
    userId?: StringWithAggregatesFilter<'ArchiveEntry'> | string;
    slug?: StringWithAggregatesFilter<'ArchiveEntry'> | string;
    entity?: StringWithAggregatesFilter<'ArchiveEntry'> | string;
    tags?: StringNullableListFilter<'ArchiveEntry'>;
    body?: StringWithAggregatesFilter<'ArchiveEntry'> | string;
    createdAt?: DateTimeWithAggregatesFilter<'ArchiveEntry'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'ArchiveEntry'> | Date | string;
  };

  export type ChatPinnedArchiveEntryWhereInput = {
    AND?: ChatPinnedArchiveEntryWhereInput | ChatPinnedArchiveEntryWhereInput[];
    OR?: ChatPinnedArchiveEntryWhereInput[];
    NOT?: ChatPinnedArchiveEntryWhereInput | ChatPinnedArchiveEntryWhereInput[];
    id?: UuidFilter<'ChatPinnedArchiveEntry'> | string;
    chatId?: UuidFilter<'ChatPinnedArchiveEntry'> | string;
    archiveEntryId?: UuidFilter<'ChatPinnedArchiveEntry'> | string;
    userId?: StringFilter<'ChatPinnedArchiveEntry'> | string;
    pinnedAt?: DateTimeFilter<'ChatPinnedArchiveEntry'> | Date | string;
    chat?: XOR<ChatScalarRelationFilter, ChatWhereInput>;
    archiveEntry?: XOR<
      ArchiveEntryScalarRelationFilter,
      ArchiveEntryWhereInput
    >;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
  };

  export type ChatPinnedArchiveEntryOrderByWithRelationInput = {
    id?: SortOrder;
    chatId?: SortOrder;
    archiveEntryId?: SortOrder;
    userId?: SortOrder;
    pinnedAt?: SortOrder;
    chat?: ChatOrderByWithRelationInput;
    archiveEntry?: ArchiveEntryOrderByWithRelationInput;
    user?: UserOrderByWithRelationInput;
  };

  export type ChatPinnedArchiveEntryWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      chatId_archiveEntryId?: ChatPinnedArchiveEntryChatIdArchiveEntryIdCompoundUniqueInput;
      AND?:
        | ChatPinnedArchiveEntryWhereInput
        | ChatPinnedArchiveEntryWhereInput[];
      OR?: ChatPinnedArchiveEntryWhereInput[];
      NOT?:
        | ChatPinnedArchiveEntryWhereInput
        | ChatPinnedArchiveEntryWhereInput[];
      chatId?: UuidFilter<'ChatPinnedArchiveEntry'> | string;
      archiveEntryId?: UuidFilter<'ChatPinnedArchiveEntry'> | string;
      userId?: StringFilter<'ChatPinnedArchiveEntry'> | string;
      pinnedAt?: DateTimeFilter<'ChatPinnedArchiveEntry'> | Date | string;
      chat?: XOR<ChatScalarRelationFilter, ChatWhereInput>;
      archiveEntry?: XOR<
        ArchiveEntryScalarRelationFilter,
        ArchiveEntryWhereInput
      >;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    },
    'id' | 'chatId_archiveEntryId'
  >;

  export type ChatPinnedArchiveEntryOrderByWithAggregationInput = {
    id?: SortOrder;
    chatId?: SortOrder;
    archiveEntryId?: SortOrder;
    userId?: SortOrder;
    pinnedAt?: SortOrder;
    _count?: ChatPinnedArchiveEntryCountOrderByAggregateInput;
    _max?: ChatPinnedArchiveEntryMaxOrderByAggregateInput;
    _min?: ChatPinnedArchiveEntryMinOrderByAggregateInput;
  };

  export type ChatPinnedArchiveEntryScalarWhereWithAggregatesInput = {
    AND?:
      | ChatPinnedArchiveEntryScalarWhereWithAggregatesInput
      | ChatPinnedArchiveEntryScalarWhereWithAggregatesInput[];
    OR?: ChatPinnedArchiveEntryScalarWhereWithAggregatesInput[];
    NOT?:
      | ChatPinnedArchiveEntryScalarWhereWithAggregatesInput
      | ChatPinnedArchiveEntryScalarWhereWithAggregatesInput[];
    id?: UuidWithAggregatesFilter<'ChatPinnedArchiveEntry'> | string;
    chatId?: UuidWithAggregatesFilter<'ChatPinnedArchiveEntry'> | string;
    archiveEntryId?:
      | UuidWithAggregatesFilter<'ChatPinnedArchiveEntry'>
      | string;
    userId?: StringWithAggregatesFilter<'ChatPinnedArchiveEntry'> | string;
    pinnedAt?:
      | DateTimeWithAggregatesFilter<'ChatPinnedArchiveEntry'>
      | Date
      | string;
  };

  export type ArchiveLinkWhereInput = {
    AND?: ArchiveLinkWhereInput | ArchiveLinkWhereInput[];
    OR?: ArchiveLinkWhereInput[];
    NOT?: ArchiveLinkWhereInput | ArchiveLinkWhereInput[];
    id?: UuidFilter<'ArchiveLink'> | string;
    sourceId?: UuidFilter<'ArchiveLink'> | string;
    targetId?: UuidFilter<'ArchiveLink'> | string;
    type?: StringFilter<'ArchiveLink'> | string;
    bidirectional?: BoolFilter<'ArchiveLink'> | boolean;
    createdAt?: DateTimeFilter<'ArchiveLink'> | Date | string;
    source?: XOR<ArchiveEntryScalarRelationFilter, ArchiveEntryWhereInput>;
    target?: XOR<ArchiveEntryScalarRelationFilter, ArchiveEntryWhereInput>;
  };

  export type ArchiveLinkOrderByWithRelationInput = {
    id?: SortOrder;
    sourceId?: SortOrder;
    targetId?: SortOrder;
    type?: SortOrder;
    bidirectional?: SortOrder;
    createdAt?: SortOrder;
    source?: ArchiveEntryOrderByWithRelationInput;
    target?: ArchiveEntryOrderByWithRelationInput;
  };

  export type ArchiveLinkWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: ArchiveLinkWhereInput | ArchiveLinkWhereInput[];
      OR?: ArchiveLinkWhereInput[];
      NOT?: ArchiveLinkWhereInput | ArchiveLinkWhereInput[];
      sourceId?: UuidFilter<'ArchiveLink'> | string;
      targetId?: UuidFilter<'ArchiveLink'> | string;
      type?: StringFilter<'ArchiveLink'> | string;
      bidirectional?: BoolFilter<'ArchiveLink'> | boolean;
      createdAt?: DateTimeFilter<'ArchiveLink'> | Date | string;
      source?: XOR<ArchiveEntryScalarRelationFilter, ArchiveEntryWhereInput>;
      target?: XOR<ArchiveEntryScalarRelationFilter, ArchiveEntryWhereInput>;
    },
    'id'
  >;

  export type ArchiveLinkOrderByWithAggregationInput = {
    id?: SortOrder;
    sourceId?: SortOrder;
    targetId?: SortOrder;
    type?: SortOrder;
    bidirectional?: SortOrder;
    createdAt?: SortOrder;
    _count?: ArchiveLinkCountOrderByAggregateInput;
    _max?: ArchiveLinkMaxOrderByAggregateInput;
    _min?: ArchiveLinkMinOrderByAggregateInput;
  };

  export type ArchiveLinkScalarWhereWithAggregatesInput = {
    AND?:
      | ArchiveLinkScalarWhereWithAggregatesInput
      | ArchiveLinkScalarWhereWithAggregatesInput[];
    OR?: ArchiveLinkScalarWhereWithAggregatesInput[];
    NOT?:
      | ArchiveLinkScalarWhereWithAggregatesInput
      | ArchiveLinkScalarWhereWithAggregatesInput[];
    id?: UuidWithAggregatesFilter<'ArchiveLink'> | string;
    sourceId?: UuidWithAggregatesFilter<'ArchiveLink'> | string;
    targetId?: UuidWithAggregatesFilter<'ArchiveLink'> | string;
    type?: StringWithAggregatesFilter<'ArchiveLink'> | string;
    bidirectional?: BoolWithAggregatesFilter<'ArchiveLink'> | boolean;
    createdAt?: DateTimeWithAggregatesFilter<'ArchiveLink'> | Date | string;
  };

  export type ProviderCreateInput = {
    id: string;
    apiKey: string;
  };

  export type ProviderUncheckedCreateInput = {
    id: string;
    apiKey: string;
  };

  export type ProviderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    apiKey?: StringFieldUpdateOperationsInput | string;
  };

  export type ProviderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    apiKey?: StringFieldUpdateOperationsInput | string;
  };

  export type ProviderCreateManyInput = {
    id: string;
    apiKey: string;
  };

  export type ProviderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    apiKey?: StringFieldUpdateOperationsInput | string;
  };

  export type ProviderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    apiKey?: StringFieldUpdateOperationsInput | string;
  };

  export type TierCreateInput = {
    id: string;
    modelIds?: TierCreatemodelIdsInput | string[];
    bucketCapacity: number;
    bucketRefillAmount: number;
    bucketRefillIntervalSeconds: number;
  };

  export type TierUncheckedCreateInput = {
    id: string;
    modelIds?: TierCreatemodelIdsInput | string[];
    bucketCapacity: number;
    bucketRefillAmount: number;
    bucketRefillIntervalSeconds: number;
  };

  export type TierUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    modelIds?: TierUpdatemodelIdsInput | string[];
    bucketCapacity?: IntFieldUpdateOperationsInput | number;
    bucketRefillAmount?: IntFieldUpdateOperationsInput | number;
    bucketRefillIntervalSeconds?: IntFieldUpdateOperationsInput | number;
  };

  export type TierUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    modelIds?: TierUpdatemodelIdsInput | string[];
    bucketCapacity?: IntFieldUpdateOperationsInput | number;
    bucketRefillAmount?: IntFieldUpdateOperationsInput | number;
    bucketRefillIntervalSeconds?: IntFieldUpdateOperationsInput | number;
  };

  export type TierCreateManyInput = {
    id: string;
    modelIds?: TierCreatemodelIdsInput | string[];
    bucketCapacity: number;
    bucketRefillAmount: number;
    bucketRefillIntervalSeconds: number;
  };

  export type TierUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    modelIds?: TierUpdatemodelIdsInput | string[];
    bucketCapacity?: IntFieldUpdateOperationsInput | number;
    bucketRefillAmount?: IntFieldUpdateOperationsInput | number;
    bucketRefillIntervalSeconds?: IntFieldUpdateOperationsInput | number;
  };

  export type TierUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    modelIds?: TierUpdatemodelIdsInput | string[];
    bucketCapacity?: IntFieldUpdateOperationsInput | number;
    bucketRefillAmount?: IntFieldUpdateOperationsInput | number;
    bucketRefillIntervalSeconds?: IntFieldUpdateOperationsInput | number;
  };

  export type UserCreateInput = {
    id: string;
    email: string;
    chats?: ChatCreateNestedManyWithoutUserInput;
    documents?: DocumentCreateNestedManyWithoutUserInput;
    suggestions?: SuggestionCreateNestedManyWithoutUserInput;
    archiveEntries?: ArchiveEntryCreateNestedManyWithoutUserInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryCreateNestedManyWithoutUserInput;
    rateLimit?: UserRateLimitCreateNestedOneWithoutUserInput;
    agents?: AgentCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateInput = {
    id: string;
    email: string;
    chats?: ChatUncheckedCreateNestedManyWithoutUserInput;
    documents?: DocumentUncheckedCreateNestedManyWithoutUserInput;
    suggestions?: SuggestionUncheckedCreateNestedManyWithoutUserInput;
    archiveEntries?: ArchiveEntryUncheckedCreateNestedManyWithoutUserInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryUncheckedCreateNestedManyWithoutUserInput;
    rateLimit?: UserRateLimitUncheckedCreateNestedOneWithoutUserInput;
    agents?: AgentUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    chats?: ChatUpdateManyWithoutUserNestedInput;
    documents?: DocumentUpdateManyWithoutUserNestedInput;
    suggestions?: SuggestionUpdateManyWithoutUserNestedInput;
    archiveEntries?: ArchiveEntryUpdateManyWithoutUserNestedInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryUpdateManyWithoutUserNestedInput;
    rateLimit?: UserRateLimitUpdateOneWithoutUserNestedInput;
    agents?: AgentUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    chats?: ChatUncheckedUpdateManyWithoutUserNestedInput;
    documents?: DocumentUncheckedUpdateManyWithoutUserNestedInput;
    suggestions?: SuggestionUncheckedUpdateManyWithoutUserNestedInput;
    archiveEntries?: ArchiveEntryUncheckedUpdateManyWithoutUserNestedInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryUncheckedUpdateManyWithoutUserNestedInput;
    rateLimit?: UserRateLimitUncheckedUpdateOneWithoutUserNestedInput;
    agents?: AgentUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type UserCreateManyInput = {
    id: string;
    email: string;
  };

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
  };

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
  };

  export type UserRateLimitCreateInput = {
    tokens: number;
    lastRefill: Date | string;
    user: UserCreateNestedOneWithoutRateLimitInput;
  };

  export type UserRateLimitUncheckedCreateInput = {
    userId: string;
    tokens: number;
    lastRefill: Date | string;
  };

  export type UserRateLimitUpdateInput = {
    tokens?: IntFieldUpdateOperationsInput | number;
    lastRefill?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutRateLimitNestedInput;
  };

  export type UserRateLimitUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string;
    tokens?: IntFieldUpdateOperationsInput | number;
    lastRefill?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserRateLimitCreateManyInput = {
    userId: string;
    tokens: number;
    lastRefill: Date | string;
  };

  export type UserRateLimitUpdateManyMutationInput = {
    tokens?: IntFieldUpdateOperationsInput | number;
    lastRefill?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserRateLimitUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string;
    tokens?: IntFieldUpdateOperationsInput | number;
    lastRefill?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AgentCreateInput = {
    id?: string;
    name: string;
    description?: string | null;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutAgentsInput;
  };

  export type AgentUncheckedCreateInput = {
    id?: string;
    userId: string;
    name: string;
    description?: string | null;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type AgentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutAgentsNestedInput;
  };

  export type AgentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AgentCreateManyInput = {
    id?: string;
    userId: string;
    name: string;
    description?: string | null;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type AgentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AgentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ChatCreateInput = {
    id?: string;
    createdAt: Date | string;
    title: string;
    visibility?: string;
    lastContext?: NullableJsonNullValueInput | InputJsonValue;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    parentChatId?: string | null;
    forkedFromMessageId?: string | null;
    forkDepth?: number;
    user: UserCreateNestedOneWithoutChatsInput;
    messages?: MessageCreateNestedManyWithoutChatInput;
    votes?: VoteCreateNestedManyWithoutChatInput;
    streams?: StreamCreateNestedManyWithoutChatInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryCreateNestedManyWithoutChatInput;
  };

  export type ChatUncheckedCreateInput = {
    id?: string;
    createdAt: Date | string;
    title: string;
    userId: string;
    visibility?: string;
    lastContext?: NullableJsonNullValueInput | InputJsonValue;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    parentChatId?: string | null;
    forkedFromMessageId?: string | null;
    forkDepth?: number;
    messages?: MessageUncheckedCreateNestedManyWithoutChatInput;
    votes?: VoteUncheckedCreateNestedManyWithoutChatInput;
    streams?: StreamUncheckedCreateNestedManyWithoutChatInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryUncheckedCreateNestedManyWithoutChatInput;
  };

  export type ChatUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: StringFieldUpdateOperationsInput | string;
    visibility?: StringFieldUpdateOperationsInput | string;
    lastContext?: NullableJsonNullValueInput | InputJsonValue;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    parentChatId?: NullableStringFieldUpdateOperationsInput | string | null;
    forkedFromMessageId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    forkDepth?: IntFieldUpdateOperationsInput | number;
    user?: UserUpdateOneRequiredWithoutChatsNestedInput;
    messages?: MessageUpdateManyWithoutChatNestedInput;
    votes?: VoteUpdateManyWithoutChatNestedInput;
    streams?: StreamUpdateManyWithoutChatNestedInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryUpdateManyWithoutChatNestedInput;
  };

  export type ChatUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    visibility?: StringFieldUpdateOperationsInput | string;
    lastContext?: NullableJsonNullValueInput | InputJsonValue;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    parentChatId?: NullableStringFieldUpdateOperationsInput | string | null;
    forkedFromMessageId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    forkDepth?: IntFieldUpdateOperationsInput | number;
    messages?: MessageUncheckedUpdateManyWithoutChatNestedInput;
    votes?: VoteUncheckedUpdateManyWithoutChatNestedInput;
    streams?: StreamUncheckedUpdateManyWithoutChatNestedInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryUncheckedUpdateManyWithoutChatNestedInput;
  };

  export type ChatCreateManyInput = {
    id?: string;
    createdAt: Date | string;
    title: string;
    userId: string;
    visibility?: string;
    lastContext?: NullableJsonNullValueInput | InputJsonValue;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    parentChatId?: string | null;
    forkedFromMessageId?: string | null;
    forkDepth?: number;
  };

  export type ChatUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: StringFieldUpdateOperationsInput | string;
    visibility?: StringFieldUpdateOperationsInput | string;
    lastContext?: NullableJsonNullValueInput | InputJsonValue;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    parentChatId?: NullableStringFieldUpdateOperationsInput | string | null;
    forkedFromMessageId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    forkDepth?: IntFieldUpdateOperationsInput | number;
  };

  export type ChatUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    visibility?: StringFieldUpdateOperationsInput | string;
    lastContext?: NullableJsonNullValueInput | InputJsonValue;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    parentChatId?: NullableStringFieldUpdateOperationsInput | string | null;
    forkedFromMessageId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    forkDepth?: IntFieldUpdateOperationsInput | number;
  };

  export type MessageCreateInput = {
    id?: string;
    role: string;
    parts: JsonNullValueInput | InputJsonValue;
    attachments: JsonNullValueInput | InputJsonValue;
    createdAt: Date | string;
    chat: ChatCreateNestedOneWithoutMessagesInput;
    votes?: VoteCreateNestedManyWithoutMessageInput;
  };

  export type MessageUncheckedCreateInput = {
    id?: string;
    chatId: string;
    role: string;
    parts: JsonNullValueInput | InputJsonValue;
    attachments: JsonNullValueInput | InputJsonValue;
    createdAt: Date | string;
    votes?: VoteUncheckedCreateNestedManyWithoutMessageInput;
  };

  export type MessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    parts?: JsonNullValueInput | InputJsonValue;
    attachments?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    chat?: ChatUpdateOneRequiredWithoutMessagesNestedInput;
    votes?: VoteUpdateManyWithoutMessageNestedInput;
  };

  export type MessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    chatId?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    parts?: JsonNullValueInput | InputJsonValue;
    attachments?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    votes?: VoteUncheckedUpdateManyWithoutMessageNestedInput;
  };

  export type MessageCreateManyInput = {
    id?: string;
    chatId: string;
    role: string;
    parts: JsonNullValueInput | InputJsonValue;
    attachments: JsonNullValueInput | InputJsonValue;
    createdAt: Date | string;
  };

  export type MessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    parts?: JsonNullValueInput | InputJsonValue;
    attachments?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type MessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    chatId?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    parts?: JsonNullValueInput | InputJsonValue;
    attachments?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type VoteCreateInput = {
    isUpvoted: boolean;
    message: MessageCreateNestedOneWithoutVotesInput;
    chat: ChatCreateNestedOneWithoutVotesInput;
  };

  export type VoteUncheckedCreateInput = {
    chatId: string;
    messageId: string;
    isUpvoted: boolean;
  };

  export type VoteUpdateInput = {
    isUpvoted?: BoolFieldUpdateOperationsInput | boolean;
    message?: MessageUpdateOneRequiredWithoutVotesNestedInput;
    chat?: ChatUpdateOneRequiredWithoutVotesNestedInput;
  };

  export type VoteUncheckedUpdateInput = {
    chatId?: StringFieldUpdateOperationsInput | string;
    messageId?: StringFieldUpdateOperationsInput | string;
    isUpvoted?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type VoteCreateManyInput = {
    chatId: string;
    messageId: string;
    isUpvoted: boolean;
  };

  export type VoteUpdateManyMutationInput = {
    isUpvoted?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type VoteUncheckedUpdateManyInput = {
    chatId?: StringFieldUpdateOperationsInput | string;
    messageId?: StringFieldUpdateOperationsInput | string;
    isUpvoted?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type DocumentCreateInput = {
    id: string;
    createdAt: Date | string;
    title: string;
    content?: string | null;
    kind?: string;
    user: UserCreateNestedOneWithoutDocumentsInput;
    suggestions?: SuggestionCreateNestedManyWithoutDocumentInput;
  };

  export type DocumentUncheckedCreateInput = {
    id: string;
    createdAt: Date | string;
    title: string;
    content?: string | null;
    kind?: string;
    userId: string;
    suggestions?: SuggestionUncheckedCreateNestedManyWithoutDocumentInput;
  };

  export type DocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: StringFieldUpdateOperationsInput | string;
    content?: NullableStringFieldUpdateOperationsInput | string | null;
    kind?: StringFieldUpdateOperationsInput | string;
    user?: UserUpdateOneRequiredWithoutDocumentsNestedInput;
    suggestions?: SuggestionUpdateManyWithoutDocumentNestedInput;
  };

  export type DocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: StringFieldUpdateOperationsInput | string;
    content?: NullableStringFieldUpdateOperationsInput | string | null;
    kind?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    suggestions?: SuggestionUncheckedUpdateManyWithoutDocumentNestedInput;
  };

  export type DocumentCreateManyInput = {
    id: string;
    createdAt: Date | string;
    title: string;
    content?: string | null;
    kind?: string;
    userId: string;
  };

  export type DocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: StringFieldUpdateOperationsInput | string;
    content?: NullableStringFieldUpdateOperationsInput | string | null;
    kind?: StringFieldUpdateOperationsInput | string;
  };

  export type DocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: StringFieldUpdateOperationsInput | string;
    content?: NullableStringFieldUpdateOperationsInput | string | null;
    kind?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
  };

  export type SuggestionCreateInput = {
    id?: string;
    originalText: string;
    suggestedText: string;
    description?: string | null;
    isResolved?: boolean;
    createdAt: Date | string;
    user: UserCreateNestedOneWithoutSuggestionsInput;
    document: DocumentCreateNestedOneWithoutSuggestionsInput;
  };

  export type SuggestionUncheckedCreateInput = {
    id?: string;
    documentId: string;
    documentCreatedAt: Date | string;
    originalText: string;
    suggestedText: string;
    description?: string | null;
    isResolved?: boolean;
    userId: string;
    createdAt: Date | string;
  };

  export type SuggestionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    originalText?: StringFieldUpdateOperationsInput | string;
    suggestedText?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    isResolved?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutSuggestionsNestedInput;
    document?: DocumentUpdateOneRequiredWithoutSuggestionsNestedInput;
  };

  export type SuggestionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    documentId?: StringFieldUpdateOperationsInput | string;
    documentCreatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    originalText?: StringFieldUpdateOperationsInput | string;
    suggestedText?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    isResolved?: BoolFieldUpdateOperationsInput | boolean;
    userId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SuggestionCreateManyInput = {
    id?: string;
    documentId: string;
    documentCreatedAt: Date | string;
    originalText: string;
    suggestedText: string;
    description?: string | null;
    isResolved?: boolean;
    userId: string;
    createdAt: Date | string;
  };

  export type SuggestionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    originalText?: StringFieldUpdateOperationsInput | string;
    suggestedText?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    isResolved?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SuggestionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    documentId?: StringFieldUpdateOperationsInput | string;
    documentCreatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    originalText?: StringFieldUpdateOperationsInput | string;
    suggestedText?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    isResolved?: BoolFieldUpdateOperationsInput | boolean;
    userId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type StreamCreateInput = {
    id?: string;
    createdAt: Date | string;
    chat: ChatCreateNestedOneWithoutStreamsInput;
  };

  export type StreamUncheckedCreateInput = {
    id?: string;
    chatId: string;
    createdAt: Date | string;
  };

  export type StreamUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    chat?: ChatUpdateOneRequiredWithoutStreamsNestedInput;
  };

  export type StreamUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    chatId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type StreamCreateManyInput = {
    id?: string;
    chatId: string;
    createdAt: Date | string;
  };

  export type StreamUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type StreamUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    chatId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ArchiveEntryCreateInput = {
    id?: string;
    slug: string;
    entity: string;
    tags?: ArchiveEntryCreatetagsInput | string[];
    body: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutArchiveEntriesInput;
    outgoingLinks?: ArchiveLinkCreateNestedManyWithoutSourceInput;
    incomingLinks?: ArchiveLinkCreateNestedManyWithoutTargetInput;
    pinnedInChats?: ChatPinnedArchiveEntryCreateNestedManyWithoutArchiveEntryInput;
  };

  export type ArchiveEntryUncheckedCreateInput = {
    id?: string;
    userId: string;
    slug: string;
    entity: string;
    tags?: ArchiveEntryCreatetagsInput | string[];
    body: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    outgoingLinks?: ArchiveLinkUncheckedCreateNestedManyWithoutSourceInput;
    incomingLinks?: ArchiveLinkUncheckedCreateNestedManyWithoutTargetInput;
    pinnedInChats?: ChatPinnedArchiveEntryUncheckedCreateNestedManyWithoutArchiveEntryInput;
  };

  export type ArchiveEntryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    entity?: StringFieldUpdateOperationsInput | string;
    tags?: ArchiveEntryUpdatetagsInput | string[];
    body?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutArchiveEntriesNestedInput;
    outgoingLinks?: ArchiveLinkUpdateManyWithoutSourceNestedInput;
    incomingLinks?: ArchiveLinkUpdateManyWithoutTargetNestedInput;
    pinnedInChats?: ChatPinnedArchiveEntryUpdateManyWithoutArchiveEntryNestedInput;
  };

  export type ArchiveEntryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    entity?: StringFieldUpdateOperationsInput | string;
    tags?: ArchiveEntryUpdatetagsInput | string[];
    body?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    outgoingLinks?: ArchiveLinkUncheckedUpdateManyWithoutSourceNestedInput;
    incomingLinks?: ArchiveLinkUncheckedUpdateManyWithoutTargetNestedInput;
    pinnedInChats?: ChatPinnedArchiveEntryUncheckedUpdateManyWithoutArchiveEntryNestedInput;
  };

  export type ArchiveEntryCreateManyInput = {
    id?: string;
    userId: string;
    slug: string;
    entity: string;
    tags?: ArchiveEntryCreatetagsInput | string[];
    body: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ArchiveEntryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    entity?: StringFieldUpdateOperationsInput | string;
    tags?: ArchiveEntryUpdatetagsInput | string[];
    body?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ArchiveEntryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    entity?: StringFieldUpdateOperationsInput | string;
    tags?: ArchiveEntryUpdatetagsInput | string[];
    body?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ChatPinnedArchiveEntryCreateInput = {
    id?: string;
    pinnedAt?: Date | string;
    chat: ChatCreateNestedOneWithoutPinnedArchiveEntriesInput;
    archiveEntry: ArchiveEntryCreateNestedOneWithoutPinnedInChatsInput;
    user: UserCreateNestedOneWithoutPinnedArchiveEntriesInput;
  };

  export type ChatPinnedArchiveEntryUncheckedCreateInput = {
    id?: string;
    chatId: string;
    archiveEntryId: string;
    userId: string;
    pinnedAt?: Date | string;
  };

  export type ChatPinnedArchiveEntryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    pinnedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    chat?: ChatUpdateOneRequiredWithoutPinnedArchiveEntriesNestedInput;
    archiveEntry?: ArchiveEntryUpdateOneRequiredWithoutPinnedInChatsNestedInput;
    user?: UserUpdateOneRequiredWithoutPinnedArchiveEntriesNestedInput;
  };

  export type ChatPinnedArchiveEntryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    chatId?: StringFieldUpdateOperationsInput | string;
    archiveEntryId?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    pinnedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ChatPinnedArchiveEntryCreateManyInput = {
    id?: string;
    chatId: string;
    archiveEntryId: string;
    userId: string;
    pinnedAt?: Date | string;
  };

  export type ChatPinnedArchiveEntryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    pinnedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ChatPinnedArchiveEntryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    chatId?: StringFieldUpdateOperationsInput | string;
    archiveEntryId?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    pinnedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ArchiveLinkCreateInput = {
    id?: string;
    type: string;
    bidirectional?: boolean;
    createdAt?: Date | string;
    source: ArchiveEntryCreateNestedOneWithoutOutgoingLinksInput;
    target: ArchiveEntryCreateNestedOneWithoutIncomingLinksInput;
  };

  export type ArchiveLinkUncheckedCreateInput = {
    id?: string;
    sourceId: string;
    targetId: string;
    type: string;
    bidirectional?: boolean;
    createdAt?: Date | string;
  };

  export type ArchiveLinkUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    bidirectional?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    source?: ArchiveEntryUpdateOneRequiredWithoutOutgoingLinksNestedInput;
    target?: ArchiveEntryUpdateOneRequiredWithoutIncomingLinksNestedInput;
  };

  export type ArchiveLinkUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sourceId?: StringFieldUpdateOperationsInput | string;
    targetId?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    bidirectional?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ArchiveLinkCreateManyInput = {
    id?: string;
    sourceId: string;
    targetId: string;
    type: string;
    bidirectional?: boolean;
    createdAt?: Date | string;
  };

  export type ArchiveLinkUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    bidirectional?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ArchiveLinkUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sourceId?: StringFieldUpdateOperationsInput | string;
    targetId?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    bidirectional?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type ProviderCountOrderByAggregateInput = {
    id?: SortOrder;
    apiKey?: SortOrder;
  };

  export type ProviderMaxOrderByAggregateInput = {
    id?: SortOrder;
    apiKey?: SortOrder;
  };

  export type ProviderMinOrderByAggregateInput = {
    id?: SortOrder;
    apiKey?: SortOrder;
  };

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    has?: string | StringFieldRefInput<$PrismaModel> | null;
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>;
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
  };

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type TierCountOrderByAggregateInput = {
    id?: SortOrder;
    modelIds?: SortOrder;
    bucketCapacity?: SortOrder;
    bucketRefillAmount?: SortOrder;
    bucketRefillIntervalSeconds?: SortOrder;
  };

  export type TierAvgOrderByAggregateInput = {
    bucketCapacity?: SortOrder;
    bucketRefillAmount?: SortOrder;
    bucketRefillIntervalSeconds?: SortOrder;
  };

  export type TierMaxOrderByAggregateInput = {
    id?: SortOrder;
    bucketCapacity?: SortOrder;
    bucketRefillAmount?: SortOrder;
    bucketRefillIntervalSeconds?: SortOrder;
  };

  export type TierMinOrderByAggregateInput = {
    id?: SortOrder;
    bucketCapacity?: SortOrder;
    bucketRefillAmount?: SortOrder;
    bucketRefillIntervalSeconds?: SortOrder;
  };

  export type TierSumOrderByAggregateInput = {
    bucketCapacity?: SortOrder;
    bucketRefillAmount?: SortOrder;
    bucketRefillIntervalSeconds?: SortOrder;
  };

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type ChatListRelationFilter = {
    every?: ChatWhereInput;
    some?: ChatWhereInput;
    none?: ChatWhereInput;
  };

  export type DocumentListRelationFilter = {
    every?: DocumentWhereInput;
    some?: DocumentWhereInput;
    none?: DocumentWhereInput;
  };

  export type SuggestionListRelationFilter = {
    every?: SuggestionWhereInput;
    some?: SuggestionWhereInput;
    none?: SuggestionWhereInput;
  };

  export type ArchiveEntryListRelationFilter = {
    every?: ArchiveEntryWhereInput;
    some?: ArchiveEntryWhereInput;
    none?: ArchiveEntryWhereInput;
  };

  export type ChatPinnedArchiveEntryListRelationFilter = {
    every?: ChatPinnedArchiveEntryWhereInput;
    some?: ChatPinnedArchiveEntryWhereInput;
    none?: ChatPinnedArchiveEntryWhereInput;
  };

  export type UserRateLimitNullableScalarRelationFilter = {
    is?: UserRateLimitWhereInput | null;
    isNot?: UserRateLimitWhereInput | null;
  };

  export type AgentListRelationFilter = {
    every?: AgentWhereInput;
    some?: AgentWhereInput;
    none?: AgentWhereInput;
  };

  export type ChatOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type DocumentOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type SuggestionOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type ArchiveEntryOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type ChatPinnedArchiveEntryOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type AgentOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder;
    email?: SortOrder;
  };

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder;
    email?: SortOrder;
  };

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder;
    email?: SortOrder;
  };

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type UserScalarRelationFilter = {
    is?: UserWhereInput;
    isNot?: UserWhereInput;
  };

  export type UserRateLimitCountOrderByAggregateInput = {
    userId?: SortOrder;
    tokens?: SortOrder;
    lastRefill?: SortOrder;
  };

  export type UserRateLimitAvgOrderByAggregateInput = {
    tokens?: SortOrder;
  };

  export type UserRateLimitMaxOrderByAggregateInput = {
    userId?: SortOrder;
    tokens?: SortOrder;
    lastRefill?: SortOrder;
  };

  export type UserRateLimitMinOrderByAggregateInput = {
    userId?: SortOrder;
    tokens?: SortOrder;
    lastRefill?: SortOrder;
  };

  export type UserRateLimitSumOrderByAggregateInput = {
    tokens?: SortOrder;
  };

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedUuidFilter<$PrismaModel> | string;
  };

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonNullableFilterBase<$PrismaModel>>,
          Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<
        Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>
      >;

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    path?: string[];
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
  };

  export type SortOrderInput = {
    sort: SortOrder;
    nulls?: NullsOrder;
  };

  export type AgentCountOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    settings?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type AgentMaxOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type AgentMinOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    name?: SortOrder;
    description?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?:
      | NestedStringNullableWithAggregatesFilter<$PrismaModel>
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>,
          Exclude<
            keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>,
            'path'
          >
        >,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<
        Omit<
          Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>,
          'path'
        >
      >;

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    path?: string[];
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedJsonNullableFilter<$PrismaModel>;
    _max?: NestedJsonNullableFilter<$PrismaModel>;
  };

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null;
  };

  export type MessageListRelationFilter = {
    every?: MessageWhereInput;
    some?: MessageWhereInput;
    none?: MessageWhereInput;
  };

  export type VoteListRelationFilter = {
    every?: VoteWhereInput;
    some?: VoteWhereInput;
    none?: VoteWhereInput;
  };

  export type StreamListRelationFilter = {
    every?: StreamWhereInput;
    some?: StreamWhereInput;
    none?: StreamWhereInput;
  };

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type VoteOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type StreamOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type ChatCountOrderByAggregateInput = {
    id?: SortOrder;
    createdAt?: SortOrder;
    title?: SortOrder;
    userId?: SortOrder;
    visibility?: SortOrder;
    lastContext?: SortOrder;
    settings?: SortOrder;
    parentChatId?: SortOrder;
    forkedFromMessageId?: SortOrder;
    forkDepth?: SortOrder;
  };

  export type ChatAvgOrderByAggregateInput = {
    forkDepth?: SortOrder;
  };

  export type ChatMaxOrderByAggregateInput = {
    id?: SortOrder;
    createdAt?: SortOrder;
    title?: SortOrder;
    userId?: SortOrder;
    visibility?: SortOrder;
    parentChatId?: SortOrder;
    forkedFromMessageId?: SortOrder;
    forkDepth?: SortOrder;
  };

  export type ChatMinOrderByAggregateInput = {
    id?: SortOrder;
    createdAt?: SortOrder;
    title?: SortOrder;
    userId?: SortOrder;
    visibility?: SortOrder;
    parentChatId?: SortOrder;
    forkedFromMessageId?: SortOrder;
    forkDepth?: SortOrder;
  };

  export type ChatSumOrderByAggregateInput = {
    forkDepth?: SortOrder;
  };

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonFilterBase<$PrismaModel>>,
          Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>;

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    path?: string[];
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
  };

  export type ChatScalarRelationFilter = {
    is?: ChatWhereInput;
    isNot?: ChatWhereInput;
  };

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder;
    chatId?: SortOrder;
    role?: SortOrder;
    parts?: SortOrder;
    attachments?: SortOrder;
    createdAt?: SortOrder;
  };

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder;
    chatId?: SortOrder;
    role?: SortOrder;
    createdAt?: SortOrder;
  };

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder;
    chatId?: SortOrder;
    role?: SortOrder;
    createdAt?: SortOrder;
  };
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonWithAggregatesFilterBase<$PrismaModel>>,
          Exclude<
            keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>,
            'path'
          >
        >,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<
        Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>
      >;

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    path?: string[];
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedJsonFilter<$PrismaModel>;
    _max?: NestedJsonFilter<$PrismaModel>;
  };

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type MessageScalarRelationFilter = {
    is?: MessageWhereInput;
    isNot?: MessageWhereInput;
  };

  export type VoteChatIdMessageIdCompoundUniqueInput = {
    chatId: string;
    messageId: string;
  };

  export type VoteCountOrderByAggregateInput = {
    chatId?: SortOrder;
    messageId?: SortOrder;
    isUpvoted?: SortOrder;
  };

  export type VoteMaxOrderByAggregateInput = {
    chatId?: SortOrder;
    messageId?: SortOrder;
    isUpvoted?: SortOrder;
  };

  export type VoteMinOrderByAggregateInput = {
    chatId?: SortOrder;
    messageId?: SortOrder;
    isUpvoted?: SortOrder;
  };

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type DocumentIdCreatedAtCompoundUniqueInput = {
    id: string;
    createdAt: Date | string;
  };

  export type DocumentCountOrderByAggregateInput = {
    id?: SortOrder;
    createdAt?: SortOrder;
    title?: SortOrder;
    content?: SortOrder;
    kind?: SortOrder;
    userId?: SortOrder;
  };

  export type DocumentMaxOrderByAggregateInput = {
    id?: SortOrder;
    createdAt?: SortOrder;
    title?: SortOrder;
    content?: SortOrder;
    kind?: SortOrder;
    userId?: SortOrder;
  };

  export type DocumentMinOrderByAggregateInput = {
    id?: SortOrder;
    createdAt?: SortOrder;
    title?: SortOrder;
    content?: SortOrder;
    kind?: SortOrder;
    userId?: SortOrder;
  };

  export type DocumentScalarRelationFilter = {
    is?: DocumentWhereInput;
    isNot?: DocumentWhereInput;
  };

  export type SuggestionCountOrderByAggregateInput = {
    id?: SortOrder;
    documentId?: SortOrder;
    documentCreatedAt?: SortOrder;
    originalText?: SortOrder;
    suggestedText?: SortOrder;
    description?: SortOrder;
    isResolved?: SortOrder;
    userId?: SortOrder;
    createdAt?: SortOrder;
  };

  export type SuggestionMaxOrderByAggregateInput = {
    id?: SortOrder;
    documentId?: SortOrder;
    documentCreatedAt?: SortOrder;
    originalText?: SortOrder;
    suggestedText?: SortOrder;
    description?: SortOrder;
    isResolved?: SortOrder;
    userId?: SortOrder;
    createdAt?: SortOrder;
  };

  export type SuggestionMinOrderByAggregateInput = {
    id?: SortOrder;
    documentId?: SortOrder;
    documentCreatedAt?: SortOrder;
    originalText?: SortOrder;
    suggestedText?: SortOrder;
    description?: SortOrder;
    isResolved?: SortOrder;
    userId?: SortOrder;
    createdAt?: SortOrder;
  };

  export type StreamCountOrderByAggregateInput = {
    id?: SortOrder;
    chatId?: SortOrder;
    createdAt?: SortOrder;
  };

  export type StreamMaxOrderByAggregateInput = {
    id?: SortOrder;
    chatId?: SortOrder;
    createdAt?: SortOrder;
  };

  export type StreamMinOrderByAggregateInput = {
    id?: SortOrder;
    chatId?: SortOrder;
    createdAt?: SortOrder;
  };

  export type ArchiveLinkListRelationFilter = {
    every?: ArchiveLinkWhereInput;
    some?: ArchiveLinkWhereInput;
    none?: ArchiveLinkWhereInput;
  };

  export type ArchiveLinkOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type ArchiveEntryUserIdSlugCompoundUniqueInput = {
    userId: string;
    slug: string;
  };

  export type ArchiveEntryCountOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    slug?: SortOrder;
    entity?: SortOrder;
    tags?: SortOrder;
    body?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ArchiveEntryMaxOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    slug?: SortOrder;
    entity?: SortOrder;
    body?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ArchiveEntryMinOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    slug?: SortOrder;
    entity?: SortOrder;
    body?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ArchiveEntryScalarRelationFilter = {
    is?: ArchiveEntryWhereInput;
    isNot?: ArchiveEntryWhereInput;
  };

  export type ChatPinnedArchiveEntryChatIdArchiveEntryIdCompoundUniqueInput = {
    chatId: string;
    archiveEntryId: string;
  };

  export type ChatPinnedArchiveEntryCountOrderByAggregateInput = {
    id?: SortOrder;
    chatId?: SortOrder;
    archiveEntryId?: SortOrder;
    userId?: SortOrder;
    pinnedAt?: SortOrder;
  };

  export type ChatPinnedArchiveEntryMaxOrderByAggregateInput = {
    id?: SortOrder;
    chatId?: SortOrder;
    archiveEntryId?: SortOrder;
    userId?: SortOrder;
    pinnedAt?: SortOrder;
  };

  export type ChatPinnedArchiveEntryMinOrderByAggregateInput = {
    id?: SortOrder;
    chatId?: SortOrder;
    archiveEntryId?: SortOrder;
    userId?: SortOrder;
    pinnedAt?: SortOrder;
  };

  export type ArchiveLinkCountOrderByAggregateInput = {
    id?: SortOrder;
    sourceId?: SortOrder;
    targetId?: SortOrder;
    type?: SortOrder;
    bidirectional?: SortOrder;
    createdAt?: SortOrder;
  };

  export type ArchiveLinkMaxOrderByAggregateInput = {
    id?: SortOrder;
    sourceId?: SortOrder;
    targetId?: SortOrder;
    type?: SortOrder;
    bidirectional?: SortOrder;
    createdAt?: SortOrder;
  };

  export type ArchiveLinkMinOrderByAggregateInput = {
    id?: SortOrder;
    sourceId?: SortOrder;
    targetId?: SortOrder;
    type?: SortOrder;
    bidirectional?: SortOrder;
    createdAt?: SortOrder;
  };

  export type StringFieldUpdateOperationsInput = {
    set?: string;
  };

  export type TierCreatemodelIdsInput = {
    set: string[];
  };

  export type TierUpdatemodelIdsInput = {
    set?: string[];
    push?: string | string[];
  };

  export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type ChatCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<ChatCreateWithoutUserInput, ChatUncheckedCreateWithoutUserInput>
      | ChatCreateWithoutUserInput[]
      | ChatUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | ChatCreateOrConnectWithoutUserInput
      | ChatCreateOrConnectWithoutUserInput[];
    createMany?: ChatCreateManyUserInputEnvelope;
    connect?: ChatWhereUniqueInput | ChatWhereUniqueInput[];
  };

  export type DocumentCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          DocumentCreateWithoutUserInput,
          DocumentUncheckedCreateWithoutUserInput
        >
      | DocumentCreateWithoutUserInput[]
      | DocumentUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | DocumentCreateOrConnectWithoutUserInput
      | DocumentCreateOrConnectWithoutUserInput[];
    createMany?: DocumentCreateManyUserInputEnvelope;
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[];
  };

  export type SuggestionCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          SuggestionCreateWithoutUserInput,
          SuggestionUncheckedCreateWithoutUserInput
        >
      | SuggestionCreateWithoutUserInput[]
      | SuggestionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | SuggestionCreateOrConnectWithoutUserInput
      | SuggestionCreateOrConnectWithoutUserInput[];
    createMany?: SuggestionCreateManyUserInputEnvelope;
    connect?: SuggestionWhereUniqueInput | SuggestionWhereUniqueInput[];
  };

  export type ArchiveEntryCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          ArchiveEntryCreateWithoutUserInput,
          ArchiveEntryUncheckedCreateWithoutUserInput
        >
      | ArchiveEntryCreateWithoutUserInput[]
      | ArchiveEntryUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | ArchiveEntryCreateOrConnectWithoutUserInput
      | ArchiveEntryCreateOrConnectWithoutUserInput[];
    createMany?: ArchiveEntryCreateManyUserInputEnvelope;
    connect?: ArchiveEntryWhereUniqueInput | ArchiveEntryWhereUniqueInput[];
  };

  export type ChatPinnedArchiveEntryCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          ChatPinnedArchiveEntryCreateWithoutUserInput,
          ChatPinnedArchiveEntryUncheckedCreateWithoutUserInput
        >
      | ChatPinnedArchiveEntryCreateWithoutUserInput[]
      | ChatPinnedArchiveEntryUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | ChatPinnedArchiveEntryCreateOrConnectWithoutUserInput
      | ChatPinnedArchiveEntryCreateOrConnectWithoutUserInput[];
    createMany?: ChatPinnedArchiveEntryCreateManyUserInputEnvelope;
    connect?:
      | ChatPinnedArchiveEntryWhereUniqueInput
      | ChatPinnedArchiveEntryWhereUniqueInput[];
  };

  export type UserRateLimitCreateNestedOneWithoutUserInput = {
    create?: XOR<
      UserRateLimitCreateWithoutUserInput,
      UserRateLimitUncheckedCreateWithoutUserInput
    >;
    connectOrCreate?: UserRateLimitCreateOrConnectWithoutUserInput;
    connect?: UserRateLimitWhereUniqueInput;
  };

  export type AgentCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<AgentCreateWithoutUserInput, AgentUncheckedCreateWithoutUserInput>
      | AgentCreateWithoutUserInput[]
      | AgentUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AgentCreateOrConnectWithoutUserInput
      | AgentCreateOrConnectWithoutUserInput[];
    createMany?: AgentCreateManyUserInputEnvelope;
    connect?: AgentWhereUniqueInput | AgentWhereUniqueInput[];
  };

  export type ChatUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<ChatCreateWithoutUserInput, ChatUncheckedCreateWithoutUserInput>
      | ChatCreateWithoutUserInput[]
      | ChatUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | ChatCreateOrConnectWithoutUserInput
      | ChatCreateOrConnectWithoutUserInput[];
    createMany?: ChatCreateManyUserInputEnvelope;
    connect?: ChatWhereUniqueInput | ChatWhereUniqueInput[];
  };

  export type DocumentUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          DocumentCreateWithoutUserInput,
          DocumentUncheckedCreateWithoutUserInput
        >
      | DocumentCreateWithoutUserInput[]
      | DocumentUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | DocumentCreateOrConnectWithoutUserInput
      | DocumentCreateOrConnectWithoutUserInput[];
    createMany?: DocumentCreateManyUserInputEnvelope;
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[];
  };

  export type SuggestionUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          SuggestionCreateWithoutUserInput,
          SuggestionUncheckedCreateWithoutUserInput
        >
      | SuggestionCreateWithoutUserInput[]
      | SuggestionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | SuggestionCreateOrConnectWithoutUserInput
      | SuggestionCreateOrConnectWithoutUserInput[];
    createMany?: SuggestionCreateManyUserInputEnvelope;
    connect?: SuggestionWhereUniqueInput | SuggestionWhereUniqueInput[];
  };

  export type ArchiveEntryUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          ArchiveEntryCreateWithoutUserInput,
          ArchiveEntryUncheckedCreateWithoutUserInput
        >
      | ArchiveEntryCreateWithoutUserInput[]
      | ArchiveEntryUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | ArchiveEntryCreateOrConnectWithoutUserInput
      | ArchiveEntryCreateOrConnectWithoutUserInput[];
    createMany?: ArchiveEntryCreateManyUserInputEnvelope;
    connect?: ArchiveEntryWhereUniqueInput | ArchiveEntryWhereUniqueInput[];
  };

  export type ChatPinnedArchiveEntryUncheckedCreateNestedManyWithoutUserInput =
    {
      create?:
        | XOR<
            ChatPinnedArchiveEntryCreateWithoutUserInput,
            ChatPinnedArchiveEntryUncheckedCreateWithoutUserInput
          >
        | ChatPinnedArchiveEntryCreateWithoutUserInput[]
        | ChatPinnedArchiveEntryUncheckedCreateWithoutUserInput[];
      connectOrCreate?:
        | ChatPinnedArchiveEntryCreateOrConnectWithoutUserInput
        | ChatPinnedArchiveEntryCreateOrConnectWithoutUserInput[];
      createMany?: ChatPinnedArchiveEntryCreateManyUserInputEnvelope;
      connect?:
        | ChatPinnedArchiveEntryWhereUniqueInput
        | ChatPinnedArchiveEntryWhereUniqueInput[];
    };

  export type UserRateLimitUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<
      UserRateLimitCreateWithoutUserInput,
      UserRateLimitUncheckedCreateWithoutUserInput
    >;
    connectOrCreate?: UserRateLimitCreateOrConnectWithoutUserInput;
    connect?: UserRateLimitWhereUniqueInput;
  };

  export type AgentUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<AgentCreateWithoutUserInput, AgentUncheckedCreateWithoutUserInput>
      | AgentCreateWithoutUserInput[]
      | AgentUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AgentCreateOrConnectWithoutUserInput
      | AgentCreateOrConnectWithoutUserInput[];
    createMany?: AgentCreateManyUserInputEnvelope;
    connect?: AgentWhereUniqueInput | AgentWhereUniqueInput[];
  };

  export type ChatUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<ChatCreateWithoutUserInput, ChatUncheckedCreateWithoutUserInput>
      | ChatCreateWithoutUserInput[]
      | ChatUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | ChatCreateOrConnectWithoutUserInput
      | ChatCreateOrConnectWithoutUserInput[];
    upsert?:
      | ChatUpsertWithWhereUniqueWithoutUserInput
      | ChatUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: ChatCreateManyUserInputEnvelope;
    set?: ChatWhereUniqueInput | ChatWhereUniqueInput[];
    disconnect?: ChatWhereUniqueInput | ChatWhereUniqueInput[];
    delete?: ChatWhereUniqueInput | ChatWhereUniqueInput[];
    connect?: ChatWhereUniqueInput | ChatWhereUniqueInput[];
    update?:
      | ChatUpdateWithWhereUniqueWithoutUserInput
      | ChatUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | ChatUpdateManyWithWhereWithoutUserInput
      | ChatUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: ChatScalarWhereInput | ChatScalarWhereInput[];
  };

  export type DocumentUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          DocumentCreateWithoutUserInput,
          DocumentUncheckedCreateWithoutUserInput
        >
      | DocumentCreateWithoutUserInput[]
      | DocumentUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | DocumentCreateOrConnectWithoutUserInput
      | DocumentCreateOrConnectWithoutUserInput[];
    upsert?:
      | DocumentUpsertWithWhereUniqueWithoutUserInput
      | DocumentUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: DocumentCreateManyUserInputEnvelope;
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[];
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[];
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[];
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[];
    update?:
      | DocumentUpdateWithWhereUniqueWithoutUserInput
      | DocumentUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | DocumentUpdateManyWithWhereWithoutUserInput
      | DocumentUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[];
  };

  export type SuggestionUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          SuggestionCreateWithoutUserInput,
          SuggestionUncheckedCreateWithoutUserInput
        >
      | SuggestionCreateWithoutUserInput[]
      | SuggestionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | SuggestionCreateOrConnectWithoutUserInput
      | SuggestionCreateOrConnectWithoutUserInput[];
    upsert?:
      | SuggestionUpsertWithWhereUniqueWithoutUserInput
      | SuggestionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: SuggestionCreateManyUserInputEnvelope;
    set?: SuggestionWhereUniqueInput | SuggestionWhereUniqueInput[];
    disconnect?: SuggestionWhereUniqueInput | SuggestionWhereUniqueInput[];
    delete?: SuggestionWhereUniqueInput | SuggestionWhereUniqueInput[];
    connect?: SuggestionWhereUniqueInput | SuggestionWhereUniqueInput[];
    update?:
      | SuggestionUpdateWithWhereUniqueWithoutUserInput
      | SuggestionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | SuggestionUpdateManyWithWhereWithoutUserInput
      | SuggestionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: SuggestionScalarWhereInput | SuggestionScalarWhereInput[];
  };

  export type ArchiveEntryUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          ArchiveEntryCreateWithoutUserInput,
          ArchiveEntryUncheckedCreateWithoutUserInput
        >
      | ArchiveEntryCreateWithoutUserInput[]
      | ArchiveEntryUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | ArchiveEntryCreateOrConnectWithoutUserInput
      | ArchiveEntryCreateOrConnectWithoutUserInput[];
    upsert?:
      | ArchiveEntryUpsertWithWhereUniqueWithoutUserInput
      | ArchiveEntryUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: ArchiveEntryCreateManyUserInputEnvelope;
    set?: ArchiveEntryWhereUniqueInput | ArchiveEntryWhereUniqueInput[];
    disconnect?: ArchiveEntryWhereUniqueInput | ArchiveEntryWhereUniqueInput[];
    delete?: ArchiveEntryWhereUniqueInput | ArchiveEntryWhereUniqueInput[];
    connect?: ArchiveEntryWhereUniqueInput | ArchiveEntryWhereUniqueInput[];
    update?:
      | ArchiveEntryUpdateWithWhereUniqueWithoutUserInput
      | ArchiveEntryUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | ArchiveEntryUpdateManyWithWhereWithoutUserInput
      | ArchiveEntryUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: ArchiveEntryScalarWhereInput | ArchiveEntryScalarWhereInput[];
  };

  export type ChatPinnedArchiveEntryUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          ChatPinnedArchiveEntryCreateWithoutUserInput,
          ChatPinnedArchiveEntryUncheckedCreateWithoutUserInput
        >
      | ChatPinnedArchiveEntryCreateWithoutUserInput[]
      | ChatPinnedArchiveEntryUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | ChatPinnedArchiveEntryCreateOrConnectWithoutUserInput
      | ChatPinnedArchiveEntryCreateOrConnectWithoutUserInput[];
    upsert?:
      | ChatPinnedArchiveEntryUpsertWithWhereUniqueWithoutUserInput
      | ChatPinnedArchiveEntryUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: ChatPinnedArchiveEntryCreateManyUserInputEnvelope;
    set?:
      | ChatPinnedArchiveEntryWhereUniqueInput
      | ChatPinnedArchiveEntryWhereUniqueInput[];
    disconnect?:
      | ChatPinnedArchiveEntryWhereUniqueInput
      | ChatPinnedArchiveEntryWhereUniqueInput[];
    delete?:
      | ChatPinnedArchiveEntryWhereUniqueInput
      | ChatPinnedArchiveEntryWhereUniqueInput[];
    connect?:
      | ChatPinnedArchiveEntryWhereUniqueInput
      | ChatPinnedArchiveEntryWhereUniqueInput[];
    update?:
      | ChatPinnedArchiveEntryUpdateWithWhereUniqueWithoutUserInput
      | ChatPinnedArchiveEntryUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | ChatPinnedArchiveEntryUpdateManyWithWhereWithoutUserInput
      | ChatPinnedArchiveEntryUpdateManyWithWhereWithoutUserInput[];
    deleteMany?:
      | ChatPinnedArchiveEntryScalarWhereInput
      | ChatPinnedArchiveEntryScalarWhereInput[];
  };

  export type UserRateLimitUpdateOneWithoutUserNestedInput = {
    create?: XOR<
      UserRateLimitCreateWithoutUserInput,
      UserRateLimitUncheckedCreateWithoutUserInput
    >;
    connectOrCreate?: UserRateLimitCreateOrConnectWithoutUserInput;
    upsert?: UserRateLimitUpsertWithoutUserInput;
    disconnect?: UserRateLimitWhereInput | boolean;
    delete?: UserRateLimitWhereInput | boolean;
    connect?: UserRateLimitWhereUniqueInput;
    update?: XOR<
      XOR<
        UserRateLimitUpdateToOneWithWhereWithoutUserInput,
        UserRateLimitUpdateWithoutUserInput
      >,
      UserRateLimitUncheckedUpdateWithoutUserInput
    >;
  };

  export type AgentUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<AgentCreateWithoutUserInput, AgentUncheckedCreateWithoutUserInput>
      | AgentCreateWithoutUserInput[]
      | AgentUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AgentCreateOrConnectWithoutUserInput
      | AgentCreateOrConnectWithoutUserInput[];
    upsert?:
      | AgentUpsertWithWhereUniqueWithoutUserInput
      | AgentUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: AgentCreateManyUserInputEnvelope;
    set?: AgentWhereUniqueInput | AgentWhereUniqueInput[];
    disconnect?: AgentWhereUniqueInput | AgentWhereUniqueInput[];
    delete?: AgentWhereUniqueInput | AgentWhereUniqueInput[];
    connect?: AgentWhereUniqueInput | AgentWhereUniqueInput[];
    update?:
      | AgentUpdateWithWhereUniqueWithoutUserInput
      | AgentUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | AgentUpdateManyWithWhereWithoutUserInput
      | AgentUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: AgentScalarWhereInput | AgentScalarWhereInput[];
  };

  export type ChatUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<ChatCreateWithoutUserInput, ChatUncheckedCreateWithoutUserInput>
      | ChatCreateWithoutUserInput[]
      | ChatUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | ChatCreateOrConnectWithoutUserInput
      | ChatCreateOrConnectWithoutUserInput[];
    upsert?:
      | ChatUpsertWithWhereUniqueWithoutUserInput
      | ChatUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: ChatCreateManyUserInputEnvelope;
    set?: ChatWhereUniqueInput | ChatWhereUniqueInput[];
    disconnect?: ChatWhereUniqueInput | ChatWhereUniqueInput[];
    delete?: ChatWhereUniqueInput | ChatWhereUniqueInput[];
    connect?: ChatWhereUniqueInput | ChatWhereUniqueInput[];
    update?:
      | ChatUpdateWithWhereUniqueWithoutUserInput
      | ChatUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | ChatUpdateManyWithWhereWithoutUserInput
      | ChatUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: ChatScalarWhereInput | ChatScalarWhereInput[];
  };

  export type DocumentUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          DocumentCreateWithoutUserInput,
          DocumentUncheckedCreateWithoutUserInput
        >
      | DocumentCreateWithoutUserInput[]
      | DocumentUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | DocumentCreateOrConnectWithoutUserInput
      | DocumentCreateOrConnectWithoutUserInput[];
    upsert?:
      | DocumentUpsertWithWhereUniqueWithoutUserInput
      | DocumentUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: DocumentCreateManyUserInputEnvelope;
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[];
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[];
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[];
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[];
    update?:
      | DocumentUpdateWithWhereUniqueWithoutUserInput
      | DocumentUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | DocumentUpdateManyWithWhereWithoutUserInput
      | DocumentUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[];
  };

  export type SuggestionUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          SuggestionCreateWithoutUserInput,
          SuggestionUncheckedCreateWithoutUserInput
        >
      | SuggestionCreateWithoutUserInput[]
      | SuggestionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | SuggestionCreateOrConnectWithoutUserInput
      | SuggestionCreateOrConnectWithoutUserInput[];
    upsert?:
      | SuggestionUpsertWithWhereUniqueWithoutUserInput
      | SuggestionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: SuggestionCreateManyUserInputEnvelope;
    set?: SuggestionWhereUniqueInput | SuggestionWhereUniqueInput[];
    disconnect?: SuggestionWhereUniqueInput | SuggestionWhereUniqueInput[];
    delete?: SuggestionWhereUniqueInput | SuggestionWhereUniqueInput[];
    connect?: SuggestionWhereUniqueInput | SuggestionWhereUniqueInput[];
    update?:
      | SuggestionUpdateWithWhereUniqueWithoutUserInput
      | SuggestionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | SuggestionUpdateManyWithWhereWithoutUserInput
      | SuggestionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: SuggestionScalarWhereInput | SuggestionScalarWhereInput[];
  };

  export type ArchiveEntryUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          ArchiveEntryCreateWithoutUserInput,
          ArchiveEntryUncheckedCreateWithoutUserInput
        >
      | ArchiveEntryCreateWithoutUserInput[]
      | ArchiveEntryUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | ArchiveEntryCreateOrConnectWithoutUserInput
      | ArchiveEntryCreateOrConnectWithoutUserInput[];
    upsert?:
      | ArchiveEntryUpsertWithWhereUniqueWithoutUserInput
      | ArchiveEntryUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: ArchiveEntryCreateManyUserInputEnvelope;
    set?: ArchiveEntryWhereUniqueInput | ArchiveEntryWhereUniqueInput[];
    disconnect?: ArchiveEntryWhereUniqueInput | ArchiveEntryWhereUniqueInput[];
    delete?: ArchiveEntryWhereUniqueInput | ArchiveEntryWhereUniqueInput[];
    connect?: ArchiveEntryWhereUniqueInput | ArchiveEntryWhereUniqueInput[];
    update?:
      | ArchiveEntryUpdateWithWhereUniqueWithoutUserInput
      | ArchiveEntryUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | ArchiveEntryUpdateManyWithWhereWithoutUserInput
      | ArchiveEntryUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: ArchiveEntryScalarWhereInput | ArchiveEntryScalarWhereInput[];
  };

  export type ChatPinnedArchiveEntryUncheckedUpdateManyWithoutUserNestedInput =
    {
      create?:
        | XOR<
            ChatPinnedArchiveEntryCreateWithoutUserInput,
            ChatPinnedArchiveEntryUncheckedCreateWithoutUserInput
          >
        | ChatPinnedArchiveEntryCreateWithoutUserInput[]
        | ChatPinnedArchiveEntryUncheckedCreateWithoutUserInput[];
      connectOrCreate?:
        | ChatPinnedArchiveEntryCreateOrConnectWithoutUserInput
        | ChatPinnedArchiveEntryCreateOrConnectWithoutUserInput[];
      upsert?:
        | ChatPinnedArchiveEntryUpsertWithWhereUniqueWithoutUserInput
        | ChatPinnedArchiveEntryUpsertWithWhereUniqueWithoutUserInput[];
      createMany?: ChatPinnedArchiveEntryCreateManyUserInputEnvelope;
      set?:
        | ChatPinnedArchiveEntryWhereUniqueInput
        | ChatPinnedArchiveEntryWhereUniqueInput[];
      disconnect?:
        | ChatPinnedArchiveEntryWhereUniqueInput
        | ChatPinnedArchiveEntryWhereUniqueInput[];
      delete?:
        | ChatPinnedArchiveEntryWhereUniqueInput
        | ChatPinnedArchiveEntryWhereUniqueInput[];
      connect?:
        | ChatPinnedArchiveEntryWhereUniqueInput
        | ChatPinnedArchiveEntryWhereUniqueInput[];
      update?:
        | ChatPinnedArchiveEntryUpdateWithWhereUniqueWithoutUserInput
        | ChatPinnedArchiveEntryUpdateWithWhereUniqueWithoutUserInput[];
      updateMany?:
        | ChatPinnedArchiveEntryUpdateManyWithWhereWithoutUserInput
        | ChatPinnedArchiveEntryUpdateManyWithWhereWithoutUserInput[];
      deleteMany?:
        | ChatPinnedArchiveEntryScalarWhereInput
        | ChatPinnedArchiveEntryScalarWhereInput[];
    };

  export type UserRateLimitUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<
      UserRateLimitCreateWithoutUserInput,
      UserRateLimitUncheckedCreateWithoutUserInput
    >;
    connectOrCreate?: UserRateLimitCreateOrConnectWithoutUserInput;
    upsert?: UserRateLimitUpsertWithoutUserInput;
    disconnect?: UserRateLimitWhereInput | boolean;
    delete?: UserRateLimitWhereInput | boolean;
    connect?: UserRateLimitWhereUniqueInput;
    update?: XOR<
      XOR<
        UserRateLimitUpdateToOneWithWhereWithoutUserInput,
        UserRateLimitUpdateWithoutUserInput
      >,
      UserRateLimitUncheckedUpdateWithoutUserInput
    >;
  };

  export type AgentUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<AgentCreateWithoutUserInput, AgentUncheckedCreateWithoutUserInput>
      | AgentCreateWithoutUserInput[]
      | AgentUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AgentCreateOrConnectWithoutUserInput
      | AgentCreateOrConnectWithoutUserInput[];
    upsert?:
      | AgentUpsertWithWhereUniqueWithoutUserInput
      | AgentUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: AgentCreateManyUserInputEnvelope;
    set?: AgentWhereUniqueInput | AgentWhereUniqueInput[];
    disconnect?: AgentWhereUniqueInput | AgentWhereUniqueInput[];
    delete?: AgentWhereUniqueInput | AgentWhereUniqueInput[];
    connect?: AgentWhereUniqueInput | AgentWhereUniqueInput[];
    update?:
      | AgentUpdateWithWhereUniqueWithoutUserInput
      | AgentUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | AgentUpdateManyWithWhereWithoutUserInput
      | AgentUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: AgentScalarWhereInput | AgentScalarWhereInput[];
  };

  export type UserCreateNestedOneWithoutRateLimitInput = {
    create?: XOR<
      UserCreateWithoutRateLimitInput,
      UserUncheckedCreateWithoutRateLimitInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutRateLimitInput;
    connect?: UserWhereUniqueInput;
  };

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
  };

  export type UserUpdateOneRequiredWithoutRateLimitNestedInput = {
    create?: XOR<
      UserCreateWithoutRateLimitInput,
      UserUncheckedCreateWithoutRateLimitInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutRateLimitInput;
    upsert?: UserUpsertWithoutRateLimitInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutRateLimitInput,
        UserUpdateWithoutRateLimitInput
      >,
      UserUncheckedUpdateWithoutRateLimitInput
    >;
  };

  export type UserCreateNestedOneWithoutAgentsInput = {
    create?: XOR<
      UserCreateWithoutAgentsInput,
      UserUncheckedCreateWithoutAgentsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutAgentsInput;
    connect?: UserWhereUniqueInput;
  };

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
  };

  export type UserUpdateOneRequiredWithoutAgentsNestedInput = {
    create?: XOR<
      UserCreateWithoutAgentsInput,
      UserUncheckedCreateWithoutAgentsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutAgentsInput;
    upsert?: UserUpsertWithoutAgentsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutAgentsInput,
        UserUpdateWithoutAgentsInput
      >,
      UserUncheckedUpdateWithoutAgentsInput
    >;
  };

  export type UserCreateNestedOneWithoutChatsInput = {
    create?: XOR<
      UserCreateWithoutChatsInput,
      UserUncheckedCreateWithoutChatsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutChatsInput;
    connect?: UserWhereUniqueInput;
  };

  export type MessageCreateNestedManyWithoutChatInput = {
    create?:
      | XOR<
          MessageCreateWithoutChatInput,
          MessageUncheckedCreateWithoutChatInput
        >
      | MessageCreateWithoutChatInput[]
      | MessageUncheckedCreateWithoutChatInput[];
    connectOrCreate?:
      | MessageCreateOrConnectWithoutChatInput
      | MessageCreateOrConnectWithoutChatInput[];
    createMany?: MessageCreateManyChatInputEnvelope;
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
  };

  export type VoteCreateNestedManyWithoutChatInput = {
    create?:
      | XOR<VoteCreateWithoutChatInput, VoteUncheckedCreateWithoutChatInput>
      | VoteCreateWithoutChatInput[]
      | VoteUncheckedCreateWithoutChatInput[];
    connectOrCreate?:
      | VoteCreateOrConnectWithoutChatInput
      | VoteCreateOrConnectWithoutChatInput[];
    createMany?: VoteCreateManyChatInputEnvelope;
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[];
  };

  export type StreamCreateNestedManyWithoutChatInput = {
    create?:
      | XOR<StreamCreateWithoutChatInput, StreamUncheckedCreateWithoutChatInput>
      | StreamCreateWithoutChatInput[]
      | StreamUncheckedCreateWithoutChatInput[];
    connectOrCreate?:
      | StreamCreateOrConnectWithoutChatInput
      | StreamCreateOrConnectWithoutChatInput[];
    createMany?: StreamCreateManyChatInputEnvelope;
    connect?: StreamWhereUniqueInput | StreamWhereUniqueInput[];
  };

  export type ChatPinnedArchiveEntryCreateNestedManyWithoutChatInput = {
    create?:
      | XOR<
          ChatPinnedArchiveEntryCreateWithoutChatInput,
          ChatPinnedArchiveEntryUncheckedCreateWithoutChatInput
        >
      | ChatPinnedArchiveEntryCreateWithoutChatInput[]
      | ChatPinnedArchiveEntryUncheckedCreateWithoutChatInput[];
    connectOrCreate?:
      | ChatPinnedArchiveEntryCreateOrConnectWithoutChatInput
      | ChatPinnedArchiveEntryCreateOrConnectWithoutChatInput[];
    createMany?: ChatPinnedArchiveEntryCreateManyChatInputEnvelope;
    connect?:
      | ChatPinnedArchiveEntryWhereUniqueInput
      | ChatPinnedArchiveEntryWhereUniqueInput[];
  };

  export type MessageUncheckedCreateNestedManyWithoutChatInput = {
    create?:
      | XOR<
          MessageCreateWithoutChatInput,
          MessageUncheckedCreateWithoutChatInput
        >
      | MessageCreateWithoutChatInput[]
      | MessageUncheckedCreateWithoutChatInput[];
    connectOrCreate?:
      | MessageCreateOrConnectWithoutChatInput
      | MessageCreateOrConnectWithoutChatInput[];
    createMany?: MessageCreateManyChatInputEnvelope;
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
  };

  export type VoteUncheckedCreateNestedManyWithoutChatInput = {
    create?:
      | XOR<VoteCreateWithoutChatInput, VoteUncheckedCreateWithoutChatInput>
      | VoteCreateWithoutChatInput[]
      | VoteUncheckedCreateWithoutChatInput[];
    connectOrCreate?:
      | VoteCreateOrConnectWithoutChatInput
      | VoteCreateOrConnectWithoutChatInput[];
    createMany?: VoteCreateManyChatInputEnvelope;
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[];
  };

  export type StreamUncheckedCreateNestedManyWithoutChatInput = {
    create?:
      | XOR<StreamCreateWithoutChatInput, StreamUncheckedCreateWithoutChatInput>
      | StreamCreateWithoutChatInput[]
      | StreamUncheckedCreateWithoutChatInput[];
    connectOrCreate?:
      | StreamCreateOrConnectWithoutChatInput
      | StreamCreateOrConnectWithoutChatInput[];
    createMany?: StreamCreateManyChatInputEnvelope;
    connect?: StreamWhereUniqueInput | StreamWhereUniqueInput[];
  };

  export type ChatPinnedArchiveEntryUncheckedCreateNestedManyWithoutChatInput =
    {
      create?:
        | XOR<
            ChatPinnedArchiveEntryCreateWithoutChatInput,
            ChatPinnedArchiveEntryUncheckedCreateWithoutChatInput
          >
        | ChatPinnedArchiveEntryCreateWithoutChatInput[]
        | ChatPinnedArchiveEntryUncheckedCreateWithoutChatInput[];
      connectOrCreate?:
        | ChatPinnedArchiveEntryCreateOrConnectWithoutChatInput
        | ChatPinnedArchiveEntryCreateOrConnectWithoutChatInput[];
      createMany?: ChatPinnedArchiveEntryCreateManyChatInputEnvelope;
      connect?:
        | ChatPinnedArchiveEntryWhereUniqueInput
        | ChatPinnedArchiveEntryWhereUniqueInput[];
    };

  export type UserUpdateOneRequiredWithoutChatsNestedInput = {
    create?: XOR<
      UserCreateWithoutChatsInput,
      UserUncheckedCreateWithoutChatsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutChatsInput;
    upsert?: UserUpsertWithoutChatsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutChatsInput,
        UserUpdateWithoutChatsInput
      >,
      UserUncheckedUpdateWithoutChatsInput
    >;
  };

  export type MessageUpdateManyWithoutChatNestedInput = {
    create?:
      | XOR<
          MessageCreateWithoutChatInput,
          MessageUncheckedCreateWithoutChatInput
        >
      | MessageCreateWithoutChatInput[]
      | MessageUncheckedCreateWithoutChatInput[];
    connectOrCreate?:
      | MessageCreateOrConnectWithoutChatInput
      | MessageCreateOrConnectWithoutChatInput[];
    upsert?:
      | MessageUpsertWithWhereUniqueWithoutChatInput
      | MessageUpsertWithWhereUniqueWithoutChatInput[];
    createMany?: MessageCreateManyChatInputEnvelope;
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    update?:
      | MessageUpdateWithWhereUniqueWithoutChatInput
      | MessageUpdateWithWhereUniqueWithoutChatInput[];
    updateMany?:
      | MessageUpdateManyWithWhereWithoutChatInput
      | MessageUpdateManyWithWhereWithoutChatInput[];
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[];
  };

  export type VoteUpdateManyWithoutChatNestedInput = {
    create?:
      | XOR<VoteCreateWithoutChatInput, VoteUncheckedCreateWithoutChatInput>
      | VoteCreateWithoutChatInput[]
      | VoteUncheckedCreateWithoutChatInput[];
    connectOrCreate?:
      | VoteCreateOrConnectWithoutChatInput
      | VoteCreateOrConnectWithoutChatInput[];
    upsert?:
      | VoteUpsertWithWhereUniqueWithoutChatInput
      | VoteUpsertWithWhereUniqueWithoutChatInput[];
    createMany?: VoteCreateManyChatInputEnvelope;
    set?: VoteWhereUniqueInput | VoteWhereUniqueInput[];
    disconnect?: VoteWhereUniqueInput | VoteWhereUniqueInput[];
    delete?: VoteWhereUniqueInput | VoteWhereUniqueInput[];
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[];
    update?:
      | VoteUpdateWithWhereUniqueWithoutChatInput
      | VoteUpdateWithWhereUniqueWithoutChatInput[];
    updateMany?:
      | VoteUpdateManyWithWhereWithoutChatInput
      | VoteUpdateManyWithWhereWithoutChatInput[];
    deleteMany?: VoteScalarWhereInput | VoteScalarWhereInput[];
  };

  export type StreamUpdateManyWithoutChatNestedInput = {
    create?:
      | XOR<StreamCreateWithoutChatInput, StreamUncheckedCreateWithoutChatInput>
      | StreamCreateWithoutChatInput[]
      | StreamUncheckedCreateWithoutChatInput[];
    connectOrCreate?:
      | StreamCreateOrConnectWithoutChatInput
      | StreamCreateOrConnectWithoutChatInput[];
    upsert?:
      | StreamUpsertWithWhereUniqueWithoutChatInput
      | StreamUpsertWithWhereUniqueWithoutChatInput[];
    createMany?: StreamCreateManyChatInputEnvelope;
    set?: StreamWhereUniqueInput | StreamWhereUniqueInput[];
    disconnect?: StreamWhereUniqueInput | StreamWhereUniqueInput[];
    delete?: StreamWhereUniqueInput | StreamWhereUniqueInput[];
    connect?: StreamWhereUniqueInput | StreamWhereUniqueInput[];
    update?:
      | StreamUpdateWithWhereUniqueWithoutChatInput
      | StreamUpdateWithWhereUniqueWithoutChatInput[];
    updateMany?:
      | StreamUpdateManyWithWhereWithoutChatInput
      | StreamUpdateManyWithWhereWithoutChatInput[];
    deleteMany?: StreamScalarWhereInput | StreamScalarWhereInput[];
  };

  export type ChatPinnedArchiveEntryUpdateManyWithoutChatNestedInput = {
    create?:
      | XOR<
          ChatPinnedArchiveEntryCreateWithoutChatInput,
          ChatPinnedArchiveEntryUncheckedCreateWithoutChatInput
        >
      | ChatPinnedArchiveEntryCreateWithoutChatInput[]
      | ChatPinnedArchiveEntryUncheckedCreateWithoutChatInput[];
    connectOrCreate?:
      | ChatPinnedArchiveEntryCreateOrConnectWithoutChatInput
      | ChatPinnedArchiveEntryCreateOrConnectWithoutChatInput[];
    upsert?:
      | ChatPinnedArchiveEntryUpsertWithWhereUniqueWithoutChatInput
      | ChatPinnedArchiveEntryUpsertWithWhereUniqueWithoutChatInput[];
    createMany?: ChatPinnedArchiveEntryCreateManyChatInputEnvelope;
    set?:
      | ChatPinnedArchiveEntryWhereUniqueInput
      | ChatPinnedArchiveEntryWhereUniqueInput[];
    disconnect?:
      | ChatPinnedArchiveEntryWhereUniqueInput
      | ChatPinnedArchiveEntryWhereUniqueInput[];
    delete?:
      | ChatPinnedArchiveEntryWhereUniqueInput
      | ChatPinnedArchiveEntryWhereUniqueInput[];
    connect?:
      | ChatPinnedArchiveEntryWhereUniqueInput
      | ChatPinnedArchiveEntryWhereUniqueInput[];
    update?:
      | ChatPinnedArchiveEntryUpdateWithWhereUniqueWithoutChatInput
      | ChatPinnedArchiveEntryUpdateWithWhereUniqueWithoutChatInput[];
    updateMany?:
      | ChatPinnedArchiveEntryUpdateManyWithWhereWithoutChatInput
      | ChatPinnedArchiveEntryUpdateManyWithWhereWithoutChatInput[];
    deleteMany?:
      | ChatPinnedArchiveEntryScalarWhereInput
      | ChatPinnedArchiveEntryScalarWhereInput[];
  };

  export type MessageUncheckedUpdateManyWithoutChatNestedInput = {
    create?:
      | XOR<
          MessageCreateWithoutChatInput,
          MessageUncheckedCreateWithoutChatInput
        >
      | MessageCreateWithoutChatInput[]
      | MessageUncheckedCreateWithoutChatInput[];
    connectOrCreate?:
      | MessageCreateOrConnectWithoutChatInput
      | MessageCreateOrConnectWithoutChatInput[];
    upsert?:
      | MessageUpsertWithWhereUniqueWithoutChatInput
      | MessageUpsertWithWhereUniqueWithoutChatInput[];
    createMany?: MessageCreateManyChatInputEnvelope;
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[];
    update?:
      | MessageUpdateWithWhereUniqueWithoutChatInput
      | MessageUpdateWithWhereUniqueWithoutChatInput[];
    updateMany?:
      | MessageUpdateManyWithWhereWithoutChatInput
      | MessageUpdateManyWithWhereWithoutChatInput[];
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[];
  };

  export type VoteUncheckedUpdateManyWithoutChatNestedInput = {
    create?:
      | XOR<VoteCreateWithoutChatInput, VoteUncheckedCreateWithoutChatInput>
      | VoteCreateWithoutChatInput[]
      | VoteUncheckedCreateWithoutChatInput[];
    connectOrCreate?:
      | VoteCreateOrConnectWithoutChatInput
      | VoteCreateOrConnectWithoutChatInput[];
    upsert?:
      | VoteUpsertWithWhereUniqueWithoutChatInput
      | VoteUpsertWithWhereUniqueWithoutChatInput[];
    createMany?: VoteCreateManyChatInputEnvelope;
    set?: VoteWhereUniqueInput | VoteWhereUniqueInput[];
    disconnect?: VoteWhereUniqueInput | VoteWhereUniqueInput[];
    delete?: VoteWhereUniqueInput | VoteWhereUniqueInput[];
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[];
    update?:
      | VoteUpdateWithWhereUniqueWithoutChatInput
      | VoteUpdateWithWhereUniqueWithoutChatInput[];
    updateMany?:
      | VoteUpdateManyWithWhereWithoutChatInput
      | VoteUpdateManyWithWhereWithoutChatInput[];
    deleteMany?: VoteScalarWhereInput | VoteScalarWhereInput[];
  };

  export type StreamUncheckedUpdateManyWithoutChatNestedInput = {
    create?:
      | XOR<StreamCreateWithoutChatInput, StreamUncheckedCreateWithoutChatInput>
      | StreamCreateWithoutChatInput[]
      | StreamUncheckedCreateWithoutChatInput[];
    connectOrCreate?:
      | StreamCreateOrConnectWithoutChatInput
      | StreamCreateOrConnectWithoutChatInput[];
    upsert?:
      | StreamUpsertWithWhereUniqueWithoutChatInput
      | StreamUpsertWithWhereUniqueWithoutChatInput[];
    createMany?: StreamCreateManyChatInputEnvelope;
    set?: StreamWhereUniqueInput | StreamWhereUniqueInput[];
    disconnect?: StreamWhereUniqueInput | StreamWhereUniqueInput[];
    delete?: StreamWhereUniqueInput | StreamWhereUniqueInput[];
    connect?: StreamWhereUniqueInput | StreamWhereUniqueInput[];
    update?:
      | StreamUpdateWithWhereUniqueWithoutChatInput
      | StreamUpdateWithWhereUniqueWithoutChatInput[];
    updateMany?:
      | StreamUpdateManyWithWhereWithoutChatInput
      | StreamUpdateManyWithWhereWithoutChatInput[];
    deleteMany?: StreamScalarWhereInput | StreamScalarWhereInput[];
  };

  export type ChatPinnedArchiveEntryUncheckedUpdateManyWithoutChatNestedInput =
    {
      create?:
        | XOR<
            ChatPinnedArchiveEntryCreateWithoutChatInput,
            ChatPinnedArchiveEntryUncheckedCreateWithoutChatInput
          >
        | ChatPinnedArchiveEntryCreateWithoutChatInput[]
        | ChatPinnedArchiveEntryUncheckedCreateWithoutChatInput[];
      connectOrCreate?:
        | ChatPinnedArchiveEntryCreateOrConnectWithoutChatInput
        | ChatPinnedArchiveEntryCreateOrConnectWithoutChatInput[];
      upsert?:
        | ChatPinnedArchiveEntryUpsertWithWhereUniqueWithoutChatInput
        | ChatPinnedArchiveEntryUpsertWithWhereUniqueWithoutChatInput[];
      createMany?: ChatPinnedArchiveEntryCreateManyChatInputEnvelope;
      set?:
        | ChatPinnedArchiveEntryWhereUniqueInput
        | ChatPinnedArchiveEntryWhereUniqueInput[];
      disconnect?:
        | ChatPinnedArchiveEntryWhereUniqueInput
        | ChatPinnedArchiveEntryWhereUniqueInput[];
      delete?:
        | ChatPinnedArchiveEntryWhereUniqueInput
        | ChatPinnedArchiveEntryWhereUniqueInput[];
      connect?:
        | ChatPinnedArchiveEntryWhereUniqueInput
        | ChatPinnedArchiveEntryWhereUniqueInput[];
      update?:
        | ChatPinnedArchiveEntryUpdateWithWhereUniqueWithoutChatInput
        | ChatPinnedArchiveEntryUpdateWithWhereUniqueWithoutChatInput[];
      updateMany?:
        | ChatPinnedArchiveEntryUpdateManyWithWhereWithoutChatInput
        | ChatPinnedArchiveEntryUpdateManyWithWhereWithoutChatInput[];
      deleteMany?:
        | ChatPinnedArchiveEntryScalarWhereInput
        | ChatPinnedArchiveEntryScalarWhereInput[];
    };

  export type ChatCreateNestedOneWithoutMessagesInput = {
    create?: XOR<
      ChatCreateWithoutMessagesInput,
      ChatUncheckedCreateWithoutMessagesInput
    >;
    connectOrCreate?: ChatCreateOrConnectWithoutMessagesInput;
    connect?: ChatWhereUniqueInput;
  };

  export type VoteCreateNestedManyWithoutMessageInput = {
    create?:
      | XOR<
          VoteCreateWithoutMessageInput,
          VoteUncheckedCreateWithoutMessageInput
        >
      | VoteCreateWithoutMessageInput[]
      | VoteUncheckedCreateWithoutMessageInput[];
    connectOrCreate?:
      | VoteCreateOrConnectWithoutMessageInput
      | VoteCreateOrConnectWithoutMessageInput[];
    createMany?: VoteCreateManyMessageInputEnvelope;
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[];
  };

  export type VoteUncheckedCreateNestedManyWithoutMessageInput = {
    create?:
      | XOR<
          VoteCreateWithoutMessageInput,
          VoteUncheckedCreateWithoutMessageInput
        >
      | VoteCreateWithoutMessageInput[]
      | VoteUncheckedCreateWithoutMessageInput[];
    connectOrCreate?:
      | VoteCreateOrConnectWithoutMessageInput
      | VoteCreateOrConnectWithoutMessageInput[];
    createMany?: VoteCreateManyMessageInputEnvelope;
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[];
  };

  export type ChatUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<
      ChatCreateWithoutMessagesInput,
      ChatUncheckedCreateWithoutMessagesInput
    >;
    connectOrCreate?: ChatCreateOrConnectWithoutMessagesInput;
    upsert?: ChatUpsertWithoutMessagesInput;
    connect?: ChatWhereUniqueInput;
    update?: XOR<
      XOR<
        ChatUpdateToOneWithWhereWithoutMessagesInput,
        ChatUpdateWithoutMessagesInput
      >,
      ChatUncheckedUpdateWithoutMessagesInput
    >;
  };

  export type VoteUpdateManyWithoutMessageNestedInput = {
    create?:
      | XOR<
          VoteCreateWithoutMessageInput,
          VoteUncheckedCreateWithoutMessageInput
        >
      | VoteCreateWithoutMessageInput[]
      | VoteUncheckedCreateWithoutMessageInput[];
    connectOrCreate?:
      | VoteCreateOrConnectWithoutMessageInput
      | VoteCreateOrConnectWithoutMessageInput[];
    upsert?:
      | VoteUpsertWithWhereUniqueWithoutMessageInput
      | VoteUpsertWithWhereUniqueWithoutMessageInput[];
    createMany?: VoteCreateManyMessageInputEnvelope;
    set?: VoteWhereUniqueInput | VoteWhereUniqueInput[];
    disconnect?: VoteWhereUniqueInput | VoteWhereUniqueInput[];
    delete?: VoteWhereUniqueInput | VoteWhereUniqueInput[];
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[];
    update?:
      | VoteUpdateWithWhereUniqueWithoutMessageInput
      | VoteUpdateWithWhereUniqueWithoutMessageInput[];
    updateMany?:
      | VoteUpdateManyWithWhereWithoutMessageInput
      | VoteUpdateManyWithWhereWithoutMessageInput[];
    deleteMany?: VoteScalarWhereInput | VoteScalarWhereInput[];
  };

  export type VoteUncheckedUpdateManyWithoutMessageNestedInput = {
    create?:
      | XOR<
          VoteCreateWithoutMessageInput,
          VoteUncheckedCreateWithoutMessageInput
        >
      | VoteCreateWithoutMessageInput[]
      | VoteUncheckedCreateWithoutMessageInput[];
    connectOrCreate?:
      | VoteCreateOrConnectWithoutMessageInput
      | VoteCreateOrConnectWithoutMessageInput[];
    upsert?:
      | VoteUpsertWithWhereUniqueWithoutMessageInput
      | VoteUpsertWithWhereUniqueWithoutMessageInput[];
    createMany?: VoteCreateManyMessageInputEnvelope;
    set?: VoteWhereUniqueInput | VoteWhereUniqueInput[];
    disconnect?: VoteWhereUniqueInput | VoteWhereUniqueInput[];
    delete?: VoteWhereUniqueInput | VoteWhereUniqueInput[];
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[];
    update?:
      | VoteUpdateWithWhereUniqueWithoutMessageInput
      | VoteUpdateWithWhereUniqueWithoutMessageInput[];
    updateMany?:
      | VoteUpdateManyWithWhereWithoutMessageInput
      | VoteUpdateManyWithWhereWithoutMessageInput[];
    deleteMany?: VoteScalarWhereInput | VoteScalarWhereInput[];
  };

  export type MessageCreateNestedOneWithoutVotesInput = {
    create?: XOR<
      MessageCreateWithoutVotesInput,
      MessageUncheckedCreateWithoutVotesInput
    >;
    connectOrCreate?: MessageCreateOrConnectWithoutVotesInput;
    connect?: MessageWhereUniqueInput;
  };

  export type ChatCreateNestedOneWithoutVotesInput = {
    create?: XOR<
      ChatCreateWithoutVotesInput,
      ChatUncheckedCreateWithoutVotesInput
    >;
    connectOrCreate?: ChatCreateOrConnectWithoutVotesInput;
    connect?: ChatWhereUniqueInput;
  };

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
  };

  export type MessageUpdateOneRequiredWithoutVotesNestedInput = {
    create?: XOR<
      MessageCreateWithoutVotesInput,
      MessageUncheckedCreateWithoutVotesInput
    >;
    connectOrCreate?: MessageCreateOrConnectWithoutVotesInput;
    upsert?: MessageUpsertWithoutVotesInput;
    connect?: MessageWhereUniqueInput;
    update?: XOR<
      XOR<
        MessageUpdateToOneWithWhereWithoutVotesInput,
        MessageUpdateWithoutVotesInput
      >,
      MessageUncheckedUpdateWithoutVotesInput
    >;
  };

  export type ChatUpdateOneRequiredWithoutVotesNestedInput = {
    create?: XOR<
      ChatCreateWithoutVotesInput,
      ChatUncheckedCreateWithoutVotesInput
    >;
    connectOrCreate?: ChatCreateOrConnectWithoutVotesInput;
    upsert?: ChatUpsertWithoutVotesInput;
    connect?: ChatWhereUniqueInput;
    update?: XOR<
      XOR<
        ChatUpdateToOneWithWhereWithoutVotesInput,
        ChatUpdateWithoutVotesInput
      >,
      ChatUncheckedUpdateWithoutVotesInput
    >;
  };

  export type UserCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<
      UserCreateWithoutDocumentsInput,
      UserUncheckedCreateWithoutDocumentsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutDocumentsInput;
    connect?: UserWhereUniqueInput;
  };

  export type SuggestionCreateNestedManyWithoutDocumentInput = {
    create?:
      | XOR<
          SuggestionCreateWithoutDocumentInput,
          SuggestionUncheckedCreateWithoutDocumentInput
        >
      | SuggestionCreateWithoutDocumentInput[]
      | SuggestionUncheckedCreateWithoutDocumentInput[];
    connectOrCreate?:
      | SuggestionCreateOrConnectWithoutDocumentInput
      | SuggestionCreateOrConnectWithoutDocumentInput[];
    createMany?: SuggestionCreateManyDocumentInputEnvelope;
    connect?: SuggestionWhereUniqueInput | SuggestionWhereUniqueInput[];
  };

  export type SuggestionUncheckedCreateNestedManyWithoutDocumentInput = {
    create?:
      | XOR<
          SuggestionCreateWithoutDocumentInput,
          SuggestionUncheckedCreateWithoutDocumentInput
        >
      | SuggestionCreateWithoutDocumentInput[]
      | SuggestionUncheckedCreateWithoutDocumentInput[];
    connectOrCreate?:
      | SuggestionCreateOrConnectWithoutDocumentInput
      | SuggestionCreateOrConnectWithoutDocumentInput[];
    createMany?: SuggestionCreateManyDocumentInputEnvelope;
    connect?: SuggestionWhereUniqueInput | SuggestionWhereUniqueInput[];
  };

  export type UserUpdateOneRequiredWithoutDocumentsNestedInput = {
    create?: XOR<
      UserCreateWithoutDocumentsInput,
      UserUncheckedCreateWithoutDocumentsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutDocumentsInput;
    upsert?: UserUpsertWithoutDocumentsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutDocumentsInput,
        UserUpdateWithoutDocumentsInput
      >,
      UserUncheckedUpdateWithoutDocumentsInput
    >;
  };

  export type SuggestionUpdateManyWithoutDocumentNestedInput = {
    create?:
      | XOR<
          SuggestionCreateWithoutDocumentInput,
          SuggestionUncheckedCreateWithoutDocumentInput
        >
      | SuggestionCreateWithoutDocumentInput[]
      | SuggestionUncheckedCreateWithoutDocumentInput[];
    connectOrCreate?:
      | SuggestionCreateOrConnectWithoutDocumentInput
      | SuggestionCreateOrConnectWithoutDocumentInput[];
    upsert?:
      | SuggestionUpsertWithWhereUniqueWithoutDocumentInput
      | SuggestionUpsertWithWhereUniqueWithoutDocumentInput[];
    createMany?: SuggestionCreateManyDocumentInputEnvelope;
    set?: SuggestionWhereUniqueInput | SuggestionWhereUniqueInput[];
    disconnect?: SuggestionWhereUniqueInput | SuggestionWhereUniqueInput[];
    delete?: SuggestionWhereUniqueInput | SuggestionWhereUniqueInput[];
    connect?: SuggestionWhereUniqueInput | SuggestionWhereUniqueInput[];
    update?:
      | SuggestionUpdateWithWhereUniqueWithoutDocumentInput
      | SuggestionUpdateWithWhereUniqueWithoutDocumentInput[];
    updateMany?:
      | SuggestionUpdateManyWithWhereWithoutDocumentInput
      | SuggestionUpdateManyWithWhereWithoutDocumentInput[];
    deleteMany?: SuggestionScalarWhereInput | SuggestionScalarWhereInput[];
  };

  export type SuggestionUncheckedUpdateManyWithoutDocumentNestedInput = {
    create?:
      | XOR<
          SuggestionCreateWithoutDocumentInput,
          SuggestionUncheckedCreateWithoutDocumentInput
        >
      | SuggestionCreateWithoutDocumentInput[]
      | SuggestionUncheckedCreateWithoutDocumentInput[];
    connectOrCreate?:
      | SuggestionCreateOrConnectWithoutDocumentInput
      | SuggestionCreateOrConnectWithoutDocumentInput[];
    upsert?:
      | SuggestionUpsertWithWhereUniqueWithoutDocumentInput
      | SuggestionUpsertWithWhereUniqueWithoutDocumentInput[];
    createMany?: SuggestionCreateManyDocumentInputEnvelope;
    set?: SuggestionWhereUniqueInput | SuggestionWhereUniqueInput[];
    disconnect?: SuggestionWhereUniqueInput | SuggestionWhereUniqueInput[];
    delete?: SuggestionWhereUniqueInput | SuggestionWhereUniqueInput[];
    connect?: SuggestionWhereUniqueInput | SuggestionWhereUniqueInput[];
    update?:
      | SuggestionUpdateWithWhereUniqueWithoutDocumentInput
      | SuggestionUpdateWithWhereUniqueWithoutDocumentInput[];
    updateMany?:
      | SuggestionUpdateManyWithWhereWithoutDocumentInput
      | SuggestionUpdateManyWithWhereWithoutDocumentInput[];
    deleteMany?: SuggestionScalarWhereInput | SuggestionScalarWhereInput[];
  };

  export type UserCreateNestedOneWithoutSuggestionsInput = {
    create?: XOR<
      UserCreateWithoutSuggestionsInput,
      UserUncheckedCreateWithoutSuggestionsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutSuggestionsInput;
    connect?: UserWhereUniqueInput;
  };

  export type DocumentCreateNestedOneWithoutSuggestionsInput = {
    create?: XOR<
      DocumentCreateWithoutSuggestionsInput,
      DocumentUncheckedCreateWithoutSuggestionsInput
    >;
    connectOrCreate?: DocumentCreateOrConnectWithoutSuggestionsInput;
    connect?: DocumentWhereUniqueInput;
  };

  export type UserUpdateOneRequiredWithoutSuggestionsNestedInput = {
    create?: XOR<
      UserCreateWithoutSuggestionsInput,
      UserUncheckedCreateWithoutSuggestionsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutSuggestionsInput;
    upsert?: UserUpsertWithoutSuggestionsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutSuggestionsInput,
        UserUpdateWithoutSuggestionsInput
      >,
      UserUncheckedUpdateWithoutSuggestionsInput
    >;
  };

  export type DocumentUpdateOneRequiredWithoutSuggestionsNestedInput = {
    create?: XOR<
      DocumentCreateWithoutSuggestionsInput,
      DocumentUncheckedCreateWithoutSuggestionsInput
    >;
    connectOrCreate?: DocumentCreateOrConnectWithoutSuggestionsInput;
    upsert?: DocumentUpsertWithoutSuggestionsInput;
    connect?: DocumentWhereUniqueInput;
    update?: XOR<
      XOR<
        DocumentUpdateToOneWithWhereWithoutSuggestionsInput,
        DocumentUpdateWithoutSuggestionsInput
      >,
      DocumentUncheckedUpdateWithoutSuggestionsInput
    >;
  };

  export type ChatCreateNestedOneWithoutStreamsInput = {
    create?: XOR<
      ChatCreateWithoutStreamsInput,
      ChatUncheckedCreateWithoutStreamsInput
    >;
    connectOrCreate?: ChatCreateOrConnectWithoutStreamsInput;
    connect?: ChatWhereUniqueInput;
  };

  export type ChatUpdateOneRequiredWithoutStreamsNestedInput = {
    create?: XOR<
      ChatCreateWithoutStreamsInput,
      ChatUncheckedCreateWithoutStreamsInput
    >;
    connectOrCreate?: ChatCreateOrConnectWithoutStreamsInput;
    upsert?: ChatUpsertWithoutStreamsInput;
    connect?: ChatWhereUniqueInput;
    update?: XOR<
      XOR<
        ChatUpdateToOneWithWhereWithoutStreamsInput,
        ChatUpdateWithoutStreamsInput
      >,
      ChatUncheckedUpdateWithoutStreamsInput
    >;
  };

  export type ArchiveEntryCreatetagsInput = {
    set: string[];
  };

  export type UserCreateNestedOneWithoutArchiveEntriesInput = {
    create?: XOR<
      UserCreateWithoutArchiveEntriesInput,
      UserUncheckedCreateWithoutArchiveEntriesInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutArchiveEntriesInput;
    connect?: UserWhereUniqueInput;
  };

  export type ArchiveLinkCreateNestedManyWithoutSourceInput = {
    create?:
      | XOR<
          ArchiveLinkCreateWithoutSourceInput,
          ArchiveLinkUncheckedCreateWithoutSourceInput
        >
      | ArchiveLinkCreateWithoutSourceInput[]
      | ArchiveLinkUncheckedCreateWithoutSourceInput[];
    connectOrCreate?:
      | ArchiveLinkCreateOrConnectWithoutSourceInput
      | ArchiveLinkCreateOrConnectWithoutSourceInput[];
    createMany?: ArchiveLinkCreateManySourceInputEnvelope;
    connect?: ArchiveLinkWhereUniqueInput | ArchiveLinkWhereUniqueInput[];
  };

  export type ArchiveLinkCreateNestedManyWithoutTargetInput = {
    create?:
      | XOR<
          ArchiveLinkCreateWithoutTargetInput,
          ArchiveLinkUncheckedCreateWithoutTargetInput
        >
      | ArchiveLinkCreateWithoutTargetInput[]
      | ArchiveLinkUncheckedCreateWithoutTargetInput[];
    connectOrCreate?:
      | ArchiveLinkCreateOrConnectWithoutTargetInput
      | ArchiveLinkCreateOrConnectWithoutTargetInput[];
    createMany?: ArchiveLinkCreateManyTargetInputEnvelope;
    connect?: ArchiveLinkWhereUniqueInput | ArchiveLinkWhereUniqueInput[];
  };

  export type ChatPinnedArchiveEntryCreateNestedManyWithoutArchiveEntryInput = {
    create?:
      | XOR<
          ChatPinnedArchiveEntryCreateWithoutArchiveEntryInput,
          ChatPinnedArchiveEntryUncheckedCreateWithoutArchiveEntryInput
        >
      | ChatPinnedArchiveEntryCreateWithoutArchiveEntryInput[]
      | ChatPinnedArchiveEntryUncheckedCreateWithoutArchiveEntryInput[];
    connectOrCreate?:
      | ChatPinnedArchiveEntryCreateOrConnectWithoutArchiveEntryInput
      | ChatPinnedArchiveEntryCreateOrConnectWithoutArchiveEntryInput[];
    createMany?: ChatPinnedArchiveEntryCreateManyArchiveEntryInputEnvelope;
    connect?:
      | ChatPinnedArchiveEntryWhereUniqueInput
      | ChatPinnedArchiveEntryWhereUniqueInput[];
  };

  export type ArchiveLinkUncheckedCreateNestedManyWithoutSourceInput = {
    create?:
      | XOR<
          ArchiveLinkCreateWithoutSourceInput,
          ArchiveLinkUncheckedCreateWithoutSourceInput
        >
      | ArchiveLinkCreateWithoutSourceInput[]
      | ArchiveLinkUncheckedCreateWithoutSourceInput[];
    connectOrCreate?:
      | ArchiveLinkCreateOrConnectWithoutSourceInput
      | ArchiveLinkCreateOrConnectWithoutSourceInput[];
    createMany?: ArchiveLinkCreateManySourceInputEnvelope;
    connect?: ArchiveLinkWhereUniqueInput | ArchiveLinkWhereUniqueInput[];
  };

  export type ArchiveLinkUncheckedCreateNestedManyWithoutTargetInput = {
    create?:
      | XOR<
          ArchiveLinkCreateWithoutTargetInput,
          ArchiveLinkUncheckedCreateWithoutTargetInput
        >
      | ArchiveLinkCreateWithoutTargetInput[]
      | ArchiveLinkUncheckedCreateWithoutTargetInput[];
    connectOrCreate?:
      | ArchiveLinkCreateOrConnectWithoutTargetInput
      | ArchiveLinkCreateOrConnectWithoutTargetInput[];
    createMany?: ArchiveLinkCreateManyTargetInputEnvelope;
    connect?: ArchiveLinkWhereUniqueInput | ArchiveLinkWhereUniqueInput[];
  };

  export type ChatPinnedArchiveEntryUncheckedCreateNestedManyWithoutArchiveEntryInput =
    {
      create?:
        | XOR<
            ChatPinnedArchiveEntryCreateWithoutArchiveEntryInput,
            ChatPinnedArchiveEntryUncheckedCreateWithoutArchiveEntryInput
          >
        | ChatPinnedArchiveEntryCreateWithoutArchiveEntryInput[]
        | ChatPinnedArchiveEntryUncheckedCreateWithoutArchiveEntryInput[];
      connectOrCreate?:
        | ChatPinnedArchiveEntryCreateOrConnectWithoutArchiveEntryInput
        | ChatPinnedArchiveEntryCreateOrConnectWithoutArchiveEntryInput[];
      createMany?: ChatPinnedArchiveEntryCreateManyArchiveEntryInputEnvelope;
      connect?:
        | ChatPinnedArchiveEntryWhereUniqueInput
        | ChatPinnedArchiveEntryWhereUniqueInput[];
    };

  export type ArchiveEntryUpdatetagsInput = {
    set?: string[];
    push?: string | string[];
  };

  export type UserUpdateOneRequiredWithoutArchiveEntriesNestedInput = {
    create?: XOR<
      UserCreateWithoutArchiveEntriesInput,
      UserUncheckedCreateWithoutArchiveEntriesInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutArchiveEntriesInput;
    upsert?: UserUpsertWithoutArchiveEntriesInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutArchiveEntriesInput,
        UserUpdateWithoutArchiveEntriesInput
      >,
      UserUncheckedUpdateWithoutArchiveEntriesInput
    >;
  };

  export type ArchiveLinkUpdateManyWithoutSourceNestedInput = {
    create?:
      | XOR<
          ArchiveLinkCreateWithoutSourceInput,
          ArchiveLinkUncheckedCreateWithoutSourceInput
        >
      | ArchiveLinkCreateWithoutSourceInput[]
      | ArchiveLinkUncheckedCreateWithoutSourceInput[];
    connectOrCreate?:
      | ArchiveLinkCreateOrConnectWithoutSourceInput
      | ArchiveLinkCreateOrConnectWithoutSourceInput[];
    upsert?:
      | ArchiveLinkUpsertWithWhereUniqueWithoutSourceInput
      | ArchiveLinkUpsertWithWhereUniqueWithoutSourceInput[];
    createMany?: ArchiveLinkCreateManySourceInputEnvelope;
    set?: ArchiveLinkWhereUniqueInput | ArchiveLinkWhereUniqueInput[];
    disconnect?: ArchiveLinkWhereUniqueInput | ArchiveLinkWhereUniqueInput[];
    delete?: ArchiveLinkWhereUniqueInput | ArchiveLinkWhereUniqueInput[];
    connect?: ArchiveLinkWhereUniqueInput | ArchiveLinkWhereUniqueInput[];
    update?:
      | ArchiveLinkUpdateWithWhereUniqueWithoutSourceInput
      | ArchiveLinkUpdateWithWhereUniqueWithoutSourceInput[];
    updateMany?:
      | ArchiveLinkUpdateManyWithWhereWithoutSourceInput
      | ArchiveLinkUpdateManyWithWhereWithoutSourceInput[];
    deleteMany?: ArchiveLinkScalarWhereInput | ArchiveLinkScalarWhereInput[];
  };

  export type ArchiveLinkUpdateManyWithoutTargetNestedInput = {
    create?:
      | XOR<
          ArchiveLinkCreateWithoutTargetInput,
          ArchiveLinkUncheckedCreateWithoutTargetInput
        >
      | ArchiveLinkCreateWithoutTargetInput[]
      | ArchiveLinkUncheckedCreateWithoutTargetInput[];
    connectOrCreate?:
      | ArchiveLinkCreateOrConnectWithoutTargetInput
      | ArchiveLinkCreateOrConnectWithoutTargetInput[];
    upsert?:
      | ArchiveLinkUpsertWithWhereUniqueWithoutTargetInput
      | ArchiveLinkUpsertWithWhereUniqueWithoutTargetInput[];
    createMany?: ArchiveLinkCreateManyTargetInputEnvelope;
    set?: ArchiveLinkWhereUniqueInput | ArchiveLinkWhereUniqueInput[];
    disconnect?: ArchiveLinkWhereUniqueInput | ArchiveLinkWhereUniqueInput[];
    delete?: ArchiveLinkWhereUniqueInput | ArchiveLinkWhereUniqueInput[];
    connect?: ArchiveLinkWhereUniqueInput | ArchiveLinkWhereUniqueInput[];
    update?:
      | ArchiveLinkUpdateWithWhereUniqueWithoutTargetInput
      | ArchiveLinkUpdateWithWhereUniqueWithoutTargetInput[];
    updateMany?:
      | ArchiveLinkUpdateManyWithWhereWithoutTargetInput
      | ArchiveLinkUpdateManyWithWhereWithoutTargetInput[];
    deleteMany?: ArchiveLinkScalarWhereInput | ArchiveLinkScalarWhereInput[];
  };

  export type ChatPinnedArchiveEntryUpdateManyWithoutArchiveEntryNestedInput = {
    create?:
      | XOR<
          ChatPinnedArchiveEntryCreateWithoutArchiveEntryInput,
          ChatPinnedArchiveEntryUncheckedCreateWithoutArchiveEntryInput
        >
      | ChatPinnedArchiveEntryCreateWithoutArchiveEntryInput[]
      | ChatPinnedArchiveEntryUncheckedCreateWithoutArchiveEntryInput[];
    connectOrCreate?:
      | ChatPinnedArchiveEntryCreateOrConnectWithoutArchiveEntryInput
      | ChatPinnedArchiveEntryCreateOrConnectWithoutArchiveEntryInput[];
    upsert?:
      | ChatPinnedArchiveEntryUpsertWithWhereUniqueWithoutArchiveEntryInput
      | ChatPinnedArchiveEntryUpsertWithWhereUniqueWithoutArchiveEntryInput[];
    createMany?: ChatPinnedArchiveEntryCreateManyArchiveEntryInputEnvelope;
    set?:
      | ChatPinnedArchiveEntryWhereUniqueInput
      | ChatPinnedArchiveEntryWhereUniqueInput[];
    disconnect?:
      | ChatPinnedArchiveEntryWhereUniqueInput
      | ChatPinnedArchiveEntryWhereUniqueInput[];
    delete?:
      | ChatPinnedArchiveEntryWhereUniqueInput
      | ChatPinnedArchiveEntryWhereUniqueInput[];
    connect?:
      | ChatPinnedArchiveEntryWhereUniqueInput
      | ChatPinnedArchiveEntryWhereUniqueInput[];
    update?:
      | ChatPinnedArchiveEntryUpdateWithWhereUniqueWithoutArchiveEntryInput
      | ChatPinnedArchiveEntryUpdateWithWhereUniqueWithoutArchiveEntryInput[];
    updateMany?:
      | ChatPinnedArchiveEntryUpdateManyWithWhereWithoutArchiveEntryInput
      | ChatPinnedArchiveEntryUpdateManyWithWhereWithoutArchiveEntryInput[];
    deleteMany?:
      | ChatPinnedArchiveEntryScalarWhereInput
      | ChatPinnedArchiveEntryScalarWhereInput[];
  };

  export type ArchiveLinkUncheckedUpdateManyWithoutSourceNestedInput = {
    create?:
      | XOR<
          ArchiveLinkCreateWithoutSourceInput,
          ArchiveLinkUncheckedCreateWithoutSourceInput
        >
      | ArchiveLinkCreateWithoutSourceInput[]
      | ArchiveLinkUncheckedCreateWithoutSourceInput[];
    connectOrCreate?:
      | ArchiveLinkCreateOrConnectWithoutSourceInput
      | ArchiveLinkCreateOrConnectWithoutSourceInput[];
    upsert?:
      | ArchiveLinkUpsertWithWhereUniqueWithoutSourceInput
      | ArchiveLinkUpsertWithWhereUniqueWithoutSourceInput[];
    createMany?: ArchiveLinkCreateManySourceInputEnvelope;
    set?: ArchiveLinkWhereUniqueInput | ArchiveLinkWhereUniqueInput[];
    disconnect?: ArchiveLinkWhereUniqueInput | ArchiveLinkWhereUniqueInput[];
    delete?: ArchiveLinkWhereUniqueInput | ArchiveLinkWhereUniqueInput[];
    connect?: ArchiveLinkWhereUniqueInput | ArchiveLinkWhereUniqueInput[];
    update?:
      | ArchiveLinkUpdateWithWhereUniqueWithoutSourceInput
      | ArchiveLinkUpdateWithWhereUniqueWithoutSourceInput[];
    updateMany?:
      | ArchiveLinkUpdateManyWithWhereWithoutSourceInput
      | ArchiveLinkUpdateManyWithWhereWithoutSourceInput[];
    deleteMany?: ArchiveLinkScalarWhereInput | ArchiveLinkScalarWhereInput[];
  };

  export type ArchiveLinkUncheckedUpdateManyWithoutTargetNestedInput = {
    create?:
      | XOR<
          ArchiveLinkCreateWithoutTargetInput,
          ArchiveLinkUncheckedCreateWithoutTargetInput
        >
      | ArchiveLinkCreateWithoutTargetInput[]
      | ArchiveLinkUncheckedCreateWithoutTargetInput[];
    connectOrCreate?:
      | ArchiveLinkCreateOrConnectWithoutTargetInput
      | ArchiveLinkCreateOrConnectWithoutTargetInput[];
    upsert?:
      | ArchiveLinkUpsertWithWhereUniqueWithoutTargetInput
      | ArchiveLinkUpsertWithWhereUniqueWithoutTargetInput[];
    createMany?: ArchiveLinkCreateManyTargetInputEnvelope;
    set?: ArchiveLinkWhereUniqueInput | ArchiveLinkWhereUniqueInput[];
    disconnect?: ArchiveLinkWhereUniqueInput | ArchiveLinkWhereUniqueInput[];
    delete?: ArchiveLinkWhereUniqueInput | ArchiveLinkWhereUniqueInput[];
    connect?: ArchiveLinkWhereUniqueInput | ArchiveLinkWhereUniqueInput[];
    update?:
      | ArchiveLinkUpdateWithWhereUniqueWithoutTargetInput
      | ArchiveLinkUpdateWithWhereUniqueWithoutTargetInput[];
    updateMany?:
      | ArchiveLinkUpdateManyWithWhereWithoutTargetInput
      | ArchiveLinkUpdateManyWithWhereWithoutTargetInput[];
    deleteMany?: ArchiveLinkScalarWhereInput | ArchiveLinkScalarWhereInput[];
  };

  export type ChatPinnedArchiveEntryUncheckedUpdateManyWithoutArchiveEntryNestedInput =
    {
      create?:
        | XOR<
            ChatPinnedArchiveEntryCreateWithoutArchiveEntryInput,
            ChatPinnedArchiveEntryUncheckedCreateWithoutArchiveEntryInput
          >
        | ChatPinnedArchiveEntryCreateWithoutArchiveEntryInput[]
        | ChatPinnedArchiveEntryUncheckedCreateWithoutArchiveEntryInput[];
      connectOrCreate?:
        | ChatPinnedArchiveEntryCreateOrConnectWithoutArchiveEntryInput
        | ChatPinnedArchiveEntryCreateOrConnectWithoutArchiveEntryInput[];
      upsert?:
        | ChatPinnedArchiveEntryUpsertWithWhereUniqueWithoutArchiveEntryInput
        | ChatPinnedArchiveEntryUpsertWithWhereUniqueWithoutArchiveEntryInput[];
      createMany?: ChatPinnedArchiveEntryCreateManyArchiveEntryInputEnvelope;
      set?:
        | ChatPinnedArchiveEntryWhereUniqueInput
        | ChatPinnedArchiveEntryWhereUniqueInput[];
      disconnect?:
        | ChatPinnedArchiveEntryWhereUniqueInput
        | ChatPinnedArchiveEntryWhereUniqueInput[];
      delete?:
        | ChatPinnedArchiveEntryWhereUniqueInput
        | ChatPinnedArchiveEntryWhereUniqueInput[];
      connect?:
        | ChatPinnedArchiveEntryWhereUniqueInput
        | ChatPinnedArchiveEntryWhereUniqueInput[];
      update?:
        | ChatPinnedArchiveEntryUpdateWithWhereUniqueWithoutArchiveEntryInput
        | ChatPinnedArchiveEntryUpdateWithWhereUniqueWithoutArchiveEntryInput[];
      updateMany?:
        | ChatPinnedArchiveEntryUpdateManyWithWhereWithoutArchiveEntryInput
        | ChatPinnedArchiveEntryUpdateManyWithWhereWithoutArchiveEntryInput[];
      deleteMany?:
        | ChatPinnedArchiveEntryScalarWhereInput
        | ChatPinnedArchiveEntryScalarWhereInput[];
    };

  export type ChatCreateNestedOneWithoutPinnedArchiveEntriesInput = {
    create?: XOR<
      ChatCreateWithoutPinnedArchiveEntriesInput,
      ChatUncheckedCreateWithoutPinnedArchiveEntriesInput
    >;
    connectOrCreate?: ChatCreateOrConnectWithoutPinnedArchiveEntriesInput;
    connect?: ChatWhereUniqueInput;
  };

  export type ArchiveEntryCreateNestedOneWithoutPinnedInChatsInput = {
    create?: XOR<
      ArchiveEntryCreateWithoutPinnedInChatsInput,
      ArchiveEntryUncheckedCreateWithoutPinnedInChatsInput
    >;
    connectOrCreate?: ArchiveEntryCreateOrConnectWithoutPinnedInChatsInput;
    connect?: ArchiveEntryWhereUniqueInput;
  };

  export type UserCreateNestedOneWithoutPinnedArchiveEntriesInput = {
    create?: XOR<
      UserCreateWithoutPinnedArchiveEntriesInput,
      UserUncheckedCreateWithoutPinnedArchiveEntriesInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutPinnedArchiveEntriesInput;
    connect?: UserWhereUniqueInput;
  };

  export type ChatUpdateOneRequiredWithoutPinnedArchiveEntriesNestedInput = {
    create?: XOR<
      ChatCreateWithoutPinnedArchiveEntriesInput,
      ChatUncheckedCreateWithoutPinnedArchiveEntriesInput
    >;
    connectOrCreate?: ChatCreateOrConnectWithoutPinnedArchiveEntriesInput;
    upsert?: ChatUpsertWithoutPinnedArchiveEntriesInput;
    connect?: ChatWhereUniqueInput;
    update?: XOR<
      XOR<
        ChatUpdateToOneWithWhereWithoutPinnedArchiveEntriesInput,
        ChatUpdateWithoutPinnedArchiveEntriesInput
      >,
      ChatUncheckedUpdateWithoutPinnedArchiveEntriesInput
    >;
  };

  export type ArchiveEntryUpdateOneRequiredWithoutPinnedInChatsNestedInput = {
    create?: XOR<
      ArchiveEntryCreateWithoutPinnedInChatsInput,
      ArchiveEntryUncheckedCreateWithoutPinnedInChatsInput
    >;
    connectOrCreate?: ArchiveEntryCreateOrConnectWithoutPinnedInChatsInput;
    upsert?: ArchiveEntryUpsertWithoutPinnedInChatsInput;
    connect?: ArchiveEntryWhereUniqueInput;
    update?: XOR<
      XOR<
        ArchiveEntryUpdateToOneWithWhereWithoutPinnedInChatsInput,
        ArchiveEntryUpdateWithoutPinnedInChatsInput
      >,
      ArchiveEntryUncheckedUpdateWithoutPinnedInChatsInput
    >;
  };

  export type UserUpdateOneRequiredWithoutPinnedArchiveEntriesNestedInput = {
    create?: XOR<
      UserCreateWithoutPinnedArchiveEntriesInput,
      UserUncheckedCreateWithoutPinnedArchiveEntriesInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutPinnedArchiveEntriesInput;
    upsert?: UserUpsertWithoutPinnedArchiveEntriesInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutPinnedArchiveEntriesInput,
        UserUpdateWithoutPinnedArchiveEntriesInput
      >,
      UserUncheckedUpdateWithoutPinnedArchiveEntriesInput
    >;
  };

  export type ArchiveEntryCreateNestedOneWithoutOutgoingLinksInput = {
    create?: XOR<
      ArchiveEntryCreateWithoutOutgoingLinksInput,
      ArchiveEntryUncheckedCreateWithoutOutgoingLinksInput
    >;
    connectOrCreate?: ArchiveEntryCreateOrConnectWithoutOutgoingLinksInput;
    connect?: ArchiveEntryWhereUniqueInput;
  };

  export type ArchiveEntryCreateNestedOneWithoutIncomingLinksInput = {
    create?: XOR<
      ArchiveEntryCreateWithoutIncomingLinksInput,
      ArchiveEntryUncheckedCreateWithoutIncomingLinksInput
    >;
    connectOrCreate?: ArchiveEntryCreateOrConnectWithoutIncomingLinksInput;
    connect?: ArchiveEntryWhereUniqueInput;
  };

  export type ArchiveEntryUpdateOneRequiredWithoutOutgoingLinksNestedInput = {
    create?: XOR<
      ArchiveEntryCreateWithoutOutgoingLinksInput,
      ArchiveEntryUncheckedCreateWithoutOutgoingLinksInput
    >;
    connectOrCreate?: ArchiveEntryCreateOrConnectWithoutOutgoingLinksInput;
    upsert?: ArchiveEntryUpsertWithoutOutgoingLinksInput;
    connect?: ArchiveEntryWhereUniqueInput;
    update?: XOR<
      XOR<
        ArchiveEntryUpdateToOneWithWhereWithoutOutgoingLinksInput,
        ArchiveEntryUpdateWithoutOutgoingLinksInput
      >,
      ArchiveEntryUncheckedUpdateWithoutOutgoingLinksInput
    >;
  };

  export type ArchiveEntryUpdateOneRequiredWithoutIncomingLinksNestedInput = {
    create?: XOR<
      ArchiveEntryCreateWithoutIncomingLinksInput,
      ArchiveEntryUncheckedCreateWithoutIncomingLinksInput
    >;
    connectOrCreate?: ArchiveEntryCreateOrConnectWithoutIncomingLinksInput;
    upsert?: ArchiveEntryUpsertWithoutIncomingLinksInput;
    connect?: ArchiveEntryWhereUniqueInput;
    update?: XOR<
      XOR<
        ArchiveEntryUpdateToOneWithWhereWithoutIncomingLinksInput,
        ArchiveEntryUpdateWithoutIncomingLinksInput
      >,
      ArchiveEntryUncheckedUpdateWithoutIncomingLinksInput
    >;
  };

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatFilter<$PrismaModel> | number;
  };

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedUuidFilter<$PrismaModel> | string;
  };

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?:
      | NestedStringNullableWithAggregatesFilter<$PrismaModel>
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<NestedJsonNullableFilterBase<$PrismaModel>>,
          Exclude<
            keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>,
            'path'
          >
        >,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<
        Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>
      >;

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    path?: string[];
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
  };

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null;
  };

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<NestedJsonFilterBase<$PrismaModel>>,
          Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>;

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    path?: string[];
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
  };

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type ChatCreateWithoutUserInput = {
    id?: string;
    createdAt: Date | string;
    title: string;
    visibility?: string;
    lastContext?: NullableJsonNullValueInput | InputJsonValue;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    parentChatId?: string | null;
    forkedFromMessageId?: string | null;
    forkDepth?: number;
    messages?: MessageCreateNestedManyWithoutChatInput;
    votes?: VoteCreateNestedManyWithoutChatInput;
    streams?: StreamCreateNestedManyWithoutChatInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryCreateNestedManyWithoutChatInput;
  };

  export type ChatUncheckedCreateWithoutUserInput = {
    id?: string;
    createdAt: Date | string;
    title: string;
    visibility?: string;
    lastContext?: NullableJsonNullValueInput | InputJsonValue;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    parentChatId?: string | null;
    forkedFromMessageId?: string | null;
    forkDepth?: number;
    messages?: MessageUncheckedCreateNestedManyWithoutChatInput;
    votes?: VoteUncheckedCreateNestedManyWithoutChatInput;
    streams?: StreamUncheckedCreateNestedManyWithoutChatInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryUncheckedCreateNestedManyWithoutChatInput;
  };

  export type ChatCreateOrConnectWithoutUserInput = {
    where: ChatWhereUniqueInput;
    create: XOR<
      ChatCreateWithoutUserInput,
      ChatUncheckedCreateWithoutUserInput
    >;
  };

  export type ChatCreateManyUserInputEnvelope = {
    data: ChatCreateManyUserInput | ChatCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type DocumentCreateWithoutUserInput = {
    id: string;
    createdAt: Date | string;
    title: string;
    content?: string | null;
    kind?: string;
    suggestions?: SuggestionCreateNestedManyWithoutDocumentInput;
  };

  export type DocumentUncheckedCreateWithoutUserInput = {
    id: string;
    createdAt: Date | string;
    title: string;
    content?: string | null;
    kind?: string;
    suggestions?: SuggestionUncheckedCreateNestedManyWithoutDocumentInput;
  };

  export type DocumentCreateOrConnectWithoutUserInput = {
    where: DocumentWhereUniqueInput;
    create: XOR<
      DocumentCreateWithoutUserInput,
      DocumentUncheckedCreateWithoutUserInput
    >;
  };

  export type DocumentCreateManyUserInputEnvelope = {
    data: DocumentCreateManyUserInput | DocumentCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type SuggestionCreateWithoutUserInput = {
    id?: string;
    originalText: string;
    suggestedText: string;
    description?: string | null;
    isResolved?: boolean;
    createdAt: Date | string;
    document: DocumentCreateNestedOneWithoutSuggestionsInput;
  };

  export type SuggestionUncheckedCreateWithoutUserInput = {
    id?: string;
    documentId: string;
    documentCreatedAt: Date | string;
    originalText: string;
    suggestedText: string;
    description?: string | null;
    isResolved?: boolean;
    createdAt: Date | string;
  };

  export type SuggestionCreateOrConnectWithoutUserInput = {
    where: SuggestionWhereUniqueInput;
    create: XOR<
      SuggestionCreateWithoutUserInput,
      SuggestionUncheckedCreateWithoutUserInput
    >;
  };

  export type SuggestionCreateManyUserInputEnvelope = {
    data: SuggestionCreateManyUserInput | SuggestionCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type ArchiveEntryCreateWithoutUserInput = {
    id?: string;
    slug: string;
    entity: string;
    tags?: ArchiveEntryCreatetagsInput | string[];
    body: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    outgoingLinks?: ArchiveLinkCreateNestedManyWithoutSourceInput;
    incomingLinks?: ArchiveLinkCreateNestedManyWithoutTargetInput;
    pinnedInChats?: ChatPinnedArchiveEntryCreateNestedManyWithoutArchiveEntryInput;
  };

  export type ArchiveEntryUncheckedCreateWithoutUserInput = {
    id?: string;
    slug: string;
    entity: string;
    tags?: ArchiveEntryCreatetagsInput | string[];
    body: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    outgoingLinks?: ArchiveLinkUncheckedCreateNestedManyWithoutSourceInput;
    incomingLinks?: ArchiveLinkUncheckedCreateNestedManyWithoutTargetInput;
    pinnedInChats?: ChatPinnedArchiveEntryUncheckedCreateNestedManyWithoutArchiveEntryInput;
  };

  export type ArchiveEntryCreateOrConnectWithoutUserInput = {
    where: ArchiveEntryWhereUniqueInput;
    create: XOR<
      ArchiveEntryCreateWithoutUserInput,
      ArchiveEntryUncheckedCreateWithoutUserInput
    >;
  };

  export type ArchiveEntryCreateManyUserInputEnvelope = {
    data: ArchiveEntryCreateManyUserInput | ArchiveEntryCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type ChatPinnedArchiveEntryCreateWithoutUserInput = {
    id?: string;
    pinnedAt?: Date | string;
    chat: ChatCreateNestedOneWithoutPinnedArchiveEntriesInput;
    archiveEntry: ArchiveEntryCreateNestedOneWithoutPinnedInChatsInput;
  };

  export type ChatPinnedArchiveEntryUncheckedCreateWithoutUserInput = {
    id?: string;
    chatId: string;
    archiveEntryId: string;
    pinnedAt?: Date | string;
  };

  export type ChatPinnedArchiveEntryCreateOrConnectWithoutUserInput = {
    where: ChatPinnedArchiveEntryWhereUniqueInput;
    create: XOR<
      ChatPinnedArchiveEntryCreateWithoutUserInput,
      ChatPinnedArchiveEntryUncheckedCreateWithoutUserInput
    >;
  };

  export type ChatPinnedArchiveEntryCreateManyUserInputEnvelope = {
    data:
      | ChatPinnedArchiveEntryCreateManyUserInput
      | ChatPinnedArchiveEntryCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type UserRateLimitCreateWithoutUserInput = {
    tokens: number;
    lastRefill: Date | string;
  };

  export type UserRateLimitUncheckedCreateWithoutUserInput = {
    tokens: number;
    lastRefill: Date | string;
  };

  export type UserRateLimitCreateOrConnectWithoutUserInput = {
    where: UserRateLimitWhereUniqueInput;
    create: XOR<
      UserRateLimitCreateWithoutUserInput,
      UserRateLimitUncheckedCreateWithoutUserInput
    >;
  };

  export type AgentCreateWithoutUserInput = {
    id?: string;
    name: string;
    description?: string | null;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type AgentUncheckedCreateWithoutUserInput = {
    id?: string;
    name: string;
    description?: string | null;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type AgentCreateOrConnectWithoutUserInput = {
    where: AgentWhereUniqueInput;
    create: XOR<
      AgentCreateWithoutUserInput,
      AgentUncheckedCreateWithoutUserInput
    >;
  };

  export type AgentCreateManyUserInputEnvelope = {
    data: AgentCreateManyUserInput | AgentCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type ChatUpsertWithWhereUniqueWithoutUserInput = {
    where: ChatWhereUniqueInput;
    update: XOR<
      ChatUpdateWithoutUserInput,
      ChatUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      ChatCreateWithoutUserInput,
      ChatUncheckedCreateWithoutUserInput
    >;
  };

  export type ChatUpdateWithWhereUniqueWithoutUserInput = {
    where: ChatWhereUniqueInput;
    data: XOR<ChatUpdateWithoutUserInput, ChatUncheckedUpdateWithoutUserInput>;
  };

  export type ChatUpdateManyWithWhereWithoutUserInput = {
    where: ChatScalarWhereInput;
    data: XOR<
      ChatUpdateManyMutationInput,
      ChatUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type ChatScalarWhereInput = {
    AND?: ChatScalarWhereInput | ChatScalarWhereInput[];
    OR?: ChatScalarWhereInput[];
    NOT?: ChatScalarWhereInput | ChatScalarWhereInput[];
    id?: UuidFilter<'Chat'> | string;
    createdAt?: DateTimeFilter<'Chat'> | Date | string;
    title?: StringFilter<'Chat'> | string;
    userId?: StringFilter<'Chat'> | string;
    visibility?: StringFilter<'Chat'> | string;
    lastContext?: JsonNullableFilter<'Chat'>;
    settings?: JsonNullableFilter<'Chat'>;
    parentChatId?: UuidNullableFilter<'Chat'> | string | null;
    forkedFromMessageId?: UuidNullableFilter<'Chat'> | string | null;
    forkDepth?: IntFilter<'Chat'> | number;
  };

  export type DocumentUpsertWithWhereUniqueWithoutUserInput = {
    where: DocumentWhereUniqueInput;
    update: XOR<
      DocumentUpdateWithoutUserInput,
      DocumentUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      DocumentCreateWithoutUserInput,
      DocumentUncheckedCreateWithoutUserInput
    >;
  };

  export type DocumentUpdateWithWhereUniqueWithoutUserInput = {
    where: DocumentWhereUniqueInput;
    data: XOR<
      DocumentUpdateWithoutUserInput,
      DocumentUncheckedUpdateWithoutUserInput
    >;
  };

  export type DocumentUpdateManyWithWhereWithoutUserInput = {
    where: DocumentScalarWhereInput;
    data: XOR<
      DocumentUpdateManyMutationInput,
      DocumentUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type DocumentScalarWhereInput = {
    AND?: DocumentScalarWhereInput | DocumentScalarWhereInput[];
    OR?: DocumentScalarWhereInput[];
    NOT?: DocumentScalarWhereInput | DocumentScalarWhereInput[];
    id?: UuidFilter<'Document'> | string;
    createdAt?: DateTimeFilter<'Document'> | Date | string;
    title?: StringFilter<'Document'> | string;
    content?: StringNullableFilter<'Document'> | string | null;
    kind?: StringFilter<'Document'> | string;
    userId?: StringFilter<'Document'> | string;
  };

  export type SuggestionUpsertWithWhereUniqueWithoutUserInput = {
    where: SuggestionWhereUniqueInput;
    update: XOR<
      SuggestionUpdateWithoutUserInput,
      SuggestionUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      SuggestionCreateWithoutUserInput,
      SuggestionUncheckedCreateWithoutUserInput
    >;
  };

  export type SuggestionUpdateWithWhereUniqueWithoutUserInput = {
    where: SuggestionWhereUniqueInput;
    data: XOR<
      SuggestionUpdateWithoutUserInput,
      SuggestionUncheckedUpdateWithoutUserInput
    >;
  };

  export type SuggestionUpdateManyWithWhereWithoutUserInput = {
    where: SuggestionScalarWhereInput;
    data: XOR<
      SuggestionUpdateManyMutationInput,
      SuggestionUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type SuggestionScalarWhereInput = {
    AND?: SuggestionScalarWhereInput | SuggestionScalarWhereInput[];
    OR?: SuggestionScalarWhereInput[];
    NOT?: SuggestionScalarWhereInput | SuggestionScalarWhereInput[];
    id?: UuidFilter<'Suggestion'> | string;
    documentId?: UuidFilter<'Suggestion'> | string;
    documentCreatedAt?: DateTimeFilter<'Suggestion'> | Date | string;
    originalText?: StringFilter<'Suggestion'> | string;
    suggestedText?: StringFilter<'Suggestion'> | string;
    description?: StringNullableFilter<'Suggestion'> | string | null;
    isResolved?: BoolFilter<'Suggestion'> | boolean;
    userId?: StringFilter<'Suggestion'> | string;
    createdAt?: DateTimeFilter<'Suggestion'> | Date | string;
  };

  export type ArchiveEntryUpsertWithWhereUniqueWithoutUserInput = {
    where: ArchiveEntryWhereUniqueInput;
    update: XOR<
      ArchiveEntryUpdateWithoutUserInput,
      ArchiveEntryUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      ArchiveEntryCreateWithoutUserInput,
      ArchiveEntryUncheckedCreateWithoutUserInput
    >;
  };

  export type ArchiveEntryUpdateWithWhereUniqueWithoutUserInput = {
    where: ArchiveEntryWhereUniqueInput;
    data: XOR<
      ArchiveEntryUpdateWithoutUserInput,
      ArchiveEntryUncheckedUpdateWithoutUserInput
    >;
  };

  export type ArchiveEntryUpdateManyWithWhereWithoutUserInput = {
    where: ArchiveEntryScalarWhereInput;
    data: XOR<
      ArchiveEntryUpdateManyMutationInput,
      ArchiveEntryUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type ArchiveEntryScalarWhereInput = {
    AND?: ArchiveEntryScalarWhereInput | ArchiveEntryScalarWhereInput[];
    OR?: ArchiveEntryScalarWhereInput[];
    NOT?: ArchiveEntryScalarWhereInput | ArchiveEntryScalarWhereInput[];
    id?: UuidFilter<'ArchiveEntry'> | string;
    userId?: StringFilter<'ArchiveEntry'> | string;
    slug?: StringFilter<'ArchiveEntry'> | string;
    entity?: StringFilter<'ArchiveEntry'> | string;
    tags?: StringNullableListFilter<'ArchiveEntry'>;
    body?: StringFilter<'ArchiveEntry'> | string;
    createdAt?: DateTimeFilter<'ArchiveEntry'> | Date | string;
    updatedAt?: DateTimeFilter<'ArchiveEntry'> | Date | string;
  };

  export type ChatPinnedArchiveEntryUpsertWithWhereUniqueWithoutUserInput = {
    where: ChatPinnedArchiveEntryWhereUniqueInput;
    update: XOR<
      ChatPinnedArchiveEntryUpdateWithoutUserInput,
      ChatPinnedArchiveEntryUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      ChatPinnedArchiveEntryCreateWithoutUserInput,
      ChatPinnedArchiveEntryUncheckedCreateWithoutUserInput
    >;
  };

  export type ChatPinnedArchiveEntryUpdateWithWhereUniqueWithoutUserInput = {
    where: ChatPinnedArchiveEntryWhereUniqueInput;
    data: XOR<
      ChatPinnedArchiveEntryUpdateWithoutUserInput,
      ChatPinnedArchiveEntryUncheckedUpdateWithoutUserInput
    >;
  };

  export type ChatPinnedArchiveEntryUpdateManyWithWhereWithoutUserInput = {
    where: ChatPinnedArchiveEntryScalarWhereInput;
    data: XOR<
      ChatPinnedArchiveEntryUpdateManyMutationInput,
      ChatPinnedArchiveEntryUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type ChatPinnedArchiveEntryScalarWhereInput = {
    AND?:
      | ChatPinnedArchiveEntryScalarWhereInput
      | ChatPinnedArchiveEntryScalarWhereInput[];
    OR?: ChatPinnedArchiveEntryScalarWhereInput[];
    NOT?:
      | ChatPinnedArchiveEntryScalarWhereInput
      | ChatPinnedArchiveEntryScalarWhereInput[];
    id?: UuidFilter<'ChatPinnedArchiveEntry'> | string;
    chatId?: UuidFilter<'ChatPinnedArchiveEntry'> | string;
    archiveEntryId?: UuidFilter<'ChatPinnedArchiveEntry'> | string;
    userId?: StringFilter<'ChatPinnedArchiveEntry'> | string;
    pinnedAt?: DateTimeFilter<'ChatPinnedArchiveEntry'> | Date | string;
  };

  export type UserRateLimitUpsertWithoutUserInput = {
    update: XOR<
      UserRateLimitUpdateWithoutUserInput,
      UserRateLimitUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      UserRateLimitCreateWithoutUserInput,
      UserRateLimitUncheckedCreateWithoutUserInput
    >;
    where?: UserRateLimitWhereInput;
  };

  export type UserRateLimitUpdateToOneWithWhereWithoutUserInput = {
    where?: UserRateLimitWhereInput;
    data: XOR<
      UserRateLimitUpdateWithoutUserInput,
      UserRateLimitUncheckedUpdateWithoutUserInput
    >;
  };

  export type UserRateLimitUpdateWithoutUserInput = {
    tokens?: IntFieldUpdateOperationsInput | number;
    lastRefill?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserRateLimitUncheckedUpdateWithoutUserInput = {
    tokens?: IntFieldUpdateOperationsInput | number;
    lastRefill?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AgentUpsertWithWhereUniqueWithoutUserInput = {
    where: AgentWhereUniqueInput;
    update: XOR<
      AgentUpdateWithoutUserInput,
      AgentUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      AgentCreateWithoutUserInput,
      AgentUncheckedCreateWithoutUserInput
    >;
  };

  export type AgentUpdateWithWhereUniqueWithoutUserInput = {
    where: AgentWhereUniqueInput;
    data: XOR<
      AgentUpdateWithoutUserInput,
      AgentUncheckedUpdateWithoutUserInput
    >;
  };

  export type AgentUpdateManyWithWhereWithoutUserInput = {
    where: AgentScalarWhereInput;
    data: XOR<
      AgentUpdateManyMutationInput,
      AgentUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type AgentScalarWhereInput = {
    AND?: AgentScalarWhereInput | AgentScalarWhereInput[];
    OR?: AgentScalarWhereInput[];
    NOT?: AgentScalarWhereInput | AgentScalarWhereInput[];
    id?: UuidFilter<'Agent'> | string;
    userId?: StringFilter<'Agent'> | string;
    name?: StringFilter<'Agent'> | string;
    description?: StringNullableFilter<'Agent'> | string | null;
    settings?: JsonNullableFilter<'Agent'>;
    createdAt?: DateTimeFilter<'Agent'> | Date | string;
    updatedAt?: DateTimeFilter<'Agent'> | Date | string;
  };

  export type UserCreateWithoutRateLimitInput = {
    id: string;
    email: string;
    chats?: ChatCreateNestedManyWithoutUserInput;
    documents?: DocumentCreateNestedManyWithoutUserInput;
    suggestions?: SuggestionCreateNestedManyWithoutUserInput;
    archiveEntries?: ArchiveEntryCreateNestedManyWithoutUserInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryCreateNestedManyWithoutUserInput;
    agents?: AgentCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutRateLimitInput = {
    id: string;
    email: string;
    chats?: ChatUncheckedCreateNestedManyWithoutUserInput;
    documents?: DocumentUncheckedCreateNestedManyWithoutUserInput;
    suggestions?: SuggestionUncheckedCreateNestedManyWithoutUserInput;
    archiveEntries?: ArchiveEntryUncheckedCreateNestedManyWithoutUserInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryUncheckedCreateNestedManyWithoutUserInput;
    agents?: AgentUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutRateLimitInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutRateLimitInput,
      UserUncheckedCreateWithoutRateLimitInput
    >;
  };

  export type UserUpsertWithoutRateLimitInput = {
    update: XOR<
      UserUpdateWithoutRateLimitInput,
      UserUncheckedUpdateWithoutRateLimitInput
    >;
    create: XOR<
      UserCreateWithoutRateLimitInput,
      UserUncheckedCreateWithoutRateLimitInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutRateLimitInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutRateLimitInput,
      UserUncheckedUpdateWithoutRateLimitInput
    >;
  };

  export type UserUpdateWithoutRateLimitInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    chats?: ChatUpdateManyWithoutUserNestedInput;
    documents?: DocumentUpdateManyWithoutUserNestedInput;
    suggestions?: SuggestionUpdateManyWithoutUserNestedInput;
    archiveEntries?: ArchiveEntryUpdateManyWithoutUserNestedInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryUpdateManyWithoutUserNestedInput;
    agents?: AgentUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutRateLimitInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    chats?: ChatUncheckedUpdateManyWithoutUserNestedInput;
    documents?: DocumentUncheckedUpdateManyWithoutUserNestedInput;
    suggestions?: SuggestionUncheckedUpdateManyWithoutUserNestedInput;
    archiveEntries?: ArchiveEntryUncheckedUpdateManyWithoutUserNestedInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryUncheckedUpdateManyWithoutUserNestedInput;
    agents?: AgentUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type UserCreateWithoutAgentsInput = {
    id: string;
    email: string;
    chats?: ChatCreateNestedManyWithoutUserInput;
    documents?: DocumentCreateNestedManyWithoutUserInput;
    suggestions?: SuggestionCreateNestedManyWithoutUserInput;
    archiveEntries?: ArchiveEntryCreateNestedManyWithoutUserInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryCreateNestedManyWithoutUserInput;
    rateLimit?: UserRateLimitCreateNestedOneWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutAgentsInput = {
    id: string;
    email: string;
    chats?: ChatUncheckedCreateNestedManyWithoutUserInput;
    documents?: DocumentUncheckedCreateNestedManyWithoutUserInput;
    suggestions?: SuggestionUncheckedCreateNestedManyWithoutUserInput;
    archiveEntries?: ArchiveEntryUncheckedCreateNestedManyWithoutUserInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryUncheckedCreateNestedManyWithoutUserInput;
    rateLimit?: UserRateLimitUncheckedCreateNestedOneWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutAgentsInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutAgentsInput,
      UserUncheckedCreateWithoutAgentsInput
    >;
  };

  export type UserUpsertWithoutAgentsInput = {
    update: XOR<
      UserUpdateWithoutAgentsInput,
      UserUncheckedUpdateWithoutAgentsInput
    >;
    create: XOR<
      UserCreateWithoutAgentsInput,
      UserUncheckedCreateWithoutAgentsInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutAgentsInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutAgentsInput,
      UserUncheckedUpdateWithoutAgentsInput
    >;
  };

  export type UserUpdateWithoutAgentsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    chats?: ChatUpdateManyWithoutUserNestedInput;
    documents?: DocumentUpdateManyWithoutUserNestedInput;
    suggestions?: SuggestionUpdateManyWithoutUserNestedInput;
    archiveEntries?: ArchiveEntryUpdateManyWithoutUserNestedInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryUpdateManyWithoutUserNestedInput;
    rateLimit?: UserRateLimitUpdateOneWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutAgentsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    chats?: ChatUncheckedUpdateManyWithoutUserNestedInput;
    documents?: DocumentUncheckedUpdateManyWithoutUserNestedInput;
    suggestions?: SuggestionUncheckedUpdateManyWithoutUserNestedInput;
    archiveEntries?: ArchiveEntryUncheckedUpdateManyWithoutUserNestedInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryUncheckedUpdateManyWithoutUserNestedInput;
    rateLimit?: UserRateLimitUncheckedUpdateOneWithoutUserNestedInput;
  };

  export type UserCreateWithoutChatsInput = {
    id: string;
    email: string;
    documents?: DocumentCreateNestedManyWithoutUserInput;
    suggestions?: SuggestionCreateNestedManyWithoutUserInput;
    archiveEntries?: ArchiveEntryCreateNestedManyWithoutUserInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryCreateNestedManyWithoutUserInput;
    rateLimit?: UserRateLimitCreateNestedOneWithoutUserInput;
    agents?: AgentCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutChatsInput = {
    id: string;
    email: string;
    documents?: DocumentUncheckedCreateNestedManyWithoutUserInput;
    suggestions?: SuggestionUncheckedCreateNestedManyWithoutUserInput;
    archiveEntries?: ArchiveEntryUncheckedCreateNestedManyWithoutUserInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryUncheckedCreateNestedManyWithoutUserInput;
    rateLimit?: UserRateLimitUncheckedCreateNestedOneWithoutUserInput;
    agents?: AgentUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutChatsInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutChatsInput,
      UserUncheckedCreateWithoutChatsInput
    >;
  };

  export type MessageCreateWithoutChatInput = {
    id?: string;
    role: string;
    parts: JsonNullValueInput | InputJsonValue;
    attachments: JsonNullValueInput | InputJsonValue;
    createdAt: Date | string;
    votes?: VoteCreateNestedManyWithoutMessageInput;
  };

  export type MessageUncheckedCreateWithoutChatInput = {
    id?: string;
    role: string;
    parts: JsonNullValueInput | InputJsonValue;
    attachments: JsonNullValueInput | InputJsonValue;
    createdAt: Date | string;
    votes?: VoteUncheckedCreateNestedManyWithoutMessageInput;
  };

  export type MessageCreateOrConnectWithoutChatInput = {
    where: MessageWhereUniqueInput;
    create: XOR<
      MessageCreateWithoutChatInput,
      MessageUncheckedCreateWithoutChatInput
    >;
  };

  export type MessageCreateManyChatInputEnvelope = {
    data: MessageCreateManyChatInput | MessageCreateManyChatInput[];
    skipDuplicates?: boolean;
  };

  export type VoteCreateWithoutChatInput = {
    isUpvoted: boolean;
    message: MessageCreateNestedOneWithoutVotesInput;
  };

  export type VoteUncheckedCreateWithoutChatInput = {
    messageId: string;
    isUpvoted: boolean;
  };

  export type VoteCreateOrConnectWithoutChatInput = {
    where: VoteWhereUniqueInput;
    create: XOR<
      VoteCreateWithoutChatInput,
      VoteUncheckedCreateWithoutChatInput
    >;
  };

  export type VoteCreateManyChatInputEnvelope = {
    data: VoteCreateManyChatInput | VoteCreateManyChatInput[];
    skipDuplicates?: boolean;
  };

  export type StreamCreateWithoutChatInput = {
    id?: string;
    createdAt: Date | string;
  };

  export type StreamUncheckedCreateWithoutChatInput = {
    id?: string;
    createdAt: Date | string;
  };

  export type StreamCreateOrConnectWithoutChatInput = {
    where: StreamWhereUniqueInput;
    create: XOR<
      StreamCreateWithoutChatInput,
      StreamUncheckedCreateWithoutChatInput
    >;
  };

  export type StreamCreateManyChatInputEnvelope = {
    data: StreamCreateManyChatInput | StreamCreateManyChatInput[];
    skipDuplicates?: boolean;
  };

  export type ChatPinnedArchiveEntryCreateWithoutChatInput = {
    id?: string;
    pinnedAt?: Date | string;
    archiveEntry: ArchiveEntryCreateNestedOneWithoutPinnedInChatsInput;
    user: UserCreateNestedOneWithoutPinnedArchiveEntriesInput;
  };

  export type ChatPinnedArchiveEntryUncheckedCreateWithoutChatInput = {
    id?: string;
    archiveEntryId: string;
    userId: string;
    pinnedAt?: Date | string;
  };

  export type ChatPinnedArchiveEntryCreateOrConnectWithoutChatInput = {
    where: ChatPinnedArchiveEntryWhereUniqueInput;
    create: XOR<
      ChatPinnedArchiveEntryCreateWithoutChatInput,
      ChatPinnedArchiveEntryUncheckedCreateWithoutChatInput
    >;
  };

  export type ChatPinnedArchiveEntryCreateManyChatInputEnvelope = {
    data:
      | ChatPinnedArchiveEntryCreateManyChatInput
      | ChatPinnedArchiveEntryCreateManyChatInput[];
    skipDuplicates?: boolean;
  };

  export type UserUpsertWithoutChatsInput = {
    update: XOR<
      UserUpdateWithoutChatsInput,
      UserUncheckedUpdateWithoutChatsInput
    >;
    create: XOR<
      UserCreateWithoutChatsInput,
      UserUncheckedCreateWithoutChatsInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutChatsInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutChatsInput,
      UserUncheckedUpdateWithoutChatsInput
    >;
  };

  export type UserUpdateWithoutChatsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    documents?: DocumentUpdateManyWithoutUserNestedInput;
    suggestions?: SuggestionUpdateManyWithoutUserNestedInput;
    archiveEntries?: ArchiveEntryUpdateManyWithoutUserNestedInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryUpdateManyWithoutUserNestedInput;
    rateLimit?: UserRateLimitUpdateOneWithoutUserNestedInput;
    agents?: AgentUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutChatsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    documents?: DocumentUncheckedUpdateManyWithoutUserNestedInput;
    suggestions?: SuggestionUncheckedUpdateManyWithoutUserNestedInput;
    archiveEntries?: ArchiveEntryUncheckedUpdateManyWithoutUserNestedInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryUncheckedUpdateManyWithoutUserNestedInput;
    rateLimit?: UserRateLimitUncheckedUpdateOneWithoutUserNestedInput;
    agents?: AgentUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type MessageUpsertWithWhereUniqueWithoutChatInput = {
    where: MessageWhereUniqueInput;
    update: XOR<
      MessageUpdateWithoutChatInput,
      MessageUncheckedUpdateWithoutChatInput
    >;
    create: XOR<
      MessageCreateWithoutChatInput,
      MessageUncheckedCreateWithoutChatInput
    >;
  };

  export type MessageUpdateWithWhereUniqueWithoutChatInput = {
    where: MessageWhereUniqueInput;
    data: XOR<
      MessageUpdateWithoutChatInput,
      MessageUncheckedUpdateWithoutChatInput
    >;
  };

  export type MessageUpdateManyWithWhereWithoutChatInput = {
    where: MessageScalarWhereInput;
    data: XOR<
      MessageUpdateManyMutationInput,
      MessageUncheckedUpdateManyWithoutChatInput
    >;
  };

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[];
    OR?: MessageScalarWhereInput[];
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[];
    id?: UuidFilter<'Message'> | string;
    chatId?: UuidFilter<'Message'> | string;
    role?: StringFilter<'Message'> | string;
    parts?: JsonFilter<'Message'>;
    attachments?: JsonFilter<'Message'>;
    createdAt?: DateTimeFilter<'Message'> | Date | string;
  };

  export type VoteUpsertWithWhereUniqueWithoutChatInput = {
    where: VoteWhereUniqueInput;
    update: XOR<
      VoteUpdateWithoutChatInput,
      VoteUncheckedUpdateWithoutChatInput
    >;
    create: XOR<
      VoteCreateWithoutChatInput,
      VoteUncheckedCreateWithoutChatInput
    >;
  };

  export type VoteUpdateWithWhereUniqueWithoutChatInput = {
    where: VoteWhereUniqueInput;
    data: XOR<VoteUpdateWithoutChatInput, VoteUncheckedUpdateWithoutChatInput>;
  };

  export type VoteUpdateManyWithWhereWithoutChatInput = {
    where: VoteScalarWhereInput;
    data: XOR<
      VoteUpdateManyMutationInput,
      VoteUncheckedUpdateManyWithoutChatInput
    >;
  };

  export type VoteScalarWhereInput = {
    AND?: VoteScalarWhereInput | VoteScalarWhereInput[];
    OR?: VoteScalarWhereInput[];
    NOT?: VoteScalarWhereInput | VoteScalarWhereInput[];
    chatId?: UuidFilter<'Vote'> | string;
    messageId?: UuidFilter<'Vote'> | string;
    isUpvoted?: BoolFilter<'Vote'> | boolean;
  };

  export type StreamUpsertWithWhereUniqueWithoutChatInput = {
    where: StreamWhereUniqueInput;
    update: XOR<
      StreamUpdateWithoutChatInput,
      StreamUncheckedUpdateWithoutChatInput
    >;
    create: XOR<
      StreamCreateWithoutChatInput,
      StreamUncheckedCreateWithoutChatInput
    >;
  };

  export type StreamUpdateWithWhereUniqueWithoutChatInput = {
    where: StreamWhereUniqueInput;
    data: XOR<
      StreamUpdateWithoutChatInput,
      StreamUncheckedUpdateWithoutChatInput
    >;
  };

  export type StreamUpdateManyWithWhereWithoutChatInput = {
    where: StreamScalarWhereInput;
    data: XOR<
      StreamUpdateManyMutationInput,
      StreamUncheckedUpdateManyWithoutChatInput
    >;
  };

  export type StreamScalarWhereInput = {
    AND?: StreamScalarWhereInput | StreamScalarWhereInput[];
    OR?: StreamScalarWhereInput[];
    NOT?: StreamScalarWhereInput | StreamScalarWhereInput[];
    id?: UuidFilter<'Stream'> | string;
    chatId?: UuidFilter<'Stream'> | string;
    createdAt?: DateTimeFilter<'Stream'> | Date | string;
  };

  export type ChatPinnedArchiveEntryUpsertWithWhereUniqueWithoutChatInput = {
    where: ChatPinnedArchiveEntryWhereUniqueInput;
    update: XOR<
      ChatPinnedArchiveEntryUpdateWithoutChatInput,
      ChatPinnedArchiveEntryUncheckedUpdateWithoutChatInput
    >;
    create: XOR<
      ChatPinnedArchiveEntryCreateWithoutChatInput,
      ChatPinnedArchiveEntryUncheckedCreateWithoutChatInput
    >;
  };

  export type ChatPinnedArchiveEntryUpdateWithWhereUniqueWithoutChatInput = {
    where: ChatPinnedArchiveEntryWhereUniqueInput;
    data: XOR<
      ChatPinnedArchiveEntryUpdateWithoutChatInput,
      ChatPinnedArchiveEntryUncheckedUpdateWithoutChatInput
    >;
  };

  export type ChatPinnedArchiveEntryUpdateManyWithWhereWithoutChatInput = {
    where: ChatPinnedArchiveEntryScalarWhereInput;
    data: XOR<
      ChatPinnedArchiveEntryUpdateManyMutationInput,
      ChatPinnedArchiveEntryUncheckedUpdateManyWithoutChatInput
    >;
  };

  export type ChatCreateWithoutMessagesInput = {
    id?: string;
    createdAt: Date | string;
    title: string;
    visibility?: string;
    lastContext?: NullableJsonNullValueInput | InputJsonValue;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    parentChatId?: string | null;
    forkedFromMessageId?: string | null;
    forkDepth?: number;
    user: UserCreateNestedOneWithoutChatsInput;
    votes?: VoteCreateNestedManyWithoutChatInput;
    streams?: StreamCreateNestedManyWithoutChatInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryCreateNestedManyWithoutChatInput;
  };

  export type ChatUncheckedCreateWithoutMessagesInput = {
    id?: string;
    createdAt: Date | string;
    title: string;
    userId: string;
    visibility?: string;
    lastContext?: NullableJsonNullValueInput | InputJsonValue;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    parentChatId?: string | null;
    forkedFromMessageId?: string | null;
    forkDepth?: number;
    votes?: VoteUncheckedCreateNestedManyWithoutChatInput;
    streams?: StreamUncheckedCreateNestedManyWithoutChatInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryUncheckedCreateNestedManyWithoutChatInput;
  };

  export type ChatCreateOrConnectWithoutMessagesInput = {
    where: ChatWhereUniqueInput;
    create: XOR<
      ChatCreateWithoutMessagesInput,
      ChatUncheckedCreateWithoutMessagesInput
    >;
  };

  export type VoteCreateWithoutMessageInput = {
    isUpvoted: boolean;
    chat: ChatCreateNestedOneWithoutVotesInput;
  };

  export type VoteUncheckedCreateWithoutMessageInput = {
    chatId: string;
    isUpvoted: boolean;
  };

  export type VoteCreateOrConnectWithoutMessageInput = {
    where: VoteWhereUniqueInput;
    create: XOR<
      VoteCreateWithoutMessageInput,
      VoteUncheckedCreateWithoutMessageInput
    >;
  };

  export type VoteCreateManyMessageInputEnvelope = {
    data: VoteCreateManyMessageInput | VoteCreateManyMessageInput[];
    skipDuplicates?: boolean;
  };

  export type ChatUpsertWithoutMessagesInput = {
    update: XOR<
      ChatUpdateWithoutMessagesInput,
      ChatUncheckedUpdateWithoutMessagesInput
    >;
    create: XOR<
      ChatCreateWithoutMessagesInput,
      ChatUncheckedCreateWithoutMessagesInput
    >;
    where?: ChatWhereInput;
  };

  export type ChatUpdateToOneWithWhereWithoutMessagesInput = {
    where?: ChatWhereInput;
    data: XOR<
      ChatUpdateWithoutMessagesInput,
      ChatUncheckedUpdateWithoutMessagesInput
    >;
  };

  export type ChatUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: StringFieldUpdateOperationsInput | string;
    visibility?: StringFieldUpdateOperationsInput | string;
    lastContext?: NullableJsonNullValueInput | InputJsonValue;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    parentChatId?: NullableStringFieldUpdateOperationsInput | string | null;
    forkedFromMessageId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    forkDepth?: IntFieldUpdateOperationsInput | number;
    user?: UserUpdateOneRequiredWithoutChatsNestedInput;
    votes?: VoteUpdateManyWithoutChatNestedInput;
    streams?: StreamUpdateManyWithoutChatNestedInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryUpdateManyWithoutChatNestedInput;
  };

  export type ChatUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    visibility?: StringFieldUpdateOperationsInput | string;
    lastContext?: NullableJsonNullValueInput | InputJsonValue;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    parentChatId?: NullableStringFieldUpdateOperationsInput | string | null;
    forkedFromMessageId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    forkDepth?: IntFieldUpdateOperationsInput | number;
    votes?: VoteUncheckedUpdateManyWithoutChatNestedInput;
    streams?: StreamUncheckedUpdateManyWithoutChatNestedInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryUncheckedUpdateManyWithoutChatNestedInput;
  };

  export type VoteUpsertWithWhereUniqueWithoutMessageInput = {
    where: VoteWhereUniqueInput;
    update: XOR<
      VoteUpdateWithoutMessageInput,
      VoteUncheckedUpdateWithoutMessageInput
    >;
    create: XOR<
      VoteCreateWithoutMessageInput,
      VoteUncheckedCreateWithoutMessageInput
    >;
  };

  export type VoteUpdateWithWhereUniqueWithoutMessageInput = {
    where: VoteWhereUniqueInput;
    data: XOR<
      VoteUpdateWithoutMessageInput,
      VoteUncheckedUpdateWithoutMessageInput
    >;
  };

  export type VoteUpdateManyWithWhereWithoutMessageInput = {
    where: VoteScalarWhereInput;
    data: XOR<
      VoteUpdateManyMutationInput,
      VoteUncheckedUpdateManyWithoutMessageInput
    >;
  };

  export type MessageCreateWithoutVotesInput = {
    id?: string;
    role: string;
    parts: JsonNullValueInput | InputJsonValue;
    attachments: JsonNullValueInput | InputJsonValue;
    createdAt: Date | string;
    chat: ChatCreateNestedOneWithoutMessagesInput;
  };

  export type MessageUncheckedCreateWithoutVotesInput = {
    id?: string;
    chatId: string;
    role: string;
    parts: JsonNullValueInput | InputJsonValue;
    attachments: JsonNullValueInput | InputJsonValue;
    createdAt: Date | string;
  };

  export type MessageCreateOrConnectWithoutVotesInput = {
    where: MessageWhereUniqueInput;
    create: XOR<
      MessageCreateWithoutVotesInput,
      MessageUncheckedCreateWithoutVotesInput
    >;
  };

  export type ChatCreateWithoutVotesInput = {
    id?: string;
    createdAt: Date | string;
    title: string;
    visibility?: string;
    lastContext?: NullableJsonNullValueInput | InputJsonValue;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    parentChatId?: string | null;
    forkedFromMessageId?: string | null;
    forkDepth?: number;
    user: UserCreateNestedOneWithoutChatsInput;
    messages?: MessageCreateNestedManyWithoutChatInput;
    streams?: StreamCreateNestedManyWithoutChatInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryCreateNestedManyWithoutChatInput;
  };

  export type ChatUncheckedCreateWithoutVotesInput = {
    id?: string;
    createdAt: Date | string;
    title: string;
    userId: string;
    visibility?: string;
    lastContext?: NullableJsonNullValueInput | InputJsonValue;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    parentChatId?: string | null;
    forkedFromMessageId?: string | null;
    forkDepth?: number;
    messages?: MessageUncheckedCreateNestedManyWithoutChatInput;
    streams?: StreamUncheckedCreateNestedManyWithoutChatInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryUncheckedCreateNestedManyWithoutChatInput;
  };

  export type ChatCreateOrConnectWithoutVotesInput = {
    where: ChatWhereUniqueInput;
    create: XOR<
      ChatCreateWithoutVotesInput,
      ChatUncheckedCreateWithoutVotesInput
    >;
  };

  export type MessageUpsertWithoutVotesInput = {
    update: XOR<
      MessageUpdateWithoutVotesInput,
      MessageUncheckedUpdateWithoutVotesInput
    >;
    create: XOR<
      MessageCreateWithoutVotesInput,
      MessageUncheckedCreateWithoutVotesInput
    >;
    where?: MessageWhereInput;
  };

  export type MessageUpdateToOneWithWhereWithoutVotesInput = {
    where?: MessageWhereInput;
    data: XOR<
      MessageUpdateWithoutVotesInput,
      MessageUncheckedUpdateWithoutVotesInput
    >;
  };

  export type MessageUpdateWithoutVotesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    parts?: JsonNullValueInput | InputJsonValue;
    attachments?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    chat?: ChatUpdateOneRequiredWithoutMessagesNestedInput;
  };

  export type MessageUncheckedUpdateWithoutVotesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    chatId?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    parts?: JsonNullValueInput | InputJsonValue;
    attachments?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ChatUpsertWithoutVotesInput = {
    update: XOR<
      ChatUpdateWithoutVotesInput,
      ChatUncheckedUpdateWithoutVotesInput
    >;
    create: XOR<
      ChatCreateWithoutVotesInput,
      ChatUncheckedCreateWithoutVotesInput
    >;
    where?: ChatWhereInput;
  };

  export type ChatUpdateToOneWithWhereWithoutVotesInput = {
    where?: ChatWhereInput;
    data: XOR<
      ChatUpdateWithoutVotesInput,
      ChatUncheckedUpdateWithoutVotesInput
    >;
  };

  export type ChatUpdateWithoutVotesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: StringFieldUpdateOperationsInput | string;
    visibility?: StringFieldUpdateOperationsInput | string;
    lastContext?: NullableJsonNullValueInput | InputJsonValue;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    parentChatId?: NullableStringFieldUpdateOperationsInput | string | null;
    forkedFromMessageId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    forkDepth?: IntFieldUpdateOperationsInput | number;
    user?: UserUpdateOneRequiredWithoutChatsNestedInput;
    messages?: MessageUpdateManyWithoutChatNestedInput;
    streams?: StreamUpdateManyWithoutChatNestedInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryUpdateManyWithoutChatNestedInput;
  };

  export type ChatUncheckedUpdateWithoutVotesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    visibility?: StringFieldUpdateOperationsInput | string;
    lastContext?: NullableJsonNullValueInput | InputJsonValue;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    parentChatId?: NullableStringFieldUpdateOperationsInput | string | null;
    forkedFromMessageId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    forkDepth?: IntFieldUpdateOperationsInput | number;
    messages?: MessageUncheckedUpdateManyWithoutChatNestedInput;
    streams?: StreamUncheckedUpdateManyWithoutChatNestedInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryUncheckedUpdateManyWithoutChatNestedInput;
  };

  export type UserCreateWithoutDocumentsInput = {
    id: string;
    email: string;
    chats?: ChatCreateNestedManyWithoutUserInput;
    suggestions?: SuggestionCreateNestedManyWithoutUserInput;
    archiveEntries?: ArchiveEntryCreateNestedManyWithoutUserInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryCreateNestedManyWithoutUserInput;
    rateLimit?: UserRateLimitCreateNestedOneWithoutUserInput;
    agents?: AgentCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutDocumentsInput = {
    id: string;
    email: string;
    chats?: ChatUncheckedCreateNestedManyWithoutUserInput;
    suggestions?: SuggestionUncheckedCreateNestedManyWithoutUserInput;
    archiveEntries?: ArchiveEntryUncheckedCreateNestedManyWithoutUserInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryUncheckedCreateNestedManyWithoutUserInput;
    rateLimit?: UserRateLimitUncheckedCreateNestedOneWithoutUserInput;
    agents?: AgentUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutDocumentsInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutDocumentsInput,
      UserUncheckedCreateWithoutDocumentsInput
    >;
  };

  export type SuggestionCreateWithoutDocumentInput = {
    id?: string;
    originalText: string;
    suggestedText: string;
    description?: string | null;
    isResolved?: boolean;
    createdAt: Date | string;
    user: UserCreateNestedOneWithoutSuggestionsInput;
  };

  export type SuggestionUncheckedCreateWithoutDocumentInput = {
    id?: string;
    originalText: string;
    suggestedText: string;
    description?: string | null;
    isResolved?: boolean;
    userId: string;
    createdAt: Date | string;
  };

  export type SuggestionCreateOrConnectWithoutDocumentInput = {
    where: SuggestionWhereUniqueInput;
    create: XOR<
      SuggestionCreateWithoutDocumentInput,
      SuggestionUncheckedCreateWithoutDocumentInput
    >;
  };

  export type SuggestionCreateManyDocumentInputEnvelope = {
    data:
      | SuggestionCreateManyDocumentInput
      | SuggestionCreateManyDocumentInput[];
    skipDuplicates?: boolean;
  };

  export type UserUpsertWithoutDocumentsInput = {
    update: XOR<
      UserUpdateWithoutDocumentsInput,
      UserUncheckedUpdateWithoutDocumentsInput
    >;
    create: XOR<
      UserCreateWithoutDocumentsInput,
      UserUncheckedCreateWithoutDocumentsInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutDocumentsInput,
      UserUncheckedUpdateWithoutDocumentsInput
    >;
  };

  export type UserUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    chats?: ChatUpdateManyWithoutUserNestedInput;
    suggestions?: SuggestionUpdateManyWithoutUserNestedInput;
    archiveEntries?: ArchiveEntryUpdateManyWithoutUserNestedInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryUpdateManyWithoutUserNestedInput;
    rateLimit?: UserRateLimitUpdateOneWithoutUserNestedInput;
    agents?: AgentUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    chats?: ChatUncheckedUpdateManyWithoutUserNestedInput;
    suggestions?: SuggestionUncheckedUpdateManyWithoutUserNestedInput;
    archiveEntries?: ArchiveEntryUncheckedUpdateManyWithoutUserNestedInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryUncheckedUpdateManyWithoutUserNestedInput;
    rateLimit?: UserRateLimitUncheckedUpdateOneWithoutUserNestedInput;
    agents?: AgentUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type SuggestionUpsertWithWhereUniqueWithoutDocumentInput = {
    where: SuggestionWhereUniqueInput;
    update: XOR<
      SuggestionUpdateWithoutDocumentInput,
      SuggestionUncheckedUpdateWithoutDocumentInput
    >;
    create: XOR<
      SuggestionCreateWithoutDocumentInput,
      SuggestionUncheckedCreateWithoutDocumentInput
    >;
  };

  export type SuggestionUpdateWithWhereUniqueWithoutDocumentInput = {
    where: SuggestionWhereUniqueInput;
    data: XOR<
      SuggestionUpdateWithoutDocumentInput,
      SuggestionUncheckedUpdateWithoutDocumentInput
    >;
  };

  export type SuggestionUpdateManyWithWhereWithoutDocumentInput = {
    where: SuggestionScalarWhereInput;
    data: XOR<
      SuggestionUpdateManyMutationInput,
      SuggestionUncheckedUpdateManyWithoutDocumentInput
    >;
  };

  export type UserCreateWithoutSuggestionsInput = {
    id: string;
    email: string;
    chats?: ChatCreateNestedManyWithoutUserInput;
    documents?: DocumentCreateNestedManyWithoutUserInput;
    archiveEntries?: ArchiveEntryCreateNestedManyWithoutUserInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryCreateNestedManyWithoutUserInput;
    rateLimit?: UserRateLimitCreateNestedOneWithoutUserInput;
    agents?: AgentCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutSuggestionsInput = {
    id: string;
    email: string;
    chats?: ChatUncheckedCreateNestedManyWithoutUserInput;
    documents?: DocumentUncheckedCreateNestedManyWithoutUserInput;
    archiveEntries?: ArchiveEntryUncheckedCreateNestedManyWithoutUserInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryUncheckedCreateNestedManyWithoutUserInput;
    rateLimit?: UserRateLimitUncheckedCreateNestedOneWithoutUserInput;
    agents?: AgentUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutSuggestionsInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutSuggestionsInput,
      UserUncheckedCreateWithoutSuggestionsInput
    >;
  };

  export type DocumentCreateWithoutSuggestionsInput = {
    id: string;
    createdAt: Date | string;
    title: string;
    content?: string | null;
    kind?: string;
    user: UserCreateNestedOneWithoutDocumentsInput;
  };

  export type DocumentUncheckedCreateWithoutSuggestionsInput = {
    id: string;
    createdAt: Date | string;
    title: string;
    content?: string | null;
    kind?: string;
    userId: string;
  };

  export type DocumentCreateOrConnectWithoutSuggestionsInput = {
    where: DocumentWhereUniqueInput;
    create: XOR<
      DocumentCreateWithoutSuggestionsInput,
      DocumentUncheckedCreateWithoutSuggestionsInput
    >;
  };

  export type UserUpsertWithoutSuggestionsInput = {
    update: XOR<
      UserUpdateWithoutSuggestionsInput,
      UserUncheckedUpdateWithoutSuggestionsInput
    >;
    create: XOR<
      UserCreateWithoutSuggestionsInput,
      UserUncheckedCreateWithoutSuggestionsInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutSuggestionsInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutSuggestionsInput,
      UserUncheckedUpdateWithoutSuggestionsInput
    >;
  };

  export type UserUpdateWithoutSuggestionsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    chats?: ChatUpdateManyWithoutUserNestedInput;
    documents?: DocumentUpdateManyWithoutUserNestedInput;
    archiveEntries?: ArchiveEntryUpdateManyWithoutUserNestedInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryUpdateManyWithoutUserNestedInput;
    rateLimit?: UserRateLimitUpdateOneWithoutUserNestedInput;
    agents?: AgentUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutSuggestionsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    chats?: ChatUncheckedUpdateManyWithoutUserNestedInput;
    documents?: DocumentUncheckedUpdateManyWithoutUserNestedInput;
    archiveEntries?: ArchiveEntryUncheckedUpdateManyWithoutUserNestedInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryUncheckedUpdateManyWithoutUserNestedInput;
    rateLimit?: UserRateLimitUncheckedUpdateOneWithoutUserNestedInput;
    agents?: AgentUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type DocumentUpsertWithoutSuggestionsInput = {
    update: XOR<
      DocumentUpdateWithoutSuggestionsInput,
      DocumentUncheckedUpdateWithoutSuggestionsInput
    >;
    create: XOR<
      DocumentCreateWithoutSuggestionsInput,
      DocumentUncheckedCreateWithoutSuggestionsInput
    >;
    where?: DocumentWhereInput;
  };

  export type DocumentUpdateToOneWithWhereWithoutSuggestionsInput = {
    where?: DocumentWhereInput;
    data: XOR<
      DocumentUpdateWithoutSuggestionsInput,
      DocumentUncheckedUpdateWithoutSuggestionsInput
    >;
  };

  export type DocumentUpdateWithoutSuggestionsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: StringFieldUpdateOperationsInput | string;
    content?: NullableStringFieldUpdateOperationsInput | string | null;
    kind?: StringFieldUpdateOperationsInput | string;
    user?: UserUpdateOneRequiredWithoutDocumentsNestedInput;
  };

  export type DocumentUncheckedUpdateWithoutSuggestionsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: StringFieldUpdateOperationsInput | string;
    content?: NullableStringFieldUpdateOperationsInput | string | null;
    kind?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
  };

  export type ChatCreateWithoutStreamsInput = {
    id?: string;
    createdAt: Date | string;
    title: string;
    visibility?: string;
    lastContext?: NullableJsonNullValueInput | InputJsonValue;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    parentChatId?: string | null;
    forkedFromMessageId?: string | null;
    forkDepth?: number;
    user: UserCreateNestedOneWithoutChatsInput;
    messages?: MessageCreateNestedManyWithoutChatInput;
    votes?: VoteCreateNestedManyWithoutChatInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryCreateNestedManyWithoutChatInput;
  };

  export type ChatUncheckedCreateWithoutStreamsInput = {
    id?: string;
    createdAt: Date | string;
    title: string;
    userId: string;
    visibility?: string;
    lastContext?: NullableJsonNullValueInput | InputJsonValue;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    parentChatId?: string | null;
    forkedFromMessageId?: string | null;
    forkDepth?: number;
    messages?: MessageUncheckedCreateNestedManyWithoutChatInput;
    votes?: VoteUncheckedCreateNestedManyWithoutChatInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryUncheckedCreateNestedManyWithoutChatInput;
  };

  export type ChatCreateOrConnectWithoutStreamsInput = {
    where: ChatWhereUniqueInput;
    create: XOR<
      ChatCreateWithoutStreamsInput,
      ChatUncheckedCreateWithoutStreamsInput
    >;
  };

  export type ChatUpsertWithoutStreamsInput = {
    update: XOR<
      ChatUpdateWithoutStreamsInput,
      ChatUncheckedUpdateWithoutStreamsInput
    >;
    create: XOR<
      ChatCreateWithoutStreamsInput,
      ChatUncheckedCreateWithoutStreamsInput
    >;
    where?: ChatWhereInput;
  };

  export type ChatUpdateToOneWithWhereWithoutStreamsInput = {
    where?: ChatWhereInput;
    data: XOR<
      ChatUpdateWithoutStreamsInput,
      ChatUncheckedUpdateWithoutStreamsInput
    >;
  };

  export type ChatUpdateWithoutStreamsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: StringFieldUpdateOperationsInput | string;
    visibility?: StringFieldUpdateOperationsInput | string;
    lastContext?: NullableJsonNullValueInput | InputJsonValue;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    parentChatId?: NullableStringFieldUpdateOperationsInput | string | null;
    forkedFromMessageId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    forkDepth?: IntFieldUpdateOperationsInput | number;
    user?: UserUpdateOneRequiredWithoutChatsNestedInput;
    messages?: MessageUpdateManyWithoutChatNestedInput;
    votes?: VoteUpdateManyWithoutChatNestedInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryUpdateManyWithoutChatNestedInput;
  };

  export type ChatUncheckedUpdateWithoutStreamsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    visibility?: StringFieldUpdateOperationsInput | string;
    lastContext?: NullableJsonNullValueInput | InputJsonValue;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    parentChatId?: NullableStringFieldUpdateOperationsInput | string | null;
    forkedFromMessageId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    forkDepth?: IntFieldUpdateOperationsInput | number;
    messages?: MessageUncheckedUpdateManyWithoutChatNestedInput;
    votes?: VoteUncheckedUpdateManyWithoutChatNestedInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryUncheckedUpdateManyWithoutChatNestedInput;
  };

  export type UserCreateWithoutArchiveEntriesInput = {
    id: string;
    email: string;
    chats?: ChatCreateNestedManyWithoutUserInput;
    documents?: DocumentCreateNestedManyWithoutUserInput;
    suggestions?: SuggestionCreateNestedManyWithoutUserInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryCreateNestedManyWithoutUserInput;
    rateLimit?: UserRateLimitCreateNestedOneWithoutUserInput;
    agents?: AgentCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutArchiveEntriesInput = {
    id: string;
    email: string;
    chats?: ChatUncheckedCreateNestedManyWithoutUserInput;
    documents?: DocumentUncheckedCreateNestedManyWithoutUserInput;
    suggestions?: SuggestionUncheckedCreateNestedManyWithoutUserInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryUncheckedCreateNestedManyWithoutUserInput;
    rateLimit?: UserRateLimitUncheckedCreateNestedOneWithoutUserInput;
    agents?: AgentUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutArchiveEntriesInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutArchiveEntriesInput,
      UserUncheckedCreateWithoutArchiveEntriesInput
    >;
  };

  export type ArchiveLinkCreateWithoutSourceInput = {
    id?: string;
    type: string;
    bidirectional?: boolean;
    createdAt?: Date | string;
    target: ArchiveEntryCreateNestedOneWithoutIncomingLinksInput;
  };

  export type ArchiveLinkUncheckedCreateWithoutSourceInput = {
    id?: string;
    targetId: string;
    type: string;
    bidirectional?: boolean;
    createdAt?: Date | string;
  };

  export type ArchiveLinkCreateOrConnectWithoutSourceInput = {
    where: ArchiveLinkWhereUniqueInput;
    create: XOR<
      ArchiveLinkCreateWithoutSourceInput,
      ArchiveLinkUncheckedCreateWithoutSourceInput
    >;
  };

  export type ArchiveLinkCreateManySourceInputEnvelope = {
    data: ArchiveLinkCreateManySourceInput | ArchiveLinkCreateManySourceInput[];
    skipDuplicates?: boolean;
  };

  export type ArchiveLinkCreateWithoutTargetInput = {
    id?: string;
    type: string;
    bidirectional?: boolean;
    createdAt?: Date | string;
    source: ArchiveEntryCreateNestedOneWithoutOutgoingLinksInput;
  };

  export type ArchiveLinkUncheckedCreateWithoutTargetInput = {
    id?: string;
    sourceId: string;
    type: string;
    bidirectional?: boolean;
    createdAt?: Date | string;
  };

  export type ArchiveLinkCreateOrConnectWithoutTargetInput = {
    where: ArchiveLinkWhereUniqueInput;
    create: XOR<
      ArchiveLinkCreateWithoutTargetInput,
      ArchiveLinkUncheckedCreateWithoutTargetInput
    >;
  };

  export type ArchiveLinkCreateManyTargetInputEnvelope = {
    data: ArchiveLinkCreateManyTargetInput | ArchiveLinkCreateManyTargetInput[];
    skipDuplicates?: boolean;
  };

  export type ChatPinnedArchiveEntryCreateWithoutArchiveEntryInput = {
    id?: string;
    pinnedAt?: Date | string;
    chat: ChatCreateNestedOneWithoutPinnedArchiveEntriesInput;
    user: UserCreateNestedOneWithoutPinnedArchiveEntriesInput;
  };

  export type ChatPinnedArchiveEntryUncheckedCreateWithoutArchiveEntryInput = {
    id?: string;
    chatId: string;
    userId: string;
    pinnedAt?: Date | string;
  };

  export type ChatPinnedArchiveEntryCreateOrConnectWithoutArchiveEntryInput = {
    where: ChatPinnedArchiveEntryWhereUniqueInput;
    create: XOR<
      ChatPinnedArchiveEntryCreateWithoutArchiveEntryInput,
      ChatPinnedArchiveEntryUncheckedCreateWithoutArchiveEntryInput
    >;
  };

  export type ChatPinnedArchiveEntryCreateManyArchiveEntryInputEnvelope = {
    data:
      | ChatPinnedArchiveEntryCreateManyArchiveEntryInput
      | ChatPinnedArchiveEntryCreateManyArchiveEntryInput[];
    skipDuplicates?: boolean;
  };

  export type UserUpsertWithoutArchiveEntriesInput = {
    update: XOR<
      UserUpdateWithoutArchiveEntriesInput,
      UserUncheckedUpdateWithoutArchiveEntriesInput
    >;
    create: XOR<
      UserCreateWithoutArchiveEntriesInput,
      UserUncheckedCreateWithoutArchiveEntriesInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutArchiveEntriesInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutArchiveEntriesInput,
      UserUncheckedUpdateWithoutArchiveEntriesInput
    >;
  };

  export type UserUpdateWithoutArchiveEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    chats?: ChatUpdateManyWithoutUserNestedInput;
    documents?: DocumentUpdateManyWithoutUserNestedInput;
    suggestions?: SuggestionUpdateManyWithoutUserNestedInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryUpdateManyWithoutUserNestedInput;
    rateLimit?: UserRateLimitUpdateOneWithoutUserNestedInput;
    agents?: AgentUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutArchiveEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    chats?: ChatUncheckedUpdateManyWithoutUserNestedInput;
    documents?: DocumentUncheckedUpdateManyWithoutUserNestedInput;
    suggestions?: SuggestionUncheckedUpdateManyWithoutUserNestedInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryUncheckedUpdateManyWithoutUserNestedInput;
    rateLimit?: UserRateLimitUncheckedUpdateOneWithoutUserNestedInput;
    agents?: AgentUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type ArchiveLinkUpsertWithWhereUniqueWithoutSourceInput = {
    where: ArchiveLinkWhereUniqueInput;
    update: XOR<
      ArchiveLinkUpdateWithoutSourceInput,
      ArchiveLinkUncheckedUpdateWithoutSourceInput
    >;
    create: XOR<
      ArchiveLinkCreateWithoutSourceInput,
      ArchiveLinkUncheckedCreateWithoutSourceInput
    >;
  };

  export type ArchiveLinkUpdateWithWhereUniqueWithoutSourceInput = {
    where: ArchiveLinkWhereUniqueInput;
    data: XOR<
      ArchiveLinkUpdateWithoutSourceInput,
      ArchiveLinkUncheckedUpdateWithoutSourceInput
    >;
  };

  export type ArchiveLinkUpdateManyWithWhereWithoutSourceInput = {
    where: ArchiveLinkScalarWhereInput;
    data: XOR<
      ArchiveLinkUpdateManyMutationInput,
      ArchiveLinkUncheckedUpdateManyWithoutSourceInput
    >;
  };

  export type ArchiveLinkScalarWhereInput = {
    AND?: ArchiveLinkScalarWhereInput | ArchiveLinkScalarWhereInput[];
    OR?: ArchiveLinkScalarWhereInput[];
    NOT?: ArchiveLinkScalarWhereInput | ArchiveLinkScalarWhereInput[];
    id?: UuidFilter<'ArchiveLink'> | string;
    sourceId?: UuidFilter<'ArchiveLink'> | string;
    targetId?: UuidFilter<'ArchiveLink'> | string;
    type?: StringFilter<'ArchiveLink'> | string;
    bidirectional?: BoolFilter<'ArchiveLink'> | boolean;
    createdAt?: DateTimeFilter<'ArchiveLink'> | Date | string;
  };

  export type ArchiveLinkUpsertWithWhereUniqueWithoutTargetInput = {
    where: ArchiveLinkWhereUniqueInput;
    update: XOR<
      ArchiveLinkUpdateWithoutTargetInput,
      ArchiveLinkUncheckedUpdateWithoutTargetInput
    >;
    create: XOR<
      ArchiveLinkCreateWithoutTargetInput,
      ArchiveLinkUncheckedCreateWithoutTargetInput
    >;
  };

  export type ArchiveLinkUpdateWithWhereUniqueWithoutTargetInput = {
    where: ArchiveLinkWhereUniqueInput;
    data: XOR<
      ArchiveLinkUpdateWithoutTargetInput,
      ArchiveLinkUncheckedUpdateWithoutTargetInput
    >;
  };

  export type ArchiveLinkUpdateManyWithWhereWithoutTargetInput = {
    where: ArchiveLinkScalarWhereInput;
    data: XOR<
      ArchiveLinkUpdateManyMutationInput,
      ArchiveLinkUncheckedUpdateManyWithoutTargetInput
    >;
  };

  export type ChatPinnedArchiveEntryUpsertWithWhereUniqueWithoutArchiveEntryInput =
    {
      where: ChatPinnedArchiveEntryWhereUniqueInput;
      update: XOR<
        ChatPinnedArchiveEntryUpdateWithoutArchiveEntryInput,
        ChatPinnedArchiveEntryUncheckedUpdateWithoutArchiveEntryInput
      >;
      create: XOR<
        ChatPinnedArchiveEntryCreateWithoutArchiveEntryInput,
        ChatPinnedArchiveEntryUncheckedCreateWithoutArchiveEntryInput
      >;
    };

  export type ChatPinnedArchiveEntryUpdateWithWhereUniqueWithoutArchiveEntryInput =
    {
      where: ChatPinnedArchiveEntryWhereUniqueInput;
      data: XOR<
        ChatPinnedArchiveEntryUpdateWithoutArchiveEntryInput,
        ChatPinnedArchiveEntryUncheckedUpdateWithoutArchiveEntryInput
      >;
    };

  export type ChatPinnedArchiveEntryUpdateManyWithWhereWithoutArchiveEntryInput =
    {
      where: ChatPinnedArchiveEntryScalarWhereInput;
      data: XOR<
        ChatPinnedArchiveEntryUpdateManyMutationInput,
        ChatPinnedArchiveEntryUncheckedUpdateManyWithoutArchiveEntryInput
      >;
    };

  export type ChatCreateWithoutPinnedArchiveEntriesInput = {
    id?: string;
    createdAt: Date | string;
    title: string;
    visibility?: string;
    lastContext?: NullableJsonNullValueInput | InputJsonValue;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    parentChatId?: string | null;
    forkedFromMessageId?: string | null;
    forkDepth?: number;
    user: UserCreateNestedOneWithoutChatsInput;
    messages?: MessageCreateNestedManyWithoutChatInput;
    votes?: VoteCreateNestedManyWithoutChatInput;
    streams?: StreamCreateNestedManyWithoutChatInput;
  };

  export type ChatUncheckedCreateWithoutPinnedArchiveEntriesInput = {
    id?: string;
    createdAt: Date | string;
    title: string;
    userId: string;
    visibility?: string;
    lastContext?: NullableJsonNullValueInput | InputJsonValue;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    parentChatId?: string | null;
    forkedFromMessageId?: string | null;
    forkDepth?: number;
    messages?: MessageUncheckedCreateNestedManyWithoutChatInput;
    votes?: VoteUncheckedCreateNestedManyWithoutChatInput;
    streams?: StreamUncheckedCreateNestedManyWithoutChatInput;
  };

  export type ChatCreateOrConnectWithoutPinnedArchiveEntriesInput = {
    where: ChatWhereUniqueInput;
    create: XOR<
      ChatCreateWithoutPinnedArchiveEntriesInput,
      ChatUncheckedCreateWithoutPinnedArchiveEntriesInput
    >;
  };

  export type ArchiveEntryCreateWithoutPinnedInChatsInput = {
    id?: string;
    slug: string;
    entity: string;
    tags?: ArchiveEntryCreatetagsInput | string[];
    body: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutArchiveEntriesInput;
    outgoingLinks?: ArchiveLinkCreateNestedManyWithoutSourceInput;
    incomingLinks?: ArchiveLinkCreateNestedManyWithoutTargetInput;
  };

  export type ArchiveEntryUncheckedCreateWithoutPinnedInChatsInput = {
    id?: string;
    userId: string;
    slug: string;
    entity: string;
    tags?: ArchiveEntryCreatetagsInput | string[];
    body: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    outgoingLinks?: ArchiveLinkUncheckedCreateNestedManyWithoutSourceInput;
    incomingLinks?: ArchiveLinkUncheckedCreateNestedManyWithoutTargetInput;
  };

  export type ArchiveEntryCreateOrConnectWithoutPinnedInChatsInput = {
    where: ArchiveEntryWhereUniqueInput;
    create: XOR<
      ArchiveEntryCreateWithoutPinnedInChatsInput,
      ArchiveEntryUncheckedCreateWithoutPinnedInChatsInput
    >;
  };

  export type UserCreateWithoutPinnedArchiveEntriesInput = {
    id: string;
    email: string;
    chats?: ChatCreateNestedManyWithoutUserInput;
    documents?: DocumentCreateNestedManyWithoutUserInput;
    suggestions?: SuggestionCreateNestedManyWithoutUserInput;
    archiveEntries?: ArchiveEntryCreateNestedManyWithoutUserInput;
    rateLimit?: UserRateLimitCreateNestedOneWithoutUserInput;
    agents?: AgentCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutPinnedArchiveEntriesInput = {
    id: string;
    email: string;
    chats?: ChatUncheckedCreateNestedManyWithoutUserInput;
    documents?: DocumentUncheckedCreateNestedManyWithoutUserInput;
    suggestions?: SuggestionUncheckedCreateNestedManyWithoutUserInput;
    archiveEntries?: ArchiveEntryUncheckedCreateNestedManyWithoutUserInput;
    rateLimit?: UserRateLimitUncheckedCreateNestedOneWithoutUserInput;
    agents?: AgentUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutPinnedArchiveEntriesInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutPinnedArchiveEntriesInput,
      UserUncheckedCreateWithoutPinnedArchiveEntriesInput
    >;
  };

  export type ChatUpsertWithoutPinnedArchiveEntriesInput = {
    update: XOR<
      ChatUpdateWithoutPinnedArchiveEntriesInput,
      ChatUncheckedUpdateWithoutPinnedArchiveEntriesInput
    >;
    create: XOR<
      ChatCreateWithoutPinnedArchiveEntriesInput,
      ChatUncheckedCreateWithoutPinnedArchiveEntriesInput
    >;
    where?: ChatWhereInput;
  };

  export type ChatUpdateToOneWithWhereWithoutPinnedArchiveEntriesInput = {
    where?: ChatWhereInput;
    data: XOR<
      ChatUpdateWithoutPinnedArchiveEntriesInput,
      ChatUncheckedUpdateWithoutPinnedArchiveEntriesInput
    >;
  };

  export type ChatUpdateWithoutPinnedArchiveEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: StringFieldUpdateOperationsInput | string;
    visibility?: StringFieldUpdateOperationsInput | string;
    lastContext?: NullableJsonNullValueInput | InputJsonValue;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    parentChatId?: NullableStringFieldUpdateOperationsInput | string | null;
    forkedFromMessageId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    forkDepth?: IntFieldUpdateOperationsInput | number;
    user?: UserUpdateOneRequiredWithoutChatsNestedInput;
    messages?: MessageUpdateManyWithoutChatNestedInput;
    votes?: VoteUpdateManyWithoutChatNestedInput;
    streams?: StreamUpdateManyWithoutChatNestedInput;
  };

  export type ChatUncheckedUpdateWithoutPinnedArchiveEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    visibility?: StringFieldUpdateOperationsInput | string;
    lastContext?: NullableJsonNullValueInput | InputJsonValue;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    parentChatId?: NullableStringFieldUpdateOperationsInput | string | null;
    forkedFromMessageId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    forkDepth?: IntFieldUpdateOperationsInput | number;
    messages?: MessageUncheckedUpdateManyWithoutChatNestedInput;
    votes?: VoteUncheckedUpdateManyWithoutChatNestedInput;
    streams?: StreamUncheckedUpdateManyWithoutChatNestedInput;
  };

  export type ArchiveEntryUpsertWithoutPinnedInChatsInput = {
    update: XOR<
      ArchiveEntryUpdateWithoutPinnedInChatsInput,
      ArchiveEntryUncheckedUpdateWithoutPinnedInChatsInput
    >;
    create: XOR<
      ArchiveEntryCreateWithoutPinnedInChatsInput,
      ArchiveEntryUncheckedCreateWithoutPinnedInChatsInput
    >;
    where?: ArchiveEntryWhereInput;
  };

  export type ArchiveEntryUpdateToOneWithWhereWithoutPinnedInChatsInput = {
    where?: ArchiveEntryWhereInput;
    data: XOR<
      ArchiveEntryUpdateWithoutPinnedInChatsInput,
      ArchiveEntryUncheckedUpdateWithoutPinnedInChatsInput
    >;
  };

  export type ArchiveEntryUpdateWithoutPinnedInChatsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    entity?: StringFieldUpdateOperationsInput | string;
    tags?: ArchiveEntryUpdatetagsInput | string[];
    body?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutArchiveEntriesNestedInput;
    outgoingLinks?: ArchiveLinkUpdateManyWithoutSourceNestedInput;
    incomingLinks?: ArchiveLinkUpdateManyWithoutTargetNestedInput;
  };

  export type ArchiveEntryUncheckedUpdateWithoutPinnedInChatsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    entity?: StringFieldUpdateOperationsInput | string;
    tags?: ArchiveEntryUpdatetagsInput | string[];
    body?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    outgoingLinks?: ArchiveLinkUncheckedUpdateManyWithoutSourceNestedInput;
    incomingLinks?: ArchiveLinkUncheckedUpdateManyWithoutTargetNestedInput;
  };

  export type UserUpsertWithoutPinnedArchiveEntriesInput = {
    update: XOR<
      UserUpdateWithoutPinnedArchiveEntriesInput,
      UserUncheckedUpdateWithoutPinnedArchiveEntriesInput
    >;
    create: XOR<
      UserCreateWithoutPinnedArchiveEntriesInput,
      UserUncheckedCreateWithoutPinnedArchiveEntriesInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutPinnedArchiveEntriesInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutPinnedArchiveEntriesInput,
      UserUncheckedUpdateWithoutPinnedArchiveEntriesInput
    >;
  };

  export type UserUpdateWithoutPinnedArchiveEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    chats?: ChatUpdateManyWithoutUserNestedInput;
    documents?: DocumentUpdateManyWithoutUserNestedInput;
    suggestions?: SuggestionUpdateManyWithoutUserNestedInput;
    archiveEntries?: ArchiveEntryUpdateManyWithoutUserNestedInput;
    rateLimit?: UserRateLimitUpdateOneWithoutUserNestedInput;
    agents?: AgentUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutPinnedArchiveEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    chats?: ChatUncheckedUpdateManyWithoutUserNestedInput;
    documents?: DocumentUncheckedUpdateManyWithoutUserNestedInput;
    suggestions?: SuggestionUncheckedUpdateManyWithoutUserNestedInput;
    archiveEntries?: ArchiveEntryUncheckedUpdateManyWithoutUserNestedInput;
    rateLimit?: UserRateLimitUncheckedUpdateOneWithoutUserNestedInput;
    agents?: AgentUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type ArchiveEntryCreateWithoutOutgoingLinksInput = {
    id?: string;
    slug: string;
    entity: string;
    tags?: ArchiveEntryCreatetagsInput | string[];
    body: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutArchiveEntriesInput;
    incomingLinks?: ArchiveLinkCreateNestedManyWithoutTargetInput;
    pinnedInChats?: ChatPinnedArchiveEntryCreateNestedManyWithoutArchiveEntryInput;
  };

  export type ArchiveEntryUncheckedCreateWithoutOutgoingLinksInput = {
    id?: string;
    userId: string;
    slug: string;
    entity: string;
    tags?: ArchiveEntryCreatetagsInput | string[];
    body: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    incomingLinks?: ArchiveLinkUncheckedCreateNestedManyWithoutTargetInput;
    pinnedInChats?: ChatPinnedArchiveEntryUncheckedCreateNestedManyWithoutArchiveEntryInput;
  };

  export type ArchiveEntryCreateOrConnectWithoutOutgoingLinksInput = {
    where: ArchiveEntryWhereUniqueInput;
    create: XOR<
      ArchiveEntryCreateWithoutOutgoingLinksInput,
      ArchiveEntryUncheckedCreateWithoutOutgoingLinksInput
    >;
  };

  export type ArchiveEntryCreateWithoutIncomingLinksInput = {
    id?: string;
    slug: string;
    entity: string;
    tags?: ArchiveEntryCreatetagsInput | string[];
    body: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutArchiveEntriesInput;
    outgoingLinks?: ArchiveLinkCreateNestedManyWithoutSourceInput;
    pinnedInChats?: ChatPinnedArchiveEntryCreateNestedManyWithoutArchiveEntryInput;
  };

  export type ArchiveEntryUncheckedCreateWithoutIncomingLinksInput = {
    id?: string;
    userId: string;
    slug: string;
    entity: string;
    tags?: ArchiveEntryCreatetagsInput | string[];
    body: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    outgoingLinks?: ArchiveLinkUncheckedCreateNestedManyWithoutSourceInput;
    pinnedInChats?: ChatPinnedArchiveEntryUncheckedCreateNestedManyWithoutArchiveEntryInput;
  };

  export type ArchiveEntryCreateOrConnectWithoutIncomingLinksInput = {
    where: ArchiveEntryWhereUniqueInput;
    create: XOR<
      ArchiveEntryCreateWithoutIncomingLinksInput,
      ArchiveEntryUncheckedCreateWithoutIncomingLinksInput
    >;
  };

  export type ArchiveEntryUpsertWithoutOutgoingLinksInput = {
    update: XOR<
      ArchiveEntryUpdateWithoutOutgoingLinksInput,
      ArchiveEntryUncheckedUpdateWithoutOutgoingLinksInput
    >;
    create: XOR<
      ArchiveEntryCreateWithoutOutgoingLinksInput,
      ArchiveEntryUncheckedCreateWithoutOutgoingLinksInput
    >;
    where?: ArchiveEntryWhereInput;
  };

  export type ArchiveEntryUpdateToOneWithWhereWithoutOutgoingLinksInput = {
    where?: ArchiveEntryWhereInput;
    data: XOR<
      ArchiveEntryUpdateWithoutOutgoingLinksInput,
      ArchiveEntryUncheckedUpdateWithoutOutgoingLinksInput
    >;
  };

  export type ArchiveEntryUpdateWithoutOutgoingLinksInput = {
    id?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    entity?: StringFieldUpdateOperationsInput | string;
    tags?: ArchiveEntryUpdatetagsInput | string[];
    body?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutArchiveEntriesNestedInput;
    incomingLinks?: ArchiveLinkUpdateManyWithoutTargetNestedInput;
    pinnedInChats?: ChatPinnedArchiveEntryUpdateManyWithoutArchiveEntryNestedInput;
  };

  export type ArchiveEntryUncheckedUpdateWithoutOutgoingLinksInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    entity?: StringFieldUpdateOperationsInput | string;
    tags?: ArchiveEntryUpdatetagsInput | string[];
    body?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    incomingLinks?: ArchiveLinkUncheckedUpdateManyWithoutTargetNestedInput;
    pinnedInChats?: ChatPinnedArchiveEntryUncheckedUpdateManyWithoutArchiveEntryNestedInput;
  };

  export type ArchiveEntryUpsertWithoutIncomingLinksInput = {
    update: XOR<
      ArchiveEntryUpdateWithoutIncomingLinksInput,
      ArchiveEntryUncheckedUpdateWithoutIncomingLinksInput
    >;
    create: XOR<
      ArchiveEntryCreateWithoutIncomingLinksInput,
      ArchiveEntryUncheckedCreateWithoutIncomingLinksInput
    >;
    where?: ArchiveEntryWhereInput;
  };

  export type ArchiveEntryUpdateToOneWithWhereWithoutIncomingLinksInput = {
    where?: ArchiveEntryWhereInput;
    data: XOR<
      ArchiveEntryUpdateWithoutIncomingLinksInput,
      ArchiveEntryUncheckedUpdateWithoutIncomingLinksInput
    >;
  };

  export type ArchiveEntryUpdateWithoutIncomingLinksInput = {
    id?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    entity?: StringFieldUpdateOperationsInput | string;
    tags?: ArchiveEntryUpdatetagsInput | string[];
    body?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutArchiveEntriesNestedInput;
    outgoingLinks?: ArchiveLinkUpdateManyWithoutSourceNestedInput;
    pinnedInChats?: ChatPinnedArchiveEntryUpdateManyWithoutArchiveEntryNestedInput;
  };

  export type ArchiveEntryUncheckedUpdateWithoutIncomingLinksInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    entity?: StringFieldUpdateOperationsInput | string;
    tags?: ArchiveEntryUpdatetagsInput | string[];
    body?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    outgoingLinks?: ArchiveLinkUncheckedUpdateManyWithoutSourceNestedInput;
    pinnedInChats?: ChatPinnedArchiveEntryUncheckedUpdateManyWithoutArchiveEntryNestedInput;
  };

  export type ChatCreateManyUserInput = {
    id?: string;
    createdAt: Date | string;
    title: string;
    visibility?: string;
    lastContext?: NullableJsonNullValueInput | InputJsonValue;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    parentChatId?: string | null;
    forkedFromMessageId?: string | null;
    forkDepth?: number;
  };

  export type DocumentCreateManyUserInput = {
    id: string;
    createdAt: Date | string;
    title: string;
    content?: string | null;
    kind?: string;
  };

  export type SuggestionCreateManyUserInput = {
    id?: string;
    documentId: string;
    documentCreatedAt: Date | string;
    originalText: string;
    suggestedText: string;
    description?: string | null;
    isResolved?: boolean;
    createdAt: Date | string;
  };

  export type ArchiveEntryCreateManyUserInput = {
    id?: string;
    slug: string;
    entity: string;
    tags?: ArchiveEntryCreatetagsInput | string[];
    body: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ChatPinnedArchiveEntryCreateManyUserInput = {
    id?: string;
    chatId: string;
    archiveEntryId: string;
    pinnedAt?: Date | string;
  };

  export type AgentCreateManyUserInput = {
    id?: string;
    name: string;
    description?: string | null;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ChatUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: StringFieldUpdateOperationsInput | string;
    visibility?: StringFieldUpdateOperationsInput | string;
    lastContext?: NullableJsonNullValueInput | InputJsonValue;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    parentChatId?: NullableStringFieldUpdateOperationsInput | string | null;
    forkedFromMessageId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    forkDepth?: IntFieldUpdateOperationsInput | number;
    messages?: MessageUpdateManyWithoutChatNestedInput;
    votes?: VoteUpdateManyWithoutChatNestedInput;
    streams?: StreamUpdateManyWithoutChatNestedInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryUpdateManyWithoutChatNestedInput;
  };

  export type ChatUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: StringFieldUpdateOperationsInput | string;
    visibility?: StringFieldUpdateOperationsInput | string;
    lastContext?: NullableJsonNullValueInput | InputJsonValue;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    parentChatId?: NullableStringFieldUpdateOperationsInput | string | null;
    forkedFromMessageId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    forkDepth?: IntFieldUpdateOperationsInput | number;
    messages?: MessageUncheckedUpdateManyWithoutChatNestedInput;
    votes?: VoteUncheckedUpdateManyWithoutChatNestedInput;
    streams?: StreamUncheckedUpdateManyWithoutChatNestedInput;
    pinnedArchiveEntries?: ChatPinnedArchiveEntryUncheckedUpdateManyWithoutChatNestedInput;
  };

  export type ChatUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: StringFieldUpdateOperationsInput | string;
    visibility?: StringFieldUpdateOperationsInput | string;
    lastContext?: NullableJsonNullValueInput | InputJsonValue;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    parentChatId?: NullableStringFieldUpdateOperationsInput | string | null;
    forkedFromMessageId?:
      | NullableStringFieldUpdateOperationsInput
      | string
      | null;
    forkDepth?: IntFieldUpdateOperationsInput | number;
  };

  export type DocumentUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: StringFieldUpdateOperationsInput | string;
    content?: NullableStringFieldUpdateOperationsInput | string | null;
    kind?: StringFieldUpdateOperationsInput | string;
    suggestions?: SuggestionUpdateManyWithoutDocumentNestedInput;
  };

  export type DocumentUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: StringFieldUpdateOperationsInput | string;
    content?: NullableStringFieldUpdateOperationsInput | string | null;
    kind?: StringFieldUpdateOperationsInput | string;
    suggestions?: SuggestionUncheckedUpdateManyWithoutDocumentNestedInput;
  };

  export type DocumentUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    title?: StringFieldUpdateOperationsInput | string;
    content?: NullableStringFieldUpdateOperationsInput | string | null;
    kind?: StringFieldUpdateOperationsInput | string;
  };

  export type SuggestionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    originalText?: StringFieldUpdateOperationsInput | string;
    suggestedText?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    isResolved?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    document?: DocumentUpdateOneRequiredWithoutSuggestionsNestedInput;
  };

  export type SuggestionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    documentId?: StringFieldUpdateOperationsInput | string;
    documentCreatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    originalText?: StringFieldUpdateOperationsInput | string;
    suggestedText?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    isResolved?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SuggestionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    documentId?: StringFieldUpdateOperationsInput | string;
    documentCreatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    originalText?: StringFieldUpdateOperationsInput | string;
    suggestedText?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    isResolved?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ArchiveEntryUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    entity?: StringFieldUpdateOperationsInput | string;
    tags?: ArchiveEntryUpdatetagsInput | string[];
    body?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    outgoingLinks?: ArchiveLinkUpdateManyWithoutSourceNestedInput;
    incomingLinks?: ArchiveLinkUpdateManyWithoutTargetNestedInput;
    pinnedInChats?: ChatPinnedArchiveEntryUpdateManyWithoutArchiveEntryNestedInput;
  };

  export type ArchiveEntryUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    entity?: StringFieldUpdateOperationsInput | string;
    tags?: ArchiveEntryUpdatetagsInput | string[];
    body?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    outgoingLinks?: ArchiveLinkUncheckedUpdateManyWithoutSourceNestedInput;
    incomingLinks?: ArchiveLinkUncheckedUpdateManyWithoutTargetNestedInput;
    pinnedInChats?: ChatPinnedArchiveEntryUncheckedUpdateManyWithoutArchiveEntryNestedInput;
  };

  export type ArchiveEntryUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    slug?: StringFieldUpdateOperationsInput | string;
    entity?: StringFieldUpdateOperationsInput | string;
    tags?: ArchiveEntryUpdatetagsInput | string[];
    body?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ChatPinnedArchiveEntryUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    pinnedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    chat?: ChatUpdateOneRequiredWithoutPinnedArchiveEntriesNestedInput;
    archiveEntry?: ArchiveEntryUpdateOneRequiredWithoutPinnedInChatsNestedInput;
  };

  export type ChatPinnedArchiveEntryUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    chatId?: StringFieldUpdateOperationsInput | string;
    archiveEntryId?: StringFieldUpdateOperationsInput | string;
    pinnedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ChatPinnedArchiveEntryUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    chatId?: StringFieldUpdateOperationsInput | string;
    archiveEntryId?: StringFieldUpdateOperationsInput | string;
    pinnedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AgentUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AgentUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AgentUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    settings?: NullableJsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type MessageCreateManyChatInput = {
    id?: string;
    role: string;
    parts: JsonNullValueInput | InputJsonValue;
    attachments: JsonNullValueInput | InputJsonValue;
    createdAt: Date | string;
  };

  export type VoteCreateManyChatInput = {
    messageId: string;
    isUpvoted: boolean;
  };

  export type StreamCreateManyChatInput = {
    id?: string;
    createdAt: Date | string;
  };

  export type ChatPinnedArchiveEntryCreateManyChatInput = {
    id?: string;
    archiveEntryId: string;
    userId: string;
    pinnedAt?: Date | string;
  };

  export type MessageUpdateWithoutChatInput = {
    id?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    parts?: JsonNullValueInput | InputJsonValue;
    attachments?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    votes?: VoteUpdateManyWithoutMessageNestedInput;
  };

  export type MessageUncheckedUpdateWithoutChatInput = {
    id?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    parts?: JsonNullValueInput | InputJsonValue;
    attachments?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    votes?: VoteUncheckedUpdateManyWithoutMessageNestedInput;
  };

  export type MessageUncheckedUpdateManyWithoutChatInput = {
    id?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    parts?: JsonNullValueInput | InputJsonValue;
    attachments?: JsonNullValueInput | InputJsonValue;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type VoteUpdateWithoutChatInput = {
    isUpvoted?: BoolFieldUpdateOperationsInput | boolean;
    message?: MessageUpdateOneRequiredWithoutVotesNestedInput;
  };

  export type VoteUncheckedUpdateWithoutChatInput = {
    messageId?: StringFieldUpdateOperationsInput | string;
    isUpvoted?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type VoteUncheckedUpdateManyWithoutChatInput = {
    messageId?: StringFieldUpdateOperationsInput | string;
    isUpvoted?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type StreamUpdateWithoutChatInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type StreamUncheckedUpdateWithoutChatInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type StreamUncheckedUpdateManyWithoutChatInput = {
    id?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ChatPinnedArchiveEntryUpdateWithoutChatInput = {
    id?: StringFieldUpdateOperationsInput | string;
    pinnedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    archiveEntry?: ArchiveEntryUpdateOneRequiredWithoutPinnedInChatsNestedInput;
    user?: UserUpdateOneRequiredWithoutPinnedArchiveEntriesNestedInput;
  };

  export type ChatPinnedArchiveEntryUncheckedUpdateWithoutChatInput = {
    id?: StringFieldUpdateOperationsInput | string;
    archiveEntryId?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    pinnedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ChatPinnedArchiveEntryUncheckedUpdateManyWithoutChatInput = {
    id?: StringFieldUpdateOperationsInput | string;
    archiveEntryId?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    pinnedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type VoteCreateManyMessageInput = {
    chatId: string;
    isUpvoted: boolean;
  };

  export type VoteUpdateWithoutMessageInput = {
    isUpvoted?: BoolFieldUpdateOperationsInput | boolean;
    chat?: ChatUpdateOneRequiredWithoutVotesNestedInput;
  };

  export type VoteUncheckedUpdateWithoutMessageInput = {
    chatId?: StringFieldUpdateOperationsInput | string;
    isUpvoted?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type VoteUncheckedUpdateManyWithoutMessageInput = {
    chatId?: StringFieldUpdateOperationsInput | string;
    isUpvoted?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type SuggestionCreateManyDocumentInput = {
    id?: string;
    originalText: string;
    suggestedText: string;
    description?: string | null;
    isResolved?: boolean;
    userId: string;
    createdAt: Date | string;
  };

  export type SuggestionUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string;
    originalText?: StringFieldUpdateOperationsInput | string;
    suggestedText?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    isResolved?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutSuggestionsNestedInput;
  };

  export type SuggestionUncheckedUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string;
    originalText?: StringFieldUpdateOperationsInput | string;
    suggestedText?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    isResolved?: BoolFieldUpdateOperationsInput | boolean;
    userId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SuggestionUncheckedUpdateManyWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string;
    originalText?: StringFieldUpdateOperationsInput | string;
    suggestedText?: StringFieldUpdateOperationsInput | string;
    description?: NullableStringFieldUpdateOperationsInput | string | null;
    isResolved?: BoolFieldUpdateOperationsInput | boolean;
    userId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ArchiveLinkCreateManySourceInput = {
    id?: string;
    targetId: string;
    type: string;
    bidirectional?: boolean;
    createdAt?: Date | string;
  };

  export type ArchiveLinkCreateManyTargetInput = {
    id?: string;
    sourceId: string;
    type: string;
    bidirectional?: boolean;
    createdAt?: Date | string;
  };

  export type ChatPinnedArchiveEntryCreateManyArchiveEntryInput = {
    id?: string;
    chatId: string;
    userId: string;
    pinnedAt?: Date | string;
  };

  export type ArchiveLinkUpdateWithoutSourceInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    bidirectional?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    target?: ArchiveEntryUpdateOneRequiredWithoutIncomingLinksNestedInput;
  };

  export type ArchiveLinkUncheckedUpdateWithoutSourceInput = {
    id?: StringFieldUpdateOperationsInput | string;
    targetId?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    bidirectional?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ArchiveLinkUncheckedUpdateManyWithoutSourceInput = {
    id?: StringFieldUpdateOperationsInput | string;
    targetId?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    bidirectional?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ArchiveLinkUpdateWithoutTargetInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    bidirectional?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    source?: ArchiveEntryUpdateOneRequiredWithoutOutgoingLinksNestedInput;
  };

  export type ArchiveLinkUncheckedUpdateWithoutTargetInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sourceId?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    bidirectional?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ArchiveLinkUncheckedUpdateManyWithoutTargetInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sourceId?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    bidirectional?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ChatPinnedArchiveEntryUpdateWithoutArchiveEntryInput = {
    id?: StringFieldUpdateOperationsInput | string;
    pinnedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    chat?: ChatUpdateOneRequiredWithoutPinnedArchiveEntriesNestedInput;
    user?: UserUpdateOneRequiredWithoutPinnedArchiveEntriesNestedInput;
  };

  export type ChatPinnedArchiveEntryUncheckedUpdateWithoutArchiveEntryInput = {
    id?: StringFieldUpdateOperationsInput | string;
    chatId?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    pinnedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ChatPinnedArchiveEntryUncheckedUpdateManyWithoutArchiveEntryInput =
    {
      id?: StringFieldUpdateOperationsInput | string;
      chatId?: StringFieldUpdateOperationsInput | string;
      userId?: StringFieldUpdateOperationsInput | string;
      pinnedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    };

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number;
  };

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF;
}
