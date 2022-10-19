import {
  Box,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Assignment, AssignmentDetail } from "@/types";

interface AssignmentListProps {
  assignments: (Assignment & AssignmentDetail & { course_id: number })[];
  checked: Set<number>;
  onCheck: (id: number) => void;
}

function AssignmentList({ assignments, checked, onCheck }: AssignmentListProps) {
  const handleClickItem = (assignment: Assignment) => {
    chrome.tabs.create({ url: assignment.view_url, active: false });
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <nav aria-label="main mailbox folders">
        <List>
          {assignments.map((assignment, assignIdx) => (
            <ListItem disablePadding key={assignment.id}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.has(assignIdx)}
                  tabIndex={-1}
                  disableRipple
                  onClick={() => onCheck(assignIdx)}
                />
              </ListItemIcon>
              <ListItemButton onClick={() => handleClickItem(assignment)}>
                <ListItemText
                  primary={<Typography>{assignment.title}</Typography>}
                  secondary={assignment.name}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
}

export default AssignmentList;
