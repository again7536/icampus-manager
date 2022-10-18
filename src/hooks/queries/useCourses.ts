import { useQuery } from "@tanstack/react-query";
import { fetchCourses } from "@/api";

const useCourses = () => {
  const result = useQuery({
    queryKey: ["courses"],
    queryFn: () => fetchCourses(),
  });

  return result;
};

export { useCourses };
