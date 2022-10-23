import { AssignmentInfos } from "@/types";
import { Checkbox, css, ListItem, ListItemButton, ListItemIcon, Typography } from "@mui/material";
import moment from "moment";
import * as S from "./styled";

interface AssignmentListItemProps {
  assignment: AssignmentInfos;
  courseName: string;
  checkable?: boolean;
  checked?: boolean;
  onCheck?: () => void;
}

function AssignmentListItem({
  assignment,
  courseName,
  checkable,
  checked,
  onCheck,
}: AssignmentListItemProps) {
  const handleClickItem = (url: string) => {
    chrome.tabs.create({ url, active: false });
  };

  return (
    <ListItem disablePadding>
      {checkable && (
        <ListItemIcon>
          <Checkbox
            checked={checked}
            tabIndex={-1}
            disableRipple
            onClick={() => {
              if (onCheck) onCheck();
            }}
          />
        </ListItemIcon>
      )}
      <ListItemButton onClick={() => handleClickItem(assignment.view_url)}>
        <S.EllipsisListItemText
          primary={<Typography>{assignment.title}</Typography>}
          secondary={courseName}
        />
      </ListItemButton>

      <p
        css={css`
          min-width: 100px;
          padding: 0 10px;
        `}
      >
        <Typography variant="body2">{moment(assignment.due_at).format("YYYY-MM-DD")}</Typography>
        <Typography variant="body2">{moment(assignment.due_at).format("hh:mm a")}</Typography>
      </p>
    </ListItem>
  );
}

export default AssignmentListItem;
