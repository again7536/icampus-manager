import { AssignmentInfos } from "@/types";

interface PlayerProps {
  assignment: AssignmentInfos;
  studentId: string;
}

function Player({ assignment, studentId }: PlayerProps) {
  return (
    <iframe
      title="player"
      src={`https://canvas.skku.edu/learningx/coursebuilder/view/contents/${assignment.content_id}?user_login=${studentId}&course_id=${assignment.course_id}&section_id=${assignment.section_id}&component_id=${assignment.component_id}&role=1&locale=ko&content_type=movie&use_content_progress=true`}
      className="xn-content-frame"
      width="100%"
      height="285px"
      frameBorder="0"
      scrolling="no"
      allowFullScreen
    />
  );
}

export default Player;
