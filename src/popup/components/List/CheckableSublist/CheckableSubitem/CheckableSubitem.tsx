import { ellipsis } from "@/styles/mixin";
import { AssignmentShortInfo } from "@/types";
import { ListItem, ListItemIcon, Checkbox, ListItemButton, ListItemText } from "@mui/material";
import { css } from "@emotion/react";

interface CheckableSubitemProps {
  assignment: AssignmentShortInfo;
  checked: boolean;
  onCheck: (id: number) => void;
}

function CheckableSubitem({ checked, onCheck, assignment }: CheckableSubitemProps) {
  return (
    <ListItem key={assignment.assignment_id} sx={{ pl: 4 }}>
      <ListItemIcon>
        <Checkbox
          checked={checked}
          tabIndex={-1}
          disableRipple
          onClick={() => onCheck(assignment.assignment_id)}
        />
      </ListItemIcon>
      <ListItemButton onClick={() => onCheck(assignment.assignment_id)}>
        <ListItemText
          primary={assignment.title}
          css={css`
            & > span {
              ${ellipsis({ line: 2 })};
              width: 300px;
            }
          `}
        />
      </ListItemButton>
    </ListItem>
  );
}

export default CheckableSubitem;
