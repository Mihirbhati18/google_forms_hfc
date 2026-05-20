'use client';

import React from 'react';

interface InputProps {
  id: string;
  value: string | string[] | number | null;
  onChange: (value: string | string[] | number | null) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  label: string;
  helpText?: string;
  options?: string[];
}

export default function MultipleChoiceInput({
  id,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  label,
  helpText,
  options = [],
}: InputProps) {
  const selectedValue = value != null ? String(value) : '';

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-[var(--color-text)]">
        {label}
        {required && (
          <span className="ml-1 text-[var(--color-error,#ef4444)]">*</span>
        )}
      </label>

      {helpText && (
        <p className="text-xs text-[var(--color-text-secondary)]">{helpText}</p>
      )}

      <div className="space-y-2" role="radiogroup" aria-labelledby={id}>
        {options.map((option, index) => {
          const isSelected = selectedValue === option;
          const optionId = `${id}-option-${index}`;

          return (
            <label
              key={option}
              htmlFor={optionId}
              className={`
                flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3
                transition-all duration-200 ease-in-out
                ${
                  isSelected
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 ring-2 ring-[var(--color-primary)]/20'
                    : 'border-[var(--color-border,#e5e7eb)] bg-[var(--color-surface,#fff)] hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-primary)]/[0.02]'
                }
                ${disabled ? 'cursor-not-allowed opacity-50' : ''}
              `}
            >
              <input
                type="radio"
                id={optionId}
                name={id}
                value={option}
                checked={isSelected}
                onChange={() => onChange(option)}
                disabled={disabled}
                className="sr-only"
              />

              {/* Custom radio circle */}
              <span
                className={`
                  flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2
                  transition-all duration-200
                  ${
                    isSelected
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)]'
                      : 'border-[var(--color-border,#d1d5db)]'
                  }
                `}
              >
                {isSelected && (
                  <span className="h-2 w-2 rounded-full bg-white" />
                )}
              </span>

              <span className="text-sm text-[var(--color-text)]">{option}</span>
            </label>
          );
        })}
      </div>

      {error && (
        <p className="flex items-center gap-1.5 text-xs text-[var(--color-error,#ef4444)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-3.5 w-3.5 flex-shrink-0"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
