import { useState, useEffect } from "react";
export function readLocal(key, fallback) {
  try {
    const value = localStorage.getItem(`fitpool:${key}`);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}
export function useLocalState(key, fallback) {
  const [value, setValue] = useState(() => readLocal(key, fallback));
  useEffect(() => {
    try {
      localStorage.setItem(`fitpool:${key}`, JSON.stringify(value));
    } catch {
      /* Tools still work when browser storage is unavailable. */
    }
  }, [key, value]);
  return [value, setValue];
}
export async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    signal: options.signal
      ? AbortSignal.any([options.signal, AbortSignal.timeout(18000)])
      : AbortSignal.timeout(18000),
  });
  if (!response.ok)
    throw new Error(
      response.status === 429
        ? "The service is busy. Please try again in a minute."
        : "We could not reach the service. Please try again.",
    );
  return response.json();
}
