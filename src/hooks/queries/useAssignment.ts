import { fetchCourseAssignmentDetails, fetchCourseStatus } from "@/api";
import { QUERY_KEYS } from "@/constants";
import { AssignmentInfos } from "@/types";
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

        // do SQL like join operation for assignment and assignment details
        queryFn: async () => {
          const { assignments, item: courseStatus } = await fetchCourseStatus({
            courseId,
            userId: userId ?? 0,
          });
          const assignmentDetails = await fetchCourseAssignmentDetails({
            courseId,
            userId: userId ?? 0,
            studentId: courseStatus.user_login,
          });

          return assignmentDetails.map((detail) => ({
            ...detail,
            ...assignments.find((assignment) => assignment.id === detail.assignment_id),
            course_id: courseId,
          })) as AssignmentInfos[];
        },
        enabled: !!userId && !!courseIds,
      })) ?? [],
  });

  return results;
};

export { useAssignments };
