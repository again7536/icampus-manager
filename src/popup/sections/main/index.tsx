import moment from "moment";
import AssignmentList from "@/popup/components/List/Assignment";
import { useCourses, useAssignments } from "@/hooks";
import { useMemo, useState } from "react";
import { playListAtom, selectedCoursesAtom } from "@/atoms";
import { useAtom } from "jotai";
import { useQueryClient } from "@tanstack/react-query";
import { flexBox } from "@/styles/mixin";
import { css } from "@emotion/react";
import { IconButton, SelectChangeEvent, Tooltip } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import CachedIcon from "@mui/icons-material/Cached";
import SelectCheck from "@/popup/components/SelectCheck";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

function Main() {
  const [selectedCourses, setSelectedCourses] = useAtom(selectedCoursesAtom);
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [isCheckable, setCheckable] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const [, setPlayList] = useAtom(playListAtom);
  const { data: courses } = useCourses({
    onSuccess: (data) =>
      selectedCourses.length === 0 && setSelectedCourses(data.map((course) => course.id)),
  });
  const results = useAssignments({
    courseIds: courses?.map((course) => course.id),
    userId: courses?.[0].enrollments[0].user_id,
  });

  // data filtering
  const assignments = useMemo(
    () =>
      results
        .map((result) => result.data ?? [])
        .flat()
        .filter((assignment) => selectedCourses.indexOf(assignment.course_id) > -1)
        .filter(
          (assignment) =>
            assignment.completed === false && moment(assignment.due_at).diff(moment.now()) > 0
        )
        .sort((a, b) => moment(a.due_at).diff(b.due_at)),
    [results, selectedCourses]
  );
  const videoAssignments = useMemo(
    () => assignments.filter((assignment) => assignment.commons_content.content_type === "movie"),
    [assignments]
  );
  const otherAssignments = useMemo(
    () => assignments.filter((assignment) => assignment.commons_content.content_type !== "movie"),
    [assignments]
  );
  const coursesMap = useMemo(
    () => new Map(courses?.map((course) => [course.id, course.name]) ?? []),
    [courses]
  );

  const handleCheck = (id: number) =>
    setChecked((prev) => {
      const next = new Set(prev);
      if (prev.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  const handleSelectChange = (e: SelectChangeEvent<number[]>) =>
    setSelectedCourses([...(e.target.value as number[])]);

  const handleClickAddPlaylist = () => setCheckable(true);
  const handleConfirmSelect = () => {
    setPlayList(assignments.filter((a, id) => checked.has(id)));
    setCheckable(false);
  };
  const handleCancelSelect = () => {
    setCheckable(false);
    setChecked(new Set());
  };

  return (
    <>
      <div
        css={css`
          width: 100%;
          ${flexBox({ justify: "flex-start" })};
          gap: 0 10px;
        `}
      >
        <SelectCheck items={coursesMap} onChange={handleSelectChange} selected={selectedCourses} />
        {isCheckable ? (
          <>
            <Tooltip title="선택 취소">
              <IconButton onClick={handleCancelSelect}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="재생 목록에 추가">
              <IconButton onClick={handleConfirmSelect}>
                <CheckIcon />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip title="강의 데이터 업데이트">
              <IconButton onClick={() => queryClient.invalidateQueries()}>
                <CachedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="재생 목록 선택">
              <IconButton onClick={handleClickAddPlaylist}>
                <PlaylistAddIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
      </div>
      <AssignmentList
        assignments={videoAssignments}
        courses={courses ?? []}
        title="강의"
        checkable={isCheckable}
        checked={checked}
        onCheck={handleCheck}
      />
      <AssignmentList assignments={otherAssignments} courses={courses ?? []} title="과제" />
    </>
  );
}

export default Main;
