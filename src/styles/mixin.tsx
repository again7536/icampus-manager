import { css } from "@emotion/react";

interface FlexBoxParams {
  direction?: "row" | "column";
  justify?: "flex-start" | "center" | "flex-end";
  align?: "flex-start" | "center" | "flex-end";
}

const flexBox = ({ direction = "row", justify = "center", align = "center" }: FlexBoxParams) => css`
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justify};
  align-items: ${align};
`;

export { flexBox };
