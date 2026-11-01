import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

const SAVED_KEY = 'cah:saved';
const DONE_KEY = 'cah:done';

function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

interface LibraryValue {
  saved: string[];
  isSaved: (id: string) => boolean;
  /** คืนค่าสถานะใหม่หลังสลับ (true = บันทึกแล้ว) */
  toggleSaved: (id: string) => boolean;
  doneSteps: (id: string) => number[];
  toggleStep: (id: string, index: number) => void;
}

const LibraryContext = createContext<LibraryValue | null>(null);

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<string[]>(() => read<string[]>(SAVED_KEY, []));
  const [done, setDone] = useState<Record<string, number[]>>(() =>
    read<Record<string, number[]>>(DONE_KEY, {}),
  );

  useEffect(() => write(SAVED_KEY, saved), [saved]);
  useEffect(() => write(DONE_KEY, done), [done]);

  const isSaved = useCallback((id: string) => saved.includes(id), [saved]);

  const toggleSaved = useCallback(
    (id: string) => {
      const next = !saved.includes(id);
      setSaved(next ? [...saved, id] : saved.filter((x) => x !== id));
      return next;
    },
    [saved],
  );

  const doneSteps = useCallback((id: string) => done[id] ?? [], [done]);

  const toggleStep = useCallback((id: string, index: number) => {
    setDone((current) => {
      const list = current[id] ?? [];
      const nextList = list.includes(index) ? list.filter((i) => i !== index) : [...list, index];
      return { ...current, [id]: nextList };
    });
  }, []);

  const value = useMemo<LibraryValue>(
    () => ({ saved, isSaved, toggleSaved, doneSteps, toggleStep }),
    [saved, isSaved, toggleSaved, doneSteps, toggleStep],
  );

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}

export function useLibrary(): LibraryValue {
  const ctx = useContext(LibraryContext);
  if (!ctx) {
    throw new Error('useLibrary must be used inside LibraryProvider');
  }
  return ctx;
}
