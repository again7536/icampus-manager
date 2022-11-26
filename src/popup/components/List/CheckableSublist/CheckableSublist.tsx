import { Course, AssignmentShortInfo } from "@/types";
import {
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemButton,
  ListItemText,
  Collapse,
  List,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useCallback, useState, memo } from "react";
import { ellipsis } from "@/styles/mixin";
import { css } from "@emotion/react";
import CheckableSubitem from "./CheckableSubitem/CheckableSubitem";

interface CheckableSublistProps {
  courses: Course[];
  assignments: AssignmentShortInfo[];
  checked: Set<number>;
  onCheck: (next: Set<number> | ((prev: Set<number>) => Set<number>)) => void;
}

const MemoizedCheckableSubitem = memo(CheckableSubitem);

function CheckableSublist({ courses, assignments, checked, onCheck }: CheckableSublistProps) {
  const [open, setOpen] = useState<boolean>(false);
  const handleClickList = () => setOpen((prev) => !prev);
  const isChecked = assignments.every((assignment) => checked.has(assignment.assignment_id));

  const handleCheck = () => {
    const ids = assignments.map((assignment) => assignment.assignment_id);
    const next = new Set(checked);

    if (isChecked) ids.forEach((materialId) => next.delete(materialId));
    else ids.forEach((materialId) => next.add(materialId));

    onCheck(next);
  };

  const handleCheckItem = useCallback(
    (id: number) => {
      onCheck((prev) => {
        const next = new Set([...prev]);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    },
    [onCheck]
  );

  const courseId = assignments[0].course_id;
  return (
    <>
      <ListItem>
        <ListItemIcon>
          <Checkbox checked={isChecked} tabIndex={-1} disableRipple onClick={handleCheck} />
        </ListItemIcon>
        <ListItemButton onClick={handleClickList}>
          <ListItemText
            primary={courses?.find((course) => course.id === courseId)?.name ?? ""}
            css={css`
              & > span {
                ${ellipsis({})};
              }
            `}
          />
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
      </ListItem>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        css={css`
          min-height: auto !important;
        `}
      >
        <List disablePadding dense>
          {assignments.map((assignment) => (
            <MemoizedCheckableSubitem
              key={assignment.assignment_id}
              assignment={assignment}
              onCheck={handleCheckItem}
              checked={checked.has(assignment.assignment_id)}
            />
          ))}
        </List>
      </Collapse>
    </>
  );
}

export default CheckableSublist;
