import { AssignmentInfo, LectureType } from "@/types";
import { UseQueryResult } from "@tanstack/react-query";
import moment from "moment";
import { useMemo } from "react";
import { LECTURE_TYPE } from "@/constants";

interface UseMemoAssignmentsParams {
  results: UseQueryResult<AssignmentInfo[]>[];
  selectedCourseIds: number[];
  attendanceOnly?: boolean;
}

function useMemoAssignments({
  results,
  selectedCourseIds,
  attendanceOnly = false,
}: UseMemoAssignmentsParams) {
  // data filtering
  const assignments: AssignmentInfo[] = useMemo(
    () =>
      results
        .map((result) => result.data ?? [])
        .flat()
        .filter((assignment) => selectedCourseIds.indexOf(assignment.course_id) > -1)
        .filter(
          (assignment) =>
            assignment.completed === false &&
            moment(assignment.due_at).diff(moment.now()) > 0 &&
            moment(assignment.unlock_at).diff(moment.now()) < 0
        )
        .sort((a, b) => moment(a.due_at).diff(b.due_at)),
    [results, selectedCourseIds]
  );

  const videoAssignments = useMemo(() => {
    const videos = assignments.filter((assignment) =>
      Object.values(LECTURE_TYPE).includes(assignment.commons_content?.content_type as LectureType)
    );
    if (attendanceOnly) return videos.filter((video) => video.use_attendance);
    return videos;
  }, [assignments, attendanceOnly]);

  const workAssignments = useMemo(() => {
    const others = assignments.filter(
      (assignment) => assignment.type === "assignment" || assignment.type === "quiz"
    );
    if (attendanceOnly) return others.filter((other) => other.use_attendance);
    return others;
  }, [assignments, attendanceOnly]);

  return { assignments, videoAssignments, workAssignments };
}

export { useMemoAssignments };
