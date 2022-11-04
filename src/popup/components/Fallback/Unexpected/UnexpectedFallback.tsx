import { ERRORS } from "@/constants";
import { Typography } from "@mui/material";

function UnexpectedFallback() {
  return (
    <Typography role="alert" variant="h6" sx={{ color: "#3c3c3ca0", textAlign: "center" }}>
      {ERRORS.UNEXPECTED.message}
    </Typography>
  );
}

export default UnexpectedFallback;
