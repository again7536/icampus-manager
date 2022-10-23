import { AssignmentInfos } from "@/types";
import { UseQueryResult } from "@tanstack/react-query";
import moment from "moment";
import { useMemo } from "react";

interface UseMemoAssignmentsParams {
  results: UseQueryResult<AssignmentInfos[]>[];
  selectedCourses: number[];
}

function useMemoAssignments({ results, selectedCourses }: UseMemoAssignmentsParams) {
  // data filtering
  const assignments = useMemo(
    () =>
      results
        .map((result) => result.data ?? [])
        .flat()
        .filter((assignment) => selectedCourses.indexOf(assignment.course_id) > -1)
        .filter(
          (assignment) =>
            assignment.completed === false &&
            moment(assignment.due_at).diff(moment.now()) > 0 &&
            moment(assignment.unlock_at).diff(moment.now()) < 0
        )
        .sort((a, b) => moment(a.due_at).diff(b.due_at)),
    [results, selectedCourses]
  );
  const videoAssignments = useMemo(
    () => assignments.filter((assignment) => assignment.commons_content.content_type === "movie"),
    [assignments]
  );
  const otherAssignments = useMemo(
    () => assignments.filter((assignment) => assignment.commons_content.content_type !== "movie"),
    [assignments]
  );

  return { assignments, videoAssignments, otherAssignments };
}

export { useMemoAssignments };
