import { Assignment, AssignmentDetail } from "@/types";
import atomWithAsyncStorage from "@/utils/atomWithAsyncStorage";

const playListAtom = atomWithAsyncStorage<
  (Assignment & AssignmentDetail & { course_id: number })[]
>({
  key: "playList",
  initialValue: [],
});

export { playListAtom };
