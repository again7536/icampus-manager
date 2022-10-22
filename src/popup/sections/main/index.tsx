import moment from "moment";
import AssignmentList from "@/popup/components/List/Assignment";
import { useCourses, useAssignments } from "@/hooks";
import { useMemo, useState } from "react";
import { playListAtom, selectedCoursesAtom } from "@/atoms";
import { useAtom } from "jotai";
import { useQueryClient } from "@tanstack/react-query";
import { flexBox } from "@/styles/mixin";
import { css } from "@emotion/react";
import { IconButton, SelectChangeEvent } from "@mui/material";
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
  const coursesMap = useMemo(
    () => new Map(courses?.map((course) => [course.id, course.name]) ?? []),
    [courses]
  );

  const handleClick = () => setPlayList(assignments.filter((a, id) => checked.has(id)));
  const handleCheck = (id: number) => setChecked((prev) => new Set(prev).add(id));
  const handleSelectChange = (e: SelectChangeEvent<number[]>) =>
    setSelectedCourses([...(e.target.value as number[])]);

  return (
    <>
      <div
        css={css`
          width: 100%;
          ${flexBox({ justify: "flex-start" })};
        `}
      >
        <SelectCheck items={coursesMap} onChange={handleSelectChange} selected={selectedCourses} />
        <IconButton onClick={() => queryClient.invalidateQueries()}>
          <CachedIcon />
        </IconButton>
        <IconButton onClick={handleClick}>
          <PlaylistAddIcon />
        </IconButton>
      </div>
      <AssignmentList assignments={assignments} checked={checked} onCheck={handleCheck} />
    </>
  );
}

export default Main;
