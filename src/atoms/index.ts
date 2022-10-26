import { ATOM_KEYS } from "@/constants";
import { AssignmentInfos } from "@/types";
import atomWithAsyncStorage from "@/utils/atomWithAsyncStorage";

const playListAtom = atomWithAsyncStorage<AssignmentInfos[]>({
  key: ATOM_KEYS.PLAYLIST,
  initialValue: [],
});

const selectedCoursesAtom = atomWithAsyncStorage<number[]>({
  key: ATOM_KEYS.SELECTED_COURSE,
  initialValue: [],
});

export { playListAtom, selectedCoursesAtom };
