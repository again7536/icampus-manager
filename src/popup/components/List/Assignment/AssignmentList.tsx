import { Box, List, ListSubheader, Typography } from "@mui/material";
import { memo } from "react";
import { AssignmentInfo, Course } from "@/types";
import { LIST_SKELETON_COUNT } from "@/constants";
import AssignmentListItem from "./ListItem/ListItem";
import AssignmentSkeletonItem from "./SkeletonItem/SkeletonItem";
import * as S from "./AssignmentList.style";

interface AssignmentListProps {
  assignments: AssignmentInfo[];
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
  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper", padding: "0 10px" }}>
      <nav>
        <List subheader={<ListSubheader> {title} </ListSubheader>}>
          {
            // eslint-disable-next-line no-nested-ternary
            isLoading ? (
              Array.from({ length: LIST_SKELETON_COUNT }, (_, v) => v).map((val) => (
                <AssignmentSkeletonItem key={val} />
              ))
            ) : assignments.length > 0 ? (
              assignments.map((assignment) => (
                <MemoizedAssignmentListItem
                  key={assignment.id}
                  assignment={assignment}
                  courseName={
                    courses.find((course) => course.id === assignment.course_id)?.name ?? ""
                  }
                  checked={checked?.has(assignment.assignment_id)}
                  checkable={checkable}
                  onCheck={onCheck ? () => onCheck(assignment.assignment_id) : undefined}
                  timeAsLeft={timeAsLeft}
                />
              ))
            ) : (
              <S.BlankList>
                <Typography variant="h5">야호! 다 끝냈어요!</Typography>
              </S.BlankList>
            )
          }
        </List>
      </nav>
    </Box>
  );
}

export default AssignmentList;
