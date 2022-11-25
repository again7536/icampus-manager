import { Box, List, ListSubheader, Typography } from "@mui/material";
import { memo, useCallback } from "react";
import { AssignmentShortInfo, Course } from "@/types";
import { LIST_SKELETON_COUNT } from "@/constants";
import AssignmentListItem from "./ListItem/ListItem";
import AssignmentSkeletonItem from "./SkeletonItem/SkeletonItem";
import * as S from "./AssignmentList.style";

interface AssignmentListProps {
  assignments: AssignmentShortInfo[];
  courses: Course[];
  title: string;
  isCheckable?: boolean;
  isLoading?: boolean;
  checkedAssignmentIdSet?: Set<number>;
  onCheck?: (id: number) => void;
  timeAsLeft?: boolean;
}

const BLANK_MESSAGE = "야호! 다 끝냈어요!";

const MemoizedAssignmentListItem = memo(AssignmentListItem);

function AssignmentList({
  assignments,
  courses,
  title,
  isCheckable = false,
  isLoading = false,
  checkedAssignmentIdSet,
  onCheck,
  timeAsLeft,
}: AssignmentListProps) {
  const handleCheck = useCallback(
    (id: number) => {
      if (onCheck) onCheck(id);
    },
    [onCheck]
  );

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
                  checked={checkedAssignmentIdSet?.has(assignment.assignment_id)}
                  checkable={isCheckable}
                  onCheck={handleCheck}
                  timeAsLeft={timeAsLeft}
                />
              ))
            ) : (
              <S.BlankList>
                <Typography variant="h5">{BLANK_MESSAGE}</Typography>
              </S.BlankList>
            )
          }
        </List>
      </nav>
    </Box>
  );
}

export default AssignmentList;
