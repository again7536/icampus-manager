import { ERRORS } from "@/constants";
import { Typography } from "@mui/material";

function AuthFallback() {
  return <Typography role="alert">{ERRORS.AUTH.message}</Typography>;
}

export default AuthFallback;
