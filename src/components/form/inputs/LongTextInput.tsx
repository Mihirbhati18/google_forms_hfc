'use client';

import React, { useRef, useEffect, useCallback } from 'react';

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

export default function LongTextInput({
  id,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  label,
  helpText,
}: InputProps) {
  const stringValue = value != null ? String(value) : '';
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoResize = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.max(textarea.scrollHeight, 80)}px`;
  }, []);

  useEffect(() => {
    autoResize();
  }, [stringValue, autoResize]);

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-[var(--color-text)]"
      >
        {label}
        {required && (
          <span className="ml-1 text-[var(--color-error,#ef4444)]">*</span>
        )}
      </label>

      {helpText && (
        <p className="text-xs text-[var(--color-text-secondary)]">{helpText}</p>
      )}

      <textarea
        ref={textareaRef}
        id={id}
        value={stringValue}
        onChange={(e) => {
          onChange(e.target.value || null);
        }}
        disabled={disabled}
        required={required}
        rows={3}
        placeholder="Your answer"
        className={`
          w-full resize-none rounded-xl border px-4 py-3 text-sm
          bg-[var(--color-surface,#fff)]
          text-[var(--color-text)]
          placeholder:text-[var(--color-text-secondary)]/50
          transition-all duration-200 ease-in-out
          outline-none
          ${
            error
              ? 'border-[var(--color-error,#ef4444)] ring-2 ring-[var(--color-error,#ef4444)]/20'
              : 'border-[var(--color-border,#e5e7eb)] hover:border-[var(--color-primary)]/40 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20'
          }
          ${disabled ? 'cursor-not-allowed opacity-50' : ''}
        `}
      />

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
