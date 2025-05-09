
import { Problem } from '@/data/problems/types';

export interface DailyChallenge {
  id: string;
  challenge_date: string;
  problem_id: string;
  difficulty: string;
  bonus_xp: number;
  created_at: string;
  problem?: Problem;
}
