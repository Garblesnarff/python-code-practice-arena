
import { Problem, normalizeProblem } from './types';
import { easyProblems as rawEasyProblems } from './easy-problems';
import { mediumProblems as rawMediumProblems } from './medium-problems';
import { hardProblems as rawHardProblems } from './hard-problems';
import { course1Problems as rawCourse1Problems } from './course-1-problems';
import { course2Problems as rawCourse2Problems } from './course-2-problems';

// Ensure all problems are normalized before exporting
const normalizedEasyProblems = rawEasyProblems.map(normalizeProblem);
const normalizedMediumProblems = rawMediumProblems.map(normalizeProblem);
const normalizedHardProblems = rawHardProblems.map(normalizeProblem);
const normalizedCourse1Problems = rawCourse1Problems.map(normalizeProblem);
const normalizedCourse2Problems = rawCourse2Problems.map(normalizeProblem);

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
