import { ListItemText } from "@mui/material";
import { ellipsis, flexBox } from "@/styles/mixin";
import styled from "@emotion/styled";

const EllipsisListItemText = styled(ListItemText)`
  && > p {
    ${ellipsis({})};
  }
`;

const BlankList = styled.div`
  ${flexBox({ justify: "center", align: "center" })};

  height: 100px;
  color: #3c3c3c80;
`;

export { EllipsisListItemText, BlankList };
