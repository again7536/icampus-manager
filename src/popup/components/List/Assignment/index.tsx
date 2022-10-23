import { Box, List, ListSubheader } from "@mui/material";
import { AssignmentInfos, Course } from "@/types";
import AssignmentListItem from "./ListItem";
import AssignmentSkeletonItem from "./SkeletonItem";

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
  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper", padding: "0 10px" }}>
      <nav>
        <List subheader={<ListSubheader> {title} </ListSubheader>}>
          {isLoading
            ? Array.from({ length: 4 }).map(() => <AssignmentSkeletonItem />)
            : assignments.map((assignment, assignIdx) => (
                <AssignmentListItem
                  assignment={assignment}
                  courseName={
                    courses.find((course) => course.id === assignment.course_id)?.name ?? ""
                  }
                  checked={checked?.has(assignIdx)}
                  checkable={checkable}
                  onCheck={onCheck ? () => onCheck(assignIdx) : undefined}
                />
              ))}
        </List>
      </nav>
    </Box>
  );
}

export default AssignmentList;
