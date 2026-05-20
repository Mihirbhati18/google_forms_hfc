import { create } from "zustand";
import { Form, Question, QuestionType } from "@/types";

function generateId(): string {
  return `q-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

interface FormBuilderState {
  // Current form being edited
  form: Form | null;
  questions: Question[];
  isDirty: boolean;
  isSaving: boolean;

  // Actions
  setForm: (form: Form) => void;
  updateForm: (updates: Partial<Form>) => void;
  setQuestions: (questions: Question[]) => void;
  addQuestion: (type: QuestionType) => void;
  updateQuestion: (id: string, updates: Partial<Question>) => void;
  deleteQuestion: (id: string) => void;
  reorderQuestions: (activeId: string, overId: string) => void;
  duplicateQuestion: (id: string) => void;
  setSaving: (saving: boolean) => void;
  markClean: () => void;
  reset: () => void;
}

const defaultLabels: Record<QuestionType, string> = {
  short_text: "Untitled Question",
  long_text: "Untitled Question",
  multiple_choice: "Untitled Question",
  checkboxes: "Untitled Question",
  dropdown: "Untitled Question",
  date: "Select a date",
  phone: "Phone Number",
  file_upload: "Upload a file",
  rating: "Rate your experience",
  section_header: "Section Title",
};

export const useFormBuilderStore = create<FormBuilderState>((set, get) => ({
  form: null,
  questions: [],
  isDirty: false,
  isSaving: false,

  setForm: (form) => set({ form, isDirty: false }),

  updateForm: (updates) =>
    set((state) => ({
      form: state.form ? { ...state.form, ...updates } : null,
      isDirty: true,
    })),

  setQuestions: (questions) => set({ questions, isDirty: false }),

  addQuestion: (type) => {
    const { questions, form } = get();
    const newQuestion: Question = {
      id: generateId(),
      form_id: form?.id || "",
      type,
      label: defaultLabels[type],
      required: false,
      order_index: questions.length,
      options:
        type === "multiple_choice" ||
        type === "checkboxes" ||
        type === "dropdown"
          ? ["Option 1", "Option 2"]
          : undefined,
    };
    set({ questions: [...questions, newQuestion], isDirty: true });
  },

  updateQuestion: (id, updates) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id ? { ...q, ...updates } : q
      ),
      isDirty: true,
    })),

  deleteQuestion: (id) =>
    set((state) => ({
      questions: state.questions
        .filter((q) => q.id !== id)
        .map((q, i) => ({ ...q, order_index: i })),
      isDirty: true,
    })),

  reorderQuestions: (activeId, overId) => {
    const { questions } = get();
    const oldIndex = questions.findIndex((q) => q.id === activeId);
    const newIndex = questions.findIndex((q) => q.id === overId);

    if (oldIndex === -1 || newIndex === -1) return;

    const newQuestions = [...questions];
    const [moved] = newQuestions.splice(oldIndex, 1);
    newQuestions.splice(newIndex, 0, moved);

    set({
      questions: newQuestions.map((q, i) => ({ ...q, order_index: i })),
      isDirty: true,
    });
  },

  duplicateQuestion: (id) => {
    const { questions } = get();
    const original = questions.find((q) => q.id === id);
    if (!original) return;

    const duplicate: Question = {
      ...original,
      id: generateId(),
      label: `${original.label} (Copy)`,
      order_index: questions.length,
    };
    set({ questions: [...questions, duplicate], isDirty: true });
  },

  setSaving: (isSaving) => set({ isSaving }),
  markClean: () => set({ isDirty: false }),
  reset: () => set({ form: null, questions: [], isDirty: false, isSaving: false }),
}));
