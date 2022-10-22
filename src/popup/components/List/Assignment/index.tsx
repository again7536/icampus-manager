import {
  Box,
  Checkbox,
  css,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListSubheader,
  Typography,
} from "@mui/material";
import { Assignment, AssignmentDetail, Course } from "@/types";
import moment from "moment";
import * as S from "./styled";

interface AssignmentListProps {
  assignments: (Assignment & AssignmentDetail & { course_id: number })[];
  courses: Course[];
  title: string;
  checkable?: boolean;
  checked?: Set<number>;
  onCheck?: (id: number) => void;
}

function AssignmentList({
  assignments,
  courses,
  title,
  checkable = false,
  checked,
  onCheck,
}: AssignmentListProps) {
  const handleClickItem = (assignment: Assignment) => {
    chrome.tabs.create({ url: assignment.view_url, active: false });
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper", padding: "0 10px" }}>
      <nav aria-label="main mailbox folders">
        <List subheader={<ListSubheader> {title} </ListSubheader>}>
          {assignments.map((assignment, assignIdx) => (
            <ListItem disablePadding key={assignment.id}>
              {checkable && (
                <ListItemIcon>
                  <Checkbox
                    checked={checked?.has(assignIdx)}
                    tabIndex={-1}
                    disableRipple
                    onClick={() => {
                      if (onCheck) onCheck(assignIdx);
                    }}
                  />
                </ListItemIcon>
              )}
              <ListItemButton onClick={() => handleClickItem(assignment)}>
                <S.EllipsisListItemText
                  primary={<Typography>{assignment.title}</Typography>}
                  secondary={courses.find((v) => v.id === assignment.course_id)?.name}
                />
              </ListItemButton>

              <p
                css={css`
                  min-width: 100px;
                  padding: 0 10px;
                `}
              >
                <Typography variant="body2">
                  {moment(assignment.due_at).format("YYYY-MM-DD")}
                </Typography>
                <Typography variant="body2">
                  {moment(assignment.due_at).format("hh:mm a")}
                </Typography>
              </p>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
}

export default AssignmentList;
