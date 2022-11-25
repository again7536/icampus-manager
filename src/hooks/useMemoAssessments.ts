import { useMemo } from "react";
import moment from "@/utils/momentKo";
import { AssignmentShortInfo } from "@/types";
import { UseQueryResult } from "@tanstack/react-query";

interface UseMemoAssessmentsParams {
  results: UseQueryResult<AssignmentShortInfo[], unknown>[];
}

function useMemoAssessments({ results }: UseMemoAssessmentsParams) {
  const assessmentAssignments = useMemo(() => {
    const filteredResult = results
      .map((a) => a.data ?? [])
      .map((assessmentOfCourse) =>
        assessmentOfCourse
          .filter(
            (assignment) =>
              moment(assignment.due_at).diff(moment.now()) > 0 &&
              moment(assignment.unlock_at).diff(moment.now()) < 0
          )
          .sort((a, b) => moment(a.due_at).diff(b.due_at))
      );
    return [filteredResult, filteredResult.flat()] as [
      AssignmentShortInfo[][],
      AssignmentShortInfo[]
    ];
  }, [results]);

  return assessmentAssignments;
}

export { useMemoAssessments };
