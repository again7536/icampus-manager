import SVG from "react-inlinesvg";
import { useEffect, useState } from "react";
import { css, keyframes } from "@emotion/react";
import { flexBox } from "@/styles/mixin";

const slideIn = keyframes`
  from {
    transform: translateY(100%);
  }
  40%, 60% {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
`;

function LoadingIndicator() {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const tid = setTimeout(() => setShow(true), 150);
    return () => clearTimeout(tid);
  });

  return show ? (
    <div
      css={css`
        ${flexBox({})};
        width: 100%;
      `}
    >
      <SVG
        src="/logo-new.svg"
        css={css`
          width: 250px;
          height: 125px;

          #text-icampus {
            animation: ${slideIn} 2s ease infinite both;
          }
          #text-manager {
            animation: ${slideIn} 2s ease 0.12s infinite both;
          }
        `}
      />
    </div>
  ) : null;
}

export default LoadingIndicator;
