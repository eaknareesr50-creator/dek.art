export type ProgramSlug =
  | 'photoshop'
  | 'illustrator'
  | 'after-effects'
  | 'premiere-pro'
  | 'procreate';

export type Level = 'beginner' | 'intermediate' | 'advanced';

export type FaqCategory = 'general' | 'learning' | 'consult' | 'software';

export interface Program {
  slug: ProgramSlug;
  name: string;
  abbr: string;
  category: string;
  tagline: string;
  description: string;
  color1: string;
  color2: string;
  platforms: string[];
  bestFor: string[];
  skills: string[];
}

export interface TutorialStep {
  title: string;
  body: string;
}

export interface Tutorial {
  id: string;
  program: ProgramSlug;
  title: string;
  summary: string;
  level: Level;
  minutes: number;
  tags: string[];
  steps: TutorialStep[];
  tips: string[];
}

export interface Faq {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
  program?: ProgramSlug;
}
