import { fetchCourses, fetchStudentId } from "@/api";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetchCourses().then((data) =>
      fetchStudentId({ courseId: data[0].id, userId: data[0].enrollments[0].user_id })
    );
  }, []);

  return (
    <div>
      <p>hihi</p>
    </div>
  );
}

export default App;
