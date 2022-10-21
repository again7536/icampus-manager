import { useQuery } from "@tanstack/react-query";
import { fetchStudentId } from "@/api";
import { QUERY_KEYS } from "@/constants";

interface UseStudentIdProps {
  courseId?: number;
  userId?: number;
}

const useStudentId = ({ courseId, userId }: UseStudentIdProps) => {
  const result = useQuery({
    queryKey: [QUERY_KEYS.STUDENTID, userId],
    queryFn: () => fetchStudentId({ courseId: courseId ?? 0, userId: userId ?? 0 }),
    enabled: !!courseId && !!userId,
  });

  return result;
};

export { useStudentId };
