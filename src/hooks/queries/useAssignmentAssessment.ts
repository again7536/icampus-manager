import { fetchAssignmentAssessment } from "@/api";
import { QUERY_KEYS } from "@/constants";
import { useQueries } from "@tanstack/react-query";

interface UseAssignmentsParams {
  courseIds?: number[];
  userId?: number;
}

const useAssignmentAssessments = ({ courseIds }: UseAssignmentsParams) => {
  const results = useQueries({
    queries:
      courseIds?.map((courseId) => ({
        queryKey: [QUERY_KEYS.ASSIGNMENT_ASSESSMENTS, courseId],
        queryFn: () => fetchAssignmentAssessment(courseId),
        enabled: !!courseIds,
      })) ?? [],
  });

  return results;
};

export { useAssignmentAssessments };
