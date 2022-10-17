interface Course {
  id: number;
  name: string;
  account_id: number;
  uuid: string;
  start_at: Date;
  grading_standard_id: null;
  is_public: boolean;
  created_at: Date;
  course_code: string;
  default_view: string;
  root_account_id: number;
  enrollment_term_id: number;
  license: string;
  grade_passback_setting: null;
  end_at: Date;
  public_syllabus: boolean;
  public_syllabus_to_auth: boolean;
  storage_quota_mb: number;
  is_public_to_auth_users: boolean;
  apply_assignment_group_weights: boolean;
  calendar: {
    [key: "ics" | string]: string;
  };
  time_zone: string;
  blueprint: boolean;
  enrollments: {
    type: string;
    role: string;
    role_id: number;
    user_id: number;
    enrollment_state: string;
    limit_privileges_to_course_section: boolean;
  }[];
  hide_final_grades: boolean;
  workflow_state: number;
  restrict_enrollments_to_course_dates: boolean;
  overridden_course_visibility: string;
}

interface Assignment {
  assignment_id: number;
  component_id: number;
  opened: boolean;
  title: string;
  description: string;
  position: number;
  type: string;
  due_at: Date;
  unlock_at: Date;
  late_at: Date | null;
  lock_at: Date;
  created_at: Date;
  external_extra_vars: {
    canvas_content_id: number;
  };
  points_possible: number;
  grading_type: string;
  submission_types: string[];
  omit_from_final_grade: boolean;
  muted: boolean;
  is_master_course_child_content: boolean;
  has_error_external_url: boolean;
  submitted: boolean;
  grade: null | number;
  score: null | number;
  commons_content: {
    content_id: string;
    content_type: string;
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
}

interface CourseItemStatus {
  content_id: string;
  content_type: string;
  view_url: string;
  thumbnail_url: string;
  progress_support: boolean;
  duration: number;
  section_id: number;
  subsection_id: number;
  component_id: number;
  section_position: number;
  subsection_position: number;
  component_position: number;
  due_at: Date;
  lock_at: Date;
  unlock_at: Date;
  late_at: null;
  datetime: {
    date: Date;
    timezone_type: number;
    timezone: string;
  };
  id: string;
  name: string;
  omit_from_final_grade: boolean;
}

interface CourseStatus {
  user_name: string;
  user_login: string;
  user_id: number;
  attendance_count: number;
  late_count: number;
  absent_count: number;
  none_count: number;
}

export type { Course, Assignment, CourseItemStatus, CourseStatus };
