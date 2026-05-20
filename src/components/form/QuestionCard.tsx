'use client';

import { motion } from 'framer-motion';
import { Question } from '@/types';
import {
  ShortTextInput,
  LongTextInput,
  MultipleChoiceInput,
  CheckboxInput,
  DropdownInput,
  DateInput,
  PhoneInput,
  FileUploadInput,
  RatingInput,
  SectionHeader,
} from '@/components/form/inputs';

interface QuestionCardProps {
  question: Question;
  value: string | string[] | number | null;
  onChange: (value: string | string[] | number | null) => void;
  error?: string;
  index: number;
}

const inputComponents: Record<string, React.ComponentType<{
  id: string;
  value: string | string[] | number | null;
  onChange: (value: string | string[] | number | null) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  label: string;
  helpText?: string;
  options?: string[];
}>> = {
  short_text: ShortTextInput,
  long_text: LongTextInput,
  multiple_choice: MultipleChoiceInput,
  checkboxes: CheckboxInput,
  dropdown: DropdownInput,
  date: DateInput,
  phone: PhoneInput,
  file_upload: FileUploadInput,
  rating: RatingInput,
  section_header: SectionHeader,
};

export default function QuestionCard({
  question,
  value,
  onChange,
  error,
}: QuestionCardProps) {
  const InputComponent = inputComponents[question.type];

  if (!InputComponent) return null;

  if (question.type === 'section_header') {
    return (
      <SectionHeader
        id={question.id}
        label={question.label}
        helpText={question.help_text}
        value={null}
        onChange={() => {}}
      />
    );
  }

  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: '0 8px 30px var(--color-shadow)' }}
      transition={{ duration: 0.2 }}
      className="bg-surface rounded-2xl border border-border p-6 sm:p-8 transition-shadow"
    >
      <InputComponent
        id={question.id}
        label={question.label}
        helpText={question.help_text}
        required={question.required}
        options={question.options}
        value={value}
        onChange={onChange}
        error={error}
      />
    </motion.div>
  );
}
