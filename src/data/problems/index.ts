
import { Problem } from './types';
import { easyProblems } from './easy-problems';
import { mediumProblems } from './medium-problems';
import { hardProblems } from './hard-problems';
import { course1Problems } from './course-1-problems';
import { course2Problems } from './course-2-problems';

// We export all problems here
export const problems: Problem[] = [
  ...easyProblems,
  ...mediumProblems,
  ...hardProblems,
  ...course1Problems,
  ...course2Problems,
];

// Re-export the Problem type
export type { Problem, Example, TestCase } from './types';
