import { Assignment, Course, CourseStatus, AssignmentDetail, AssignmentInfos } from "@/types";
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

interface FetchAndJoinAssignmentInfosParam {
  courseId: number;
  userId: number;
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

// do SQL like join operation for assignment and assignment details
const fetchAndJoinAssignmentInfos = async ({
  courseId,
  userId,
}: FetchAndJoinAssignmentInfosParam) => {
  const { assignments, item: courseStatus } = await fetchCourseStatus({
    courseId,
    userId: userId ?? 0,
  });
  const assignmentDetails = await fetchCourseAssignmentDetails({
    courseId,
    userId: userId ?? 0,
    studentId: courseStatus.user_login,
  });

  return assignmentDetails.map((detail) => ({
    ...detail,
    ...assignments.find((assignment) => assignment.id === detail.assignment_id),
    course_id: courseId,
  })) as AssignmentInfos[];
};

export {
  fetchCourses,
  fetchStudentId,
  fetchCourseStatus,
  fetchCourseAssignmentDetails,
  fetchAndJoinAssignmentInfos,
};
