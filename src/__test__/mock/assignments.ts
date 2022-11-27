import { faker } from "@faker-js/faker";
import { AssignmentInfo, LectureType } from "@/types";

interface MockedAssignmentsFactoryParams {
  amount: {
    [key in LectureType | "pdf" | "quiz" | "assignment"]?: number;
  };
  courseId?: number;
}

const mockedAssignmentInfosFactory = ({
  amount,
  courseId,
}: MockedAssignmentsFactoryParams): AssignmentInfo[] =>
  Array.from({ length: Object.values(amount).reduce((acc, val) => acc + val, 0) }).map(
    (_, idx): AssignmentInfo => {
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
        completed: false,
        created_at: faker.date.past().toISOString(),
        due_at: faker.date.future().toISOString(),
        late_at: faker.date.future().toISOString(),
        unlock_at: faker.date.past().toISOString(),
        lock_at: "",
        description: "",
        opened: true,
        title: faker.lorem.word(7),
        use_attendance: true,
        view_info: { view_url: "" },
        type: !isWork ? "commons" : types[idx],
        commons_content: !isWork
          ? {
              content_id: faker.random.alphaNumeric(7),
              content_type: types[idx] as LectureType,
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
