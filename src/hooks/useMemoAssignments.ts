import { AssignmentInfos, LectureType } from "@/types";
import { UseQueryResult } from "@tanstack/react-query";
import moment from "moment";
import { useMemo } from "react";
import { LECTURE_TYPE } from "@/constants";

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
  const assignments: AssignmentInfos[] = useMemo(
    () =>
      results
        .map((result) => result.data ?? [])
        .flat()
        .filter((assignment) => selectedCourses.indexOf(assignment.course_id) > -1)
        // .filter(
        //   (assignment) =>
        //     assignment.completed === false &&
        //     moment(assignment.due_at).diff(moment.now()) > 0 &&
        //     moment(assignment.unlock_at).diff(moment.now()) < 0
        // )
        .sort((a, b) => moment(a.due_at).diff(b.due_at)),
    [results, selectedCourses]
  );

  const videoAssignments = useMemo(() => {
    const videos = assignments.filter((assignment) =>
      Object.values(LECTURE_TYPE).includes(assignment.commons_content?.content_type as LectureType)
    );
    if (attendanceOnly) return videos.filter((video) => video.use_attendance);
    return videos;
  }, [assignments, attendanceOnly]);

  const pdfAssignments = useMemo(
    () => assignments.filter((assginment) => assginment.commons_content?.content_type === "pdf"),
    [assignments]
  );

  const workAssignments = useMemo(() => {
    const others = assignments.filter(
      (assignment) => assignment.type === "assignment" || assignment.type === "quiz"
    );
    if (attendanceOnly) return others.filter((other) => other.use_attendance);
    return others;
  }, [assignments, attendanceOnly]);

  return { assignments, videoAssignments, pdfAssignments, workAssignments };
}

export { useMemoAssignments };
