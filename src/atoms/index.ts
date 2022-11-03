import { ATOM_KEYS, SETTINGS } from "@/constants";
import { AssignmentInfos, Settings } from "@/types";
import atomWithAsyncStorage from "@/utils/atomWithAsyncStorage";
import { SnackbarProps } from "@mui/material";
import { atom } from "jotai";

const playListAtom = atomWithAsyncStorage<AssignmentInfos[]>({
  key: ATOM_KEYS.PLAYLIST,
  initialValue: [],
});

const selectedCoursesAtom = atomWithAsyncStorage<number[]>({
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

export {
  playListAtom,
  selectedCoursesAtom,
  settingsAtom,
  versionAtom,
  snackbarAtom,
  snackbarOpenAtom,
  snackbarCloseAtom,
};
