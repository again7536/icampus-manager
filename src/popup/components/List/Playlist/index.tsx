import { Box, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { AssignmentInfos, Course } from "@/types";
import { css } from "@emotion/react";

interface PlayListProps {
  assignments: AssignmentInfos[];
  courses: Course[];
}

function PlayList({ assignments, courses }: PlayListProps) {
  const handleClickItem = (assignment: AssignmentInfos) => {
    chrome.tabs.create({ url: assignment.view_url, active: false });
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <nav>
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
                  secondary={
                    courses.find((course) => course.id === assignment.course_id)?.name ?? ""
                  }
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
