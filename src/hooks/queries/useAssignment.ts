import { fetchAssignmentsOfCourse } from "@/api";
import { useQueries } from "@tanstack/react-query";

interface UseAssignmentsParams {
  courseIds?: number[];
  userId?: number;
  studentId?: string;
}

const useAssignments = ({ courseIds, userId, studentId }: UseAssignmentsParams) => {
  const results = useQueries({
    queries:
      courseIds?.map((courseId) => ({
        queryKey: ["assignments", courseId],
        queryFn: () =>
          fetchAssignmentsOfCourse({ courseId, userId: userId ?? 0, studentId: studentId ?? "" }),
        // courseIds should not be contained
        // Object.is()가 항상 다른 결과를 뱉음 -> 캐싱하지 않음
        enabled: !!userId && !!studentId,
      })) ?? [],
  });

  return results;
};

export { useAssignments };
