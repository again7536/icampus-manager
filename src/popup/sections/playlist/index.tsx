import { useAtom } from "jotai";
import { playListAtom } from "@/atoms";
import Player from "@/popup/components/Player";
import { useCourses, useStudentId } from "@/hooks";
import PlayList from "@/popup/components/List/Playlist";

function PlayListSection() {
  const [playList] = useAtom(playListAtom);
  const { data: courses } = useCourses();
  const { data: studentId } = useStudentId({
    courseId: courses?.[0].id,
    userId: courses?.[0].enrollments[0].user_id,
  });

  return (
    <>
      <Player assignment={playList[0]} studentId={studentId ?? ""} />
      <PlayList assignments={playList} />
    </>
  );
}

export default PlayListSection;
