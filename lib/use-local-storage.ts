"use client";

import * as React from "react";

const STORAGE_PREFIX = "promptops:v1:";

/**
 * SSR-safe localStorage state. First render returns `initialValue` to avoid
 * hydration mismatches; the persisted value is then merged in via effect.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, { hydrated: boolean; reset: () => void }] {
  const storageKey = STORAGE_PREFIX + key;
  const [value, setValue] = React.useState<T>(initialValue);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw !== null) {
        setValue(JSON.parse(raw) as T);
      }
    } catch {
      // ignore parse / access errors — fall back to initial value
    }
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  const set = React.useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved =
          typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        try {
          window.localStorage.setItem(storageKey, JSON.stringify(resolved));
        } catch {
          // storage full / blocked — keep in-memory state
        }
        return resolved;
      });
    },
    [storageKey]
  );

  const reset = React.useCallback(() => {
    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
    setValue(initialValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  return [value, set, { hydrated, reset }];
}

export const storageKeys = {
  workflows: "workflows",
  automations: "automations",
  notifications: "notifications",
  integrations: "integrations",
  reports: "reports",
  profile: "profile",
  forensics: "forensics",
  community: "community",
  plan: "plan",
} as const;
