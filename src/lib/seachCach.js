const cache = new Map();

export function getCached(key) {
  return cache.get(key);
}

export function setCached(key, value) {
  cache.set(key, value);
  setTimeout(() => cache.delete(key), 1000 * 30); // 30s TTL
}
