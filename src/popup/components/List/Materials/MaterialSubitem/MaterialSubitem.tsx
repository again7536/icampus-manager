import { ellipsis } from "@/styles/mixin";
import { AssignmentInfo } from "@/types";
import { ListItem, ListItemIcon, Checkbox, ListItemButton, ListItemText } from "@mui/material";
import { css } from "@emotion/react";

interface MaterialSubitemProps {
  material: AssignmentInfo;
  checked: boolean;
  onCheck: (id: number) => void;
}

function MaterialSubitem({ checked, onCheck, material }: MaterialSubitemProps) {
  return (
    <ListItem key={material.assignment_id} sx={{ pl: 4 }}>
      <ListItemIcon>
        <Checkbox
          checked={checked}
          tabIndex={-1}
          disableRipple
          onClick={() => onCheck(material.assignment_id)}
        />
      </ListItemIcon>
      <ListItemButton onClick={() => onCheck(material.assignment_id)}>
        <ListItemText
          primary={material.title}
          css={css`
            & > span {
              ${ellipsis({})};
              display: inline-block;
              width: 300px;
            }
          `}
        />
      </ListItemButton>
    </ListItem>
  );
}

export default MaterialSubitem;
