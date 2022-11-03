import { ListItemText } from "@mui/material";
import { ellipsis } from "@/styles/mixin";
import styled from "@emotion/styled";

const EllipsisListItemText = styled(ListItemText)`
  && > p {
    ${ellipsis({})};
  }
`;

export { EllipsisListItemText };
