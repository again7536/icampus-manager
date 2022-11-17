import { useAtomValue } from "jotai";
import { playListAtom, settingsAtom } from "@/atoms";
import Player from "@/popup/components/Player/Player";
import { useCourses, useStudentId } from "@/hooks";
import PlayList from "@/popup/components/List/Playlist/Playlist";
import { Typography } from "@mui/material";
import useChromeMessageHandler from "@/hooks/useChromeMessageHandler";
import { PLAYRATE } from "@/constants";
import EstimatedDuration from "@/popup/components/EstimatedDuration/EstimatedDuration";
import * as S from "./Lectures.style";

function Lectures() {
  const settings = useAtomValue(settingsAtom);
  const playList = useAtomValue(playListAtom);
  const { data: courses } = useCourses({});
  const { data: studentId } = useStudentId({
    courseId: courses?.[0].id,
    userId: courses?.[0].enrollments[0].user_id,
  });
  useChromeMessageHandler();

  return (
    <>
      {playList.length > 0 ? (
        <>
          <EstimatedDuration assignments={playList} playrate={PLAYRATE[+settings.PLAYRATE]} />
          <Player assignment={playList[0]} studentId={studentId ?? ""} />
        </>
      ) : (
        <S.BlankPlayList>
          <Typography variant="h5">재생할 영상이 없어요..</Typography>
        </S.BlankPlayList>
      )}

      <PlayList assignments={playList} courses={courses ?? []} />
    </>
  );
}

export default Lectures;
