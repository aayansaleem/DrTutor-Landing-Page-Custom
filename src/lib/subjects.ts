/**
 * Subjects for the /learn booking form.
 *
 * Loaded from the DrTutor Workspace lookups list (public, cached server side
 * for an hour): GET {api origin}/api/v1/lookups/subjects/, a plain JSON array
 * of { id, code, name, sort_order, is_active }. The admin edits that list in
 * the platform, so the form always offers what we actually teach.
 *
 * The origin comes from the lead endpoint (VITE_LEAD_ENDPOINT, or production
 * by default), so one env var points the whole form at a local backend. If
 * the request fails, or in dev stub mode, a short built-in list keeps the form
 * working. Its codes match the platform's seeded subjects, and the form sends
 * the code, which the booking endpoint accepts either way.
 */

import { leadApiOrigin } from './leads';

export interface SubjectOption {
  code: string;
  name: string;
}

export const FALLBACK_SUBJECTS: SubjectOption[] = [
  { code: 'maths', name: 'Maths' },
  { code: 'english', name: 'English' },
  { code: 'science', name: 'Science' },
  { code: 'biology', name: 'Biology' },
  { code: 'chemistry', name: 'Chemistry' },
  { code: 'physics', name: 'Physics' },
  { code: 'computer-science', name: 'Computer Science' },
];

interface LookupRow {
  code?: unknown;
  name?: unknown;
  sort_order?: unknown;
  is_active?: unknown;
}

const FETCH_TIMEOUT_MS = 4000;

let cache: Promise<SubjectOption[]> | null = null;

async function fetchSubjects(): Promise<SubjectOption[]> {
  const origin = leadApiOrigin();
  if (!origin) return FALLBACK_SUBJECTS;
  // A slow network must never leave the form waiting: give up quietly and keep
  // the built-in list.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(`${origin}/api/v1/lookups/subjects/`, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    if (!res.ok) return FALLBACK_SUBJECTS;
    const json = (await res.json()) as LookupRow[] | { results?: LookupRow[] };
    const rows = Array.isArray(json) ? json : json.results ?? [];
    const subjects = rows
      .filter((r) => r.is_active !== false && typeof r.code === 'string' && typeof r.name === 'string')
      .sort((a, b) => Number(a.sort_order ?? 0) - Number(b.sort_order ?? 0))
      .map((r) => ({ code: r.code as string, name: r.name as string }));
    return subjects.length ? subjects : FALLBACK_SUBJECTS;
  } catch {
    return FALLBACK_SUBJECTS;
  } finally {
    clearTimeout(timer);
  }
}

/** Fetched once per page load and shared by both forms on /learn. */
export function loadSubjects(): Promise<SubjectOption[]> {
  if (!cache) cache = fetchSubjects();
  return cache;
}
