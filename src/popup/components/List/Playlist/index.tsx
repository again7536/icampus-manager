import { Box, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { Assignment, AssignmentDetail } from "@/types";
import { css } from "@emotion/react";

interface PlayListProps {
  assignments: (Assignment & AssignmentDetail & { course_id: number })[];
}

function PlayList({ assignments }: PlayListProps) {
  const handleClickItem = (assignment: Assignment) => {
    chrome.tabs.create({ url: assignment.view_url, active: false });
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <nav aria-label="main mailbox folders">
        <List>
          {assignments.map((assignment, index) => (
            <ListItem
              disablePadding
              key={assignment.id}
              css={
                index === 0 &&
                css`
                  background-color: #adebdc;
                `
              }
            >
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

export default PlayList;
