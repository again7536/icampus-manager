import styled from "@emotion/styled";
import { flexBox } from "@/styles/mixin";

const CounterWrapper = styled.div`
  ${flexBox({})}
  width: 100%;

  & > span {
    display: block;
    font-size: 36pt;

    &:not(:last-child)::after {
      content: "";
      display: inline-block;
      width: 0px;
      height: 25px;

      margin: 0 15px;
      border-right: 1px solid #3c3c3c20;
    }
  }
`;

export { CounterWrapper };
