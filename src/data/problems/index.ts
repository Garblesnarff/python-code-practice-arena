
import { Problem, normalizeProblem } from './types';
import { easyProblems } from './easy-problems';
import { mediumProblems } from './medium-problems';
import { hardProblems } from './hard-problems';
import { course1Problems } from './course-1-problems';
import { course2Problems } from './course-2-problems';

// Ensure all problems are normalized before exporting
const normalizedEasyProblems = easyProblems.map(normalizeProblem);
const normalizedMediumProblems = mediumProblems.map(normalizeProblem);
const normalizedHardProblems = hardProblems.map(normalizeProblem);
const normalizedCourse1Problems = course1Problems.map(normalizeProblem);
const normalizedCourse2Problems = course2Problems.map(normalizeProblem);

// We export all problems here
export const problems: Problem[] = [
  ...normalizedEasyProblems,
  ...normalizedMediumProblems,
  ...normalizedHardProblems,
  ...normalizedCourse1Problems,
  ...normalizedCourse2Problems,
];

// Re-export the Problem type
export type { Problem, Example, TestCase } from './types';

// Also re-export normalized versions of each problem set
export { normalizedEasyProblems as easyProblems };
export { normalizedMediumProblems as mediumProblems };
export { normalizedHardProblems as hardProblems };
export { normalizedCourse1Problems as course1Problems };
export { normalizedCourse2Problems as course2Problems };
