import { ATOM_KEYS, SETTINGS } from "@/constants";
import { AssignmentInfo, Settings } from "@/types";
import atomWithAsyncStorage from "@/utils/atomWithAsyncStorage";
import { SnackbarProps } from "@mui/material";
import { atom } from "jotai";
import { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  modalBody: ReactNode;
}

const playListAtom = atomWithAsyncStorage<AssignmentInfo[]>({
  key: ATOM_KEYS.PLAYLIST,
  initialValue: [],
});

const selectedCourseIdsAtom = atomWithAsyncStorage<number[]>({
  key: ATOM_KEYS.SELECTED_COURSE,
  initialValue: [],
});

const settingsAtom = atomWithAsyncStorage<Settings>({
  key: ATOM_KEYS.SETTINGS,
  initialValue: Object.entries(SETTINGS).reduce(
    (acc, [key, val]) => ({ ...acc, [key]: val.defaultValue }),
    {} as Settings
  ),
});

const versionAtom = atomWithAsyncStorage<string>({
  key: ATOM_KEYS.VERSION,
  initialValue: "",
});

const snackbarAtom = atom<Omit<SnackbarProps, "onClose">>({ open: false });
const snackbarOpenAtom = atom<null, Omit<SnackbarProps, "onClose" | "open">>(
  null,
  (get, set, update) => {
    set(snackbarAtom, {
      ...get(snackbarAtom),
      ...update,
      open: true,
    });
  }
);
const snackbarCloseAtom = atom(null, (get, set) =>
  set(snackbarAtom, { ...get(snackbarAtom), open: false })
);

const modalAtom = atom<Omit<ModalProps, "onClose">>({ open: false, modalBody: "" });
const modalOpenAtom = atom<null, Omit<ModalProps, "onClose" | "open">>(null, (get, set, update) => {
  set(modalAtom, {
    ...get(modalAtom),
    ...update,
    open: true,
  });
});
const modalCloseAtom = atom(null, (get, set) => set(modalAtom, { ...get(modalAtom), open: false }));

const customAssignmentIdsAtom = atomWithAsyncStorage<number[]>({
  key: ATOM_KEYS.CUSTOM_ASSIGNMENT,
  initialValue: [],
});

export {
  playListAtom,
  selectedCourseIdsAtom,
  settingsAtom,
  versionAtom,
  snackbarAtom,
  snackbarOpenAtom,
  snackbarCloseAtom,
  modalAtom,
  modalOpenAtom,
  modalCloseAtom,
  customAssignmentIdsAtom,
};
