import styled from "@emotion/styled";
import { flexBox } from "@/styles/mixin";

const AuthFallbackContainer = styled.div`
  ${flexBox({ direction: "column" })}
  gap: 25px 0;

  height: 300px;
`;

export { AuthFallbackContainer };
