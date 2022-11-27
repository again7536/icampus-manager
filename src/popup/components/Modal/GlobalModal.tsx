import { modalAtom, modalCloseAtom } from "@/atoms";
import { Dialog } from "@mui/material";
import { useAtomValue, useSetAtom } from "jotai";

function GlobalModal() {
  const { modalBody, open } = useAtomValue(modalAtom);
  const closeModal = useSetAtom(modalCloseAtom);
  return (
    <Dialog open={open} onClose={closeModal}>
      {modalBody}
    </Dialog>
  );
}

export default GlobalModal;
