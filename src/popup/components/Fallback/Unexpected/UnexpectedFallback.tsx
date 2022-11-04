import { ERRORS } from "@/constants";
import { Typography } from "@mui/material";

function UnexpectedFallback() {
  return <Typography role="alert">{ERRORS.UNEXPECTED.message}</Typography>;
}

export default UnexpectedFallback;
