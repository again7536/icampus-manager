import { flexBox } from "@/styles/mixin";
import { Paper } from "@mui/material";
import styled from "@emotion/styled";

const SublistContainer = styled(Paper)`
  overflow-y: scroll;
  height: 190px;
  margin: 0 5px;
`;

const ButtonGroup = styled.div`
  ${flexBox({ direction: "row" })};
`;

export { SublistContainer, ButtonGroup };
