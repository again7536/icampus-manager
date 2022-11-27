import { css } from "@emotion/react";

interface FlexBoxParams {
  direction?: "row" | "column";
  justify?: "flex-start" | "center" | "flex-end";
  align?: "flex-start" | "center" | "flex-end";
}

interface EllipsisParams {
  line?: number;
  lineHeight?: number;
}

const flexBox = ({ direction = "row", justify = "center", align = "center" }: FlexBoxParams) => css`
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justify};
  align-items: ${align};
`;

const ellipsis = ({ line = 1, lineHeight }: EllipsisParams) =>
  line === 1
    ? css`
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      `
    : css`
        display: -webkit-box;
        -webkit-line-clamp: ${line};
        -webkit-box-orient: vertical;
        word-wrap: break-word;
        overflow: hidden;
        line-height: ${lineHeight}pt;
        height: fit-content;
      `;

export { flexBox, ellipsis };
