interface CourseStatus {
  user_name: string;
  user_login: string;
  user_id: number;
  attendance_count: number;
  late_count: number;
  absent_count: number;
  none_count: number;
}

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

export type { CourseStatus, Course };
