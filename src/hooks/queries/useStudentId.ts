import { useQuery } from "@tanstack/react-query";
import { fetchStudentId } from "@/api";

interface UseStudentIdProps {
  courseId?: number;
  userId?: number;
}

const useStudentId = ({ courseId, userId }: UseStudentIdProps) => {
  const result = useQuery({
    queryKey: ["studentId", userId],
    queryFn: () => fetchStudentId({ courseId: courseId ?? 0, userId: userId ?? 0 }),
    enabled: !!courseId && !!userId,
  });

  return result;
};

export { useStudentId };
