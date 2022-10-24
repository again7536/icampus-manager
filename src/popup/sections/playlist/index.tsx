import { useAtom } from "jotai";
import { playListAtom } from "@/atoms";
import Player from "@/popup/components/Player";
import { useCourses, useStudentId } from "@/hooks";
import PlayList from "@/popup/components/List/Playlist";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants";

function PlayListSection() {
  const queryClient = useQueryClient();
  const [playList, setPlayList] = useAtom(playListAtom);
  const { data: courses } = useCourses({});
  const { data: studentId } = useStudentId({
    courseId: courses?.[0].id,
    userId: courses?.[0].enrollments[0].user_id,
  });

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.origin !== "https://lcms.skku.edu") return;
      e.stopPropagation();

      if (e.data === "end") {
        queryClient.invalidateQueries([QUERY_KEYS.ASSIGNMENTS, playList[0].course_id], {
          refetchType: "all",
        });

        setPlayList((prev) => {
          const next = [...prev];
          next.shift();
          return next;
        });
      } else console.log(e.data);
    };
    window.addEventListener("message", handleMessage, false);

    return () => window.removeEventListener("message", handleMessage, false);
  }, [playList, queryClient, setPlayList]);

  return (
    <>
      {playList.length > 0 && <Player assignment={playList[0]} studentId={studentId ?? ""} />}

      <PlayList assignments={playList} />
    </>
  );
}

export default PlayListSection;
