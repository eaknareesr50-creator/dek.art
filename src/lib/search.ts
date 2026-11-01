import { programs } from '../data/programs';
import { tutorials } from '../data/tutorials';
import { getProgram } from '../data/programs';
import type { Program, Tutorial } from '../types';

export function matchesQuery(fields: string[], query: string): boolean {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return true;
  const haystack = fields.join(' ').toLowerCase();
  return tokens.every((token) => haystack.includes(token));
}

export function tutorialMatches(tutorial: Tutorial, query: string): boolean {
  const program = getProgram(tutorial.program);
  return matchesQuery(
    [tutorial.title, tutorial.summary, tutorial.tags.join(' '), program.name, program.abbr],
    query,
  );
}

export function searchTutorials(query: string): Tutorial[] {
  return tutorials.filter((t) => tutorialMatches(t, query));
}

export function searchPrograms(query: string): Program[] {
  return programs.filter((p) =>
    matchesQuery([p.name, p.abbr, p.category, p.tagline, p.skills.join(' ')], query),
  );
}
