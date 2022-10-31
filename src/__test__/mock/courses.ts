import { Course } from "@/types";
import { faker } from "@faker-js/faker";

interface MockedCoursesFactory {
  amount: number;
}

const mockedCoursesFactory = ({ amount }: MockedCoursesFactory): Course[] => {
  return Array.from({ length: amount }, (_, i) => i).map(() => ({
    account_id: +faker.random.numeric(7),
    id: +faker.random.numeric(7),
    name: faker.random.words(5),
    enrollments: [{ user_id: +faker.random.numeric(9), role: "student", role_id: 1, type: "" }],
  }));
};

export default mockedCoursesFactory;
