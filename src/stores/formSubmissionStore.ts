import { create } from "zustand";
import { Question } from "@/types";

interface FormSubmissionState {
  // Form data
  answers: Record<string, string | string[] | number | null>;
  currentStep: number;
  totalSteps: number;
  isSubmitting: boolean;
  isSubmitted: boolean;
  errors: Record<string, string>;

  // Actions
  setAnswer: (questionId: string, value: string | string[] | number | null) => void;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setTotalSteps: (total: number) => void;
  setSubmitting: (submitting: boolean) => void;
  setSubmitted: (submitted: boolean) => void;
  setError: (questionId: string, error: string) => void;
  clearError: (questionId: string) => void;
  clearErrors: () => void;
  validate: (questions: Question[]) => boolean;
  getCompletionPercentage: (questions: Question[]) => number;
  reset: () => void;
}

export const useFormSubmissionStore = create<FormSubmissionState>((set, get) => ({
  answers: {},
  currentStep: 0,
  totalSteps: 1,
  isSubmitting: false,
  isSubmitted: false,
  errors: {},

  setAnswer: (questionId, value) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: value },
      errors: { ...state.errors, [questionId]: "" },
    })),

  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, state.totalSteps - 1) })),
  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 0) })),
  setTotalSteps: (total) => set({ totalSteps: total }),
  setSubmitting: (isSubmitting) => set({ isSubmitting }),
  setSubmitted: (isSubmitted) => set({ isSubmitted }),

  setError: (questionId, error) =>
    set((state) => ({
      errors: { ...state.errors, [questionId]: error },
    })),

  clearError: (questionId) =>
    set((state) => {
      const newErrors = { ...state.errors };
      delete newErrors[questionId];
      return { errors: newErrors };
    }),

  clearErrors: () => set({ errors: {} }),

  validate: (questions) => {
    const { answers } = get();
    const errors: Record<string, string> = {};
    let isValid = true;

    questions.forEach((q) => {
      if (q.type === "section_header") return;
      if (!q.required) return;

      const value = answers[q.id];

      if (value === undefined || value === null || value === "") {
        errors[q.id] = "This field is required";
        isValid = false;
      } else if (Array.isArray(value) && value.length === 0) {
        errors[q.id] = "Please select at least one option";
        isValid = false;
      }
    });

    set({ errors });
    return isValid;
  },

  getCompletionPercentage: (questions) => {
    const { answers } = get();
    const answerable = questions.filter((q) => q.type !== "section_header");
    if (answerable.length === 0) return 0;

    const answered = answerable.filter((q) => {
      const val = answers[q.id];
      if (val === undefined || val === null || val === "") return false;
      if (Array.isArray(val) && val.length === 0) return false;
      return true;
    });

    return Math.round((answered.length / answerable.length) * 100);
  },

  reset: () =>
    set({
      answers: {},
      currentStep: 0,
      isSubmitting: false,
      isSubmitted: false,
      errors: {},
    }),
}));
