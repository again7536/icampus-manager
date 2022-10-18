import { Box, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { Assignment } from "@/types";

interface AssignmentListProps {
  assignments: (Assignment & { course_name: string })[];
}

function AssignmentList({ assignments }: AssignmentListProps) {
  const handleClickItem = (assignment: Assignment) => {
    chrome.tabs.create({ url: assignment.view_info.view_url, active: false });
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <nav aria-label="main mailbox folders">
        <List>
          {assignments.map((assignment) => (
            <ListItem disablePadding onClick={() => handleClickItem(assignment)}>
              <ListItemButton>
                <ListItemText
                  primary={<Typography>{assignment.title}</Typography>}
                  secondary={assignment.course_name}
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
