import { useMemo } from "react";
import moment from "@/utils/momentKo";
import { AssignmentShortInfo } from "@/types";
import { UseQueryResult } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { customAssignmentIdsAtom } from "@/atoms";

interface UseCustomAsuseCustomAssignmentsParams {
  results: UseQueryResult<AssignmentShortInfo[], unknown>[];
}

function useCustomAssignments({ results }: UseCustomAsuseCustomAssignmentsParams) {
  const customAssignmentIds = useAtomValue(customAssignmentIdsAtom);

  const assessmentAssignments = useMemo(() => {
    // remove course with 0 length
    const filteredResult = results
      .map((a) => a.data ?? [])
      .reduce((arr, assessmentOfCourse) => {
        const filteredAssignments = assessmentOfCourse.filter(
          (assignment) =>
            moment(assignment.due_at).diff(moment.now()) > 0 &&
            moment(assignment.unlock_at).diff(moment.now()) < 0
        );
        return filteredAssignments.length > 0 ? [...arr, filteredAssignments] : arr;
      }, [] as AssignmentShortInfo[][]);

    const customResult = filteredResult
      .map((assessmentsOfCourse) =>
        assessmentsOfCourse.filter((assignment) =>
          customAssignmentIds.includes(assignment.assignment_id)
        )
      )
      .flat()
      .sort((a, b) => moment(a.due_at).diff(b.due_at));

    return [filteredResult, customResult] as [AssignmentShortInfo[][], AssignmentShortInfo[]];
  }, [customAssignmentIds, results]);

  return assessmentAssignments;
}

export { useCustomAssignments };
