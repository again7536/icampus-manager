import { LECTURE_TYPE } from "@/constants";
import { AssignmentShortInfo } from "@/types";
import { Checkbox, css, ListItem, ListItemButton, ListItemIcon, Typography } from "@mui/material";
import moment from "@/utils/momentKo";
import * as S from "./ListItem.style";

interface AssignmentListItemProps {
  assignment: AssignmentShortInfo;
  courseName: string;
  checkable?: boolean;
  checked?: boolean;
  onCheck?: () => void;
  timeAsLeft?: boolean;
}

function AssignmentListItem({
  assignment,
  courseName,
  checkable,
  checked,
  onCheck,
  timeAsLeft,
}: AssignmentListItemProps) {
  const handleClickItem = (url: string) => {
    chrome.tabs.create({ url, active: false });
  };

  return (
    <ListItem disablePadding role="listitem">
      {checkable && assignment.commons_content?.content_type !== LECTURE_TYPE.YOUTUBE && (
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
      <ListItemButton onClick={() => handleClickItem(assignment.view_info.view_url)}>
        <S.EllipsisListItemText
          primary={<Typography>{assignment.title}</Typography>}
          secondary={courseName}
        />
      </ListItemButton>

      <div
        css={css`
          min-width: 100px;
          padding: 0 10px;
          text-align: center;
        `}
      >
        {timeAsLeft ? (
          <Typography variant="body2">{moment(assignment.due_at).fromNow()}</Typography>
        ) : (
          <>
            <Typography variant="body2">
              {moment(assignment.due_at).format("YYYY-MM-DD")}
            </Typography>
            <Typography variant="body2">{moment(assignment.due_at).format("a hh:mm")}</Typography>
          </>
        )}
      </div>
    </ListItem>
  );
}

export default AssignmentListItem;
