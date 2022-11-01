import { fetchAndJoinAssignmentInfos } from "@/api";
import { QUERY_KEYS } from "@/constants";
import { useQueries } from "@tanstack/react-query";

interface UseAssignmentsParams {
  courseIds?: number[];
  userId?: number;
}

const useAssignments = ({ courseIds, userId }: UseAssignmentsParams) => {
  const results = useQueries({
    queries:
      courseIds?.map((courseId) => ({
        queryKey: [QUERY_KEYS.ASSIGNMENTS, courseId],
        queryFn: () => fetchAndJoinAssignmentInfos({ courseId, userId: userId ?? 0 }),
        enabled: !!userId && !!courseIds,
      })) ?? [],
  });

  return results;
};

export { useAssignments };
