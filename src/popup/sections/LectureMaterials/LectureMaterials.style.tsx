import styled from "@emotion/styled";
import { styled as muiStyled } from "@mui/material/styles";
import { LinearProgress, linearProgressClasses } from "@mui/material";

const ButtonGroup = styled.div`
  display: "inline-block";
  float: right;
`;

const BorderLinearProgress = muiStyled(LinearProgress)(() => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: 200,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
  },
}));

export { ButtonGroup, BorderLinearProgress };
