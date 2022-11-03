import { Box, List, ListSubheader, Typography } from "@mui/material";
import { useMemo, memo } from "react";
import { AssignmentInfos, Course } from "@/types";
import { LIST_SKELETON_COUNT } from "@/constants";
import AssignmentListItem from "./ListItem";
import AssignmentSkeletonItem from "./SkeletonItem";
import * as S from "./styled";

interface AssignmentListProps {
  assignments: AssignmentInfos[];
  courses: Course[];
  title: string;
  checkable?: boolean;
  isLoading?: boolean;
  checked?: Set<number>;
  onCheck?: (id: number) => void;
  timeAsLeft?: boolean;
}

const MemoizedAssignmentListItem = memo(AssignmentListItem);

function AssignmentList({
  assignments,
  courses,
  title,
  checkable = false,
  isLoading = false,
  checked,
  onCheck,
  timeAsLeft,
}: AssignmentListProps) {
  const ListItems = useMemo(() => {
    if (isLoading)
      return Array.from({ length: LIST_SKELETON_COUNT }, (_, v) => v).map((val) => (
        <AssignmentSkeletonItem key={val} />
      ));
    if (assignments.length > 0)
      return assignments.map((assignment) => (
        <MemoizedAssignmentListItem
          key={assignment.id}
          assignment={assignment}
          courseName={courses.find((course) => course.id === assignment.course_id)?.name ?? ""}
          checked={checked?.has(assignment.assignment_id)}
          checkable={checkable}
          onCheck={onCheck ? () => onCheck(assignment.assignment_id) : undefined}
          timeAsLeft={timeAsLeft}
        />
      ));
    return (
      <S.BlankList>
        <Typography variant="h5">야호! 다 끝냈어요!</Typography>
      </S.BlankList>
    );
  }, [assignments, checkable, checked, courses, isLoading, onCheck, timeAsLeft]);

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper", padding: "0 10px" }}>
      <nav>
        <List subheader={<ListSubheader> {title} </ListSubheader>}>{ListItems}</List>
      </nav>
    </Box>
  );
}

export default AssignmentList;
