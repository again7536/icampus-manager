import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchCourses } from "@/api";
import { QUERY_KEYS } from "@/constants";
import { Course } from "@/types";
import { useAtom } from "jotai";
import { selectedCourseIdsAtom } from "@/atoms";

const useCourses = (
  queryProps?: Partial<UseQueryOptions<Course[], unknown, Course[], [typeof QUERY_KEYS.COURSES]>>
) => {
  const [selectedCourseIds, setselectedCourseIds] = useAtom(selectedCourseIdsAtom);

  const result = useQuery({
    ...queryProps,
    queryKey: [QUERY_KEYS.COURSES],
    queryFn: () => fetchCourses(),
    onSuccess: (courses) => {
      const courseIds = courses.map((course) => course.id);

      // add all courses if not selected, and check selected course is valid after success
      setselectedCourseIds((prev) =>
        selectedCourseIds.length === 0
          ? [...courseIds]
          : [...prev.filter((selected) => courseIds.includes(selected))]
      );
    },
  });

  return result;
};

export { useCourses };
