import { createClient } from "redis";

type RedisClient = ReturnType<typeof createClient>;

declare global {
  // eslint-disable-next-line no-var
  var __ilcRedisClient: RedisClient | undefined;
  // eslint-disable-next-line no-var
  var __ilcRedisConnectPromise: Promise<RedisClient> | undefined;
}

function getRedisUrl() {
  const redisUrl = process.env.REDIS_URL;

  if (!redisUrl) {
    throw new Error("REDIS_URL não configurada.");
  }

  return redisUrl;
}

function createRedisSingleton() {
  const client = createClient({ url: getRedisUrl() });

  client.on("error", (error) => {
    console.error("Redis client error:", error);
  });

  return client;
}

export async function getRedisClient() {
  if (!globalThis.__ilcRedisClient) {
    globalThis.__ilcRedisClient = createRedisSingleton();
  }

  if (globalThis.__ilcRedisClient.isOpen) {
    return globalThis.__ilcRedisClient;
  }

  if (!globalThis.__ilcRedisConnectPromise) {
    globalThis.__ilcRedisConnectPromise = globalThis.__ilcRedisClient
      .connect()
      .then(() => globalThis.__ilcRedisClient as RedisClient)
      .finally(() => {
        globalThis.__ilcRedisConnectPromise = undefined;
      });
  }

  return globalThis.__ilcRedisConnectPromise;
}

export function getRedisKey(key: string) {
  const prefix = process.env.REDIS_PREFIX ?? "ilc";
  return `${prefix}:${key}`;
}

export async function pingRedis() {
  const client = await getRedisClient();
  return client.ping();
}

export async function getOrSetJson<T>(key: string, ttlSeconds: number, factory: () => Promise<T> | T) {
  const client = await getRedisClient();
  const redisKey = getRedisKey(key);
  const cached = await client.get(redisKey);

  if (cached) {
    return JSON.parse(cached) as T;
  }

  const value = await factory();
  await client.set(redisKey, JSON.stringify(value), {
    EX: ttlSeconds,
  });

  return value;
}