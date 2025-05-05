
import { Problem } from './types';
import { easyProblems } from './easy-problems';
import { mediumProblems } from './medium-problems';

// We export all problems here
export const problems: Problem[] = [
  ...easyProblems,
  ...mediumProblems,
];

// Re-export the Problem type
export type { Problem, Example, TestCase } from './types';
