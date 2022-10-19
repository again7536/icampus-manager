import moment from "moment";
import AssignmentList from "@/popup/components/List";
import { useCourses } from "@/hooks/queries/useCourses";
import { useStudentId } from "@/hooks/queries/useStudentId";
import { useAssignments } from "@/hooks/queries/useAssignment";
import { useMemo } from "react";

function Main() {
  const { data: courses } = useCourses();
  const { data: studentId } = useStudentId({
    courseId: courses?.[0].id,
    userId: courses?.[0].enrollments[0].user_id,
  });
  const results = useAssignments({
    courseIds: courses?.map((course) => course.id),
    userId: courses?.[0].enrollments[0].user_id,
    studentId,
  });

  const assignments = useMemo(
    () =>
      results
        .map((result) => result.data ?? [])
        .map((assignmentsOfCourse, courseIdx) =>
          assignmentsOfCourse.map((assignment) => ({
            ...assignment,
            course_name: courses?.[courseIdx].name ?? "",
          }))
        )
        .flat()
        .filter(
          (assignment) =>
            assignment.completed === false && moment(assignment.due_at).diff(moment.now()) > 0
        )
        .sort((a, b) => moment(a.due_at).diff(b.due_at)),
    [courses, results]
  );

  return <AssignmentList assignments={assignments} />;
}

export default Main;
