import { AssignmentInfos } from "@/types";
import { UseQueryResult } from "@tanstack/react-query";
import moment from "moment";
import { useMemo } from "react";

interface UseMemoAssignmentsParams {
  results: UseQueryResult<AssignmentInfos[]>[];
  selectedCourses: number[];
  attendanceOnly?: boolean;
}

function useMemoAssignments({
  results,
  selectedCourses,
  attendanceOnly = false,
}: UseMemoAssignmentsParams) {
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

  const videoAssignments = useMemo(() => {
    const videos = assignments.filter(
      (assignment) => assignment.commons_content?.content_type === "movie"
    );
    if (attendanceOnly) return videos.filter((video) => video.use_attendance);
    return videos;
  }, [assignments, attendanceOnly]);

  const pdfAssignments = useMemo(
    () => assignments.filter((assginment) => assginment.commons_content?.content_type === "pdf"),
    [assignments]
  );

  const otherAssignments = useMemo(() => {
    const others = assignments.filter((assignment) => assignment.type !== "commons");
    if (attendanceOnly) return others.filter((other) => other.use_attendance);
    return others;
  }, [assignments, attendanceOnly]);

  return { assignments, videoAssignments, pdfAssignments, otherAssignments };
}

export { useMemoAssignments };
