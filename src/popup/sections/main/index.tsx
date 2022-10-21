import moment from "moment";
import AssignmentList from "@/popup/components/List/Assignment";
import { useCourses, useAssignments } from "@/hooks";
import { useMemo, useState } from "react";
import { playListAtom } from "@/atoms";
import { useAtom } from "jotai";
import { useQueryClient } from "@tanstack/react-query";

function Main() {
  const queryClient = useQueryClient();
  const [, setPlayList] = useAtom(playListAtom);
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const { data: courses } = useCourses();
  const results = useAssignments({
    courseIds: courses?.map((course) => course.id),
    userId: courses?.[0].enrollments[0].user_id,
  });

  const assignments = useMemo(
    () =>
      results
        .map((result) => result.data ?? [])
        .flat()
        .filter(
          (assignment) =>
            assignment.completed === false && moment(assignment.due_at).diff(moment.now()) > 0
        )
        .sort((a, b) => moment(a.due_at).diff(b.due_at)),
    [results]
  );

  const handleClick = () => setPlayList(assignments.filter((a, id) => checked.has(id)));
  const handleCheck = (id: number) => setChecked((prev) => new Set(prev).add(id));

  return (
    <>
      <button type="button" onClick={() => queryClient.invalidateQueries()}>
        inval
      </button>
      <button type="button" onClick={handleClick}>
        add
      </button>
      <AssignmentList assignments={assignments} checked={checked} onCheck={handleCheck} />
    </>
  );
}

export default Main;
