
import { supabase } from '@/integrations/supabase/client';
import { Problem } from '@/data/problems/types';
import { Course, Topic, CourseProgress } from './course-types';

// Re-export all functions from separate service files
export { getCourses, getCourseById, getTopicsByCourseId, getTopicById, 
         getProblemsByTopicId, getProblemById } from './course-data-service';

export { getCourseProgress, getAllCourseProgress, updateCourseProgressAfterProblemCompletion, 
         markCourseAsAccessed, updateCourseLastAccessed, createCourseProgress } from './course-progress-service';

// Re-export the types for backward compatibility
export type { Course, Topic, CourseProgress };
