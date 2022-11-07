/* eslint-disable react/jsx-props-no-spreading */
import { snackbarAtom, snackbarCloseAtom } from "@/atoms";
import { IconButton, Snackbar } from "@mui/material";
import { useAtomValue, useSetAtom } from "jotai";
import CloseIcon from "@mui/icons-material/Close";

function GlobalSnackbar() {
  const snackbarProps = useAtomValue(snackbarAtom);
  const closeSnackbar = useSetAtom(snackbarCloseAtom);
  return (
    <Snackbar
      {...snackbarProps}
      onClose={closeSnackbar}
      autoHideDuration={snackbarProps.autoHideDuration ?? 2000}
      action={
        snackbarProps.action ?? (
          <IconButton size="small" aria-label="close" color="inherit" onClick={closeSnackbar}>
            <CloseIcon fontSize="small" />
          </IconButton>
        )
      }
    />
  );
}

export default GlobalSnackbar;
