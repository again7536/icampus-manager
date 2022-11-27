import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";
import { flexBox } from "@/styles/mixin";

const ControlWrapper = styled.div`
  width: 100%;
  ${flexBox({ justify: "flex-start" })};
  gap: 0 10px;
  padding: 0 20px;
`;

const spinAnim = keyframes`
  from {
    transform: rotateZ(0deg);
  }
  to {
    transform: rotateZ(-360deg);
  }
`;

const spin = css`
  animation: ${spinAnim} 1s ease infinite;
`;

export { ControlWrapper, spin };
