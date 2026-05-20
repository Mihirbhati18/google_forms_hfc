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

export default function CheckboxInput({
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
  const selectedValues: string[] = Array.isArray(value)
    ? value
    : value != null
      ? [String(value)]
      : [];

  const handleToggle = (option: string) => {
    if (disabled) return;
    const updated = selectedValues.includes(option)
      ? selectedValues.filter((v) => v !== option)
      : [...selectedValues, option];
    onChange(updated.length > 0 ? updated : null);
  };

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

      <div className="space-y-2" role="group" aria-labelledby={id}>
        {options.map((option, index) => {
          const isChecked = selectedValues.includes(option);
          const optionId = `${id}-option-${index}`;

          return (
            <label
              key={option}
              htmlFor={optionId}
              className={`
                flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3
                transition-all duration-200 ease-in-out
                ${
                  isChecked
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 ring-2 ring-[var(--color-primary)]/20'
                    : 'border-[var(--color-border,#e5e7eb)] bg-[var(--color-surface,#fff)] hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-primary)]/[0.02]'
                }
                ${disabled ? 'cursor-not-allowed opacity-50' : ''}
              `}
            >
              <input
                type="checkbox"
                id={optionId}
                value={option}
                checked={isChecked}
                onChange={() => handleToggle(option)}
                disabled={disabled}
                className="sr-only"
              />

              {/* Custom checkbox */}
              <span
                className={`
                  flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border-2
                  transition-all duration-200
                  ${
                    isChecked
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)]'
                      : 'border-[var(--color-border,#d1d5db)]'
                  }
                `}
              >
                {isChecked && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-3.5 w-3.5 text-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
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
