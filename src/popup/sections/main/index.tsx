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

function Main() {
  const [selectedCourses, setSelectedCourses] = useAtom(selectedCoursesAtom);
  const [checked, setChecked] = useState<Set<number>>(new Set());

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

  const handleAddPlayList = () => setPlayList(assignments.filter((a, id) => checked.has(id)));
  const handleCheck = (id: number) =>
    setChecked((prev) => {
      const next = new Set(prev);
      if (prev.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  const handleSelectChange = (e: SelectChangeEvent<number[]>) =>
    setSelectedCourses([...(e.target.value as number[])]);

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
        <Tooltip title="강의 데이터 업데이트">
          <IconButton onClick={() => queryClient.invalidateQueries()}>
            <CachedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="재생 목록에 추가">
          <IconButton onClick={handleAddPlayList}>
            <PlaylistAddIcon />
          </IconButton>
        </Tooltip>
      </div>
      <AssignmentList
        assignments={videoAssignments}
        courses={courses ?? []}
        title="강의"
        checkable
        checked={checked}
        onCheck={handleCheck}
      />
      <AssignmentList assignments={otherAssignments} courses={courses ?? []} title="과제" />
    </>
  );
}

export default Main;
