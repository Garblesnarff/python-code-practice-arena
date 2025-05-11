
import { Problem, normalizeProblem } from '../problems/types';
import { easyFundamentalProblems as rawEasyFundamentalProblems } from './easy-problems';

// Normalize all problems
export const easyFundamentalProblems: Problem[] = rawEasyFundamentalProblems.map(normalizeProblem);

// We export all fundamentals problems here
export const fundamentalProblems: Problem[] = [
  ...easyFundamentalProblems,
];
