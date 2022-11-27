import { DialogTitle, DialogContent, DialogActions, Button, Tooltip } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
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

const HELP_TEXT = `상단에는 '과제 및 평가' 탭에서 제공하는 과제 리스트를 표시합니다. 
과제 리스트에서 과제를 선택하여 추가하면 하단에 옮겨집니다.`;

const MODAL_TITLE = "사용자 추가 과제 선택";
const CANCEL_BUTTON_TEXT = "취소";
const CONFIRM_BUTTON_TEXT = "선택 완료";
const UP_BUTTON_TEXT = "삭제 ⮝";
const DOWN_BUTTON_TEXT = "⮟ 추가";

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
      <DialogTitle>
        {MODAL_TITLE}
        <Tooltip sx={{ fontSize: "12pt", marginLeft: "10px" }} title={HELP_TEXT}>
          <HelpIcon />
        </Tooltip>
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <S.SublistContainer variant="outlined">
          {assignments.map((assignmentsOfCourse) => {
            const filteredAssignmentsOfCourse = assignmentsOfCourse.filter(
              (assignment) => !listedAssignmentIds.includes(assignment.assignment_id)
            );
            return (
              filteredAssignmentsOfCourse.length > 0 && (
                <CheckableSublist
                  key={filteredAssignmentsOfCourse[0].course_id ?? 0}
                  assignments={filteredAssignmentsOfCourse}
                  checked={checkedUnlisted}
                  courses={courses}
                  onCheck={setCheckedUnlisted}
                />
              )
            );
          })}
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
                  key={filteredAssignmentsOfCourse[0].course_id ?? 0}
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
