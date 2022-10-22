import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchCourses } from "@/api";
import { QUERY_KEYS } from "@/constants";
import { Course } from "@/types";

const useCourses = (
  queryProps: Partial<UseQueryOptions<Course[], unknown, Course[], [typeof QUERY_KEYS.COURSES]>>
) => {
  const result = useQuery({
    ...queryProps,
    queryKey: [QUERY_KEYS.COURSES],
    queryFn: () => fetchCourses(),
  });

  return result;
};

export { useCourses };
