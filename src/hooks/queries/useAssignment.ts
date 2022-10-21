import { fetchCourseAssignmentDetails, fetchCourseStatus } from "@/api";
import { QUERY_KEYS } from "@/constants";
import { AssignmentDetail } from "@/types";
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
          const detailsMap = new Map(
            assignmentDetails.map((details) => [details.assignment_id, details])
          );

          return assignments.map((assignment) => ({
            course_id: courseId,
            ...assignment,
            ...(detailsMap.get(assignment.id) as AssignmentDetail),
          }));
        },
        enabled: !!userId && !!courseIds,
      })) ?? [],
  });

  return results;
};

export { useAssignments };
