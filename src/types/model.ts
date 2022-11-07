type LectureType = "mp4" | "everlec" | "movie" | "zoom" | "screenlecture" | "youtube";

interface Course {
  id: number;
  name: string;
  account_id: number;
  enrollments: {
    type: string;
    role: string;
    role_id: number;
    user_id: number;
    // enrollment_state: string;
    // limit_privileges_to_course_section: boolean;
  }[];
  // uuid: string;
  // start_at: string;
  // grading_standard_id: null;
  // is_public: boolean;
  // created_at: string;
  // course_code: string;
  // default_view: string;
  // root_account_id: number;
  // enrollment_term_id: number;
  // license: string;
  // grade_passback_setting: null;
  // end_at: string;
  // public_syllabus: boolean;
  // public_syllabus_to_auth: boolean;
  // storage_quota_mb: number;
  // is_public_to_auth_users: boolean;
  // apply_assignment_group_weights: boolean;
  // calendar: {
  //   [key: "ics" | string]: string;
  // };
  // time_zone: string;
  // blueprint: boolean;
  // hide_final_grades: boolean;
  // workflow_state: number;
  // restrict_enrollments_to_course_dates: boolean;
  // overridden_course_visibility: string;
}

interface AssignmentDetail {
  assignment_id: number;
  component_id: number;
  opened: boolean;
  title: string;
  description: string;
  position: number;
  type: string;
  due_at: string;
  unlock_at: string;
  late_at: string | null;
  lock_at: string;
  created_at: string;
  external_extra_vars: {
    canvas_content_id: number;
  };
  points_possible: number;
  grading_type: string;
  submission_types: string[];

  muted: boolean;

  has_error_external_url: boolean;
  submitted: boolean;
  grade: null | number;
  score: null | number;
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
  use_attendance: boolean;
  completed: boolean;
  attendance_status: string;
  // omit_from_final_grade: boolean;
  // is_master_course_child_content: boolean;
}

interface Assignment {
  id: number;
  name: string;
  content_id: string;
  content_type: string;
  view_url: string;
  thumbnail_url: string;
  progress_support: boolean;
  duration: number;
  section_id: number;
  subsection_id: number;
  component_id: number;
  due_at: string;
  lock_at: string;
  unlock_at: string;
  late_at: string | null;
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

type AssignmentInfos = Partial<Assignment> & AssignmentDetail & { course_id: number };

interface CourseStatus {
  user_name: string;
  user_login: string;
  user_id: number;
  attendance_count: number;
  late_count: number;
  absent_count: number;
  none_count: number;
}

export type { LectureType, Course, Assignment, AssignmentDetail, AssignmentInfos, CourseStatus };
