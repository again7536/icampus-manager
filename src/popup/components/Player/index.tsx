import { AssignmentDetail, Assignment } from "@/types";

interface PlayerProps {
  assignment: AssignmentDetail & Assignment & { course_id: number };
  studentId: string;
}

function Player({ assignment, studentId }: PlayerProps) {
  return (
    <iframe
      title="player"
      src={`https://lcms.skku.edu/em/${assignment.content_id}?startat=0.00&endat=0.00&TargetUrl=https//:canvas.skku.edu/learningx/api/v1/courses/${assignment.course_id}/sections/${assignment.section_id}/components/${assignment.component_id}/progress?user_id=${studentId}&content_id=${assignment.content_id}&content_type=movie&pr=1&lg=ko`}
      className="xn-content-frame"
      width="100%"
      height="100%"
      frameBorder="0"
      scrolling="no"
      allowFullScreen
    />
  );
}

export default Player;
