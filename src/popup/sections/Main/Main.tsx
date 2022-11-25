import AssignmentList from "@/popup/components/List/Assignment/AssignmentList";
import { useCourses, useAssignments, useMemoAssignments } from "@/hooks";
import { useState, memo, useCallback } from "react";
import { playListAtom, selectedCoursesAtom, settingsAtom } from "@/atoms";
import { useSetAtom, useAtomValue } from "jotai";
import { useIsRestoring } from "@tanstack/react-query";
import produce from "immer";
import MainControl from "./MainControl/MainControl";

const MemoizedAssignmentList = memo(AssignmentList);

const COURSE_LIST_SUBHEADER = "강의";
const HOMEWORK_LIST_SUBHEADER = "과제";

function Main() {
  // Atoms
  const selectedCourses = useAtomValue(selectedCoursesAtom);
  const settings = useAtomValue(settingsAtom);
  const setPlayList = useSetAtom(playListAtom);

  // Queries
  const isRestoring = useIsRestoring();
  const { data: courses } = useCourses();
  const courseIds = courses?.map((course) => course.id);
  const assignmentResults = useAssignments({
    courseIds,
    userId: courses?.[0].enrollments[0].user_id,
  });

  // Local hooks / states
  const [checkedAssignmentIdSet, setCheckedAssignmentIdSet] = useState<Set<number>>(new Set());
  const [isCheckable, setCheckable] = useState<boolean>(false);
  const { assignments, videoAssignments, workAssignments } = useMemoAssignments({
    results: assignmentResults,
    selectedCourses,
  });

  // handlers
  const handleCheckAssignment = useCallback(
    (id: number) =>
      setCheckedAssignmentIdSet((prev) =>
        produce(prev, (draft) => {
          if (prev.has(id)) draft.delete(id);
          else draft.add(id);
        })
      ),
    []
  );
  const handleConfirmSelect = () => {
    setPlayList(
      assignments.filter((assignment) => checkedAssignmentIdSet.has(assignment.assignment_id))
    );
    setCheckable(false);
  };
  const handleCancelSelect = () => {
    setCheckable(false);
    setCheckedAssignmentIdSet(new Set());
  };

  return (
    <>
      <MainControl
        isCheckable={isCheckable}
        setCheckable={setCheckable}
        videoAssignments={videoAssignments}
        checkedAssignmentIdSet={checkedAssignmentIdSet}
        onConfirmSelect={handleConfirmSelect}
        onCancelSelect={handleCancelSelect}
      />
      <MemoizedAssignmentList
        title={COURSE_LIST_SUBHEADER}
        isCheckable={isCheckable}
        isLoading={assignmentResults.some((result) => result.isLoading) || isRestoring}
        assignments={videoAssignments}
        courses={courses ?? []}
        checkedAssignmentIdSet={checkedAssignmentIdSet}
        onCheck={handleCheckAssignment}
        timeAsLeft={!!settings.DDAY}
      />
      <MemoizedAssignmentList
        title={HOMEWORK_LIST_SUBHEADER}
        isLoading={assignmentResults.some((result) => result.isLoading) || isRestoring}
        assignments={workAssignments}
        courses={courses ?? []}
        timeAsLeft={!!settings.DDAY}
      />
    </>
  );
}

export default Main;
