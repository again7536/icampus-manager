import { Box, List, ListSubheader, Typography } from "@mui/material";
import { useMemo } from "react";
import { AssignmentInfos, Course } from "@/types";
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
}

function AssignmentList({
  assignments,
  courses,
  title,
  checkable = false,
  isLoading = false,
  checked,
  onCheck,
}: AssignmentListProps) {
  const ListItems = useMemo(() => {
    if (isLoading) return Array.from({ length: 4 }).map(() => <AssignmentSkeletonItem />);
    if (assignments.length > 0)
      return assignments.map((assignment, assignIdx) => (
        <AssignmentListItem
          assignment={assignment}
          courseName={courses.find((course) => course.id === assignment.course_id)?.name ?? ""}
          checked={checked?.has(assignIdx)}
          checkable={checkable}
          onCheck={onCheck ? () => onCheck(assignIdx) : undefined}
        />
      ));
    return (
      <S.BlankList>
        <Typography variant="h5">야호! 다 끝냈어요!</Typography>
      </S.BlankList>
    );
  }, [assignments, checkable, checked, courses, isLoading, onCheck]);

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper", padding: "0 10px" }}>
      <nav>
        <List subheader={<ListSubheader> {title} </ListSubheader>}>{ListItems}</List>
      </nav>
    </Box>
  );
}

export default AssignmentList;
