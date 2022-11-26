import { DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import CheckableSublist from "@/popup/components/List/CheckableSublist/CheckableSublist";
import { AssignmentShortInfo, Course } from "@/types";
import { useState } from "react";

import * as S from "./CustomAssignmentModal.style";

interface CustomAssignmentModalProps {
  assignments: AssignmentShortInfo[][];
  addedAssignmentIds: number[];
  courses: Course[];
  onConfirm: (checked: Set<number>) => void;
  onClose: () => void;
}

const MODAL_TITLE = "사용자 과제 변경";
const CANCEL_BUTTON_TEXT = "취소";
const CONFIRM_BUTTON_TEXT = "사용자 과제 변경";
const UP_BUTTON_TEXT = "⮝";
const DOWN_BUTTON_TEXT = "⮟";

function CustomAssignmentModal({
  assignments,
  courses,
  onConfirm,
  onClose,
  addedAssignmentIds,
}: CustomAssignmentModalProps) {
  const [checkedUnlisted, setCheckedUnlisted] = useState<Set<number>>(new Set());
  const [checkedListed, setCheckedListed] = useState<Set<number>>(new Set());
  const [listedAssignmentIds, setListedAssignmentIds] = useState<number[]>(addedAssignmentIds);

  const handleAddToListed = () => {
    setListedAssignmentIds((prev) => [...prev, ...checkedUnlisted]);
    setCheckedUnlisted(new Set());
  };
  const handleRemoveFromListed = () => {
    setListedAssignmentIds((prev) => prev.filter((id) => !checkedListed.has(id)));
    setCheckedListed(new Set());
  };
  const handleConfirm = () => onConfirm(new Set(listedAssignmentIds));

  return (
    <>
      <DialogTitle>{MODAL_TITLE}</DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <S.SublistContainer variant="outlined">
          {assignments.map((assignmentsOfCourse) => (
            <CheckableSublist
              key={assignmentsOfCourse[0].course_id ?? 0}
              assignments={assignmentsOfCourse}
              checked={checkedUnlisted}
              courses={courses}
              onCheck={setCheckedUnlisted}
            />
          ))}
        </S.SublistContainer>
        <S.ButtonGroup>
          <Button onClick={handleRemoveFromListed} variant="outlined">
            {UP_BUTTON_TEXT}
          </Button>
          <Button onClick={handleAddToListed} variant="outlined">
            {DOWN_BUTTON_TEXT}
          </Button>
        </S.ButtonGroup>
        <S.SublistContainer variant="outlined">
          {assignments.map((assignmentsOfCourse) => {
            const filteredAssignmentsOfCourse = assignmentsOfCourse.filter((assignment) =>
              listedAssignmentIds.includes(assignment.assignment_id)
            );
            return (
              filteredAssignmentsOfCourse.length > 0 && (
                <CheckableSublist
                  key={assignmentsOfCourse[0].course_id ?? 0}
                  assignments={filteredAssignmentsOfCourse}
                  checked={checkedListed}
                  courses={courses}
                  onCheck={setCheckedListed}
                />
              )
            );
          })}
        </S.SublistContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="info">
          {CANCEL_BUTTON_TEXT}
        </Button>
        <Button onClick={handleConfirm} color="primary">
          {CONFIRM_BUTTON_TEXT}
        </Button>
      </DialogActions>
    </>
  );
}

export default CustomAssignmentModal;
