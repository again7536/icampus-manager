import {
  AssignmentResponse,
  Course,
  CourseStatus,
  AssignmentDetailResponse,
  AssignmentInfo,
  AssignmentAssessmentResponse,
  AssignmentShortInfo,
} from "@/types";
import axios from "./axios";

interface FetchStudentIdParams {
  courseId: number;
  userId: number;
}

interface FetchAssignmentsParams {
  courseId: number;
  userId: number;
  studentId: string;
}

interface FetchStudentIdResponse {
  item: CourseStatus;
  assignments: AssignmentResponse[];
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

const fetchStudentId = async ({ courseId, userId }: FetchStudentIdParams) => {
  const { data } = await axios.get<FetchStudentIdResponse>(
    `learningx/api/v1/courses/${courseId}/total_learnstatus/users/${userId}`
  );
  return data.item.user_login;
};

const fetchCourseStatus = async ({ courseId, userId }: FetchStudentIdParams) => {
  const { data } = await axios.get<FetchStudentIdResponse>(
    `learningx/api/v1/courses/${courseId}/total_learnstatus/users/${userId}`
  );
  return data;
};

const fetchCourseAssignmentDetails = async ({
  courseId,
  userId,
  studentId,
}: FetchAssignmentsParams) => {
  const { data } = await axios.get<AssignmentDetailResponse[]>(
    `learningx/api/v1/courses/${courseId}/allcomponents_db?user_id=${userId}&user_login=${studentId}&role=1`
  );
  return data;
};

const fetchAssignmentAssessment = async (courseId: number): Promise<AssignmentShortInfo[]> => {
  const { data } = await axios.get<AssignmentAssessmentResponse[]>(
    `api/v1/courses/${courseId}/assignment_groups?exclude_response_fields%5B%5D=description&exclude_response_fields%5B%5D=rubric&include%5B%5D=assignments&include%5B%5D=discussion_topic&override_assignment_dates=true&per_page=50`
  );
  return Object.values(data)
    .map((assessment) =>
      assessment.assignments.map((val) => ({
        assignment_id: +val.id,
        course_id: courseId,
        due_at: val.due_at,
        title: val.name,
        view_info: {
          view_url: val.html_url,
        },
        id: +val.id,
      }))
    )
    .flat();
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
  })) as AssignmentInfo[];
};

export {
  fetchCourses,
  fetchStudentId,
  fetchCourseStatus,
  fetchAssignmentAssessment,
  fetchCourseAssignmentDetails,
  fetchAndJoinAssignmentInfos,
};
