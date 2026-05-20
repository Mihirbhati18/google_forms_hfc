'use client';

import { useCallback } from 'react';
import { Question } from '@/types';
import { useFormSubmissionStore } from '@/stores/formSubmissionStore';
import QuestionCard from './QuestionCard';
import TornadoEntrance from '@/components/animations/TornadoEntrance';
import ProgressRing from '@/components/ui/ProgressRing';
import Button from '@/components/ui/Button';
import { Send } from 'lucide-react';

interface FormRendererProps {
  questions: Question[];
  onSubmit: () => void;
  isSubmitting: boolean;
}

export default function FormRenderer({ questions, onSubmit, isSubmitting }: FormRendererProps) {
  const {
    answers,
    setAnswer,
    errors,
    validate,
    getCompletionPercentage,
  } = useFormSubmissionStore();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const isValid = validate(questions);
      if (isValid) {
        onSubmit();
      }
    },
    [questions, validate, onSubmit]
  );

  // Check visibility conditions
  const isVisible = (question: Question): boolean => {
    if (!question.conditions) return true;
    const { questionId, operator, value } = question.conditions;
    const answerVal = answers[questionId];

    switch (operator) {
      case 'equals':
        return String(answerVal) === value;
      case 'not_equals':
        return String(answerVal) !== value;
      case 'contains':
        if (Array.isArray(answerVal)) return answerVal.includes(value);
        return String(answerVal).includes(value);
      case 'not_empty':
        return answerVal !== null && answerVal !== undefined && answerVal !== '';
      default:
        return true;
    }
  };

  const visibleQuestions = questions.filter(isVisible);
  const percentage = getCompletionPercentage(visibleQuestions);

  return (
    <form onSubmit={handleSubmit} className="relative">
      {/* Floating Progress Ring */}
      <div className="fixed bottom-8 right-8 z-40 hidden sm:block">
        <div className="bg-surface rounded-full p-2 shadow-soft-lg border border-border">
          <ProgressRing percentage={percentage} size={64} strokeWidth={5} />
        </div>
      </div>

      {/* Mobile Progress Bar */}
      <div className="sm:hidden mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted">Progress</span>
          <span className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>
            {percentage}%
          </span>
        </div>
        <div className="h-2 bg-border/30 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${percentage}%`,
              background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
            }}
          />
        </div>
      </div>

      {/* Questions with Tornado Animation */}
      <TornadoEntrance>
        {visibleQuestions.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            value={answers[question.id] ?? null}
            onChange={(value) => setAnswer(question.id, value)}
            error={errors[question.id]}
            index={index}
          />
        ))}
      </TornadoEntrance>

      {/* Submit Button */}
      <div className="mt-10 flex justify-center">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isSubmitting}
          disabled={isSubmitting}
          icon={<Send size={18} />}
          className="min-w-[200px] text-base font-heading font-bold shadow-glow-sm hover:shadow-glow"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Response'}
        </Button>
      </div>
    </form>
  );
}
