import { css, Tooltip, Typography } from "@mui/material";
import moment from "@/utils/momentKo";
import { useMemo } from "react";
import { AssignmentInfo } from "@/types";
import HelpIcon from "@mui/icons-material/Help";
import { flexBox } from "@/styles/mixin";

interface EstimatedDurationProps {
  assignments: AssignmentInfo[];
  playrate: number;
}

const PLAYTIME_HELP =
  "배속이 적용된 시간입니다. 전체 영상 길이로 계산하므로, 부정확할 수 있습니다.";

function EstimatedDuration({ assignments, playrate }: EstimatedDurationProps) {
  const estimatedDuration = useMemo(
    () =>
      moment.duration(
        assignments.reduce(
          (acc, assignment) => acc + (assignment?.commons_content?.duration ?? 0),
          0
        ) / playrate,
        "seconds"
      ),
    [playrate, assignments]
  );

  return (
    <div
      css={css`
        ${flexBox({ direction: "row", justify: "flex-start" })};
        gap: 0 5px;
      `}
    >
      <Tooltip title={PLAYTIME_HELP}>
        <HelpIcon sx={{ fontSize: "12pt", color: "#3c3c3ca0" }} />
      </Tooltip>
      <Typography variant="body2">{`예상 소요시간 : ${estimatedDuration.hours()}시간 ${estimatedDuration.minutes()}분`}</Typography>
    </div>
  );
}

export default EstimatedDuration;
