import { Assignment, Course, CourseStatus, AssignmentDetail } from "@/types";
import axios from "./axios";

interface FetchStudentIdProps {
  courseId: number;
  userId: number;
}

interface FetchAssignmentsProps {
  courseId: number;
  userId: number;
  studentId: string;
}

interface FetchStudentIdResponse {
  item: CourseStatus;
  assignments: Assignment[];
}

const fetchCourses = async () => {
  const { data } = await axios.get<Course[]>("api/v1/users/self/favorites/courses", {
    headers: { Authorization: undefined },
  });
  return data;
};

const fetchStudentId = async ({ courseId, userId }: FetchStudentIdProps) => {
  const { data } = await axios.get<FetchStudentIdResponse>(
    `learningx/api/v1/courses/${courseId}/total_learnstatus/users/${userId}`
  );
  return data.item.user_login;
};

const fetchCourseStatus = async ({ courseId, userId }: FetchStudentIdProps) => {
  const { data } = await axios.get<FetchStudentIdResponse>(
    `learningx/api/v1/courses/${courseId}/total_learnstatus/users/${userId}`
  );
  return data;
};

const fetchCourseAssignmentDetails = async ({
  courseId,
  userId,
  studentId,
}: FetchAssignmentsProps) => {
  const { data } = await axios.get<AssignmentDetail[]>(
    `learningx/api/v1/courses/${courseId}/allcomponents_db?user_id=${userId}&user_login=${studentId}&role=1`
  );
  return data;
};

export { fetchCourses, fetchStudentId, fetchCourseStatus, fetchCourseAssignmentDetails };
