import { useQuery } from "@tanstack/react-query";
import { fetchCourses } from "@/api";
import { QUERY_KEYS } from "@/constants";

const useCourses = () => {
  const result = useQuery({
    queryKey: [QUERY_KEYS.COURSES],
    queryFn: () => fetchCourses(),
  });

  return result;
};

export { useCourses };
