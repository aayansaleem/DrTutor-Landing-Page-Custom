/**
 * Level (key stage) and year group options for the /learn booking form.
 *
 * Codes match the platform lookups tables (KeyStage, YearGroup), which the
 * quick booking endpoint accepts by code. The server checks the year group
 * fits the level using the same mapping, so keep the two in step.
 */

export interface LevelOption {
  code: string;
  name: string;
  /** Year group codes that belong to this level. */
  years: string[];
}

export const LEVELS: LevelOption[] = [
  { code: 'ks2', name: 'KS2', years: ['year-3', 'year-4', 'year-5', 'year-6'] },
  { code: 'ks3', name: 'KS3', years: ['year-7', 'year-8', 'year-9'] },
  { code: 'ks4', name: 'GCSE', years: ['year-10', 'year-11'] },
  { code: 'ks5', name: 'A-Level', years: ['year-12', 'year-13'] },
];

const YEAR_NAMES: Record<string, string> = {
  'year-3': 'Year 3',
  'year-4': 'Year 4',
  'year-5': 'Year 5',
  'year-6': 'Year 6',
  'year-7': 'Year 7',
  'year-8': 'Year 8',
  'year-9': 'Year 9',
  'year-10': 'Year 10',
  'year-11': 'Year 11',
  'year-12': 'Year 12',
  'year-13': 'Year 13',
};

/** Year groups for a level, or every year group when no level is chosen yet. */
export function yearOptionsFor(level: string): { code: string; name: string }[] {
  const found = LEVELS.find((l) => l.code === level);
  const codes = found ? found.years : LEVELS.flatMap((l) => l.years);
  return codes.map((code) => ({ code, name: YEAR_NAMES[code] ?? code }));
}

/** The level a year group belongs to, so picking a year can fill the level in. */
export function levelForYear(year: string): string {
  return LEVELS.find((l) => l.years.includes(year))?.code ?? '';
}
