import { DialogTitle, IconButton, Tooltip } from "@mui/material";
import CheckableSublist from "@/popup/components/List/CheckableSublist/CheckableSublist";
import { AssignmentShortInfo, Course } from "@/types";
import { useState } from "react";
import TabIcon from "@mui/icons-material/Tab";

interface CustomAssignmentModalProps {
  assignments: AssignmentShortInfo[][];
  addedAssignmentIds: number[];
  courses: Course[];
  onConfirm: (checked: Set<number>) => void;
}

const CONFIRM_BUTTON_TEXT = "과제 추가";

function CustomAssignmentModal({
  assignments,
  courses,
  onConfirm,
  addedAssignmentIds,
}: CustomAssignmentModalProps) {
  const [checked, setChecked] = useState<Set<number>>(new Set(addedAssignmentIds));
  const handleConfirm = () => onConfirm(checked);

  return (
    <>
      <DialogTitle>Set backup account</DialogTitle>
      {assignments.map((assignmentsOfCourse) => (
        <CheckableSublist
          key={assignmentsOfCourse[0].course_id ?? 0}
          assignments={assignmentsOfCourse}
          checked={checked}
          courses={courses}
          onCheck={setChecked}
        />
      ))}
      <Tooltip title={CONFIRM_BUTTON_TEXT}>
        <IconButton onClick={handleConfirm}>
          <TabIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}

export default CustomAssignmentModal;
