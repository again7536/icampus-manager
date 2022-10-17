import { fetchChoresOfCourse, fetchCourses, fetchStudentId } from "@/api";
import { Assignment } from "@/types";
import { useEffect, useState } from "react";
import AssignmentList from "./components/List";
import * as S from "./styled";

function App() {
  const [assignments, setAssignments] = useState<(Assignment & { course_name: string })[]>([]);

  /* TODO: React-Query와 persist 플러그인 사용해서 로컬 스토리지에 캐싱하기 */
  useEffect(() => {
    const fillData = async () => {
      const courses = await fetchCourses();
      const courseId = courses[0].id;
      const userId = courses[0].enrollments[0].user_id;
      const studentId = +(await fetchStudentId({ courseId, userId }));

      const chores = (
        await Promise.all(
          courses.map((course) => fetchChoresOfCourse({ courseId: course.id, userId, studentId }))
        )
      )
        .map((assignmentsOfCourse, courseIdx) =>
          assignmentsOfCourse.map((assignment) => ({
            ...assignment,
            course_name: courses[courseIdx].name,
          }))
        )
        .flat()
        .filter((assignment) => assignment.completed === false);
      setAssignments(chores);
    };

    fillData();
  }, []);

  return (
    <S.PopupContainer>
      <AssignmentList assignments={assignments} />
    </S.PopupContainer>
  );
}

export default App;
