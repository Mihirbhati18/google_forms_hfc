// ─── Form Types ───────────────────────────────────────────

export type QuestionType =
  | "short_text"
  | "long_text"
  | "multiple_choice"
  | "checkboxes"
  | "dropdown"
  | "date"
  | "phone"
  | "file_upload"
  | "rating"
  | "section_header";

export interface QuestionCondition {
  questionId: string;
  operator: "equals" | "not_equals" | "contains" | "not_empty";
  value: string;
}

export interface Question {
  id: string;
  form_id: string;
  type: QuestionType;
  label: string;
  help_text?: string;
  required: boolean;
  order_index: number;
  options?: string[]; // For MCQ, checkboxes, dropdown
  conditions?: QuestionCondition;
  created_at?: string;
}

export interface Form {
  id: string;
  slug: string;
  title: string;
  description?: string;
  success_message: string;
  is_active: boolean;
  max_responses?: number;
  opens_at?: string;
  closes_at?: string;
  created_by?: string;
  created_at: string;
  updated_at?: string;
  questions?: Question[];
  _response_count?: number; // Virtual field for admin
}

export interface FormResponse {
  id: string;
  form_id: string;
  submitted_at: string;
  metadata?: Record<string, unknown>;
}

export interface Answer {
  id: string;
  response_id: string;
  question_id: string;
  value: string | string[] | number | null;
}

export interface SubmissionData {
  form_id: string;
  answers: Record<string, string | string[] | number | null>;
}

// ─── Admin Types ──────────────────────────────────────────

export interface AdminStats {
  totalForms: number;
  totalResponses: number;
  responsesToday: number;
  responsesThisWeek: number;
  mostActiveForm?: {
    title: string;
    responseCount: number;
  };
}

export interface ResponseRow {
  id: string;
  submitted_at: string;
  answers: Record<string, string | string[] | number | null>;
  metadata?: Record<string, unknown>;
}

// ─── Theme Types ──────────────────────────────────────────

export interface HeroImage {
  src: string;
  alt: string;
}

// ─── Form Status ──────────────────────────────────────────

export type FormStatus = "active" | "closed" | "scheduled" | "draft";

export function getFormStatus(form: Form): FormStatus {
  if (!form.is_active) return "draft";

  const now = new Date();

  if (form.opens_at && new Date(form.opens_at) > now) return "scheduled";
  if (form.closes_at && new Date(form.closes_at) < now) return "closed";

  return "active";
}

export function getStatusColor(status: FormStatus): string {
  switch (status) {
    case "active":
      return "var(--color-success)";
    case "closed":
      return "var(--color-error)";
    case "scheduled":
      return "var(--color-warning)";
    case "draft":
      return "var(--color-text-muted)";
  }
}
