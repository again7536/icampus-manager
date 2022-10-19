import { Assignment } from "@/types";
import atomWithAsyncStorage from "@/utils/atomWithAsyncStorage";

const playListAtom = atomWithAsyncStorage<Assignment[]>({ key: "playList", initialValue: [] });

export { playListAtom };
