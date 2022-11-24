type LectureType = "mp4" | "everlec" | "movie" | "zoom" | "screenlecture" | "youtube";

interface AssignmentDetailResponse {
  assignment_id: number;
  component_id: number;
  opened: boolean;
  title: string;
  description: string;
  type: string;
  due_at: string;
  unlock_at: string;
  late_at: string | null;
  lock_at: string;
  created_at: string;
  completed: boolean;
  use_attendance: boolean;
  commons_content?: {
    content_id: string;
    content_type: LectureType | "pdf";
    view_url: string;
    thumbnail_url: string;
    progress_support: boolean;
    duration: number;
  };
  view_info: {
    view_url: string;
  };
  // external_extra_vars: {
  //   canvas_content_id: number;
  // };
  // position: number;
  // points_possible: number;
  // grading_type: string;
  // submission_types: string[];
  // muted: boolean;
  // has_error_external_url: boolean;
  // submitted: boolean;
  // grade: null | number;
  // score: null | number;

  // attendance_status: string;
  // omit_from_final_grade: boolean;
  // is_master_course_child_content: boolean;
}

interface AssignmentResponse {
  id: number;
  name: string;
  content_id: string;
  content_type: string;
  view_url: string;
  duration: number;
  section_id: number;
  subsection_id: number;
  component_id: number;
  due_at: string;
  lock_at: string;
  unlock_at: string;
  late_at: string | null;
  // thumbnail_url: string;
  // progress_support: boolean;
  // datetime: {
  //   date: string;
  //   timezone_type: number;
  //   timezone: string;
  // };
  // omit_from_final_grade: boolean;
  // section_position: number;
  // subsection_position: number;
  // component_position: number;
}

interface AssignmentAssessmentResponse {
  id: string;
  due_at: string;
  unlock_at: string;
  lock_at: null;
  points_possible: number;
  grading_type: string;
  assignment_group_id: string;
  grading_standard_id: null;
  created_at: string;
  updated_at: string;
  html_url: string;
  // peer_reviews: boolean;
  // automatic_peer_reviews: boolean;
  // position: number;
  // grade_group_students_individually: boolean;
  // anonymous_peer_reviews: boolean;
  // group_category_id: null;
  // post_to_sis: boolean;
  // moderated_grading: boolean;
  // omit_from_final_grade: boolean;
  // intra_group_peer_reviews: boolean;
  // anonymous_instructor_annotations: boolean;
  // anonymous_grading: boolean;
  // graders_anonymous_to_graders: boolean;
  // grader_count: number;
  // grader_comments_visible_to_graders: boolean;
  // final_grader_id: null;
  // grader_names_visible_to_final_grader: boolean;
  // allowed_attempts: number;
  // secure_params: string;
  // course_id: string;
  // name: string;
  // submission_types: string[];
  // has_submitted_submissions: boolean;
  // due_date_required: boolean;
  // max_name_length: number;
  // is_quiz_assignment: boolean;
  // can_duplicate: boolean;
  // original_course_id: null;
  // original_assignment_id: null;
  // original_assignment_name: null;
  // original_quiz_id: null;
  // workflow_state: string;
  // muted: boolean;
  // allowed_extensions: string[];
  // published: boolean;
  // only_visible_to_overrides: boolean;
  // locked_for_user: boolean;
  // submissions_download_url: string;
  // post_manually: boolean;
  // anonymize_students: boolean;
  // require_lockdown_browser: boolean;
  // in_closed_grading_period: boolean;
}

type AssignmentInfo = Partial<AssignmentResponse> &
  AssignmentDetailResponse & { course_id: number };

export type {
  LectureType,
  AssignmentDetailResponse,
  AssignmentAssessmentResponse,
  AssignmentResponse,
  AssignmentInfo,
};
