import { faker } from "@faker-js/faker";
import { AssignmentInfos } from "@/types";

interface MockedAssignmentsFactoryParams {
  amount: {
    pdf?: number;
    movie?: number;
    zoom?: number;
    everlec?: number;
    mp4?: number;
    quiz?: number;
    assignment?: number;
  };
  courseId?: number;
}

const mockedAssignmentInfosFactory = ({
  amount,
  courseId,
}: MockedAssignmentsFactoryParams): AssignmentInfos[] =>
  Array.from({ length: Object.values(amount).reduce((acc, val) => acc + val, 0) }).map(
    (_, idx): AssignmentInfos => {
      const assignmentId = +faker.random.numeric(7);
      const types = Object.entries(amount)
        .map(([key, val]) => Array.from({ length: val }, () => key))
        .flat() as string[];
      const isWork = types[idx] === "assginment" || types[idx] === "quiz";

      return {
        id: assignmentId,
        assignment_id: assignmentId,
        course_id: courseId ?? +faker.random.numeric(7),
        component_id: +faker.random.numeric(7),
        attendance_status: "false",
        completed: false,
        created_at: faker.date.past().toISOString(),
        due_at: faker.date.future().toISOString(),
        late_at: faker.date.future().toISOString(),
        unlock_at: faker.date.past().toISOString(),
        lock_at: "",
        description: "",
        external_extra_vars: {
          canvas_content_id: +faker.random.numeric(7),
        },
        grade: null,
        grading_type: "",
        has_error_external_url: false,
        // is_master_course_child_content: true,
        muted: false,
        // omit_from_final_grade: false,
        opened: true,
        points_possible: 1,
        position: 1,
        score: null,
        submission_types: [],
        submitted: false,
        title: faker.lorem.word(7),
        use_attendance: true,
        view_info: { view_url: "" },
        type: !isWork ? "commons" : types[idx],
        commons_content: !isWork
          ? {
              content_id: faker.random.alphaNumeric(7),
              content_type: types[idx],
              duration: +faker.random.numeric(3),
              progress_support: true,
              thumbnail_url: "",
              view_url: "",
            }
          : undefined,
      };
    }
  );

export default mockedAssignmentInfosFactory;
